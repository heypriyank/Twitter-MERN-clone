import { User, AppUser } from "../models/users.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /auth/login
// @access  Public
const authorizeUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Add new user / SignUp
// @route   POST /auth/signup
// @access  Public
const addUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // duplicate email check
  const forDupCheck = await User.findOne({ email });

  if (forDupCheck) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const newUser = new AppUser({
    name,
    email,
    password,
  });

  await newUser.save();
  console.log(newUser);

  if (newUser) {
    res.status(201).json({
      token: generateToken(newUser._id),
    });
  } else {
    throw new Error("Some Error occured while signuip");
  }
});

export { authorizeUser, addUser };
