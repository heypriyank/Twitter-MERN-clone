import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// To check password at time offf login
userSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// To hash password at time of signup (data save)
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Modelling user schema
const User = mongoose.model("users", userSchema);

const options = { discriminatorKey: "kind" };

const AppUser = User.discriminator(
  "user",
  new mongoose.Schema(
    {
      tweets: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "tweets",
          default: [],
        },
      ],
      friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          default: [],
        },
      ],
    },
    options
  )
);

export { AppUser, User };
