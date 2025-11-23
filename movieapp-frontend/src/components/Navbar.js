import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // track userId in state

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && isNavbarVisible) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY && !isNavbarVisible) {
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isNavbarVisible]);

  // Listen for changes in localStorage and update userId state
  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null); // Update state immediately after logout
    window.location.href = "/login"; // Redirect to login after logout
  };

  return (
    <nav className={`navbar ${isNavbarVisible ? "visible" : "hidden"}`}>
      {/* Left: Main Navigation */}
      <div className="left-section">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/movies" className="nav-link">Movies</Link>
        <Link to="/tvshows" className="nav-link">TV Shows</Link>
        <Link to="/anime" className="nav-link">Anime</Link>
        <Link to="/manga" className="nav-link">Manga</Link>
      </div>

      {/* Right: Auth/Actions */}
      <div className="right-section">
        <Link to="/search" className="nav-link">Search</Link>
        <Link to="/history" className="nav-link">History</Link>
        <Link to="/watchlist" className="nav-link">Watchlist</Link>
        {userId ? (
          <div className="user-dropdown">
            <button className="nav-link" onClick={handleDropdownToggle}>
              {userId} <span>&#9660;</span>
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/change-password" className="dropdown-item">Change Password</Link>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
