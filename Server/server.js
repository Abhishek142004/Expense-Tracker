const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config(); // Loads environment variables from .env file

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://khata-book.netlify.app",
  methods: "GET, POST, PUT, PATCH, DELETE",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(express.json()); // For parsing application/json

// Connect to the database
connectDB();

// Route files
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");

// Mount the routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
