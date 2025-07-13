// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { PublicationsProvider } from "./context/PublicationsContext.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx"; // ✅ Pastikan path dan EKSTENSI benar

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <PublicationsProvider>
          <App />
        </PublicationsProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
