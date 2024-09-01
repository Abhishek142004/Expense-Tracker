const Expense = require("../models/expense");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;

  try {
    const expense = await Expense.create({
      user: req.user.id,
      amount,
      description,
      category,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check if the logged-in user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check if the logged-in user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await expense.deleteOne();

    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
