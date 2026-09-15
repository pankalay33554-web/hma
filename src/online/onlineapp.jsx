import { Routes, Route, Navigate } from "react-router-dom";

import OfflineStore from "../../OFFLINE/offlinestore";
import OnlineSidebar from "./onlinesidebar";

import OfflinePos from "../../OFFLINE/offlinepos";
import OfflineStaffManagement from "../../OFFLINE/offlinestaffmanagement";
import OfflineInventory from "../../OFFLINE/offlineinventory";
import OfflineSetting from "../../OFFLINE/offlinesetting";
import OfflineReport from "../../OFFLINE/offlinereport";
import OfflineAddNewStaff from "../../OFFLINE/offlinenewsstaff";
import OfflineSalesReportDetails from "../../OFFLINE/offlinesalereportdetail";
import OrderSlipPreview from "../../OFFLINE/offlineposprint";

export default function OnlineApp() {
  return (
    <div className="offline-app">
      <Routes>
        <Route path="/" element={<OnlineSidebar />}>
          <Route index element={<Navigate to="/onlinepos" replace />} />

          <Route path="offlinestore" element={<OfflineStore />} />

          <Route path="offlineposreg" element={<OfflinePos />}>
            <Route path="posslip" element={<OrderSlipPreview />} />
          </Route>

          <Route path="offlinestaff" element={<OfflineStaffManagement />}>
            <Route path="addstaff" element={<OfflineAddNewStaff />} />
          </Route>

          <Route path="offlineinventory" element={<OfflineInventory />} />
          <Route path="offlinesetting" element={<OfflineSetting />} />

          <Route path="offlinereport" element={<OfflineReport />}>
            <Route
              path="details/:reportId"
              element={<OfflineSalesReportDetails />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
