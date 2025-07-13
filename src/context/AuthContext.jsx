// src/hooks/useAuth.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import apiClient from "../api/axios";

// 1. Buat Context
export const AuthContext = createContext(null);

// 2. Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Sync token dan user saat pertama kali app dimuat
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 4. Fungsi Login
  const loginAction = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.login(email, password);

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      const tokenFromStorage = localStorage.getItem("token");

      if (tokenFromStorage) {
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${tokenFromStorage}`;
        setToken(tokenFromStorage);
      }

      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      const errorMessage = err.message || "Login gagal";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 5. Fungsi Logout
  const logoutAction = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete apiClient.defaults.headers.common["Authorization"];
      setUser(null);
      setToken(null);
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{ user, token, loginAction, logoutAction, loading, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 6. Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
