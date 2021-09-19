import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/users.model.js";

// middleware to check and validate jwt token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//  secondary middleware to check if authorized user is of type user or not
const isUser = (req, res, next) => {
  if (req.user.__t === "user") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a user!");
  }
};

export { protect, isUser };
