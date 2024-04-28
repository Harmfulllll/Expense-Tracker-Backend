/*
 * Title: user.route.js
 * Description : route for user
 * Author: Tanvir Hassan Joy
 * Date: 2024-04-28 11:51:59
 */

import express from "express";

/* import from user controller */
import {
  changePassword,
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateBudget,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verify.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", verifyToken, logoutUser);

userRouter.patch("/change-password", verifyToken, changePassword);

userRouter.delete("/delete/:id", verifyToken, deleteUser);

userRouter.patch("/update-budget", verifyToken, updateBudget);

userRouter.get("/get-all-users", verifyToken, getAllUsers);

/* export routing */
export default userRouter;
