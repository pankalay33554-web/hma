import { NavLink, Outlet } from "react-router-dom";

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

import "./offlinesidebar.css";

const OfflineSidebar = () => {
  const menus = [
    {
      name: "POS Register",
      path: "offlineposreg",
      icon: <PointOfSaleOutlined />,
    },
    {
      name: "Sales",
      path: "offlinesale",
      icon: <ReceiptLongOutlined />,
    },
    {
      name: "Store Items",
      path: "offlinestore",
      icon: <RestaurantOutlined />,
    },
    {
      name: "Inventory",
      path: "offlineinventory",
      icon: <Inventory2Outlined />,
    },
    {
      name: "Reports",
      path: "offlinereport",
      icon: <AssessmentOutlined />,
    },
    {
      name: "Staff",
      path: "offlinestaff",
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
              end={menu.name === "POS Register"}
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
            to="offlinesetting"
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
        <Outlet />
      </main>
    </div>
  );
};

export default OfflineSidebar;
