import { Routes, Route } from "react-router-dom";

import OfflineStore from "./offlinestore";
import OfflineSidebar from "./offlinesidebar";
import OfflineSaleList from "./offlinsalelist";
import OfflinePos from "./offlinepos";
import OfflineStaffManagement from "./offlinestaffmanagement";
import OfflineInventory from "./offlineinventory";
import OfflineSetting from "./offlinesetting";
import OfflineReport from "./offlinereport";
import OfflineAddNewStaff from "./offlinenewsstaff";
import OfflineSalesReportDetails from "./offlinesalereportdetail";
import OrderSlipPreview from "./offlineposprint";

export default function OfflineApp() {
  return (
    <div className="offline-app">
      <Routes>
        <Route path="/" element={<OfflineSidebar />}>
          <Route path="offlinestore" element={<OfflineStore />} />
          <Route path="offlinesale" element={<OfflineSaleList />} />
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
