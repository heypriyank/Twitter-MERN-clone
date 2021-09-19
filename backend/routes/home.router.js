import express from "express";
import { protect, isUser } from "../middlewares/authMiddleware.js";
import {
  getLandingdata,
  addFriend,
  addTweet,
  removeFriend,
} from "../controllers/home.controller.js";

const homeRouter = express.Router();

homeRouter.route("/home").get(protect, isUser, getLandingdata);
homeRouter.route("/add-friend").post(protect, isUser, addFriend);
homeRouter.route("/add-tweet").post(protect, isUser, addTweet);
homeRouter.route("/remove-friend").post(protect, isUser, removeFriend);

export default homeRouter;
