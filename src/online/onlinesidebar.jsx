import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import {
  PointOfSaleOutlined,
  ReceiptLongOutlined,
  RestaurantOutlined,
  Inventory2Outlined,
  AssessmentOutlined,
  GroupsOutlined,
  SettingsOutlined,
  Circle,
} from "@mui/icons-material";
import OfflineStore from "../../OFFLINE/offlinestore";

import OnlinePos from "./pr";
import OnlineStaff from "./onlinestaff";
import OnlineInventory from "./onlineinventory";
import OnlineSetting from "./onlinesetting";

import AddStaff from "./addstaff";
import StaffDetails from "./staffdetail";

import OnlineSale from "./onlinesale";
import "../../OFFLINE/offlinesidebar.css";
import PrintFrom from "./orderprint";
import SalesDettail from "./saledetail";
import OnlineReport from "./onlinereport";

const OnlineSidebar = () => {
  const menus = [
    {
      name: "POS Register",
      path: "/onlinepos",
      icon: <PointOfSaleOutlined />,
    },
    {
      name: "Sales",
      path: "/onlinesale",
      icon: <ReceiptLongOutlined />,
    },
    {
      name: "Store Items",
      path: "/offlinestore",
      icon: <RestaurantOutlined />,
    },
    {
      name: "Inventory",
      path: "/onlineinventory",
      icon: <Inventory2Outlined />,
    },
    {
      name: "Reports",
      path: "/onlinereport",
      icon: <AssessmentOutlined />,
    },
    {
      name: "Staff",
      path: "/onlinestaff",
      icon: <GroupsOutlined />,
    },
  ];

  return (
    <div className="offline-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <RestaurantOutlined />
          </div>

          <div className="sidebar-store-info">
            <div className="sidebar-store-name">Fashion Hub</div>

            <div className="sidebar-store-type">Rental Store</div>
          </div>
        </div>

        <div className="sidebar-offline">
          <Circle className="sidebar-offline-dot" />

          <span className="sidebar-offline-text">OFFLINE VERSION</span>
        </div>

        <nav className="sidebar-menu">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
              }
            >
              <span className="sidebar-icon">{menu.icon}</span>

              <span className="sidebar-text">{menu.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-settings">
          <NavLink
            to="/onlinesetting"
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
            }
          >
            <span className="sidebar-icon">
              <SettingsOutlined />
            </span>

            <span className="sidebar-text">Settings</span>
          </NavLink>
        </div>
      </aside>
      <main className="offline-content">
        <Routes>
          <Route path="/" element={<Navigate to="/onlinepos" replace />} />
          <Route path="/onlinepos" element={<OnlinePos />}>
            <Route path="orderprint" element={<PrintFrom />} />
          </Route>
          <Route path="/onlinesale" element={<OnlineSale />}>
            <Route path="saledetail" element={<SalesDettail />} />
          </Route>
          <Route path="/offlinestore" element={<OfflineStore />} />
          <Route path="/onlineinventory" element={<OnlineInventory />} />
          <Route path="/onlinereport" element={<OnlineReport />} />

          <Route path="/onlinestaff" element={<OnlineStaff />}>
            <Route path="addstaff" element={<AddStaff />} />
            <Route path="staffdetail" element={<StaffDetails />} />
          </Route>

          <Route path="/onlinesetting" element={<OnlineSetting />} />
        </Routes>
      </main>
    </div>
  );
};

export default OnlineSidebar;
