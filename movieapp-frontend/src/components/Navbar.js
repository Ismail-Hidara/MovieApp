import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import AuthModal from "./AuthModal";
import "../App.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token presence to boolean
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="left-section">
          <Link to="/" className="nav-link">Home</Link>
          <div className="dropdown">
            <button className="nav-link" onClick={() => setShowDropdown(!showDropdown)}>
              Browse <FaCaretDown />
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/movies" className="dropdown-item">Movies</Link>
                <Link to="/tvshows" className="dropdown-item">TV Shows</Link>
                <Link to="/anime" className="dropdown-item">Anime</Link>
              </div>
            )}
          </div>
          <button className="search-icon" onClick={handleSearchClick}>
            <FaSearch />
          </button>
        </div>

        <div className="right-section">
          <Link to="/history" className="nav-link">History</Link>
          <Link to="/watchlist" className="nav-link">Watchlist</Link>

          {isAuthenticated ? (
            <button className="nav-link login-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="nav-link login-button" onClick={() => setIsAuthModalOpen(true)}>
              Login / Register
            </button>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} setIsAuthenticated={setIsAuthenticated} />
    </>
  );
};

export default Navbar;
