import { useState, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  const loginAction = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      setToken(token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join(" "));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login gagal");
      }
      throw err;
    }
  };

  const logoutAction = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      setToken(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Logout gagal");
      throw err;
    }
  };

  const initializeToken = () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      setToken(savedToken);
      // Optional: panggil API untuk fetch user detail di sini, lalu setUser(...)
    }
  };

  return {
    user,
    token,
    error,
    loading,
    loginAction,
    logoutAction,
    initializeToken,
  };
}
