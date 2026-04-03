import FinancialRecord from "../models/FinancialRecord.js";

// SUMMARY
export const getSummary = async (req, res) => {
    try {
        const records = await FinancialRecord.find();

        let totalIncome = 0;
        let totalExpense = 0;

        records.forEach((r) => {
            if (r.type === "income") totalIncome += r.amount;
            else totalExpense += r.amount;
        });

        res.json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                netBalance: totalIncome - totalExpense
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CATEGORY BREAKDOWN
export const getCategoryBreakdown = async (req, res) => {
    try {
        const data = await FinancialRecord.aggregate([
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// RECENT ACTIVITY
export const getRecentActivity = async (req, res) => {
    try {
        const records = await FinancialRecord.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// MONTHLY TRENDS
export const getMonthlyTrends = async (req, res) => {
    try {
        const data = await FinancialRecord.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        type: "$type"
                    },
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};