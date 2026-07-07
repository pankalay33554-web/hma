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

  //  countdown
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

    if (email.trim() === "") return setEmailError("enter Email");
    if (password.trim() === "") return setPasswordError("Enter Password");

    const correctEmail = "admin@gmail.com";
    const correctPassword = "123456";

    if (email !== correctEmail) {
      setEmailError("Correct Email");
      return;
    }

    if (password !== correctPassword) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem(ATTEMPT_KEY, newAttempts);

      setPasswordError(`Correct Password (${newAttempts}/3)`);

      if (newAttempts >= 5) {
        const lockTime = Date.now() + 1 * 60 * 60 * 1000;

        setLockUntil(lockTime);
        localStorage.setItem(LOCK_KEY, lockTime);
      }

      return;
    }

    // success
    setAttempts(0);
    setLockUntil(null);
    setRemainingTime("");

    localStorage.removeItem(LOCK_KEY);
    localStorage.removeItem(ATTEMPT_KEY);

    alert("Login Success ");
    localStorage.setItem("isLogin", "true");
    navigate("/nav/dashboard");
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
