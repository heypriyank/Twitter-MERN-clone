import { AppUser } from "../models/users.model.js";
import { Tweets } from "../models/tweets.model.js";
import asyncHandler from "express-async-handler";

// Private
const getLandingdata = asyncHandler(async (req, res) => {
  const friendsArray = req.user.friends;
  friendsArray.push(req.user._id);
  const allTweets = await Tweets.find({
    author: { $in: friendsArray },
  })
    .sort({ $natural: -1 })
    .populate("author", "-password -createdAt -updatedAt");

  const myFriends = await AppUser.findOne({
    _id: req.user._id,
  })
    .select("friends")
    .populate("friends")
    .sort({ $natural: -1 });

  const allPeople = await AppUser.find({
    email: { $ne: req.user.email },
    _id: { $nin: req.user.friends },
  })
    .select("-password -isDeleted -createdAt -updatedAt")
    .sort({ $natural: -1 });

  res.json({
    people: allPeople,
    tweets: allTweets,
    friends: myFriends.friends,
  });
});

// Private
const addFriend = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const status = await AppUser.updateOne(
    { _id: req.user._id, id: { $nin: req.user.friends } },
    {
      $push: { friends: id },
    }
  );

  if (status) {
    res.status(200).json({
      message: "Success",
    });
  } else {
    res.status(400);
    throw new Error("Cannot add friend");
  }
});

// Private
const addTweet = asyncHandler(async (req, res) => {
  const author = req.user._id;
  const content = req.body.content;
  const tweet = new Tweets({
    author,
    content,
  });
  await tweet.save();

  if (tweet) {
    res.status(200).json({
      message: "Success",
    });
  } else {
    res.status(400).json({
      message: "There has been an error",
    });
  }
});

// Private
const removeFriend = asyncHandler(async (req, res) => {
  const personToRemove = req.body.id;

  const data = await AppUser.updateOne(
    {
      _id: req.user._id,
    },
    {
      $pull: { friends: personToRemove },
    }
  );
  if (data) {
    res.status(201).json({
      message: "Successful",
    });
  }
});

export { getLandingdata, addFriend, addTweet, removeFriend };
