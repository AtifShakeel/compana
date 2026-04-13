import { Router } from "express";

// CONTROLLERS
import { register, login, refreshToken, logout, } from "../controllers/auth.controller.js";
import { getProfile, updateProfile, deleteProfile, changePassword } from "../controllers/user.controller.js";
import { createWorkspace, getWorkspace, updateWorkspace, deleteWorkspace } from "../controllers/workspace.controller.js";
import { createCompetitor, getCompetitor, updateCompetitor, deleteCompetitor } from "../controllers/competitor.controller.js";
import { createPage, getPages, getPageAnalytics, updatePage, deletePage, getPage } from "../controllers/page.controller.js";
import { createSubscription, getSubscription, updateSubscription, deleteSubscription } from "../controllers/subscription.controller.js";
import { createPlan, getPlan, getPlans, updatePlan, deletePlan } from "../controllers/plan.controller.js";

// MIDDLEWARES
import authenticate from "../middleware/authenticate.js";
import { workspaceOwnershipMiddleware } from "../middleware/workspace.middleware.js";
import { competitorMiddleware } from "../middleware/competitor.middleware.js";

const router = Router();

// AUTH ROUTES
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

// USER ROUTES
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.delete("/profile", authenticate, deleteProfile);
router.post("/change-password", authenticate, changePassword);

// WORKSPACE ROUTES
router.post("/workspaces", authenticate, createWorkspace);
router.get("/workspaces", authenticate, workspaceOwnershipMiddleware, getWorkspace);
router.put("/workspaces", authenticate, workspaceOwnershipMiddleware, updateWorkspace);
router.delete("/workspaces", authenticate, workspaceOwnershipMiddleware, deleteWorkspace);

// COMPETITOR ROUTES
router.post("/competitors", authenticate, workspaceOwnershipMiddleware, createCompetitor);
router.get("/competitors", authenticate, workspaceOwnershipMiddleware, getCompetitor);
router.put("/competitors", authenticate, workspaceOwnershipMiddleware, updateCompetitor);
router.delete("/competitors", authenticate, workspaceOwnershipMiddleware, deleteCompetitor);

// PAGE ROUTES
router.post("/pages", authenticate, workspaceOwnershipMiddleware, competitorMiddleware, createPage);
router.get("/pages", authenticate, workspaceOwnershipMiddleware, competitorMiddleware, getPages);
router.get("/page", authenticate, workspaceOwnershipMiddleware, competitorMiddleware, getPage);
router.put("/pages", authenticate, workspaceOwnershipMiddleware, competitorMiddleware, updatePage);
router.delete("/pages", authenticate, workspaceOwnershipMiddleware, competitorMiddleware, deletePage);

// SUBSCRIPTION ROUTES
router.post("/subscription", authenticate, createSubscription);
router.get("/subscription", authenticate, getSubscription);
router.put("/subscription", authenticate, updateSubscription);
router.delete("/subscription", authenticate, deleteSubscription);

// PLAN ROUTES
router.post("/plans", createPlan);
router.get("/plans", getPlans);
router.get("/plan", getPlan);
router.put("/plans", updatePlan);
router.delete("/plans", deletePlan);


// HEALTH CHECK
router.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date() });
});

// 404 ROUTE
router.use((req, res) => {
    res.status(404).json({ message: "Invalid Route" });
});

export default router;