import Competitor from "../models/competitor.js";
import Page from "../models/page.js";


const createCompetitor = async (req, res) => {
    try {
        const { url, role = "Competitor", workspaceId, selectedPages = [] } = req.body;
        if (!url || !workspaceId) {
            return res.status(400).json({ message: "URL and Workspace ID are required" });
        }

        // validate URL
        let domain;
        try {
            domain = new URL(url).hostname.replace("www.", "");
        } catch {
            return res.status(400).json({ message: "Invalid URL" });
        }

        const existing = await Competitor.findOne({
            workspaceId: workspaceId,
            websiteUrl: url,
        });

        if (existing) {
            return res.status(400).json({ message: "Competitor already exists" });
        }

        const competitor = await Competitor.create({
            workspaceId: workspaceId,
            role,
            websiteUrl: url,
            domain,
            analysisData: {},
        });

        // CREATE PAGES (IMPORTANT FIX) 
        if (Array.isArray(selectedPages) && selectedPages.length > 0) {
            const pageDocs = selectedPages.map((page) => ({
                url: page,
                competitorId: competitor._id,
            }));

            await Page.insertMany(pageDocs);
        }

        return res.status(201).json(competitor);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getCompetitor = async (req, res) => {
    try {
        const { workspaceId, competitorId } = req.body;
        if (!workspaceId || !competitorId) {
            return res.status(400).json({ message: "Workspace ID and Competitor ID are required" });
        }
        const competitor = await Competitor.findOne({
            workspaceId,
            _id: competitorId
        }).populate("pages");
        if (!competitor) {
            return res.status(404).json({ message: "Competitor not found" });
        }
        res.json(competitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCompetitor = async (req, res) => {
    const { competitorId } = req.body;

    try {
        if(!competitorId) {
            return res.status(400).json({ message: "Competitor ID is required" });
        }
        const competitor = await Competitor.findByIdAndUpdate(
            competitorId,
            { $set: req.body },
            { new: true }
        );
        res.json(competitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCompetitor = async (req, res) => {
    const { competitorId } = req.body;

    try {
        if(!competitorId) {
            return res.status(400).json({ message: "Competitor ID is required" });
        }
        const competitor = await Competitor.findByIdAndDelete(competitorId);
        await Page.deleteMany({ competitorId: competitorId });
        res.json({ message: "Competitor and associated pages deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    createCompetitor,
    getCompetitor,
    updateCompetitor,
    deleteCompetitor
}

