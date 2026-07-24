import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SalesReportView from "./salesReportView";
import InventoryReportView from "./inventoryReportView";
import "../shopmanagmentcss/managerReports.css";

export default function ManagerReports() {
  // (SALESINVENTORY)
  const [activeReportTab, setActiveReportTab] = useState("SALES");

  return (
    <div className="sales-page-wrapper printable-area-target">
      {/* Dynamic Top Bar Header Section */}
      <header className="sales-top-bar non-printable">
        <div className="top-title-area">
          <h1>
            {activeReportTab === "SALES" ? "Sales Report" : "Inventory Report"}
          </h1>
          <span className="badge-shop">Burger Shop 1</span>
        </div>

        <div className="top-bar-right-actions-group">
          {/* UI Switch Toggle Button Bar */}
          <div className="report-toggle-switch-container">
            <button
              className={`toggle-switch-btn ${activeReportTab === "SALES" ? "active-toggle" : ""}`}
              onClick={() => setActiveReportTab("SALES")}
            >
              Sales
            </button>
            <button
              className={`toggle-switch-btn ${activeReportTab === "INVENTORY" ? "active-toggle" : ""}`}
              onClick={() => setActiveReportTab("INVENTORY")}
            >
              Inventory
            </button>
          </div>

          <div className="user-profile">
            <div className="profile-divider"></div>
            <div className="profile-text">
              <span className="role">Executive Manager</span>
              <span className="name">HEIN MIN AUNG</span>
            </div>
          </div>
        </div>
      </header>

      {/* Render Selected Sub Report Screen View Section */}
      <div className="sales-body-container">
        {activeReportTab === "SALES" ? (
          <SalesReportView />
        ) : (
          <InventoryReportView />
        )}
      </div>
    </div>
  );
}
