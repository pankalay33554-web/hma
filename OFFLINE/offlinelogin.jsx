import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  LoginOutlined,
  CheckCircle,
  Error,
  CloseOutlined,
  CloudOutlined,
  StoreOutlined,
} from "@mui/icons-material";

import "./offlinelogin.css";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("online");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState(() => {
    return Number(localStorage.getItem("loginFailedAttempts")) || 0;
  });

  const [lockUntil, setLockUntil] = useState(() => {
    return Number(localStorage.getItem("loginLockUntil")) || 0;
  });

  const [remainingTime, setRemainingTime] = useState(0);

  const [popup, setPopup] = useState({
    show: false,
    type: "error",
    message: "",
  });

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
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      const savedMode = localStorage.getItem("shopMode");

      if (savedMode === "offline") {
        navigate("/offline", { replace: true });
      } else {
        navigate("/online", { replace: true });
      }
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

  const handleModeChange = (selectedMode) => {
    if (isLocked) {
      showMessage("error", `Login is locked. Please wait ${formatTime()}.`);
      return;
    }

    setMode(selectedMode);
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

      localStorage.setItem("loginFailedAttempts", String(attempts));

      setFailedAttempts(attempts);

      if (attempts >= 3) {
        const oneHour = Date.now() + 60 * 60 * 1000;

        localStorage.setItem("loginLockUntil", String(oneHour));

        setLockUntil(oneHour);
        setRemainingTime(3600);

        showMessage(
          "error",
          "3 failed attempts. Login has been locked for 1 hour.",
        );

        return;
      }

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

    localStorage.setItem("shopMode", mode);

    localStorage.removeItem("loginFailedAttempts");

    localStorage.removeItem("loginLockUntil");

    setFailedAttempts(0);
    setLockUntil(0);
    setRemainingTime(0);

    showMessage(
      "success",
      mode === "online"
        ? "Login successful. Welcome to Fashion."
        : "Login successful. Welcome to Cake Shop.",
    );

    setTimeout(() => {
      if (mode === "online") {
        navigate("/online", {
          replace: true,
        });
      } else {
        navigate("/offline", {
          replace: true,
        });
      }
    }, 600);
  };

  return (
    <div className="offline-login-page">
      <div className="offline-login-card">
        <div className="offline-login-image-section">
          <div className="offline-login-image-overlay" />

          <div className="offline-login-image-content">
            <div className="offline-login-status">
              <span className="offline-login-status-dot" />
              POS TERMINAL READY
            </div>

            <div className="offline-login-brand">
              {mode === "online" ? "Fashion Hub" : "Best Wish Bakery"}
            </div>

            <div className="offline-login-image-title">
              {mode === "online"
                ? "Curated Apparel & Designer Fashion"
                : "Fresh Cakes & Delicious Bakery"}
            </div>

            <div className="offline-login-image-description">
              {mode === "online"
                ? "Manage your fashion retail business with ease."
                : "Manage your cake shop and bakery business with ease."}
            </div>
          </div>
        </div>

        <div className="offline-login-form-section">
          <div className="offline-login-mode-switch">
            <button
              type="button"
              className={`offline-login-mode-button ${
                mode === "online" ? "offline-login-mode-active" : ""
              }`}
              onClick={() => handleModeChange("online")}
            >
              <CloudOutlined />
              <span>Online</span>
            </button>

            <button
              type="button"
              className={`offline-login-mode-button ${
                mode === "offline" ? "offline-login-mode-active" : ""
              }`}
              onClick={() => handleModeChange("offline")}
            >
              <StoreOutlined />
              <span>Offline</span>
            </button>
          </div>

          <div className="offline-login-form-header">
            <div className="offline-login-form-brand">
              {mode === "online" ? "Fashion Hub" : "Best Wish Bakery"}
            </div>

            <div className="offline-login-welcome">Welcome back</div>

            <div className="offline-login-subtitle">
              Sign in to continue to your{" "}
              {mode === "online" ? "Fashion" : "Cake"} store
            </div>
          </div>

          <form className="offline-login-form" onSubmit={handleLogin}>
            <div className="offline-login-field">
              <label className="offline-login-label">Email Address</label>

              <div className="offline-login-input-box">
                <EmailOutlined className="offline-login-input-icon" />

                <input
                  type="email"
                  className="offline-login-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="offline-login-field">
              <label className="offline-login-label">Password</label>

              <div className="offline-login-input-box">
                <LockOutlined className="offline-login-input-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  className="offline-login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  className="offline-login-password-button"
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  {showPassword ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <VisibilityOutlined />
                  )}
                </button>
              </div>
            </div>

            <div className="offline-login-options">
              <label className="offline-login-remember">
                <input type="checkbox" className="offline-login-checkbox" />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="offline-login-forgot"
                onClick={() =>
                  showMessage(
                    "error",
                    "Please contact the system manager to reset your password.",
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="offline-login-button"
              disabled={isLocked}
            >
              <LoginOutlined />

              <span>
                {isLocked
                  ? "Login Locked"
                  : `Login to ${mode === "online" ? "Fashion" : "Cake"}`}
              </span>
            </button>

            {isLocked && (
              <div className="offline-login-lock-box">
                <LockOutlined />
                <div className="offline-login-lock-content">
                  <div className="offline-login-lock-title">
                    Login temporarily locked
                  </div>

                  <div className="offline-login-lock-time">{formatTime()}</div>

                  <div className="offline-login-lock-text">
                    Please wait until the countdown finishes.
                  </div>
                </div>
              </div>
            )}
          </form>

          <div className="offline-login-footer">
            <span>System Version 2.4</span>

            <span className="offline-login-footer-status">
              <CheckCircle />
              {mode === "online" ? "Online Ready" : "Offline Ready"}
            </span>
          </div>
        </div>
      </div>

      {popup.show && (
        <div
          className={`offline-login-popup ${
            popup.type === "success"
              ? "offline-login-popup-success"
              : "offline-login-popup-error"
          }`}
        >
          <div className="offline-login-popup-icon">
            {popup.type === "success" ? <CheckCircle /> : <Error />}
          </div>

          <div className="offline-login-popup-message">{popup.message}</div>

          <button
            type="button"
            className="offline-login-popup-close"
            onClick={() =>
              setPopup((previous) => ({
                ...previous,
                show: false,
              }))
            }
          >
            <CloseOutlined />
          </button>
        </div>
      )}
    </div>
  );
}
