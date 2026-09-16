import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import img1 from "../src/shop/img1.jpg";
import "./offlinelogin.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: "error",
    message: "",
  });

  const [failedAttempts, setFailedAttempts] = useState(() => {
    return Number(localStorage.getItem("loginFailedAttempts")) || 0;
  });

  const [lockUntil, setLockUntil] = useState(() => {
    return Number(localStorage.getItem("loginLockUntil")) || 0;
  });

  const [remainingTime, setRemainingTime] = useState(0);

  const showMessage = (type, message) => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup((previous) => ({
        ...previous,
        show: false,
      }));
    }, 3000);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (loggedIn) {
      navigate("/offlineposreg", {
        replace: true,
      });
    }
  }, [navigate]);

  useEffect(() => {
    const updateLockTimer = () => {
      const savedLockUntil =
        Number(localStorage.getItem("loginLockUntil")) || 0;

      if (!savedLockUntil) {
        setLockUntil(0);
        setRemainingTime(0);
        return;
      }

      const difference = savedLockUntil - Date.now();

      if (difference <= 0) {
        localStorage.removeItem("loginLockUntil");
        localStorage.removeItem("loginFailedAttempts");

        setLockUntil(0);
        setFailedAttempts(0);
        setRemainingTime(0);

        return;
      }

      setLockUntil(savedLockUntil);
      setRemainingTime(Math.ceil(difference / 1000));
    };

    updateLockTimer();

    const timer = setInterval(updateLockTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const isLocked = lockUntil > Date.now();

  const formatTime = () => {
    const hours = Math.floor(remainingTime / 3600);

    const minutes = Math.floor((remainingTime % 3600) / 60);

    const seconds = remainingTime % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (isLocked) {
      showMessage("error", `Login is locked. Please wait ${formatTime()}.`);
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      showMessage("error", "Please enter your email address.");
      return;
    }

    if (!validateEmail(cleanEmail)) {
      showMessage("error", "Please enter a valid email address.");
      return;
    }

    if (!password) {
      showMessage("error", "Please enter your password.");
      return;
    }
    if (password.length < 6) {
      showMessage("error", "Password must be at least 6 characters.");
      return;
    }

    const correctEmail = "manager@fashionhub.com";

    const correctPassword = "password123";

    const loginCorrect =
      cleanEmail === correctEmail && password === correctPassword;

    if (!loginCorrect) {
      const attempts = failedAttempts + 1;

      if (attempts >= 3) {
        const oneHour = Date.now() + 60 * 60 * 1000;

        localStorage.setItem("loginFailedAttempts", String(attempts));

        localStorage.setItem("loginLockUntil", String(oneHour));

        setFailedAttempts(attempts);
        setLockUntil(oneHour);
        setRemainingTime(3600);

        showMessage(
          "error",
          "3 failed attempts. Login has been locked for 1 hour.",
        );

        return;
      }

      localStorage.setItem("loginFailedAttempts", String(attempts));

      setFailedAttempts(attempts);

      const attemptsLeft = 3 - attempts;

      showMessage(
        "error",
        `Incorrect email or password. ${attemptsLeft} attempt${
          attemptsLeft === 1 ? "" : "s"
        } remaining.`,
      );

      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    localStorage.removeItem("loginFailedAttempts");

    localStorage.removeItem("loginLockUntil");

    setFailedAttempts(0);
    setLockUntil(0);
    setRemainingTime(0);

    showMessage("success", "Login successful. Welcome back!");

    setTimeout(() => {
      navigate("/offlineposreg", {
        replace: true,
      });
    }, 600);
  };

  const handleForgotPassword = () => {
    showMessage(
      "error",
      "Please contact your system administrator to reset your password.",
    );
  };

  return (
    <div className="offline-login-page">
      <div className="offline-login-card">
        <div
          className="offline-login-image-section"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        >
          <div className="offline-login-image-overlay" />

          <div className="offline-login-image-content">
            <div className="offline-login-status">
              <span className="offline-login-status-dot" />

              <span className="offline-login-status-text">
                POS TERMINAL READY
              </span>
            </div>

            <h1 className="offline-login-image-title">
              Curated Apparel & Designer Fashion
            </h1>

            <p className="offline-login-image-description">
              Fast, reliable point-of-sale inventory and fashion retail
              management for your store.
            </p>
          </div>
        </div>

        <div className="offline-login-form-section">
          <div className="offline-login-form-inner">
            <div className="offline-login-brand">
              <div className="offline-login-brand-icon">
                <StorefrontOutlinedIcon />
              </div>

              <div className="offline-login-brand-info">
                <h2 className="offline-login-brand-title">FashionHub</h2>

                <span className="offline-login-brand-subtitle">
                  RETAIL & APPAREL POS
                </span>
              </div>
            </div>

            <div className="offline-login-heading">
              <h1 className="offline-login-heading-title">Welcome back!</h1>

              <p className="offline-login-heading-description">
                Enter your credentials to access your store workspace.
              </p>
            </div>

            {isLocked && (
              <div className="offline-login-lock-box">
                <ErrorIcon className="offline-login-lock-icon" />
                <div className="offline-login-lock-content">
                  <span className="offline-login-lock-title">
                    Login temporarily locked
                  </span>

                  <span className="offline-login-lock-time">
                    {formatTime()}
                  </span>
                </div>
              </div>
            )}

            <form className="offline-login-form" onSubmit={handleLogin}>
              <div className="offline-login-field">
                <label className="offline-login-label">EMAIL ADDRESS</label>

                <div className="offline-login-input-box">
                  <EmailOutlinedIcon className="offline-login-input-icon" />

                  <input
                    className="offline-login-input"
                    type="email"
                    placeholder="manager@fashionhub.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={isLocked}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="offline-login-field">
                <label className="offline-login-label">Password</label>

                <div className="offline-login-input-box">
                  <LockOutlinedIcon className="offline-login-input-icon" />

                  <input
                    className="offline-login-input offline-login-password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isLocked}
                    autoComplete="current-password"
                  />

                  <button
                    className="offline-login-password-button"
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    disabled={isLocked}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </button>
                </div>
              </div>

              <div className="offline-login-options">
                <label className="offline-login-remember">
                  <input className="offline-login-checkbox" type="checkbox" />

                  <span className="offline-login-remember-text">
                    Remember me
                  </span>
                </label>

                <button
                  className="offline-login-forgot"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <button
                className={`offline-login-button ${
                  isLocked ? "offline-login-button-locked" : ""
                }`}
                type="submit"
                disabled={isLocked}
              >
                <span className="offline-login-button-text">
                  {isLocked ? `LOCKED ${formatTime()}` : "LOGIN"}
                </span>
                {!isLocked && (
                  <LoginOutlinedIcon className="offline-login-button-icon" />
                )}
              </button>
            </form>

            <div className="offline-login-system-info">
              <span className="offline-login-system-dot" />

              <span className="offline-login-system-text">
                System Version 2.4
              </span>

              <span className="offline-login-system-separator">•</span>

              <span className="offline-login-system-text">Offline Ready</span>
            </div>
          </div>
        </div>
      </div>

      {popup.show && (
        <div className="offline-login-popup">
          <div
            className={`offline-login-popup-box ${
              popup.type === "success"
                ? "offline-login-popup-success"
                : "offline-login-popup-error"
            }`}
          >
            <div className="offline-login-popup-icon">
              {popup.type === "success" ? <CheckCircleIcon /> : <ErrorIcon />}
            </div>

            <div className="offline-login-popup-content">
              <span className="offline-login-popup-title">
                {popup.type === "success" ? "Success" : "Login Error"}
              </span>

              <span className="offline-login-popup-message">
                {popup.message}
              </span>
            </div>

            <button
              className="offline-login-popup-close"
              type="button"
              onClick={() =>
                setPopup((previous) => ({
                  ...previous,
                  show: false,
                }))
              }
            >
              <CloseOutlinedIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
