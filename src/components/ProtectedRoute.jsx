// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, token } = useAuth();

  if (!user || !token) {
    // Jika belum login, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan konten anak (children)
  return children;
}
