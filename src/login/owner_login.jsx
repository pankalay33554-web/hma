import useLogin from "../Hook/uselogin";
import "./login.css";

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
    <div>
      {/* FORM */}
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLocked}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLocked}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

        <button type="submit" disabled={isLocked}>
          Login
        </button>
      </form>

      {/*  POPUP LOCK MODAL */}
      {isLocked && (
        <div className="overlay">
          <div className="modal">
            <h3>သင့်အကောင့်အားယာယီပိတ်ထားပါတယ်</h3>

            <p>ကျေးဇူးပြု၍ 1 နာရီပြည့်အောင်စောင့်ပေးပါ</p>

            <div style={{ marginTop: "10px" }}>
              <span style={{ marginLeft: "5px" }}>{remainingTime}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
