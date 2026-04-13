import api from "./api";

/**
 * Create a competitor record for a workspace.
 *
 * @param {object} params - Competitor payload.
 * @param {string} params.url - Competitor website URL.
 * @param {string} params.role - Competitor role or category.
 * @param {string|number} params.workspaceId - Workspace identifier.
 * @param {Array<string|number>} params.selectedPages - Page identifiers to track.
 * @returns {Promise<any>} API response data for the created competitor.
 */
const createCompetitor = async ({ url, role, workspaceId, selectedPages }) => {
    try {
        const response = await api.post("/competitors", { url, role, workspaceId, selectedPages });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error creating competitor");
    }
};

/**
 * Fetch a competitor for a workspace.
 *
 * @param {object} params - Lookup payload.
 * @param {string|number} params.workspaceId - Workspace identifier.
 * @param {string|number} params.competitorId - Competitor identifier.
 * @returns {Promise<any>} API response data for the requested competitor.
 */
const getCompetitor = async ({ workspaceId, competitorId }) => {
    try {
        const response = await api.get("/competitors", { workspaceId, competitorId });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching competitor");
    }
}

/**
 * [Deprecated] Update an existing competitor record.  This function is not designed for Developer use, but rather for internal use by the application when modifying competitor data.
 *
 * @param {object} data - Updated competitor payload.
 * @returns {Promise<any>} API response data for the updated competitor.
 */
const updateCompetitor = async (data) => {
    try {
        const response = await api.put("/competitors", data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error updating competitor");
    }
}

/**
 * Delete a competitor from a workspace.
 *
 * @param {object} params - Deletion payload.
 * @param {string|number} params.workspaceId - Workspace identifier.
 * @param {string|number} params.competitorId - Competitor identifier.
 * @returns {Promise<any>} API response data for the deletion request.
 */
const deleteCompetitor = async ({ workspaceId, competitorId }) => {
    try {
        const response = await api.delete("/competitors", { workspaceId, competitorId });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error deleting competitor");
    }
}

export {
    createCompetitor,
    getCompetitor,
    updateCompetitor,
    deleteCompetitor
};
