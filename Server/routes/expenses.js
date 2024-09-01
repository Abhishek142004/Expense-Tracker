const express = require("express");
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expensecontroller");
const { protect } = require("../middleware/authmiddleware");
const router = express.Router();

// Define your routes with controller functions
router.route("/").get(protect, getExpenses).post(protect, addExpense);

router.route("/:id").put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
