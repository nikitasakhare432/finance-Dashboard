export const validateUserUpdate = (req, res, next) => {
    const { name, role, status } = req.body;

    if (name !== undefined && String(name).trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name cannot be empty"
        });
    }

    if (role !== undefined && !["viewer", "analyst", "admin"].includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Role must be viewer, analyst, or admin"
        });
    }

    if (status !== undefined && !["active", "inactive"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be active or inactive"
        });
    }

    next();
};