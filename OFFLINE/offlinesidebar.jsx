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
import OfflineStore from "./offlinestore";
import OfflineSaleList from "./offlinsalelist";
import OfflinePos from "./offlinepos";
import OfflineStaffManagement from "./offlinestaffmanagement";
import OfflineInventory from "./offlineinventory";
import OfflineSetting from "./offlinesetting";
import OfflineReport from "./offlinereport";
import OfflineAddNewStaff from "./offlinenewsstaff";
import OfflineSalesReportDetails from "./offlinesalereportdetail";

import OfflineAddMenuItem from "./offlineaddmenuitem";
import "./offlinesidebar.css";
import OfflineEditMenuItem from "./offlineeditmenuitem";

const OfflineSidebar = () => {
  const navigate = useNavigate();

  const menus = [
    {
      name: "POS Register",
      path: "/offlineposreg",
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
            <div className="sidebar-store-name">Best Wish Bakery</div>

            <div className="sidebar-store-type">F&B / Cafe</div>
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
          <Route path="/" element={<Navigate to="/offlineposreg" replace />} />

          <Route path="/offlineposreg" element={<OfflinePos />} />

          <Route path="/offlinesale" element={<OfflineSaleList />} />

          <Route path="/offlinestore" element={<OfflineStore />}>
            <Route path="offlineaddmenuitem" element={<OfflineAddMenuItem />} />
            <Route
              path="offlineeditmenuitem"
              element={<OfflineEditMenuItem />}
            />
          </Route>

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

export default OfflineSidebar;
