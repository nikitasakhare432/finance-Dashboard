import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";
import { validateUserUpdate } from "../validators/user.validator.js";

const router = express.Router();

router.get("/", authenticate, authorizeRoles("admin"), getAllUsers);
router.get("/:id", authenticate, authorizeRoles("admin"), getUserById);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    validateUserUpdate,
    updateUser
);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteUser);

export default router;