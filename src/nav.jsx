import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Hero from "./assets/hero.png";
import "./style/nav.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import FactoryIcon from "@mui/icons-material/Factory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Nav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    navigate("/", { replace: true });
  };
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo">
            <img src={Hero} alt="image" />
          </div>
          <h2>Shop Name</h2>
        </div>

        <nav>
          <NavLink to="dashboard">
            <DashboardIcon /> Dashboard
          </NavLink>
          <NavLink to="menus">
            <MenuIcon /> Menus
          </NavLink>
          <NavLink to="production">
            <FactoryIcon /> Production
          </NavLink>
          <NavLink to="order">
            <ShoppingCartIcon /> Order
          </NavLink>
          <NavLink to="inventory">
            <Inventory2Icon /> Inventory
          </NavLink>
          <NavLink to="reports">
            <AssessmentIcon /> Reports
          </NavLink>
          <NavLink to="users">
            <GroupIcon /> Users
          </NavLink>
          <NavLink to="shop">
            <StoreIcon /> Shop
          </NavLink>
          <NavLink to="settings">
            <SettingsIcon /> Settings
          </NavLink>
        </nav>

        <button className="logout" onClick={handleLogout}>
          <LogoutIcon /> Logout
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
