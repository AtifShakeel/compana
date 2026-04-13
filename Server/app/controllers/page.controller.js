import Page from "../models/page.js";

const createPage = async (req, res) => {
    try {
        const { url, competitorId } = req.body;

        if (!url || !competitorId) {
            return res.status(400).json({
                message: "URL and Competitor ID are required",
            });
        }

        const existing = await Page.findOne({ url, competitorId });

        if (existing) {
            return res.status(400).json({
                message: "Page already exists for this competitor",
            });
        }

        const page = await Page.create({
            url,
            competitorId,
            scanStatus: "Pending",
            analysisData: {},
        });

        return res.status(201).json(page);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPages = async (req, res) => {
    try {
        const { competitorId } = req.body;
        const pages = await Page.find({ competitorId });
        res.json(pages);
    } catch (error) {
        Log.error('[GET PAGES ERROR]', error);
        res.status(500).json({ message: error.message });
    }
}

const updatePage = async (req, res) => {
    try {
        const { pageId } = req.body;
        const page = await Page.findByIdAndUpdate(
            pageId,
            { $set: req.body },
            { new: true }
        );
        res.json(page);
    } catch (error) {
        Log.error('[UPDATE PAGE ERROR]', error);
        res.status(500).json({ message: error.message });
    }
}

const deletePage = async (req, res) => {
    try {
        const { pageId } = req.body;
        const page = await Page.findByIdAndDelete(pageId);
        res.json({ message: "Page deleted successfully" });
    } catch (error) {
        Log.error('[DELETE PAGE ERROR]', error);
        res.status(500).json({ message: error.message });
    }
}

const getPageAnalytics = async (req, res) => {
    try {
        const { pageId } = req.body;
        const page = await Page.findById(pageId);
        if (!page) {
            return res.status(404).json({ message: "Page not found" });
        }
        const { analysisData } = page;
        res.json(analysisData);
    } catch (error) {
        Log.error('[GET PAGE ANALYTICS ERROR]', error);
        res.status(500).json({ message: error.message });
    }
}

const getPage = async (req, res) => {
    try {
        const { pageId } = req.body;
        if (!pageId) {
            return res.status(400).json({ message: "Page ID is required" });
        }
        const page = await Page.findById(pageId);
        if (!page) {
            return res.status(404).json({ message: "Page not found" });
        }
        res.json(page);
    } catch (error) {
        Log.error('[GET PAGE ERROR]', error);
        res.status(500).json({ message: error.message });
    }
}

export {
    createPage,
    getPages,
    updatePage,
    deletePage,
    getPageAnalytics,
    getPage
}