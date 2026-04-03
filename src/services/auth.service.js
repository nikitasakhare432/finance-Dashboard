import User from "../models/User.js";

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const createUserService = async ({ name, email, password, role }) => {
    return await User.create({
        name,
        email,
        password,
        role
    });
};