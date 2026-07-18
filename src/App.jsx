import { Routes, Route } from "react-router-dom";
import Nav from "./nav";
import Login from "./login/owner_login";
import Dashboard from "./ownerdashboard/dashboard";
import Menus from "./ownerdashboard/menu";
import Production from "./ownerdashboard/production";
import PrivateRoute from "./login/PrivateRoute";
import Order from "./ownerdashboard/order";
import Inventory from "./ownerdashboard/inventory";
import Reports from "./ownerdashboard/report";
import Users from "./ownerdashboard/user";
import Shop from "./ownerdashboard/shop";
import Settings from "./ownerdashboard/setting";
import EditRecipe from "./ownercomponent/editrecipe";
import AddProduction from "./ownercomponent/addproduction";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/nav"
        element={
          <PrivateRoute>
            <Nav />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menus" element={<Menus />} />
        <Route path="production" element={<Production />}>
          <Route path="editreciepe" element={<EditRecipe />} />
          <Route path="addproduction" element={<AddProduction />} />
        </Route>

        <Route path="order" element={<Order />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="shop" element={<Shop />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
