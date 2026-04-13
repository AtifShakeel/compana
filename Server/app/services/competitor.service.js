import Competitor from "../models/competitor.js";
import Page from "../models/page.js";

const createCompetitorService = async ({
    name,
    url,
    role = "Owner",
    workspaceId,
    selectedPages = [],
}) => {
    if (!url || !workspaceId) {
        throw new Error("URL and Workspace ID are required");
    }

    const existing = await Competitor.findOne({ workspaceId, websiteUrl: url });
    if (existing) {
        throw new Error("Competitor with this URL already exists in the workspace");
    }
    
    const domain = new URL(url).hostname.replace('www.', '');   

    const competitor = await Competitor.create({
        websiteUrl: url,
        role,
        workspaceId,
        domain
    });

    if (Array.isArray(selectedPages) && selectedPages.length > 0) {
        const pageDocs = selectedPages.map((page) => ({
            url: page.url,
            competitorId: competitor._id,
        }));

        await Page.insertMany(pageDocs);
    }

    return competitor;
};

const deleteCompetitorService = async (workspaceId) => {
    await Competitor.deleteMany({ workspaceId });
    await Page.deleteMany({ competitorId: { $in: await Competitor.find({ workspaceId }).select('_id') } });
}

export { createCompetitorService, deleteCompetitorService };