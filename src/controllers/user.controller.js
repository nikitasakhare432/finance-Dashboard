import {
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from "../services/user.service.js";
import { sendResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        return sendResponse(res, 200, "Users fetched successfully", {
            count: users.length,
            users
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return sendResponse(res, 200, "User fetched successfully", user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await updateUserService(req.params.id, req.body);

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        return sendResponse(res, 200, "User updated successfully", {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserService(req.params.id);

        if (!deletedUser) {
            throw new ApiError(404, "User not found");
        }

        return sendResponse(res, 200, "User deleted successfully");
    } catch (error) {
        next(error);
    }
};