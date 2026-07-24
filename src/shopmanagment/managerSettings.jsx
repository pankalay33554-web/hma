import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GeneralShopProfile from "./generalShopProfile";
import PosReceiptTemplate from "./posReceiptTemplate";
import StoreOperatingHours from "./storeOperatingHours";
import BackupRestore from "./backupRestore";
import "../shopmanagmentcss/managerSettings.css";

export default function ManagerSettings() {
  const [activeTab, setActiveTab] = useState("GENERAL_PROFILE");

  // Dynamic Content Render Logic
  const renderTabContent = () => {
    switch (activeTab) {
      case "GENERAL_PROFILE":
        return <GeneralShopProfile />;
      case "POS_RECEIPT":
        return <PosReceiptTemplate />;
      case "OPERATING_HOURS":
        return <StoreOperatingHours />;
      case "BACKUP_RESTORE":
        return <BackupRestore />;
      default:
        return <GeneralShopProfile />;
    }
  };

  return (
    <div className="settings-page-wrapper">
      {/* Top Header Bar */}
      <header className="sales-top-bar">
        <div className="top-title-area">
          <h1>Settings</h1>
          <span className="badge-shop">Burger Shop 1</span>
        </div>

        <div className="top-bar-right-actions-group">
          <div className="user-profile">
            <div className="profile-divider"></div>
            <div className="profile-text">
              <span className="role">Executive Manager</span>
              <span className="name">HEIN MIN AUNG</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container with Sub-Sidebar + Right View Zone */}
      <div className="settings-main-container">
        {/* Sub-Sidebar Navigation */}
        <aside className="settings-sub-sidebar">
          <div
            className={`sub-nav-item ${activeTab === "GENERAL_PROFILE" ? "active" : ""}`}
            onClick={() => setActiveTab("GENERAL_PROFILE")}
          >
            <div className="sub-nav-content">
              <h4>General Shop Profile</h4>
              <p>Core business identity</p>
            </div>
          </div>

          <div
            className={`sub-nav-item ${activeTab === "POS_RECEIPT" ? "active" : ""}`}
            onClick={() => setActiveTab("POS_RECEIPT")}
          >
            <div className="sub-nav-content">
              <h4>POS & Receipt Template</h4>
              <p>Print layouts & billing</p>
            </div>
          </div>

          <div
            className={`sub-nav-item ${activeTab === "OPERATING_HOURS" ? "active" : ""}`}
            onClick={() => setActiveTab("OPERATING_HOURS")}
          >
            <div className="sub-nav-content">
              <h4>Store Operating Hours</h4>
              <p>Schedules & holidays</p>
            </div>
          </div>

          <div
            className={`sub-nav-item ${activeTab === "BACKUP_RESTORE" ? "active" : ""}`}
            onClick={() => setActiveTab("BACKUP_RESTORE")}
          >
            <div className="sub-nav-content">
              <h4>Backup & Restore</h4>
              <p>Database security</p>
            </div>
          </div>
        </aside>

        {/* Dynamic Display Right Content Zone */}
        <section className="settings-content-zone">
          {renderTabContent()}
        </section>
      </div>
    </div>
  );
}
