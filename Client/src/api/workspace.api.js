import api from "./api";

/**
 * Create a new workspace.
 *
 * @param {string} name - Workspace name.
 * @param {string} url - Workspace URL.
 * @param {string} industry - Workspace industry.
 * @returns {Promise<any>} API response data for the created workspace.
 */
const createWorkspace = async (name, url, industry) => {
    const response = await api.post("/workspaces", { name, url, industry });
    return response.data;
};

/**
 * Fetch all workspaces.
 *
 * @returns {Promise<any>} API response data for the workspace list.
 */
const getWorkspaces = async () => {
    const response = await api.get("/workspaces");
    return response.data;
};

/**
 * Update an existing workspace.
 *
 * @param {object} data - Workspace update payload.
 * @returns {Promise<any>} API response data for the updated workspace.
 */
const updateWorkspace = async (data) => {
    const response = await api.put("/workspaces", data);
    return response.data;
};

/**
 * Delete the current workspace.
 *
 * @returns {Promise<any>} API response data for the deletion request.
 */
const deleteWorkspace = async () => {
    const response = await api.delete("/workspaces");
    return response.data;
};

const workspaceApi = {
    createWorkspace,
    getWorkspaces,
    updateWorkspace,
    deleteWorkspace,
};

export {
    createWorkspace,
    getWorkspaces,
    updateWorkspace,
    deleteWorkspace,
};

export default workspaceApi;