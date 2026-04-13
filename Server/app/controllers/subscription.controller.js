import subscription from "../models/subscription.js";

const createSubscription = async (req, res) => {
    try {
        const { userId, planId, status = "active", startDate = new Date(), endDate } = req.body;
        if (!userId || !planId) {
            return res.status(400).json({ message: "User ID and Plan ID are required" });
        }
        const newSubscription = await subscription.create({
            user: userId,
            plan: planId,
            status,
            startDate,
            endDate
        });
        return res.status(201).json(newSubscription);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getSubscription = async (req, res) => {
    try {
        const { subscriptionId } = req.body;
        if (!subscriptionId) {
            return res.status(400).json({ message: "Subscription ID is required" });
        }
        const foundSubscription = await subscription.findById(subscriptionId).populate("user").populate("plan");
        if (!foundSubscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        return res.json(foundSubscription);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateSubscription = async (req, res) => {
    try {
        const { subscriptionId, ...updateData } = req.body;
        if (!subscriptionId) {
            return res.status(400).json({ message: "Subscription ID is required" });
        }
        const updatedSubscription = await subscription.findByIdAndUpdate(subscriptionId, { $set: updateData }, { new: true });
        if (!updatedSubscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        return res.json(updatedSubscription);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteSubscription = async (req, res) => {
    try {
        const { subscriptionId } = req.body;
        if (!subscriptionId) {
            return res.status(400).json({ message: "Subscription ID is required" });
        }
        const deletedSubscription = await subscription.findByIdAndDelete(subscriptionId);   
        if (!deletedSubscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        return res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { createSubscription, getSubscription, updateSubscription, deleteSubscription };