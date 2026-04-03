// src/routes/protected.routes.js
import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/protected", authenticate, (req, res) => {
    res.json({
        success: true,
        message: "Authenticated route working",
        user: req.user
    });
});

router.get(
    "/admin-only",
    authenticate,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Admin access granted",
            user: req.user
        });
    }
);

router.get(
    "/analyst-or-admin",
    authenticate,
    authorizeRoles("analyst", "admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Analyst/Admin access granted",
            user: req.user
        });
    }
);

export default router;