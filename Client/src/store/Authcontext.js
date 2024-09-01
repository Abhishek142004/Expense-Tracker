import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  // Store token in local storage and update state
  const storeTokenLS = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    setIsAuthenticated(true);
  };

  // Clear token from local storage and update state
  const clearTokenLS = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  // Logout user
  const logout = () => {
    clearTokenLS();
    // Additional logout actions can be added here
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, storeTokenLS, clearTokenLS, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
