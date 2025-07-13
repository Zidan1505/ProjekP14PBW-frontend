import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function BpsLogo() {
  return (
    <img
      src="https://res.cloudinary.com/djcm0swgo/image/upload/v1751775675/bps-logo_1_ldppzk.png"
      alt="BPS Logo"
      className="h-10 w-10"
    />
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, logoutAction } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAction();
    navigate("/login");
  };

  if (location.pathname === "/login") {
    return null; // sembunyikan navbar saat di login page
  }

  const navItems = [
    { id: "publications", label: "Daftar Publikasi", path: "/publications" },
    { id: "add", label: "Tambah Publikasi", path: "/add" },
  ];

  return (
    <nav className="bg-sky-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Nama */}
          <div className="flex items-center space-x-3">
            <BpsLogo />
            <span className="text-white text-base md:text-lg font-bold tracking-wider hidden sm:block">
              BPS PROVINSI KALIMANTAN TENGAH
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "bg-white text-sky-900"
                    : "text-sky-100 hover:bg-sky-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {token ? (
              <>
                <span className="text-white font-semibold">
                  Hai, {user?.name || "Admin"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sky-100 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.path
                  ? "bg-white text-sky-900"
                  : "text-sky-100 hover:bg-sky-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {token ? (
            <button
              onClick={handleLogout}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-sky-100 bg-red-600 hover:bg-red-700"
            >
              Logout ({user?.name || "Admin"})
            </button>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-sky-100 hover:bg-sky-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
