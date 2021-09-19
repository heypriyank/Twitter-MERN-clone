import express from "express";
import { authorizeUser, addUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", authorizeUser);
authRouter.post("/signup", addUser);

export default authRouter;
