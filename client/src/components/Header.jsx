import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo + App Name */}
      <div className="flex items-center space-x-3">
        <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-gray-800">RoomMate Match</span>
      </div>

      {/* Nav Links */}
      <nav className="space-x-6">
        <Link to="/" className={linkStyle("/")}>Survey</Link>
        <Link to="/result" className={linkStyle("/result")}>Result</Link>
        <Link to="/admin" className={linkStyle("/admin")}>Admin</Link>
      </nav>
    </header>
  );
};

export default Header;