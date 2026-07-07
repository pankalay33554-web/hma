import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {
  const isLogin = localStorage.getItem("isLogin");

  return isLogin ? children : <Navigate to="/" replace />;
}
