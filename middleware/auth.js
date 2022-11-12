import {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken";


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
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        throw new UnauthenticatedError("Invalid token");
    }

    next();
}

export default authenticateUser;