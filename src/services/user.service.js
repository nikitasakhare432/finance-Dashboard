import User from "../models/User.js";

export const getAllUsersService = async () => {
    return await User.find().select("-password").sort({ createdAt: -1 });
};

export const getUserByIdService = async (id) => {
    return await User.findById(id).select("-password");
};

export const updateUserService = async (id, payload) => {
    const user = await User.findById(id);

    if (!user) return null;

    user.name = payload.name ?? user.name;
    user.role = payload.role ?? user.role;
    user.status = payload.status ?? user.status;

    return await user.save();
};

export const deleteUserService = async (id) => {
    const user = await User.findById(id);

    if (!user) return null;

    await user.deleteOne();
    return user;
};