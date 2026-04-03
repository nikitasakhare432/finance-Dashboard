import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
    getSummary,
    getCategoryBreakdown,
    getRecentActivity,
    getMonthlyTrends
} from "../controllers/dashboard.controller.js";

const router = express.Router();

// all roles
router.get("/summary", authenticate, getSummary);
router.get("/recent", authenticate, getRecentActivity);

// restricted
router.get(
    "/category",
    authenticate,
    authorizeRoles("admin", "analyst"),
    getCategoryBreakdown
);

router.get(
    "/monthly",
    authenticate,
    authorizeRoles("admin", "analyst"),
    getMonthlyTrends
);

export default router;