import { Plan } from "../models/plan.js";

const createPlan = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            currency = "USD",
            duration,
            features = [],
            isActive = true,
        } = req.body;

        if (!name || price === undefined || duration === undefined) {
            return res.status(400).json({ message: "Name, price, and duration are required" });
        }

        const existingPlan = await Plan.findOne({ name });
        if (existingPlan) {
            return res.status(400).json({ message: "Plan already exists" });
        }

        const plan = await Plan.create({
            name,
            description,
            price,
            currency,
            duration,
            features,
            isActive,
        });

        return res.status(201).json(plan);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find().sort({ createdAt: -1 });
        return res.json(plans);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPlan = async (req, res) => {
    try {
        const { planId } = req.body;

        if (!planId) {
            return res.status(400).json({ message: "Plan ID is required" });
        }

        const plan = await Plan.findById(planId);

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        return res.json(plan);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updatePlan = async (req, res) => {
    try {
        const { planId, ...updates } = req.body;

        if (!planId) {
            return res.status(400).json({ message: "Plan ID is required" });
        }

        if (updates.name) {
            const existingPlan = await Plan.findOne({ name: updates.name, _id: { $ne: planId } });
            if (existingPlan) {
                return res.status(400).json({ message: "Plan name already exists" });
            }
        }

        const plan = await Plan.findByIdAndUpdate(planId, { $set: updates }, { new: true });

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        return res.json(plan);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deletePlan = async (req, res) => {
    try {
        const { planId } = req.body;

        if (!planId) {
            return res.status(400).json({ message: "Plan ID is required" });
        }

        const plan = await Plan.findByIdAndDelete(planId);

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        return res.json({ message: "Plan deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
    deletePlan,
};