import Workspace from "../models/workspace.js";
import { createCompetitorService, deleteCompetitorService } from "../services/competitor.service.js";

const createWorkspace = async (req, res) => {
    try {
        const { name, url, industry } = req.body;
        console.log('Creating workspace with data:', { name, url, industry });
        const { id } = req.user;
        const existing = await Workspace.findOne({ ownerId: id });
        if (existing) {
            return res.status(400).json({ message: "Workspace already exists" });
        }
        const workspace = new Workspace({
            ownerId: id,
            name: name,
            url: url,
            industry: industry
        });
        await workspace.save();

        req.body.role = "Owner";

        const competitor = {
            url: workspace.url,
            role: req.body.role,
            workspaceId: workspace._id,
            selectedPages: req.body.selectedPages
        }

        // console.log('Creating competitor with data:', competitor);

        await createCompetitorService(competitor);

        res.status(201).json(workspace);

    } catch (error) {
        res.status(500).json({ message: error.message });
        Log.error('[CREATE WORKSPACE ERROR]', error);
    }
}

const getWorkspace = async (req, res) => {
    const { id } = req.user;
    try {
        const workspace = await Workspace.findOne({ ownerId: id }).populate("competitors");
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        res.json(workspace);
    } catch (error) {
        res.status(500).json({ message: error.message });
        Log.error('[GET WORKSPACE ERROR]', error);
    }
}

const updateWorkspace = async (req, res) => {
    try {
        const { id } = req.user;
        const workspace = await Workspace.findOneAndUpdate(
            { ownerId: id },
            { $set: req.body },
            { new: true }
        );
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        res.json(workspace);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        Log.error('[UPDATE WORKSPACE ERROR]', error);
    }
}

const deleteWorkspace = async (req, res) => {
    try {
        const { id } = req.user;
        const workspace = await Workspace.findOneAndDelete({ ownerId: id });
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        await deleteCompetitorService(workspace._id);
        res.json({ message: "Workspace deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        Log.error('[DELETE WORKSPACE ERROR]', error);
    }
}


export {
    createWorkspace,
    getWorkspace,
    updateWorkspace,
    deleteWorkspace
}