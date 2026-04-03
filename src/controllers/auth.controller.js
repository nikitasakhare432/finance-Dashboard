import { findUserByEmail, createUserService } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";
import { sendResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await findUserByEmail(email);

        if (userExists) {
            throw new ApiError(400, "User already exists");
        }

        const user = await createUserService({ name, email, password, role });

        const token = generateToken(user._id);

        return sendResponse(res, 201, "User registered", {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            throw new ApiError(400, "Invalid credentials");
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new ApiError(400, "Invalid credentials");
        }

        const token = generateToken(user._id);

        return sendResponse(res, 200, "Login successful", {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        next(error);
    }
};