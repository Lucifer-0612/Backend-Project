// src/middlewares/auth.middleware.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandlers.js";
import jwt from "jsonwebtoken";
import { user } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized access");
        }

        const decoded_info = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const User = await user
            .findById(decoded_info?._id)
            .select("-password -refreshtoken");

        if (!User) {
            throw new ApiError(401, "Invalid Access token");
        }

        // ✅ FIX: assign the actual user data, not the model
        req.User = User;

        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
