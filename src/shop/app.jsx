import { Navigate, Routes, Route } from "react-router-dom";

import CreatePOS from "./createshop";
import Shop from "./shop";
import OfflineFeaturesModal from "./offlinefeature";
import ShopDetails from "./viewdetail";

import ShopLogin from "./shoplogin";
import LoginSecurity from "./shoploginsecurity";
import ProtectedRoute from "./protectedRoute";

export default function App() {
  return (
    <LoginSecurity>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<ShopLogin />} />

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/shop" element={<Shop />} />

          <Route path="/createpos" element={<CreatePOS />}>
            <Route path="offlinefeatures" element={<OfflineFeaturesModal />} />
          </Route>

          <Route path="/shopdetails" element={<ShopDetails />} />
        </Route>

        {/* Unknown path */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </LoginSecurity>
  );
}
