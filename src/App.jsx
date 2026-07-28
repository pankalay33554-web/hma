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
import ViewProduct from "./ownercomponent/viewproduction";
import InventoryAddItem from "./ownercomponent/inventoryadditem";
import InventoryUpdateItem from "./ownercomponent/inventoryupdateitem";
import AddNewShop from "./ownercomponent/addnewshop";
import UpdateShop from "./ownercomponent/updateshop";
import ViewInventory from "./ownercomponent/viewinventory";
import SettingPassword from "./ownercomponent/settingpassword";
import GeneralSetting from "./ownercomponent/generalsetting";
import ViewProductDetail from "./ownercomponent/viewproductdetail";
import SettingBackup from "./ownercomponent/settingbackup";

// 💡 Manager Layout Pages Import
import ShopDetail from "./shopmanagment/shopDetail";
import ManagerDashboard from "./shopmanagment/managerDashboard";
import Sales from "./shopmanagment/sales";
import StoreMenus from "./shopmanagment/storeMenus";
import ManagerProduction from "./shopmanagment/managerProduction";
import PointofSales from "./shopmanagment/pos";
import MyOrders from "./shopmanagment/myOrders";
import ManagerInventory from "./shopmanagment/managerInventory";
import ManagerReports from "./shopmanagment/managerReports";
import ManagerStaff from "./shopmanagment/managerStaff";
import ManagerSettings from "./shopmanagment/managerSettings";
import RecipeManager from "./shopmanagment/recipeManager";

import SalesPerson from "./salepos/salesPerson";
import OrderHistory from "./salepos/orderHistory";

export default function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<Login />} />
      {/*  OWNER PORTAL  */}
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
          <Route path="viewproduct" element={<ViewProduct />}>
            <Route path="viewproductdetail" element={<ViewProductDetail />} />
          </Route>
        </Route>

        <Route path="order" element={<Order />} />
        <Route path="inventory" element={<Inventory />}>
          <Route path="inventoryadditem" element={<InventoryAddItem />} />
          <Route path="inventoryupdateitem" element={<InventoryUpdateItem />} />
          <Route path="viewinventory" element={<ViewInventory />} />
        </Route>
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="shop" element={<Shop />}>
          <Route path="addnewshop" element={<AddNewShop />} />
          <Route path="updateshop" element={<UpdateShop />} />
        </Route>
        <Route path="settings" element={<Settings />}>
          <Route index element={<GeneralSetting />} />
          <Route path="settingpassword" element={<SettingPassword />} />
          <Route path="settingbackup" element={<SettingBackup />} />
        </Route>
      </Route>
      {/* MANAGER PORTAL */}
      <Route
        path="/shop-detail"
        element={
          <PrivateRoute>
            <ShopDetail />
          </PrivateRoute>
        }
      >
        {/* shop managment */}
        <Route index element={<ManagerDashboard />} />
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="sales" element={<Sales />} />
        <Route path="store-menus" element={<StoreMenus />} />
        <Route path="production" element={<ManagerProduction />} />
        <Route path="pos" element={<PointofSales />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="inventory" element={<ManagerInventory />} />
        <Route path="reports" element={<ManagerReports />} />
        <Route path="staff" element={<ManagerStaff />} />
        <Route path="settings" element={<ManagerSettings />} />
        <Route path="production/recipe/:id" element={<RecipeManager />} />
      </Route>
      {/*  SALESPERSON PORTAL  */}
      <Route
        path="/salesperson"
        element={
          <PrivateRoute>
            <SalesPerson />
          </PrivateRoute>
        }
      />
      <Route
        path="/order-history"
        element={
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        }
      />{" "}
    </Routes>
  );
}
