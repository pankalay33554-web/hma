import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ManagerSidebar from "./managerSidebar";
import "../shopmanagmentcss/shopDetail.css";

export default function ShopDetail() {
  return (
    <div className="manager-layout">
      {/*Left Sidebar */}
      <ManagerSidebar />

      {/* Right Layout */}
      <main className="manager-main-content">
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
