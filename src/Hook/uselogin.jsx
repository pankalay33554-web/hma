import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LOCK_KEY = "lock_until";
const ATTEMPT_KEY = "attempts";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [attempts, setAttempts] = useState(() => {
    return Number(localStorage.getItem(ATTEMPT_KEY)) || 0;
  });

  const [lockUntil, setLockUntil] = useState(() => {
    return Number(localStorage.getItem(LOCK_KEY)) || null;
  });

  const [remainingTime, setRemainingTime] = useState("");

  const isLocked = lockUntil && Date.now() < Number(lockUntil);

  useEffect(() => {
    if (!lockUntil) return;

    const update = () => {
      const diff = lockUntil - Date.now();

      if (diff <= 0) {
        setLockUntil(null);
        setAttempts(0);
        setRemainingTime("");
        localStorage.removeItem(LOCK_KEY);
        localStorage.removeItem(ATTEMPT_KEY);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setRemainingTime(`${h}h ${m}m ${s}s`);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [lockUntil]);

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (isLocked) {
      setPasswordError(`Account locked (${remainingTime})`);
      return;
    }

    if (email.trim() === "") return setEmailError("Please enter Email");
    if (password.trim() === "")
      return setPasswordError("Please enter Password");

    // 🎯 3 ROLES EMAIL DEFINITIONS
    const ownerEmails = ["admin@gmail.com", "owner@gmail.com"];
    const managerEmails = ["manager@gmail.com", "manager@burgershop.com"];
    const salesEmails = ["salesperson@gmail.com", "seller@burgershop.com"]; // Sales Account
    const validPassword = "123456";

    const inputEmail = email.toLowerCase().trim();

    // Roles Check
    const isOwner = ownerEmails.includes(inputEmail);
    const isManager = managerEmails.includes(inputEmail);
    const isSalesperson = salesEmails.includes(inputEmail);

    if (!isOwner && !isManager && !isSalesperson) {
      setEmailError("Invalid Email Address");
      return;
    }

    if (password !== validPassword) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem(ATTEMPT_KEY, newAttempts);

      setPasswordError(`Incorrect Password (${newAttempts}/5)`);

      if (newAttempts >= 3) {
        const lockTime = Date.now() + 1 * 60 * 60 * 1000;
        setLockUntil(lockTime);
        localStorage.setItem(LOCK_KEY, lockTime);
      }
      return;
    }

    // SUCCESS LOGIC
    setAttempts(0);
    setLockUntil(null);
    setRemainingTime("");
    localStorage.removeItem(LOCK_KEY);
    localStorage.removeItem(ATTEMPT_KEY);

    localStorage.setItem("isLogin", "true");

    // Dynamic Navigation according to Role
    if (isOwner) {
      alert("Login Success: Welcome Owner!");
      localStorage.setItem("userRole", "owner");
      navigate("/nav/dashboard");
    } else if (isManager) {
      alert("Login Success: Welcome Store Manager!");
      localStorage.setItem("userRole", "manager");
      navigate("/shop-detail/dashboard");
    } else if (isSalesperson) {
      alert("Login Success: Welcome Salesperson!");
      localStorage.setItem("userRole", "salesperson");
      navigate("/salesperson"); // 🎯 Salesperson Dashboard
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    emailError,
    passwordError,
    lockUntil,
    remainingTime,
    isLocked,
  };
}
