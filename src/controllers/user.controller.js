import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check if all the field are present
    if (!email || !password || !username) {
      return res.json(new apiError(400, "All fields are required"));
    }
    // check if the user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      throw new apiError(400, "User already exists");
    }

    const savedUser = await userModel.create({ username, email, password });

    savedUser.password = undefined;
    return res.json(
      new apiResponse(201, "User created successfully", savedUser)
    );
  } catch (error) {
    console.log(error.message);
    return res.json(new apiError(500, error.message));
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if all the field are present
    if (!email || !password) {
      return res.json(new apiError(400, "All fields are required"));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json(new apiError(400, "User does not exists"));
    }

    const isPassCorrect = await user.isPassCorrect(password);
    if (!isPassCorrect) {
      return res.json(new apiError(400, "Invalid credentials"));
    }

    const token = user.generateJWT();

    return res.json(new apiResponse(200, "Login successful", { token }));
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    return res.json(new apiResponse(200, "Logout successful"));
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.json(new apiError(400, "All fields are required"));
    }
    const user = await userModel.findById(req.user._id);
    const isPassCorrect = await user.isPassCorrect(oldPassword);

    if (!isPassCorrect) {
      throw new apiError(400, "Invalid credentials");
    }
    req.user.password = newPassword;
    await req.user.save({ validateBeforeSave: false });

    return res.json(new apiResponse(200, "Password changed successfully"));
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};
export { registerUser, loginUser, logoutUser, changePassword };
