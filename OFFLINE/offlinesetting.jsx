import { useState } from "react";
import "./offlinesetting.css";

import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const defaultOperating = {
  openingTime: "09:00 AM",
  closingTime: "09:00 PM",
  closedDays: [],
  lastOrderTime: "08:30 PM",
  closureNotice:
    "Store is operating as normal. No scheduled maintenance or holiday closures at this time.",
};

const defaultReceipt = {
  commercialTax: "5%",
  serviceCharge: "0%",
  paperSize: "80mm Standard Receipt",
  autoPrint: "Enabled (Auto-Print)",
  header:
    "No. 123, Main Street, Yangon\nTel: 09-123456789 • TAX ID: MM-POS-2026-9942",
  footer: "Thank you for dining with us! Please come again.",
};

const timeOptions = [
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const paperSizes = [
  "80mm Standard Receipt",
  "58mm Compact Receipt",
  "A4 Full Page",
];

const printOptions = ["Enabled (Auto-Print)", "Disabled (Manual Print)"];

const taxOptions = ["0%", "3%", "5%", "7%", "10%"];
const serviceOptions = ["0%", "5%", "10%", "15%"];

function OfflineSetting() {
  const [activeTab, setActiveTab] = useState("profile");

  const [operating, setOperating] = useState(defaultOperating);
  const [receipt, setReceipt] = useState(defaultReceipt);

  const [savedOperating, setSavedOperating] = useState(defaultOperating);

  const [savedReceipt, setSavedReceipt] = useState(defaultReceipt);

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showPopup = (message, type = "success") => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup((prev) => ({
        ...prev,
        show: false,
      }));
    }, 2500);
  };

  const handleOperatingChange = (field, value) => {
    setOperating((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReceiptChange = (field, value) => {
    setReceipt((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDayToggle = (day) => {
    setOperating((prev) => {
      const exists = prev.closedDays.includes(day);

      return {
        ...prev,
        closedDays: exists
          ? prev.closedDays.filter((item) => item !== day)
          : [...prev.closedDays, day],
      };
    });
  };

  const handleSave = () => {
    if (activeTab === "hours") {
      setSavedOperating(operating);
      showPopup("Store operating hours have been saved successfully.");
      return;
    }

    if (activeTab === "receipt") {
      setSavedReceipt(receipt);
      showPopup("POS & receipt settings have been saved successfully.");
      return;
    }

    showPopup("Shop profile is already up to date.", "info");
  };

  const handleCancel = () => {
    if (activeTab === "hours") {
      setOperating(savedOperating);
      showPopup("Operating changes have been cancelled.", "info");
      return;
    }

    if (activeTab === "receipt") {
      setReceipt(savedReceipt);
      showPopup("Receipt changes have been cancelled.", "info");
      return;
    }

    showPopup("No profile changes to cancel.", "info");
  };

  const getClosedDaysText = () => {
    if (operating.closedDays.length === 0) {
      return "None (Open Every Day)";
    }

    if (operating.closedDays.length === 7) {
      return "Every Day";
    }

    return operating.closedDays.join(", ");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="settings-header-title">Settings</div>

        <div className="settings-manager">
          <div className="settings-manager-icon">
            <PersonOutlineOutlinedIcon className="settings-manager-svg" />
          </div>

          <div className="settings-manager-info">
            <div className="settings-manager-role">System Manager</div>

            <div className="settings-manager-name">HEIN MIN AUNG</div>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <button
            className={`settings-nav-item ${
              activeTab === "profile" ? "settings-nav-item-active" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <div className="settings-nav-title">General Shop Profile</div>

            <div className="settings-nav-subtitle">Core business identity</div>
          </button>

          <button
            className={`settings-nav-item ${
              activeTab === "receipt" ? "settings-nav-item-active" : ""
            }`}
            onClick={() => setActiveTab("receipt")}
          >
            <div className="settings-nav-title">POS & Receipt Template</div>

            <div className="settings-nav-subtitle">Print layout & billing</div>
          </button>

          <button
            className={`settings-nav-item ${
              activeTab === "hours" ? "settings-nav-item-active" : ""
            }`}
            onClick={() => setActiveTab("hours")}
          >
            <div className="settings-nav-title">Store Operating Hours</div>

            <div className="settings-nav-subtitle">Schedule & holidays</div>
          </button>
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-panel settings-profile-panel">
              <div className="settings-panel-header">
                <div className="settings-panel-icon">
                  <InfoOutlinedIcon className="settings-panel-svg" />
                </div>

                <div className="settings-panel-title">General Shop Profile</div>
              </div>

              <div className="settings-profile-content">
                <div className="settings-shop-summary">
                  <div className="settings-shop-logo">
                    <StorefrontOutlinedIcon className="settings-shop-logo-svg" />
                  </div>

                  <div className="settings-shop-name">Best Wish Bakery</div>

                  <div className="settings-shop-type">FOOD / CAKE SHOP</div>
                </div>{" "}
                <div className="settings-profile-details">
                  <div className="settings-detail-card">
                    <div className="settings-detail-icon">
                      <StorefrontOutlinedIcon className="settings-detail-svg" />
                    </div>

                    <div className="settings-detail-content">
                      <div className="settings-detail-label">SHOP NAME</div>

                      <div className="settings-detail-value">
                        Best Wish Bakery
                      </div>
                    </div>
                  </div>

                  <div className="settings-detail-card">
                    <div className="settings-detail-icon">
                      <LocationOnOutlinedIcon className="settings-detail-svg" />
                    </div>

                    <div className="settings-detail-content">
                      <div className="settings-detail-label">LOCATION</div>

                      <div className="settings-detail-value">
                        No (1), Hlaing Township, Yangon, Myanmar.
                      </div>
                    </div>
                  </div>

                  <div className="settings-detail-card">
                    <div className="settings-detail-icon">
                      <PhoneOutlinedIcon className="settings-detail-svg" />
                    </div>

                    <div className="settings-detail-content">
                      <div className="settings-detail-label">PHONE NUMBER</div>

                      <div className="settings-detail-value">09 987654321</div>
                    </div>
                  </div>

                  <div className="settings-detail-card">
                    <div className="settings-detail-icon">
                      <PersonOutlineOutlinedIcon className="settings-detail-svg" />
                    </div>

                    <div className="settings-detail-content">
                      <div className="settings-detail-label">
                        ASSIGNED MANAGER
                      </div>

                      <div className="settings-detail-value">Hein Min Aung</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "hours" && (
            <div className="settings-panel settings-hours-panel">
              <div className="settings-panel-header">
                <div className="settings-panel-icon">
                  <AccessTimeOutlinedIcon className="settings-panel-svg" />
                </div>

                <div className="settings-panel-title">
                  Store Operating Hours & Schedule
                </div>
              </div>

              <div className="settings-form">
                <div className="settings-form-row">
                  <div className="settings-field">
                    <div className="settings-field-label">OPENING TIME</div>

                    <div className="settings-select-wrapper">
                      <select
                        className="settings-select"
                        value={operating.openingTime}
                        onChange={(e) =>
                          handleOperatingChange("openingTime", e.target.value)
                        }
                      >
                        {timeOptions.map((time) => (
                          <option
                            className="settings-option"
                            key={time}
                            value={time}
                          >
                            {time}
                          </option>
                        ))}
                      </select>

                      <KeyboardArrowDownRoundedIcon className="settings-select-icon" />
                    </div>
                  </div>

                  <div className="settings-field">
                    <div className="settings-field-label">CLOSING TIME</div>

                    <div className="settings-select-wrapper">
                      <select
                        className="settings-select"
                        value={operating.closingTime}
                        onChange={(e) =>
                          handleOperatingChange("closingTime", e.target.value)
                        }
                      >
                        {timeOptions.map((time) => (
                          <option
                            className="settings-option"
                            key={time}
                            value={time}
                          >
                            {time}
                          </option>
                        ))}
                      </select>

                      <KeyboardArrowDownRoundedIcon className="settings-select-icon" />
                    </div>
                  </div>
                </div>

                <div className="settings-field settings-full-field">
                  <div className="settings-field-label">WEEKLY CLOSED DAYS</div>

                  <div className="settings-day-box">
                    <div className="settings-day-selected">
                      {getClosedDaysText()}
                    </div>

                    <KeyboardArrowDownRoundedIcon className="settings-day-arrow" />

                    <div className="settings-day-options">
                      {days.map((day) => (
                        <label className="settings-day-option" key={day}>
                          <input
                            className="settings-day-checkbox"
                            type="checkbox"
                            checked={operating.closedDays.includes(day)}
                            onChange={() => handleDayToggle(day)}
                          />

                          <span className="settings-day-checkmark">
                            {operating.closedDays.includes(day) ? "✓" : ""}
                          </span>

                          <span className="settings-day-text">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="settings-last-order-row">
                  <div className="settings-field settings-last-order-field">
                    <div className="settings-field-label">
                      LAST ORDER TIME (KITCHEN CUT-OFF)
                    </div>
                    <div className="settings-input-icon-wrapper">
                      <input
                        className="settings-input settings-time-input"
                        value={operating.lastOrderTime}
                        onChange={(e) =>
                          handleOperatingChange("lastOrderTime", e.target.value)
                        }
                      />

                      <AccessTimeOutlinedIcon className="settings-input-icon" />
                    </div>{" "}
                    <div className="settings-helper-text">
                      Automatically stops accepting POS orders after this time.
                    </div>
                  </div>

                  <div className="settings-live-box">
                    <InfoOutlinedIcon className="settings-live-icon" />

                    <div className="settings-live-text">
                      <div className="settings-live-title">
                        Operational status is currently live
                      </div>

                      <div className="settings-live-subtitle">
                        across all delivery platforms.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-field settings-full-field">
                  <div className="settings-field-label">
                    TEMPORARY CLOSURE NOTICE
                  </div>

                  <textarea
                    className="settings-textarea settings-closure-textarea"
                    value={operating.closureNotice}
                    onChange={(e) =>
                      handleOperatingChange("closureNotice", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="settings-actions">
                <button
                  className="settings-cancel-button"
                  onClick={handleCancel}
                >
                  <CloseRoundedIcon className="settings-button-svg" />
                  Cancel
                </button>

                <button className="settings-save-button" onClick={handleSave}>
                  <SaveOutlinedIcon className="settings-button-svg" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "receipt" && (
            <div className="settings-panel settings-receipt-panel">
              <div className="settings-panel-header">
                <div className="settings-panel-icon">
                  <ReceiptLongOutlinedIcon className="settings-panel-svg" />
                </div>

                <div className="settings-panel-title">
                  POS & Receipt Printing Settings
                </div>
              </div>

              <div className="settings-form">
                <div className="settings-form-row">
                  <div className="settings-field">
                    <div className="settings-field-label">
                      COMMERCIAL TAX (%)
                    </div>

                    <div className="settings-select-wrapper">
                      <select
                        className="settings-select"
                        value={receipt.commercialTax}
                        onChange={(e) =>
                          handleReceiptChange("commercialTax", e.target.value)
                        }
                      >
                        {taxOptions.map((tax) => (
                          <option
                            className="settings-option"
                            key={tax}
                            value={tax}
                          >
                            {tax}
                          </option>
                        ))}
                      </select>

                      <KeyboardArrowDownRoundedIcon className="settings-select-icon" />
                    </div>
                  </div>

                  <div className="settings-field">
                    <div className="settings-field-label">
                      SERVICE CHARGE (%)
                    </div>{" "}
                    <div className="settings-select-wrapper">
                      <select
                        className="settings-select"
                        value={receipt.serviceCharge}
                        onChange={(e) =>
                          handleReceiptChange("serviceCharge", e.target.value)
                        }
                      >
                        {serviceOptions.map((charge) => (
                          <option
                            className="settings-option"
                            key={charge}
                            value={charge}
                          >
                            {charge}
                          </option>
                        ))}
                      </select>

                      <KeyboardArrowDownRoundedIcon className="settings-select-icon" />
                    </div>
                  </div>
                </div>
                <div className="settings-form-row">
                  <div className="settings-field">
                    <div className="settings-field-label">
                      TERMINAL PAPER SIZE
                    </div>

                    <div className="settings-select-wrapper">
                      <select
                        className="settings-select"
                        value={receipt.paperSize}
                        onChange={(e) =>
                          handleReceiptChange("paperSize", e.target.value)
                        }
                      >
                        {paperSizes.map((size) => (
                          <option
                            className="settings-option"
                            key={size}
                            value={size}
                          >
                            {size}
                          </option>
                        ))}
                      </select>

                      <KeyboardArrowDownRoundedIcon className="settings-select-icon" />
                    </div>
                  </div>

                  <div className="settings-field">
                    <div className="settings-field-label">
                      AUTOMATIC PRINT ON CHECKOUT
                    </div>

                    <div className="settings-select-wrapper">
                      <select
                        className="settings-select"
                        value={receipt.autoPrint}
                        onChange={(e) =>
                          handleReceiptChange("autoPrint", e.target.value)
                        }
                      >
                        {printOptions.map((option) => (
                          <option
                            className="settings-option"
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>

                      <KeyboardArrowDownRoundedIcon className="settings-select-icon" />
                    </div>
                  </div>
                </div>
                <div className="settings-field settings-full-field">
                  <div className="settings-field-label">
                    RECEIPT HEADER NOTE
                  </div>

                  <textarea
                    className="settings-textarea"
                    value={receipt.header}
                    onChange={(e) =>
                      handleReceiptChange("header", e.target.value)
                    }
                  />
                </div>{" "}
                <div className="settings-field settings-full-field">
                  <div className="settings-field-label">
                    RECEIPT FOOTER NOTE
                  </div>

                  <textarea
                    className="settings-textarea"
                    value={receipt.footer}
                    onChange={(e) =>
                      handleReceiptChange("footer", e.target.value)
                    }
                  />
                </div>
                <div className="settings-preview-box">
                  <div className="settings-receipt-preview">
                    <div className="settings-preview-logo">
                      <StorefrontOutlinedIcon className="settings-preview-logo-svg" />
                    </div>

                    <div className="settings-preview-shop">
                      Best Wish Bakery
                    </div>

                    <div className="settings-preview-header">
                      {receipt.header.split("\n").map((line, index) => (
                        <div
                          className="settings-preview-header-line"
                          key={index}
                        >
                          {line}
                        </div>
                      ))}
                    </div>

                    <div className="settings-preview-divider" />

                    <div className="settings-preview-row">
                      <span className="settings-preview-item">
                        Chicken Burger
                      </span>

                      <span className="settings-preview-price">8,000</span>
                    </div>

                    <div className="settings-preview-row">
                      <span className="settings-preview-item">
                        French Fries
                      </span>

                      <span className="settings-preview-price">3,000</span>
                    </div>

                    <div className="settings-preview-row">
                      <span className="settings-preview-item">Soft Drink</span>

                      <span className="settings-preview-price">2,000</span>
                    </div>

                    <div className="settings-preview-divider" />

                    <div className="settings-preview-total-row">
                      <span className="settings-preview-total-label">
                        Subtotal
                      </span>

                      <span className="settings-preview-total">13,000</span>
                    </div>

                    <div className="settings-preview-total-row">
                      <span className="settings-preview-total-label">
                        Tax ({receipt.commercialTax})
                      </span>

                      <span className="settings-preview-total">650</span>
                    </div>

                    <div className="settings-preview-total-row">
                      <span className="settings-preview-total-label">
                        Service ({receipt.serviceCharge})
                      </span>

                      <span className="settings-preview-total">0</span>
                    </div>

                    <div className="settings-preview-divider" />

                    <div className="settings-preview-grand-row">
                      <span className="settings-preview-grand-label">
                        TOTAL
                      </span>{" "}
                      <span className="settings-preview-grand">13,650</span>
                    </div>

                    <div className="settings-preview-footer">
                      {receipt.footer}
                    </div>
                  </div>

                  <div className="settings-preview-description">
                    <div className="settings-preview-description-title">
                      Dynamic Preview
                    </div>

                    <div className="settings-preview-description-text">
                      Real-time simulation of how your headers and footers will
                      appear on the thermal printing paper. Changes are
                      automatically reflected in this preview.
                    </div>

                    <div className="settings-preview-paper-info">
                      {receipt.paperSize}
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button
                  className="settings-cancel-button"
                  onClick={handleCancel}
                >
                  <CloseRoundedIcon className="settings-button-svg" />
                  Cancel
                </button>

                <button className="settings-save-button" onClick={handleSave}>
                  <SaveOutlinedIcon className="settings-button-svg" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {popup.show && (
        <div className="settings-popup-overlay">
          <div
            className={`settings-popup ${
              popup.type === "info"
                ? "settings-popup-info"
                : "settings-popup-success"
            }`}
          >
            <div className="settings-popup-icon">
              {popup.type === "info" ? (
                <InfoOutlinedIcon className="settings-popup-svg" />
              ) : (
                <CheckCircleRoundedIcon className="settings-popup-svg" />
              )}
            </div>

            <div className="settings-popup-content">
              <div className="settings-popup-title">
                {popup.type === "info" ? "Information" : "Success"}
              </div>

              <div className="settings-popup-message">{popup.message}</div>
            </div>

            <button
              className="settings-popup-close"
              onClick={() =>
                setPopup((prev) => ({
                  ...prev,
                  show: false,
                }))
              }
            >
              <CloseRoundedIcon className="settings-popup-close-svg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OfflineSetting;
