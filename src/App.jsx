// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginPage from "./components/LoginPage.jsx";
import PublicationListPage from "./components/PublicationListPage.jsx";
import AddPublicationPage from "./components/AddPublicationPage.jsx";
import EditPublicationPage from "./components/EditPublicationPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/publications"
            element={
              <ProtectedRoute>
                <PublicationListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddPublicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:publicationId"
            element={
              <ProtectedRoute>
                <EditPublicationPage />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate replace to="/publications" />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
