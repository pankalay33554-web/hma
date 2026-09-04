import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./shoplogin.css";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LockClockRoundedIcon from "@mui/icons-material/LockClockRounded";

import img1 from "./img1.jpg";

import { UseLoginSecurity } from "./shoploginsecurity";

const REMEMBER_EMAIL_KEY = "pos_remembered_email";
const AUTH_LOGIN_KEY = "shop_login_authenticated";

const DEMO_EMAIL = "admin@gmail.com";
const DEMO_PASSWORD = "Password123!";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

export default function ShopLogin() {
  const navigate = useNavigate();

  const {
    isLocked,
    remainingTime,
    lock,
    registerWrongPassword,
    resetWrongAttempts,
  } = UseLoginSecurity();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);

  const [localMessage, setLocalMessage] = useState("");

  useEffect(() => {
    try {
      const remembered = localStorage.getItem(REMEMBER_EMAIL_KEY);

      if (remembered) {
        setEmail(remembered);
        setRememberMe(true);
      }
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const validateEmail = () => {
    const value = email.trim();

    if (!value) {
      setEmailError("Email is required.");
      return false;
    }

    if (!EMAIL_REGEX.test(value)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    setEmailError("");

    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return false;
    }

    setPasswordError("");

    return true;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (emailError) {
      setEmailError("");
    }

    if (localMessage) {
      setLocalMessage("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (passwordError) {
      setPasswordError("");
    }

    if (localMessage) {
      setLocalMessage("");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (loading || isLocked) {
      return;
    }

    setEmailError("");
    setPasswordError("");
    setLocalMessage("");

    const emailValid = validateEmail();
    const passwordValid = validatePassword();

    if (!emailValid || !passwordValid) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 1200);
      });

      const enteredEmail = email.trim().toLowerCase();

      const emailCorrect = enteredEmail === DEMO_EMAIL;

      const passwordCorrect = password === DEMO_PASSWORD;

      if (!emailCorrect) {
        setEmailError("Incorrect email.");
        setLoading(false);
        return;
      }

      if (!passwordCorrect) {
        setPasswordError("Incorrect password.");

        registerWrongPassword();

        setPassword("");
        setLoading(false);

        return;
      }

      localStorage.setItem(AUTH_LOGIN_KEY, "true");

      if (rememberMe) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim());
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      resetWrongAttempts();

      setPassword("");
      setSuccessOpen(true);

      window.setTimeout(() => {
        navigate("/shop", {
          replace: true,
        });
      }, 500);
    } catch {
      setLocalMessage("Unable to complete login. Please try again.");
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setLocalMessage(
      "Password recovery will be connected when the API is available.",
    );
  };

  const isFormDisabled = loading || isLocked;

  return (
    <div className="login-page">
      <div className="login-background-shape login-background-shape-one" />
      <div className="login-background-shape login-background-shape-two" />

      <div className="login-container">
        <section className="login-visual-section">
          <div className="login-visual-content">
            <div className="login-image-wrapper">
              <img
                className="login-main-image"
                src={img1}
                alt="POS dashboard"
              />
            </div>
          </div>
        </section>

        <section className="login-form-section">
          <div className="login-card">
            <div className="login-border" />

            <div className="login-card-header">
              <div className="login-brand">
                <div className="login-brand-icon">
                  <PointOfSaleRoundedIcon />
                </div>

                <div className="login-brand-text">
                  <strong className="login-brand-name">POS Suite</strong>

                  <span className="login-brand-subtitle">
                    Smart Point of Sale System
                  </span>
                </div>
              </div>

              <h1 className="login-title">Welcome back!</h1>

              <p className="login-description">
                Enter your credentials to access your POS workspace.
              </p>
            </div>

            <form className="login-form" onSubmit={handleLogin} noValidate>
              <div className="login-field">
                <label className="login-label" htmlFor="login-email">
                  Email
                </label>

                <div
                  className={`login-input-wrapper ${
                    emailError ? "login-input-wrapper-error" : ""
                  }`}
                >
                  <EmailOutlinedIcon className="login-input-icon" />

                  <input
                    id="login-email"
                    className="login-input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={validateEmail}
                    placeholder="Enter your email"
                    autoComplete="username"
                    disabled={isFormDisabled}
                    aria-invalid={Boolean(emailError)}
                  />
                </div>

                {emailError && (
                  <span className="login-error-message">{emailError}</span>
                )}
              </div>

              <div className="login-field">
                <label className="login-label" htmlFor="login-password">
                  Password
                </label>
                <div
                  className={`login-input-wrapper ${
                    passwordError ? "login-input-wrapper-error" : ""
                  }`}
                >
                  <LockOutlinedIcon className="login-input-icon" />

                  <input
                    id="login-password"
                    className="login-input login-password-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={validatePassword}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isFormDisabled}
                    aria-invalid={Boolean(passwordError)}
                  />

                  <button
                    className="login-password-toggle"
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    disabled={isFormDisabled}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </button>
                </div>

                {passwordError && (
                  <span className="login-error-message">{passwordError}</span>
                )}
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input
                    className="login-checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    disabled={isFormDisabled}
                  />

                  <span className="login-checkbox-custom">
                    <CheckCircleRoundedIcon />
                  </span>

                  <span className="login-remember-text">Remember me</span>
                </label>

                <button
                  className="login-forgot-button"
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isFormDisabled}
                >
                  Forgot password?
                </button>
              </div>

              <button
                className={`login-submit-button ${
                  loading ? "login-submit-button-loading" : ""
                }`}
                type="submit"
                disabled={isFormDisabled}
              >
                {loading ? (
                  <span className="login-button-loading-content">
                    <span className="login-button-spinner" />
                    Please wait...
                  </span>
                ) : (
                  <>
                    <LoginRoundedIcon />
                    <span>LOGIN</span>
                  </>
                )}
              </button>

              {localMessage && (
                <div className="login-local-message">{localMessage}</div>
              )}

              <div className="login-security-note">
                <LockOutlinedIcon />
                <span>
                  Your login session is protected with secure authentication.
                </span>
              </div>
            </form>
          </div>
        </section>
      </div>

      {loading && (
        <div className="login-modal-overlay">
          <div className="login-loading-popup" role="dialog" aria-modal="true">
            <div className="login-loading-spinner">
              <span className="login-loading-spinner-ring" />
            </div>

            <h2 className="login-popup-title">Please wait...</h2>

            <p className="login-popup-description">
              We are securely checking your login information.
            </p>

            <div className="login-loading-progress">
              <span className="login-loading-progress-bar" />
            </div>
          </div>
        </div>
      )}

      {successOpen && (
        <div className="login-modal-overlay">
          <div className="login-success-popup" role="dialog" aria-modal="true">
            <div className="login-popup-icon login-popup-icon-success">
              <CheckCircleRoundedIcon />
            </div>

            <h2 className="login-popup-title">Login Successful</h2>

            <p className="login-popup-description">
              Redirecting you to your shop...
            </p>
          </div>
        </div>
      )}

      {isLocked && (
        <div className="login-modal-overlay">
          <div className="login-lock-popup" role="dialog" aria-modal="true">
            <div className="login-popup-icon login-popup-icon-lock">
              <LockClockRoundedIcon />
            </div>

            <h2 className="login-popup-title">
              {lock.type === "seven-day"
                ? "Account Locked"
                : "Temporarily Locked"}
            </h2>

            <p className="login-popup-description">
              {lock.type === "seven-day"
                ? "Your account has been locked for 7 days."
                : "Too many incorrect password attempts. Please wait until the countdown finishes."}
            </p>

            <div className="login-countdown-box">
              <span className="login-countdown-label">
                {lock.type === "seven-day"
                  ? "Account unlocks in"
                  : "Try again in"}
              </span>

              <strong className="login-countdown">
                {formatCountdown(remainingTime, lock.type)}
              </strong>
            </div>

            <div className="login-lock-info">
              <LockOutlinedIcon />

              <span>Refreshing the page will not reset the countdown.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatCountdown(milliseconds, lockType) {
  if (milliseconds <= 0) {
    return "00:00:00";
  }

  const totalSeconds = Math.ceil(milliseconds / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor((totalSeconds % 86400) / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  const pad = (value) => String(value).padStart(2, "0");

  if (lockType === "seven-day" || days > 0) {
    return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
