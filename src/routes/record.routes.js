// src/routes/record.routes.js
import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
    createRecord,
    getAllRecords,
    getRecordById,
    updateRecord,
    deleteRecord
} from "../controllers/record.controller.js";
import {
    validateRecord,
    validateRecordUpdate
} from "../validators/record.validator.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    validateRecord,
    createRecord
);

router.get(
    "/",
    authenticate,
    authorizeRoles("admin", "analyst"),
    getAllRecords
);

router.get(
    "/:id",
    authenticate,
    authorizeRoles("admin", "analyst"),
    getRecordById
);

router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    validateRecordUpdate,
    updateRecord
);

router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteRecord
);

export default router;