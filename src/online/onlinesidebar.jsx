import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  PointOfSaleOutlined,
  ReceiptLongOutlined,
  RestaurantOutlined,
  Inventory2Outlined,
  AssessmentOutlined,
  GroupsOutlined,
  SettingsOutlined,
  Circle,
  Logout,
} from "@mui/icons-material";
import OfflineStore from "../../OFFLINE/offlinestore";

import OnlinePos from "./pr";
import OfflineStaffManagement from "../../OFFLINE/offlinestaffmanagement";
import OfflineInventory from "../../OFFLINE/offlineinventory";
import OfflineSetting from "../../OFFLINE/offlinesetting";
import OfflineReport from "../../OFFLINE/offlinereport";
import OfflineAddNewStaff from "../../OFFLINE/offlinenewsstaff";
import OfflineSalesReportDetails from "../../OFFLINE/offlinesalereportdetail";
import OrderSlipPreview from "../../OFFLINE/offlineposprint";
import "../../OFFLINE/offlinesidebar.css";

const OnlineSidebar = () => {
  const navigate = useNavigate();

  const menus = [
    {
      name: "POS Register",
      path: "/onlinepos",
      icon: <PointOfSaleOutlined />,
    },
    {
      name: "Sales",
      path: "/offlinesale",
      icon: <ReceiptLongOutlined />,
    },
    {
      name: "Store Items",
      path: "/offlinestore",
      icon: <RestaurantOutlined />,
    },
    {
      name: "Inventory",
      path: "/offlineinventory",
      icon: <Inventory2Outlined />,
    },
    {
      name: "Reports",
      path: "/offlinereport",
      icon: <AssessmentOutlined />,
    },
    {
      name: "Staff",
      path: "/offlinestaff",
      icon: <GroupsOutlined />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("shopMode");
    localStorage.removeItem("loginFailedAttempts");
    localStorage.removeItem("loginLockUntil");

    navigate("/login", { replace: true });
  };

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

          <button
            type="button"
            className="sidebar-item sidebar-logout-button"
            onClick={handleLogout}
          >
            <span className="sidebar-icon">
              <Logout />
            </span>

            <span className="sidebar-text">Logout</span>
          </button>
        </nav>

        <div className="sidebar-settings">
          <NavLink
            to="/offlinesetting"
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

          <Route path="/onlinepos" element={<OnlinePos />} />

          <Route path="/offlineposreg/posslip" element={<OrderSlipPreview />} />

          <Route path="/offlinestore" element={<OfflineStore />} />

          <Route path="/offlineinventory" element={<OfflineInventory />} />

          <Route path="/offlinereport" element={<OfflineReport />} />

          <Route
            path="/offlinereport/details/:reportId"
            element={<OfflineSalesReportDetails />}
          />

          <Route path="/offlinestaff" element={<OfflineStaffManagement />} />

          <Route
            path="/offlinestaff/addstaff"
            element={<OfflineAddNewStaff />}
          />

          <Route path="/offlinesetting" element={<OfflineSetting />} />
        </Routes>
      </main>
    </div>
  );
};

export default OnlineSidebar;
