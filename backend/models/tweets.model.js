import mongoose from "mongoose";

const tweetSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
      required: true,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const Tweets = mongoose.model("tweets", tweetSchema);

export { Tweets };
