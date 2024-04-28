/*
 * Title: expense.route.js
 * Description : route for expense
 * Author: Tanvir Hassan Joy
 * Date: 2024-04-28 11:50:54
 */

import express from "express";
import verifyToken from "../middlewares/verify.middleware.js";

/* import from expense controller */
import {
  createExpense,
  deleteExpense,
  generateReport,
  getAllExpenses,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/create-expense", verifyToken, createExpense);

router.get("/get-expenses", verifyToken, getExpenses);

router.patch("/update-expense", verifyToken, updateExpense);

router.delete("/delete-expense/:id", verifyToken, deleteExpense);

router.get("/getall-expenses", verifyToken, getAllExpenses);

router.get("/generate-report", verifyToken, generateReport);

/* export routing */
export default router;
