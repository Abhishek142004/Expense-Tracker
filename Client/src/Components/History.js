import React, { useState, useEffect } from "react";
import EditExpenseForm from "./Edit_form"; // Ensure this component exists
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const History = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    // Fetch expenses when the component mounts
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Fetched expenses:", data); // Debugging line
        if (Array.isArray(data)) {
          setExpenses(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(expenses.filter((expense) => expense._id !== id));
      toast("Deleted Successfully");
    } catch (error) {
      toast.error("Error deleting expense");
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowEditForm(true);
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4">
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <EditExpenseForm
            expense={selectedExpense}
            onClose={() => setShowEditForm(false)}
            onUpdate={(updatedExpense) => {
              setExpenses(
                expenses.map((expense) =>
                  expense._id === updatedExpense._id ? updatedExpense : expense
                )
              );
              setShowEditForm(false);
            }}
          />
        </div>
      )}
      <div className="text-2xl font-bold font-sans bg-yellow-400 text-black tracking-widest  text-center p-2 md:m-3 md:mx-36 rounded">
        History Of Transactions
      </div>
      <div className="grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(expenses) && expenses.length > 0
          ? expenses.map((expense) => (
              <div
                key={expense._id}
                className="relative flex flex-col overflow-hidden bg-gray-50 py-6 sm:py-12"
              >
                <div className="group relative cursor-pointer overflow-hidden bg-white px-8 rounded-xl  lg:w-80 lg:h-75 pt-3 pb-2 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                  <span className="absolute top-3 z-0 h-20 w-20 rounded-full bg-yellow-400 transition-all duration-300 group-hover:scale-[10]"></span>
                  <div className="relative z-10 mx-auto max-w-md">
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-gray-800 transition-all duration-300 group-hover:bg-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="40px"
                        fill="#e8eaed"
                        className="text-black "
                      >
                        <path d="M559-120 286.67-402.67v-70.66H420q55.67 0 97.17-36.17T566-606.67H240v-66.66h318.67q-14.34-43.67-52.5-71.84Q468-773.33 420-773.33H240V-840h480v66.67H574q20 19 34.33 46.33 14.34 27.33 21 53.67H720v66.66h-87q-8 89-68.33 144.5-60.34 55.5-144.67 55.5h-44.33L651.33-120H559Z" />
                      </svg>
                    </span>
                    <div className="space-y-6 pt-1 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-black">
                      <p>{expense.description}</p>
                    </div>
                    <div className="pt-1 text-base font-semibold leading-7">
                      <div className="grid grid-cols-2 items-center ">
                        <p className="text-gray-900 font-bold mb-1">
                          Rs {expense.amount}
                        </p>
                        <p className="text-gray-700 mb-1">{expense.category}</p>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Last updated: {formatDate(expense.date)}
                      </p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="bg-gray-800 text-white px-5 py-1 m-2 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="bg-red-500 text-white px-2 py-1 m-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default History;
