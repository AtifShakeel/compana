import api from "./api";

/**
 * Create a page for a competitor.
 *
 * @param {object} params - Page creation payload.
 * @param {string} params.url - Page URL.
 * @param {string|number} params.competitorId - Competitor identifier.
 * @returns {Promise<any>} API response data for the created page.
 */
const createPage = async ({ url, competitorId }) => {
	try {
		const response = await api.post("/pages", { url, competitorId });
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Error creating page");
	}
};

/**
 * Fetch all pages for a competitor.
 *
 * @param {object} params - Lookup payload.
 * @param {string|number} params.competitorId - Competitor identifier.
 * @returns {Promise<any>} API response data for competitor pages.
 */
const getPages = async ({ competitorId }) => {
	try {
		const response = await api.get("/pages", { data: { competitorId } });
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Error fetching pages");
	}
};

/**
 * Fetch a single page by ID.
 *
 * @param {object} params - Lookup payload.
 * @param {string|number} params.pageId - Page identifier.
 * @returns {Promise<any>} API response data for the requested page.
 */
const getPage = async ({ pageId }) => {
	try {
		const response = await api.get("/page", { data: { pageId } });
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Error fetching page");
	}
};

/**
 * Update an existing page.
 *
 * @param {object} data - Page update payload. Must include `pageId`.
 * @returns {Promise<any>} API response data for the updated page.
 */
const updatePage = async (data) => {
	try {
		const response = await api.put("/pages", data);
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Error updating page");
	}
};

/**
 * Delete a page.
 *
 * @param {object} params - Deletion payload.
 * @param {string|number} params.pageId - Page identifier.
 * @returns {Promise<any>} API response data for the deletion request.
 */
const deletePage = async ({ pageId }) => {
	try {
		const response = await api.delete("/pages", { data: { pageId } });
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Error deleting page");
	}
};

/**
 * Fetch page analytics data by page ID.
 *
 * Note: `getPageAnalytics` exists in the server controller, but no route is currently
 * registered in `routes.js`. This helper assumes a future GET `/page/analytics` route.
 *
 * @param {object} params - Lookup payload.
 * @param {string|number} params.pageId - Page identifier.
 * @returns {Promise<any>} API response data for page analytics.
 */
const getPageAnalytics = async ({ pageId }) => {
	try {
		const response = await api.get("/page/analytics", { data: { pageId } });
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || "Error fetching page analytics");
	}
};

const pageApi = {
	createPage,
	getPages,
	getPage,
	updatePage,
	deletePage,
	getPageAnalytics,
};

export {
	createPage,
	getPages,
	getPage,
	updatePage,
	deletePage,
	getPageAnalytics,
};

export default pageApi;
