import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Graph from "./Graph";
import InputForm from "./Input";
import About from "./About";
import History from "./History";
import Profile from "./Profile";
import { useAuth } from "../store/Authcontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Need_to_sign_in from "./Need_to_sign_in";

const Home = ({ value }) => {
  const { isAuthenticated, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [totals, setTotals] = useState({
    Savings: 0,
    Expenses: 0,
    Investments: 0,
  });

  useEffect(() => {
    // Fetch expenses data from the backend
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        // Calculate totals based on category
        const newTotals = result.reduce(
          (acc, expense) => {
            acc[expense.category] =
              (acc[expense.category] || 0) + expense.amount;
            return acc;
          },
          { Savings: 0, Expenses: 0, Investments: 0 }
        );

        setExpenses(result);
        setTotals(newTotals);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleFormSubmit = async (formData) => {
    if (!isAuthenticated) {
      toast("You must be logged in to perform this action.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      // After submission, fetch updated expenses
      const response = await fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      // Recalculate totals
      const newTotals = result.reduce(
        (acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
          return acc;
        },
        { Savings: 0, Expenses: 0, Investments: 0 }
      );

      setExpenses(result);
      setTotals(newTotals);
      toast("Transaction Added Sucessfully");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage drawer visibility

  const [text] = useTypewriter({
    words: [
      "Welcome to KhataBook",
      "Track your Expense ",
      "Get Detailed analysis ",
      "Grow with Us as a Family",
    ],
    loop: {},
  });

  useEffect(() => {
    // This will trigger re-render when `isAuthenticated` changes
  }, [isAuthenticated]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle drawer visibility
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false); // Close the drawer
  };

  console.log("Is authenticated:", isAuthenticated); // Check this output
  // logout();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900 pr-9">
          <span>
            <img
              className="h-12 w-18 mx-3"
              src="/KhataBook1.png"
              alt="KhataBook"
            />
          </span>
          <span className="text-white text-xl font-bold">KhataBook</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                className="mr-2"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
              </svg>
              Dashboard
            </Link>
            <Link
              to={isAuthenticated ? "/History" : "/Need"}
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                className="mr-2"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
              </svg>
              History
            </Link>
            <Link
              to="/About"
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                className="mr-2"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
              </svg>
              About Us
            </Link>

            <Link
              to={isAuthenticated ? "/Profile" : "/Login"}
              className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                className="mr-2"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
              {isAuthenticated ? "Profile" : "Login"}
            </Link>
          </nav>
        </div>
      </div>
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transform transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="relative flex flex-col w-64 bg-gray-800 h-full">
          <button
            onClick={closeDrawer}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex items-center justify-center h-16 bg-gray-900 pr-6">
            <span>
              <img
                className="h-10 w-18 mr-3"
                src="/KhataBook1.png"
                alt="KhataBook"
              />
            </span>
            <span className="text-white font-bold text-xl">KhataBook</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  className="mr-2"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
                </svg>
                Dashboard
              </Link>
              <Link
                to={isAuthenticated ? "/History" : "/Need"}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  className="mr-2"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
                </svg>
                History
              </Link>
              <Link
                to="/About"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  className="mr-2"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h200v80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
                </svg>
                About us
              </Link>

              <Link
                to={isAuthenticated ? "/Profile" : "/Login"}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  className="mr-2"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
                {isAuthenticated ? "Profile" : "Login"}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {/* Navbar Header */}
      <div className="flex flex-col flex-1 overflow-y-auto ">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 ">
          <div className="flex items-center px-4 bg-gray-100 ">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleDrawer}
              className="md:hidden text-gray-500 focus:outline-none focus:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="font-bold pl-3 m-3 ">
              <span className="text-gray-800  font-sans text-lg md:text-2xl">
                {text}
              </span>
              <span className="text-lg md:text-2xl">
                <Cursor />
              </span>
            </div>
          </div>
          <div className="flex items-center pr-4">
            <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l-7-7 7-7m5 14l7-7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {value === "home" && (
          <>
            <div className="text-2xl font-bold font-sans bg-yellow-400  text-center p-2  md:m-3 md:mx-36 rounded">
              Expense Tracker
            </div>
            <div className="flex flex-col justify-center  md:flex-row mt-3 md:items-center">
              <Graph data={expenses} totals={totals} />
              <InputForm onSubmit={handleFormSubmit} />
            </div>
          </>
        )}

        {value === "about" && <About />}
        {value === "history" && <History />}
        {value === "profile" && <Profile />}
        {value === "need" && <Need_to_sign_in />}
      </div>
    </div>
  );
};

export default Home;
