import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import LockClockRoundedIcon from "@mui/icons-material/LockClockRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SECURITY_KEY = "shop_login_security";

const ONE_HOUR = 60 * 60 * 1000;
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const MAX_WRONG_ATTEMPTS = 3;
const MAX_TEMPORARY_LOCKS = 5;

const DEFAULT_SECURITY = {
  wrongAttempts: 0,
  temporaryLocks: 0,
  lockedUntil: null,
  sevenDayLockedUntil: null,
};

const LoginSecurityContext = createContext(null);

const readSecurity = () => {
  try {
    const saved = sessionStorage.getItem(SECURITY_KEY);

    if (!saved) {
      return {
        ...DEFAULT_SECURITY,
      };
    }

    const parsed = JSON.parse(saved);

    return {
      wrongAttempts: Number(parsed.wrongAttempts) || 0,

      temporaryLocks: Number(parsed.temporaryLocks) || 0,

      lockedUntil: parsed.lockedUntil ? Number(parsed.lockedUntil) : null,

      sevenDayLockedUntil: parsed.sevenDayLockedUntil
        ? Number(parsed.sevenDayLockedUntil)
        : null,
    };
  } catch {
    return {
      ...DEFAULT_SECURITY,
    };
  }
};

const saveSecurity = (security) => {
  try {
    sessionStorage.setItem(SECURITY_KEY, JSON.stringify(security));
  } catch {
    // UI
  }
};

const getActiveLock = (security) => {
  const now = Date.now();

  if (security.sevenDayLockedUntil && security.sevenDayLockedUntil > now) {
    return {
      type: "seven-day",
      until: security.sevenDayLockedUntil,
    };
  }

  if (security.lockedUntil && security.lockedUntil > now) {
    return {
      type: "one-hour",
      until: security.lockedUntil,
    };
  }

  return {
    type: null,
    until: null,
  };
};

