import React, { useState } from "react";
import "../styles/Login.css";
import { FaGoogle, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[\W_]/.test(password);
    
    if (!minLength) return "Password must be at least 8 characters long";
    if (!hasUpperCase) return "Password must contain at least 1 uppercase letter";
    if (!hasNumber) return "Password must contain at least 1 number";
    if (!hasSymbol) return "Password must contain at least 1 symbol";
    
    return "";
  };

  const handleLogin = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Username is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      setAuth(true);
      localStorage.setItem("auth", "true");
    }
  };

  return (
    <div className="container-fluid login-container d-flex align-items-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center px-5">
          <h2>Sign In</h2>
          <p className="text-muted">
            New user? <a href="#">Create account</a>
          </p>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Username or Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <small className="text-danger">{emailError}</small>}

          <input
            type="password"
            className="form-control mt-3 mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <small className="text-danger">{passwordError}</small>}

          <div className="form-check mt-3 mb-3">
            <input className="form-check-input" type="checkbox" id="keepSignedIn" />
            <label className="form-check-label" htmlFor="keepSignedIn">
              Keep me signed in
            </label>
          </div>

          <button className="btn btn-primary w-100 login-btn" onClick={handleLogin}>
            Sign In
          </button>

          <div className="or-section">
            <div className="line"></div>
            <span className="or-text">Or Sign In With</span>
            <div className="line"></div>
          </div>

          <div className="social-login">
            <div className="icon-circle"><FaGoogle /></div>
            <div className="icon-circle"><FaFacebook /></div>
            <div className="icon-circle"><FaLinkedin /></div>
            <div className="icon-circle"><FaTwitter /></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
