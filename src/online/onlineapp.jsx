import { Routes, Route, Navigate } from "react-router-dom";

import OfflineStore from "../../OFFLINE/offlinestore";
import OnlineSidebar from "./onlinesidebar";
import OnlineInventory from "./onlineinventory";
import OnlinePos from "./pr";
import OnlineReport from "./onlinereport";
import PrintFrom from "./orderprint";
import SalesDettail from "./saledetail";
import OnlineSale from "./onlinesale";
import OnlineStaff from "./onlinestaff";

import OnlineSetting from "./onlinesetting";

import AddStaff from "./addstaff";
import StaffDetails from "./staffdetail";
import OfflineSalesReportDetails from "../../OFFLINE/offlinesalereportdetail";

export default function OnlineApp() {
  return (
    <div className="offline-app">
      <Routes>
        <Route path="/" element={<OnlineSidebar />}>
          <Route index element={<Navigate to="/onlinepos" replace />}></Route>
          <Route path="onlinepos" element={<OnlinePos />}>
            <Route path="orderprint" element={<PrintFrom />} />
          </Route>

          <Route path="offlinestore" element={<OfflineStore />} />

          <Route path="onlinepos" element={<OnlinePos />} />

          <Route path="/onlinesale" element={<OnlineSale />}>
            <Route path="saledetail" element={<SalesDettail />} />
          </Route>

          <Route path="onlinestaff" element={<OnlineStaff />}>
            <Route path="addstaff" element={<AddStaff />} />
            <Route path="staffdetail" element={<StaffDetails />} />
          </Route>

          <Route path="onlineinventory" element={<OnlineInventory />} />
          <Route path="onlinesetting" element={<OnlineSetting />} />

          <Route path="onlinereport" element={<OnlineReport />}>
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
