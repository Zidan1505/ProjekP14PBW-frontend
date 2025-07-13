// src/api/axios.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // contoh: http://localhost:8000/api
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Tambahkan interceptor untuk menyisipkan Bearer token ke setiap request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // pastikan token disimpan saat login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
