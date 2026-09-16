import { Routes, Route, Navigate } from "react-router-dom";
import OfflineLogin from "../OFFLINE/offlinelogin";
import OfflineApp from "../OFFLINE/posapp";

import OfflineProtectedRoute from "../OFFLINE/offlineprotectedroute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<OfflineLogin />} />

      <Route
        path="/*"
        element={
          <OfflineProtectedRoute>
            <OfflineApp />
          </OfflineProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
