import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function GeneralShopProfile({ shopId }) {
  const mockShopData = {
    name: `Burger Shop ${shopId}`,
    location: "No (1), Hlaing Township, Yangon, Myanmar.",
    phone: "09 987654321",
    manager: "Hein Min Aung",
  };

  return (
    <div className="settings-card-container animate-fade-in">
      <div className="settings-card-header">
        <InfoOutlinedIcon className="header-info-icon" />
        <h2>General Shop Profile</h2>
      </div>

      <div className="shop-profile-grid-layout">
        {/* Left Side Avatar & Brand Title */}
        <div className="shop-avatar-brand-zone">
          <div className="maroon-store-icon-box">
            <StorefrontIcon style={{ fontSize: "2.8rem", color: "#ffffff" }} />
          </div>
          <h3>{mockShopData.name}</h3>
          <span className="registered-branch-tag">
            REGISTERED BRANCH OFFICE
          </span>
        </div>

        {/* Right Side Cards List */}
        <div className="shop-info-list-zone">
          <div className="info-item-card">
            <div className="info-icon-square">
              <BadgeOutlinedIcon
                style={{ fontSize: "1.3rem", color: "#666" }}
              />
            </div>
            <div className="info-text-details">
              <span className="info-label">SHOP NAME</span>
              <p className="info-value">{mockShopData.name}</p>
            </div>
          </div>

          <div className="info-item-card">
            <div className="info-icon-square">
              <PlaceOutlinedIcon
                style={{ fontSize: "1.3rem", color: "#666" }}
              />
            </div>
            <div className="info-text-details">
              <span className="info-label">LOCATION</span>
              <p className="info-value">{mockShopData.location}</p>
            </div>
          </div>

          <div className="info-item-card">
            <div className="info-icon-square">
              <LocalPhoneOutlinedIcon
                style={{ fontSize: "1.3rem", color: "#666" }}
              />
            </div>
            <div className="info-text-details">
              <span className="info-label">PHONE NUMBER</span>
              <p className="info-value">{mockShopData.phone}</p>
            </div>
          </div>

          <div className="info-item-card">
            <div className="info-icon-square">
              <PersonOutlineOutlinedIcon
                style={{ fontSize: "1.3rem", color: "#666" }}
              />
            </div>
            <div className="info-text-details">
              <span className="info-label">ASSIGNED MANAGER</span>
              <p className="info-value">{mockShopData.manager}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
