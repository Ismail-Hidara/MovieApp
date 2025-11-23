import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AuthModal = ({ isOpen, onClose, setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let response;
      if (isLogin) {
        // Login request
        response = await axios.post("http://localhost:8080/api/auth/login", {
          email,
          password,
        });
      } else {
        // Register request (Auto-login after registration)
        await axios.post("http://localhost:8080/api/auth/register", {
          email,
          password,
        });

        // After registering, log in automatically
        response = await axios.post("http://localhost:8080/api/auth/login", {
          email,
          password,
        });
      }

      // Store token & update authentication state
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      
      // Redirect to home
      navigate("/");

      // Close modal
      onClose();
    } catch (error) {
      setError("Authentication failed. Please check your details.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register here" : " Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
