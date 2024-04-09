import mongoose from "mongoose";
import { Int32 } from "mongodb";

import pkg from "bcryptjs";
const { compareSync, hashSync } = pkg;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    position: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: (email) => User.doesNotExist({ email }),
        message: "Email already exists",
      },
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

const User = mongoose.model("users", UserSchema, "users");
export default User;
