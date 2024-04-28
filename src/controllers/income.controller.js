/*
 * Title: income.controller.js
 * Description : Income controller
 * Author: Tanvir Hassan Joy
 * Date: 2024-04-28 12:14:14
 */

import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import incomeModel from "../models/income.model.js";

/**
 * Create a new income.
 */
const createIncome = async (req, res) => {
  try {
    const { title, description, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.json(new apiError(400, "All fields are required"));
    }
    const newIncome = await incomeModel.create({
      title,
      description,
      amount,
      category,
      date,
      user: req.user._id,
    });
    return res.json(
      new apiResponse(201, "Income created successfully", newIncome)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

/**
 * Get income based on the provided query parameters.
 * If no query parameters are provided, it will return all the incomes of the logged in user.
 * If category query parameter is provided, it will return all the incomes of the logged in user of that category.
 */
const getIncome = async (req, res) => {
  try {
    let income = [];
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    if (req.query.category) {
      income = await incomeModel
        .find({ user: req.user._id, category: req.query.category })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      income = await incomeModel
        .find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }
    if (!income.length) return res.json(new apiError(200, "No income found"));
    return res.json(
      new apiResponse(200, "Income fetched successfully", income)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

/**
 * Retrieves all incomes based on the provided query parameters.
 * Only an admin can access this route.
 * If no query parameters are provided, it will return all the incomes.
 */
const getAllIncomes = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.json(
        new apiError(403, "You are not authorized to perform this action")
      );
    }
    let incomes = [];
    const page = parseInt(req, query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    if (req.query.category) {
      incomes = await incomeModel
        .find({ category: req.query.category })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      incomes = await incomeModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }
    if (!incomes.length) {
      return +res.json(new apiError(200, "No incomes found"));
    }
    return res.json(
      new apiResponse(200, "Incomes fetched successfully", incomes)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

/**
 * Updates an income record in the database.
 */
const updateIncome = async (req, res) => {
  try {
    const { title, description, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.json(new apiError(400, "All fields are required"));
    }
    const income = await incomeModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        amount,
        category,
        date,
      },
      { new: true }
    );
    if (!income) {
      return res.json(new apiError(404, "Income not found"));
    }
    return res.json(
      new apiResponse(200, "Income updated successfully", income)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

/**
 * Deletes an income by its ID.
 * User can only delete their own income.
 */
const deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await incomeModel.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
      return res.json(new apiError(404, "Income not found"));
    }
    return res.json(
      new apiResponse(200, "Income deleted successfully", deletedIncome)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};
export { createIncome, getIncome, getAllIncomes, updateIncome, deleteIncome };
