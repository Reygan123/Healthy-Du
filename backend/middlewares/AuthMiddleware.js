const { verifyToken } = require("../utils/JwtUtil");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) throw { name: "Unauthenticated" };

        const token = auth && auth.split(" ")[1];
        const payload = await verifyToken(token);

        const foundUsers = await User.findOne({
            where: { id: payload.userId },
        });
        if (!foundUsers) throw { name: "errorNotFound" };

        req.loggedUser = {
            id: foundUsers.id,
            name: foundUsers.name,
            email: foundUsers.email,
            role: foundUsers.role,
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;
