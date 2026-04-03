// src/validators/record.validator.js
export const validateRecord = (req, res, next) => {
    const { amount, type, category, date } = req.body;

    if (amount === undefined || !type || !category || !date) {
        return res.status(400).json({
            success: false,
            message: "Amount, type, category and date are required"
        });
    }

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Amount must be a number greater than 0"
        });
    }

    if (!["income", "expense"].includes(type)) {
        return res.status(400).json({
            success: false,
            message: "Type must be either income or expense"
        });
    }

    if (typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    if (isNaN(new Date(date).getTime())) {
        return res.status(400).json({
            success: false,
            message: "Invalid date"
        });
    }

    next();
};

export const validateRecordUpdate = (req, res, next) => {
    const { amount, type, category, date } = req.body;

    if (amount !== undefined) {
        if (typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be a number greater than 0"
            });
        }
    }

    if (type !== undefined && !["income", "expense"].includes(type)) {
        return res.status(400).json({
            success: false,
            message: "Type must be either income or expense"
        });
    }

    if (category !== undefined && category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category cannot be empty"
        });
    }

    if (date !== undefined && isNaN(new Date(date).getTime())) {
        return res.status(400).json({
            success: false,
            message: "Invalid date"
        });
    }

    next();
};