import sendMail from "../middlewares/nodemailer.middleware.js";
import expenseModel from "../models/expense.model.js";
import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

const createExpense = async (req, res) => {
  try {
    const { title, description, amount, category, date, paymentMethod } =
      req.body;
    if (!title || !amount || !category || !date) {
      throw new apiError(400, "All fields are required");
    }
    const budget = await userModel.findById(req.user._id);
    const previousExpenses = await expenseModel.find({ user: req.user._id });
    const totalExpense = previousExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    if (budget.budget < totalExpense + amount) {
      let mailOptions = {
        from: process.env.EMAIL,
        to: req.user.email,
        subject: "Expense Alert",
        text: `You have exceeded your budget by ${
          totalExpense + amount - budget.budget
        }`,
      };
      sendMail(mailOptions);
      return res.json(new apiError(400, "You have exceeded your budget"));
    }
    if (budget.budget < amount) {
      let mailOptions = {
        from: process.env.EMAIL,
        to: req.user.email,
        subject: "Expense Alert",
        text: `You have exceeded your budget by ${amount - budget.budget}`,
      };
      sendMail(mailOptions);
      return res.json(new apiError(400, "You have exceeded your budget"));
    }
    const newExpense = await expenseModel.create({
      title,
      description,
      amount,
      category,
      date,
      user: req.user._id,
      paymentMethod,
    });

    return res.json(
      new apiResponse(201, "Expense created successfully", newExpense)
    );
  } catch (err) {
    console.log(err.message);
    return res.json(new apiError(500, err.message));
  }
};

const getExpenses = async (req, res) => {
  try {
    let expenses = [];
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (req.query.category) {
      expenses = await expenseModel
        .find({ user: req.user._id, category: req.query.category })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      expenses = await expenseModel
        .find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }
    if (!expenses.length)
      return res.json(new apiError(200, "No expenses found"));

    return res.json(
      new apiResponse(200, "Expenses fetched successfully", expenses)
    );
  } catch (error) {
    console.log(error.message);
    return res.json(new apiError(500, error.message));
  }
};

const getAllExpenses = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      let expenses = [];
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      if (req.query.category) {
        expenses = await expenseModel
          .find({ category: req.query.category })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
      } else {
        expenses = await expenseModel
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);
      }
      if (!expenses.length)
        return res.json(new apiError(200, "No expenses found"));

      return res.json(
        new apiResponse(200, "Expenses fetched successfully", expenses)
      );
    } else {
      return res.json(
        new apiError(403, "You are not authorized to view this page")
      );
    }
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

const updateExpense = async (req, res) => {
  try {
    const { title, description, amount, category, date, paymentMethod } =
      req.body;
    if (!title || !amount || !category || !date) {
      return res.status(409).json(new apiError(409, "All fields are required"));
    }
    const updateExpense = await expenseModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        amount,
        category,
        date,
        paymentMethod,
      },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new apiResponse(200, "Expense updated successfully", updateExpense)
      );
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await expenseModel.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json(new apiError(404, "Expense not found"));
    }
    return res
      .status(200)
      .json(
        new apiResponse(200, "Expense deleted successfully", deletedExpense)
      );
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getAllExpenses,
};