export function LoginSecurityProvider({ children }) {
  const [security, setSecurity] = useState(() => readSecurity());

  const [lock, setLock] = useState(() => getActiveLock(readSecurity()));

  const [remainingTime, setRemainingTime] = useState(0);

  const [warningOpen, setWarningOpen] = useState(false);

  const [warningMessage, setWarningMessage] = useState("");

  const refreshSecurity = useCallback(() => {
    const current = readSecurity();

    const now = Date.now();

    let updated = {
      ...current,
    };

    if (current.lockedUntil && current.lockedUntil <= now) {
      updated = {
        ...updated,
        wrongAttempts: 0,
        lockedUntil: null,
      };
    }

    if (current.sevenDayLockedUntil && current.sevenDayLockedUntil <= now) {
      updated = {
        ...updated,
        wrongAttempts: 0,
        temporaryLocks: 0,
        sevenDayLockedUntil: null,
      };
    }

    saveSecurity(updated);

    setSecurity(updated);

    setLock(getActiveLock(updated));
  }, []);

  useEffect(() => {
    refreshSecurity();

    const handleFocus = () => {
      refreshSecurity();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshSecurity();
      }
    };

    window.addEventListener("focus", handleFocus);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshSecurity]);

  useEffect(() => {
    if (!lock.until) {
      setRemainingTime(0);

      return undefined;
    }

    const updateCountdown = () => {
      const remaining = Math.max(lock.until - Date.now(), 0);

      setRemainingTime(remaining);

      if (remaining <= 0) {
        refreshSecurity();
      }
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [lock, refreshSecurity]);

  const showWarning = useCallback((message) => {
    setWarningMessage(message);
    setWarningOpen(true);
  }, []);

  const closeWarning = useCallback(() => {
    setWarningOpen(false);
  }, []);

  const registerWrongPassword = useCallback(() => {
    const current = readSecurity();

    const newAttempts = current.wrongAttempts + 1;

    if (newAttempts < MAX_WRONG_ATTEMPTS) {
      const updated = {
        ...current,
        wrongAttempts: newAttempts,
      };

      saveSecurity(updated);

      setSecurity(updated);

      const remaining = MAX_WRONG_ATTEMPTS - newAttempts;

      if (remaining === 1) {
        showWarning(
          "Warning: you have 1 attempt remaining before your account is temporarily locked for 1 hour.",
        );
      } else {
        showWarning(
          `Incorrect password. You have ${remaining} attempts remaining.`,
        );
      }

      return {
        locked: false,
        lockType: null,
      };
    }

    const newTemporaryLocks = current.temporaryLocks + 1;

    if (newTemporaryLocks >= MAX_TEMPORARY_LOCKS) {
      const sevenDayLockedUntil = Date.now() + SEVEN_DAYS;

      const updated = {
        wrongAttempts: 0,

        temporaryLocks: newTemporaryLocks,

        lockedUntil: null,

        sevenDayLockedUntil: sevenDayLockedUntil,
      };

      saveSecurity(updated);

      setSecurity(updated);

      setLock({
        type: "seven-day",
        until: sevenDayLockedUntil,
      });

      showWarning(
        "Your account has been locked for 7 days because the maximum number of temporary locks has been reached.",
      );

      return {
        locked: true,
        lockType: "seven-day",
      };
    }

    const lockedUntil = Date.now() + ONE_HOUR;

    const updated = {
      wrongAttempts: 0,

      temporaryLocks: newTemporaryLocks,

      lockedUntil,

      sevenDayLockedUntil: null,
    };

    saveSecurity(updated);

    setSecurity(updated);

    setLock({
      type: "one-hour",
      until: lockedUntil,
    });

    showWarning(
      "Too many incorrect password attempts. Your account has been temporarily locked for 1 hour.",
    );

    return {
      locked: true,
      lockType: "one-hour",
    };
  }, [showWarning]);

  const resetWrongAttempts = useCallback(() => {
    const current = readSecurity();

    const updated = {
      ...current,
      wrongAttempts: 0,
    };

    saveSecurity(updated);

    setSecurity(updated);
  }, []);

  const isLocked = lock.type !== null && remainingTime > 0;

  const remainingAttempts = Math.max(
    MAX_WRONG_ATTEMPTS - security.wrongAttempts,
    0,
  );

  const contextValue = useMemo(
    () => ({
      security,

      lock,

      remainingTime,

      isLocked,

      remainingAttempts,

      warningOpen,

      warningMessage,

      registerWrongPassword,

      resetWrongAttempts,

      showWarning,

      closeWarning,

      refreshSecurity,
    }),
    [
      security,
      lock,
      remainingTime,
      isLocked,
      remainingAttempts,
      warningOpen,
      warningMessage,
      registerWrongPassword,
      resetWrongAttempts,
      showWarning,
      closeWarning,
      refreshSecurity,
    ],
  );

  return (
    <LoginSecurityContext.Provider value={contextValue}>
      {children}

      {warningOpen && (
        <div className="login-modal-overlay">
          <div className="login-warning-popup" role="dialog" aria-modal="true">
            <button
              className="login-popup-close"
              type="button"
              onClick={closeWarning}
              aria-label="Close warning"
            >
              <CloseRoundedIcon />
            </button>

            <div className="login-popup-icon login-popup-icon-warning">
              <WarningAmberRoundedIcon />
            </div>

            <h2 className="login-popup-title">Security Warning</h2>

            <p className="login-popup-description">{warningMessage}</p>

            <div className="login-attempt-info">
              <span className="login-attempt-label">Remaining attempts</span>

              <strong className="login-attempt-value">
                {remainingAttempts}
              </strong>
            </div>

            <button
              className="login-popup-action-button"
              type="button"
              onClick={closeWarning}
            >
              I Understand
            </button>
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
                ? "Your account has been locked for 7 days because the maximum number of temporary locks has been reached."
                : "Too many incorrect password attempts. Your account is temporarily locked for 1 hour."}
            </p>

            <div className="login-countdown-box">
              <div className="login-countdown-icon">
                <LockOutlinedIcon />
              </div>
              <div className="login-countdown-content">
                <span className="login-countdown-label">
                  {lock.type === "seven-day"
                    ? "Account unlocks in"
                    : "Try again in"}
                </span>

                <strong className="login-countdown">
                  {formatCountdown(remainingTime, lock.type)}
                </strong>
              </div>
            </div>

            <div className="login-lock-info">
              <LockOutlinedIcon />

              <span>Refreshing the page will not reset the countdown.</span>
            </div>
          </div>
        </div>
      )}
    </LoginSecurityContext.Provider>
  );
}

export const UseLoginSecurity = () => {
  const context = useContext(LoginSecurityContext);

  if (!context) {
    throw new Error(
      "useLoginSecurity must be used inside LoginSecurityProvider.",
    );
  }

  return context;
};

export default function LoginSecurity({ children }) {
  return <LoginSecurityProvider>{children}</LoginSecurityProvider>;
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
