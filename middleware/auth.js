import {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthenticatedError("No authorization header provided");
    }

    if (authHeader.split(" ")[0] !== "Bearer") {
        throw new UnauthenticatedError("Invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = await User.findById(jwt.verify(token, process.env.JWT_SECRET).userId);
        next();
    } catch (err) {
        throw new UnauthenticatedError("Invalid token");
    }
}

export default authenticateUser;