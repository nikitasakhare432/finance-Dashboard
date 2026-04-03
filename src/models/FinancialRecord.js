// src/models/FinancialRecord.js
import mongoose from "mongoose";

const financialRecordSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"]
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        },
        notes: {
            type: String,
            trim: true,
            default: ""
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const FinancialRecord = mongoose.model("FinancialRecord", financialRecordSchema);

export default FinancialRecord;