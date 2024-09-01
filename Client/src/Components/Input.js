import React, { useState } from "react";

export default function InputForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "Savings",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ amount: "", description: "", category: "Savings" }); // Reset form
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        Add Transaction
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Amount */}
        <div className="mb-4 grid grid-cols-2 items-center">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4 grid grid-cols-2 items-center">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter description"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4 grid grid-cols-2 items-center">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          >
            <option value="Savings">Savings</option>
            <option value="Expenses">Expenses</option>
            <option value="Investments">Investments</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}
