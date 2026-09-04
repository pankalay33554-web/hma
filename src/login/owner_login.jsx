import useLogin from "../Hook/uselogin";
import "./login.css";
import bakeryImg from "../assets/bakery.png";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

export default function Login() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    emailError,
    passwordError,
    isLocked,
    remainingTime,
  } = useLogin();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-banner">
          <img src={bakeryImg} alt="Burger Shop Bakery" />
        </div>

        <div className="login-form-section">
          <div className="shop-brand">
            <div className="brand-icon">
              <RestaurantOutlinedIcon
                sx={{ fontSize: "36px !important", color: "#590004" }}
              />
            </div>
            <h2>Burger Shop 1</h2>
          </div>

          <div className="welcome-header">
            <h1>Welcome back!</h1>
            <p>Enter your credentials to access your store workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="manager@burgershop.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLocked}
                />
              </div>
              {emailError && <p className="error-text">{emailError}</p>}
            </div>

            <div className="input-group">
              <label>PASSWORD</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                />
              </div>
              {passwordError && <p className="error-text">{passwordError}</p>}
            </div>

            <button type="submit" className="submit-btn" disabled={isLocked}>
              LOGIN
            </button>
          </form>
        </div>
      </div>

      {isLocked && (
        <div className="overlay">
          <div className="modal">
            <h3>သင့်အကောင့်အားယာယီပိတ်ထားပါတယ်</h3>
            <p>ကျေးဇူးပြု၍ 1 နာရီပြည့်အောင်စောင့်ပေးပါ</p>
            <div style={{ marginTop: "10px" }}>
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  color: "#800000",
                }}
              >
                {remainingTime}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
