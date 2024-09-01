import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/Authcontext";

const LoginRegisterForm = () => {
  const { storeTokenLS } = useAuth();
  const [isRegister, setIsRegister] = useState(false); // Track form type (login or register)
  const [formData, setFormData] = useState({
    username: "", // Changed to username to match form input
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // To track form errors
  const navigate = useNavigate(); // For navigation
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  // Toggle between login and register
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setErrors({}); // Clear errors when toggling form
    setErrorMessage(""); // Clear previous error messages
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    if (isRegister && !formData.username) errors.username = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  // Handle form submission for signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        const token = data.token; // Assuming the token is in the response data
        storeTokenLS(token);

        // Store the token in localStorage
        localStorage.setItem("authToken", token);

        // Clear form data
        setFormData({ username: "", email: "", password: "" });

        // Show success message
        toast.success("Registration Successful");

        navigate("/");
      } else {
        setFormData({ username: "", email: "", password: "" });
        const errorData = await response.json();
        toast.error(errorData.msg || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error. Please try again later.");
    }
  };

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the token is in the response data
        storeTokenLS(token);

        // Store the token in localStorage
        localStorage.setItem("authToken", token);

        // Clear form data
        setFormData({ email: "", password: "" });

        // Show success message
        toast.success("Login Successful");
        navigate("/");
      } else {
        setFormData({ email: "", password: "" });
        const errorData = await response.json();
        setErrorMessage(
          errorData.msg || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  {isRegister ? "Register" : "Login"}
                </h1>
              </div>
              <form onSubmit={isRegister ? handleSignup : handleLogin}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    {isRegister && (
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="username"
                          name="username" // Changed to username
                          type="text"
                          value={formData.username} // Changed to username
                          onChange={handleChange}
                          className={`peer placeholder-transparent h-10 w-full border-b-2 ${
                            errors.username
                              ? "border-red-500"
                              : "border-gray-300"
                          } text-gray-900 focus:outline-none focus:border-rose-600`}
                          placeholder="Username"
                        />
                        <label
                          htmlFor="username"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Username
                        </label>
                        {errors.username && (
                          <p className="text-red-500 text-sm">
                            {errors.username}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        className={`peer placeholder-transparent h-10 w-full border-b-2 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } text-gray-900 focus:outline-none focus:border-rose-600`}
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`peer placeholder-transparent h-10 w-full border-b-2 ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } text-gray-900 focus:outline-none focus:border-rose-600`}
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-cyan-500 text-white rounded-md px-2 py-1"
                      >
                        {isRegister ? "Register" : "Login"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="mt-4">
                <p className="text-gray-600">
                  {isRegister ? "Already have an account?" : "New to the site?"}{" "}
                  <span
                    onClick={toggleForm}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    {isRegister ? "Login now" : "Register now"}
                  </span>
                </p>
              </div>
              <div className="w-full flex justify-center mt-4">
                <Link to="/">
                  {" "}
                  <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <span>Continue without an account</span>
                  </button>
                </Link>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
