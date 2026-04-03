import FinancialRecord from "../models/FinancialRecord.js";

export const createRecordService = async (data, userId) => {
    return await FinancialRecord.create({
        ...data,
        createdBy: userId
    });
};

export const buildRecordFilter = ({ type, category, startDate, endDate }) => {
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }

    return filter;
};

export const getRecordsService = async (filter, skip, limit) => {
    return await FinancialRecord.find(filter)
        .populate("createdBy", "name email role")
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
};

export const countRecordsService = async (filter) => {
    return await FinancialRecord.countDocuments(filter);
};

export const getRecordByIdService = async (id) => {
    return await FinancialRecord.findById(id).populate(
        "createdBy",
        "name email role"
    );
};

export const updateRecordService = async (id, payload) => {
    const record = await FinancialRecord.findById(id);

    if (!record) return null;

    record.amount = payload.amount ?? record.amount;
    record.type = payload.type ?? record.type;
    record.category = payload.category ?? record.category;
    record.date = payload.date ?? record.date;
    record.notes = payload.notes ?? record.notes;

    return await record.save();
};

export const deleteRecordService = async (id) => {
    const record = await FinancialRecord.findById(id);

    if (!record) return null;

    await record.deleteOne();
    return record;
};