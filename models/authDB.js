import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import createAppError from "../controllers/errorController.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//signup
userSchema.statics.userSignUp = async function (username, password) {
  if (!username || !password) {
    throw createAppError("Either email or password is missing !", 400);
  }

  if (!validator.isStrongPassword(password)) {
    throw createAppError("Password is not strong enough !", 400);
  }

  const userName = await this.findOne({ username });

  if (userName) {
    throw createAppError(
      "Username already exists . Try another username !",
      409
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};

//login
userSchema.statics.userLogin = async function (username, password) {
  if (!username || !password) {
    throw createAppError("Either email or password is missing !", 400);
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw createAppError("Invalid username . User does not exist !", 400);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw createAppError("Invalid Password . Try Again !", 400);
  }

  return user;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
