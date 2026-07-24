import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "../shopmanagmentcss/managerSidebar.css";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";

export default function ManagerSidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    navigate("/", { replace: true });
  };
  const shopName = "Burger Shop";

  const navItems = [
    {
      name: "Dashboard",
      path: `/shop-detail/dashboard`,
      icon: <DashboardOutlinedIcon />,
    },
    {
      name: "Sales",
      path: `/shop-detail/sales`,
      icon: <PaidOutlinedIcon />,
    },
    {
      name: "Store Menus",
      path: `/shop-detail/store-menus`,
      icon: <MenuBookOutlinedIcon />,
    },
    {
      name: "Production",
      path: `/shop-detail/production`,
      icon: <PrecisionManufacturingOutlinedIcon />,
    },
    {
      name: "POS",
      path: `/shop-detail/pos`,
      icon: <ShoppingBagOutlinedIcon />,
    },
    {
      name: "My Orders",
      path: `/shop-detail/my-orders`,
      icon: <ReceiptLongOutlinedIcon />,
    },
    {
      name: "Inventory",
      path: `/shop-detail/inventory`,
      icon: <Inventory2Icon />,
    },
    {
      name: "Reports",
      path: `/shop-detail/reports`,
      icon: <AssessmentOutlinedIcon />,
    },
    {
      name: "Staff",
      path: `/shop-detail/staff`,
      icon: <PeopleAltOutlinedIcon />,
    },
    {
      name: "Settings",
      path: `/shop-detail/settings`,
      icon: <SettingsOutlinedIcon />,
    },
  ];

  return (
    <aside className="manager-sidebar">
      {/* Brand Profile Section */}
      <div className="manager-brand">
        <div className="brand-circle-logo">
          <RestaurantOutlinedIcon
            sx={{ fontSize: "36px !important", color: "#ffffff" }}
          />
        </div>
        <h2>{shopName}</h2>
      </div>

      {/* Navigation List */}
      <nav className="manager-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.name === "Dashboard"}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Area with Logout */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogoutOutlinedIcon fontSize="small" />
          LOGOUT
        </button>
      </div>
    </aside>
  );
}
