import {
    createRecordService,
    buildRecordFilter,
    getRecordsService,
    countRecordsService,
    getRecordByIdService,
    updateRecordService,
    deleteRecordService
} from "../services/record.service.js";
import { sendResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createRecord = async (req, res, next) => {
    try {
        const record = await createRecordService(req.body, req.user._id);
        return sendResponse(res, 201, "Record created successfully", record);
    } catch (error) {
        next(error);
    }
};

export const getAllRecords = async (req, res, next) => {
    try {
        const { page = 1, limit = 5, type, category, startDate, endDate } = req.query;

        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);
        const skip = (parsedPage - 1) * parsedLimit;

        const filter = buildRecordFilter({ type, category, startDate, endDate });

        const totalRecords = await countRecordsService(filter);
        const records = await getRecordsService(filter, skip, parsedLimit);

        return sendResponse(res, 200, "Records fetched successfully", {
            page: parsedPage,
            limit: parsedLimit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / parsedLimit),
            count: records.length,
            records
        });
    } catch (error) {
        next(error);
    }
};

export const getRecordById = async (req, res, next) => {
    try {
        const record = await getRecordByIdService(req.params.id);

        if (!record) {
            throw new ApiError(404, "Record not found");
        }

        return sendResponse(res, 200, "Record fetched successfully", record);
    } catch (error) {
        next(error);
    }
};

export const updateRecord = async (req, res, next) => {
    try {
        const updatedRecord = await updateRecordService(req.params.id, req.body);

        if (!updatedRecord) {
            throw new ApiError(404, "Record not found");
        }

        return sendResponse(res, 200, "Record updated successfully", updatedRecord);
    } catch (error) {
        next(error);
    }
};

export const deleteRecord = async (req, res, next) => {
    try {
        const deletedRecord = await deleteRecordService(req.params.id);

        if (!deletedRecord) {
            throw new ApiError(404, "Record not found");
        }

        return sendResponse(res, 200, "Record deleted successfully");
    } catch (error) {
        next(error);
    }
};