import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./onlinesetting.css";

const defaultGeneral = {
  shopName: "Best Wish Bakery",
  address: "No (1), Hlaing Township, Yangon, Myanmar",
  phone: "09 987654321",
  manager: "Hnin Min Aung",
};

const defaultReceipt = {
  currency: "Ks",
  serviceCharge: "0%",
  receiptSize: "80mm Standard Receipt",
  autoPrint: "Enabled (Auto-Print)",
  header:
    "No. 133, Hledan Street, Yangon\nTel: 09-123456789 • Tax ID: HMA-DC-2006-9942",
  footer: "Thank you for dining with us! Please come again.",
};

const defaultSchedule = {
  openingTime: "08:00 AM",
  closingTime: "09:00 PM",
  closedDays: [],
  gracePeriod: "08:30 AM",
  scheduleNote:
    "Store is operating as normal. No scheduled maintenance or holiday closures at this time.",
  allowOrderingBeforeOpen: true,
};

const defaultManagerProfile = {
  fullName: "Hnin Min Aung",
  email: "hninmin@gmail.com",
  password: "1234567890",
};

const menuItems = [
  {
    id: "general",
    title: "General Shop Profile",
    subtitle: "Store information & identity",
    icon: <StorefrontOutlinedIcon />,
  },
  {
    id: "receipt",
    title: "POS & Receipt Template",
    subtitle: "POS and printing settings",
    icon: <ReceiptLongOutlinedIcon />,
  },
  {
    id: "schedule",
    title: "Store Operating Hours",
    subtitle: "Schedule & availability",
    icon: <AccessTimeOutlinedIcon />,
  },
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const OnlineSetting = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("general");

  const [generalForm, setGeneralForm] = useState(defaultGeneral);
  const [receiptForm, setReceiptForm] = useState(defaultReceipt);
  const [scheduleForm, setScheduleForm] = useState(defaultSchedule);

  const [showManagerProfile, setShowManagerProfile] = useState(false);

  const [managerProfile, setManagerProfile] = useState(defaultManagerProfile);

  const [showManagerPassword, setShowManagerPassword] = useState(false);

  const [showLogoutVerification, setShowLogoutVerification] = useState(false);

  const [logoutPassword, setLogoutPassword] = useState("");

  const [showLogoutPassword, setShowLogoutPassword] = useState(false);

  const [logoutError, setLogoutError] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({
      show: true,
      type,
      message,
    });
    setTimeout(() => {
      setPopup({
        show: false,
        type: "success",
        message: "",
      });
    }, 3000);
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: "success",
      message: "",
    });
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;

    setGeneralForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReceiptChange = (e) => {
    const { name, value } = e.target;

    setReceiptForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;

    setScheduleForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleManagerProfileChange = (e) => {
    const { name, value } = e.target;

    setManagerProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClosedDayChange = (day) => {
    setScheduleForm((prev) => {
      const exists = prev.closedDays.includes(day);

      return {
        ...prev,
        closedDays: exists
          ? prev.closedDays.filter((item) => item !== day)
          : [...prev.closedDays, day],
      };
    });
  };

  const handleToggleOrdering = () => {
    setScheduleForm((prev) => ({
      ...prev,
      allowOrderingBeforeOpen: !prev.allowOrderingBeforeOpen,
    }));
  };

  const validateGeneral = () => {
    if (!generalForm.shopName.trim()) {
      showPopup("error", "Please enter the shop name.");
      return false;
    }

    if (!generalForm.address.trim()) {
      showPopup("error", "Please enter the shop address.");
      return false;
    }

    if (!generalForm.phone.trim()) {
      showPopup("error", "Please enter the phone number.");
      return false;
    }

    if (!generalForm.manager.trim()) {
      showPopup("error", "Please enter the store manager.");
      return false;
    }

    return true;
  };

  const validateReceipt = () => {
    if (!receiptForm.currency.trim()) {
      showPopup("error", "Please enter the currency.");
      return false;
    }

    if (!receiptForm.serviceCharge.trim()) {
      showPopup("error", "Please enter the service charge.");
      return false;
    }

    if (!receiptForm.receiptSize) {
      showPopup("error", "Please select receipt size.");
      return false;
    }

    if (!receiptForm.autoPrint) {
      showPopup("error", "Please select auto print option.");
      return false;
    }

    if (!receiptForm.header.trim()) {
      showPopup("error", "Please enter the receipt header.");
      return false;
    }

    if (!receiptForm.footer.trim()) {
      showPopup("error", "Please enter the receipt footer.");
      return false;
    }

    return true;
  };

  const validateSchedule = () => {
    if (!scheduleForm.openingTime) {
      showPopup("error", "Please select opening time.");
      return false;
    }

    if (!scheduleForm.closingTime) {
      showPopup("error", "Please select closing time.");
      return false;
    }

    if (!scheduleForm.gracePeriod.trim()) {
      showPopup("error", "Please enter last order time.");
      return false;
    }

    if (!scheduleForm.scheduleNote.trim()) {
      showPopup("error", "Please enter the temporary closure notice.");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (activeMenu === "general") {
      if (!validateGeneral()) return;

      showPopup("success", "General shop profile saved successfully.");

      return;
    }

    if (activeMenu === "receipt") {
      if (!validateReceipt()) return;

      showPopup("success", "POS & receipt settings saved successfully.");

      return;
    }

    if (activeMenu === "schedule") {
      if (!validateSchedule()) return;

      showPopup("success", "Store operating hours saved successfully.");
    }
  };

  const handleCancel = () => {
    if (activeMenu === "general") {
      setGeneralForm({ ...defaultGeneral });
    }

    if (activeMenu === "receipt") {
      setReceiptForm({ ...defaultReceipt });
    }

    if (activeMenu === "schedule") {
      setScheduleForm({
        ...defaultSchedule,
        closedDays: [],
      });
    }

    showPopup("success", "Form has been reset to the default values.");
  };

  const handleOpenManagerProfile = () => {
    setShowManagerProfile(true);
  };

  const handleCloseManagerProfile = () => {
    setShowManagerProfile(false);
  };

  const handleSaveManagerProfile = () => {
    if (!managerProfile.fullName.trim()) {
      showPopup("error", "Please enter your full name.");
      return;
    }

    if (!managerProfile.email.trim()) {
      showPopup("error", "Please enter your email.");
      return;
    }

    if (!managerProfile.email.includes("@")) {
      showPopup("error", "Please enter a valid email address.");
      return;
    }

    if (!managerProfile.password.trim()) {
      showPopup("error", "Please enter your password.");
      return;
    }

    showPopup("success", "Manager profile changes saved successfully.");
  };

  const handleOpenLogoutVerification = () => {
    setLogoutPassword("");
    setLogoutError("");
    setShowLogoutPassword(false);
    setShowLogoutVerification(true);
  };

  const handleCancelLogout = () => {
    setLogoutPassword("");
    setLogoutError("");
    setShowLogoutPassword(false);
    setShowLogoutVerification(false);
  };

  const renderGeneralProfile = () => {
    return (
      <div className="settings-content-panel settings-fade-in">
        <div className="settings-section-header">
          <div className="settings-section-icon">
            <InfoOutlinedIcon />
          </div>

          <div className="settings-section-title-box">
            <h2 className="settings-section-title">General Shop Profile</h2>

            <p className="settings-section-subtitle">
              Manage your shop information and identity
            </p>
          </div>
        </div>

        <div className="settings-general-layout">
          <div className="settings-shop-preview">
            <div className="settings-shop-logo">
              <StorefrontOutlinedIcon />
            </div>

            <div className="settings-shop-preview-name">
              {generalForm.shopName || "Shop Name"}
            </div>

            <div className="settings-shop-preview-label">
              FRESH BAKERY &amp; CAFE
            </div>
          </div>

          <div className="settings-general-fields">
            <div className="settings-field-card">
              <div className="settings-field-icon">
                <StorefrontOutlinedIcon />
              </div>

              <div className="settings-field-content">
                <label className="settings-field-label">SHOP NAME</label>

                <input
                  className="settings-input settings-input-clean"
                  name="shopName"
                  value={generalForm.shopName}
                  onChange={handleGeneralChange}
                  placeholder="Enter shop name"
                />
              </div>
            </div>

            <div className="settings-field-card">
              <div className="settings-field-icon">
                <LocationOnOutlinedIcon />
              </div>
              <div className="settings-field-content">
                <label className="settings-field-label">LOCATION</label>

                <input
                  className="settings-input settings-input-clean"
                  name="address"
                  value={generalForm.address}
                  onChange={handleGeneralChange}
                  placeholder="Enter shop address"
                />
              </div>
            </div>

            <div className="settings-field-card">
              <div className="settings-field-icon">
                <PhoneOutlinedIcon />
              </div>

              <div className="settings-field-content">
                <label className="settings-field-label">PHONE NUMBER</label>

                <input
                  className="settings-input settings-input-clean"
                  name="phone"
                  value={generalForm.phone}
                  onChange={handleGeneralChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="settings-field-card">
              <div className="settings-field-icon">
                <PersonOutlineOutlinedIcon />
              </div>

              <div className="settings-field-content">
                <label className="settings-field-label">STORE MANAGER</label>

                <input
                  className="settings-input settings-input-clean"
                  name="manager"
                  value={generalForm.manager}
                  onChange={handleGeneralChange}
                  placeholder="Enter manager name"
                />
              </div>
            </div>
          </div>
        </div>

        <SettingsActionButtons onCancel={handleCancel} onSave={handleSave} />
      </div>
    );
  };

  const renderReceiptSettings = () => {
    return (
      <div className="settings-content-panel settings-fade-in">
        <div className="settings-section-header">
          <div className="settings-section-icon settings-section-icon-receipt">
            <ReceiptLongOutlinedIcon />
          </div>

          <div className="settings-section-title-box">
            <h2 className="settings-section-title">
              POS &amp; Receipt Printing Settings
            </h2>

            <p className="settings-section-subtitle">
              Configure POS and receipt printing preferences
            </p>
          </div>
        </div>

        <div className="settings-two-column">
          <div className="settings-form-group">
            <label className="settings-form-label">CURRENCY</label>

            <div className="settings-input-wrapper">
              <input
                className="settings-input"
                name="currency"
                value={receiptForm.currency}
                onChange={handleReceiptChange}
                placeholder="Currency"
              />
            </div>
          </div>

          <div className="settings-form-group">
            <label className="settings-form-label">SERVICE CHARGE (%)</label>

            <div className="settings-input-wrapper">
              <input
                className="settings-input"
                name="serviceCharge"
                value={receiptForm.serviceCharge}
                onChange={handleReceiptChange}
                placeholder="Service charge"
              />
            </div>
          </div>
        </div>

        <div className="settings-two-column">
          <div className="settings-form-group">
            <label className="settings-form-label">RECEIPT SIZE</label>
            <div className="settings-select-wrapper">
              <select
                className="settings-select"
                name="receiptSize"
                value={receiptForm.receiptSize}
                onChange={handleReceiptChange}
              >
                <option value="80mm Standard Receipt">
                  80mm Standard Receipt
                </option>

                <option value="58mm Compact Receipt">
                  58mm Compact Receipt
                </option>

                <option value="A4 Receipt">A4 Receipt</option>
              </select>

              <KeyboardArrowDownIcon className="settings-select-icon" />
            </div>
          </div>

          <div className="settings-form-group">
            <label className="settings-form-label">
              AUTO PRINT RECEIPT AFTER CHECKOUT
            </label>

            <div className="settings-select-wrapper">
              <select
                className="settings-select"
                name="autoPrint"
                value={receiptForm.autoPrint}
                onChange={handleReceiptChange}
              >
                <option value="Enabled (Auto-Print)">
                  Enabled (Auto-Print)
                </option>

                <option value="Disabled">Disabled</option>
              </select>

              <KeyboardArrowDownIcon className="settings-select-icon" />
            </div>
          </div>
        </div>

        <div className="settings-form-group settings-full-field">
          <label className="settings-form-label">RECEIPT HEADER</label>

          <textarea
            className="settings-textarea"
            name="header"
            value={receiptForm.header}
            onChange={handleReceiptChange}
            rows="3"
            placeholder="Enter receipt header"
          />
        </div>

        <div className="settings-form-group settings-full-field">
          <label className="settings-form-label">RECEIPT FOOTER</label>

          <textarea
            className="settings-textarea"
            name="footer"
            value={receiptForm.footer}
            onChange={handleReceiptChange}
            rows="2"
            placeholder="Enter receipt footer"
          />
        </div>

        <div className="settings-preview-box">
          <div className="settings-receipt-preview">
            <div className="settings-receipt-preview-logo">
              <StorefrontOutlinedIcon />
            </div>
            <div className="settings-receipt-preview-title">
              BEST WISH BAKERY
            </div>
            <div className="settings-receipt-preview-address">
              {receiptForm.header.split("\n").map((line, index) => (
                <div className="settings-receipt-line" key={index}>
                  {line}
                </div>
              ))}
            </div>
            <div className="settings-receipt-divider" />
            <div className="settings-receipt-row">
              <span className="settings-receipt-text">Beef Burger</span>

              <span className="settings-receipt-text">10,000</span>
            </div>
            <div className="settings-receipt-row">
              <span className="settings-receipt-text">Apple Juice</span>

              <span className="settings-receipt-text">5,000</span>
            </div>
            <div className="settings-receipt-divider" />
            <div className="settings-receipt-row settings-receipt-total">
              <span className="settings-receipt-text">TOTAL</span>

              <span className="settings-receipt-text">15,000 Ks</span>
            </div>{" "}
            <div className="settings-receipt-footer">{receiptForm.footer}</div>
          </div>

          <div className="settings-preview-description">
            <div className="settings-preview-icon">
              <PrintOutlinedIcon />
            </div>

            <div className="settings-preview-text-box">
              <div className="settings-preview-title">Dynamic Preview</div>

              <div className="settings-preview-description-text">
                This preview updates automatically as you edit your receipt
                header, footer and printing preferences.
              </div>

              <div className="settings-preview-format">
                {receiptForm.receiptSize}
              </div>
            </div>
          </div>
        </div>

        <SettingsActionButtons onCancel={handleCancel} onSave={handleSave} />
      </div>
    );
  };

  const renderScheduleSettings = () => {
    return (
      <div className="settings-content-panel settings-fade-in">
        <div className="settings-section-header">
          <div className="settings-section-icon settings-section-icon-schedule">
            <ScheduleOutlinedIcon />
          </div>

          <div className="settings-section-title-box">
            <h2 className="settings-section-title">
              Store Operating Hours &amp; Schedule
            </h2>

            <p className="settings-section-subtitle">
              Configure your store's daily operating schedule
            </p>
          </div>
        </div>

        <div className="settings-two-column">
          <div className="settings-form-group">
            <label className="settings-form-label">OPENING TIME</label>

            <div className="settings-select-wrapper">
              <select
                className="settings-select"
                name="openingTime"
                value={scheduleForm.openingTime}
                onChange={handleScheduleChange}
              >
                <option value="06:00 AM">06:00 AM</option>

                <option value="07:00 AM">07:00 AM</option>

                <option value="08:00 AM">08:00 AM</option>

                <option value="09:00 AM">09:00 AM</option>

                <option value="10:00 AM">10:00 AM</option>
              </select>

              <KeyboardArrowDownIcon className="settings-select-icon" />
            </div>
          </div>

          <div className="settings-form-group">
            <label className="settings-form-label">CLOSING TIME</label>

            <div className="settings-select-wrapper">
              <select
                className="settings-select"
                name="closingTime"
                value={scheduleForm.closingTime}
                onChange={handleScheduleChange}
              >
                <option value="06:00 PM">06:00 PM</option>

                <option value="07:00 PM">07:00 PM</option>

                <option value="08:00 PM">08:00 PM</option>

                <option value="09:00 PM">09:00 PM</option>

                <option value="10:00 PM">10:00 PM</option>

                <option value="11:00 PM">11:00 PM</option>
              </select>

              <KeyboardArrowDownIcon className="settings-select-icon" />
            </div>
          </div>
        </div>

        <div className="settings-form-group settings-full-field">
          <label className="settings-form-label">WEEKLY CLOSURE DAYS</label>
          <div className="settings-days-box">
            <div className="settings-days-placeholder">
              {scheduleForm.closedDays.length === 0
                ? "None (Open Every Day)"
                : scheduleForm.closedDays.join(", ")}
            </div>

            <KeyboardArrowDownIcon className="settings-days-arrow" />
          </div>

          <div className="settings-days-list">
            {weekDays.map((day) => (
              <button
                type="button"
                className={`settings-day-chip ${
                  scheduleForm.closedDays.includes(day)
                    ? "settings-day-chip-active"
                    : ""
                }`}
                key={day}
                onClick={() => handleClosedDayChange(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-schedule-row">
          <div className="settings-form-group settings-grace-group">
            <label className="settings-form-label">
              LAST ORDER TIME BEFORE CLOSING
            </label>

            <div className="settings-time-input-wrapper">
              <input
                className="settings-input"
                name="gracePeriod"
                value={scheduleForm.gracePeriod}
                onChange={handleScheduleChange}
                placeholder="Enter last order time"
              />

              <AccessAlarmOutlinedIcon className="settings-time-icon" />
            </div>

            <div className="settings-help-text">
              Allow ordering before closing time.
            </div>
          </div>

          <div className="settings-info-box">
            <InfoOutlinedIcon className="settings-info-icon" />

            <div className="settings-info-text">
              <div className="settings-info-title">Operational notice</div>

              <div className="settings-info-description">
                Operating hours are currently live across your store.
              </div>
            </div>
          </div>
        </div>

        <div className="settings-form-group settings-full-field">
          <label className="settings-form-label">
            TEMPORARY CLOSURE NOTICE
          </label>

          <textarea
            className="settings-textarea settings-notice-textarea"
            name="scheduleNote"
            value={scheduleForm.scheduleNote}
            onChange={handleScheduleChange}
            rows="4"
            placeholder="Enter temporary closure notice"
          />
        </div>

        <div className="settings-toggle-row">
          <div className="settings-toggle-content">
            <div className="settings-toggle-title">
              Allow ordering before opening
            </div>

            <div className="settings-toggle-description">
              Customers can place orders before the store officially opens.
            </div>
          </div>

          <button
            type="button"
            className={`settings-switch ${
              scheduleForm.allowOrderingBeforeOpen
                ? "settings-switch-active"
                : ""
            }`}
            onClick={handleToggleOrdering}
          >
            <span className="settings-switch-circle" />
          </button>
        </div>

        <SettingsActionButtons onCancel={handleCancel} onSave={handleSave} />
      </div>
    );
  };

  return (
    <div className="settings-page">
      <div className="settings-topbar">
        <div className="settings-page-title">Settings</div>

        <button
          type="button"
          className="settings-user-area"
          onClick={handleOpenManagerProfile}
        >
          <div className="settings-user-icon">
            <AccountCircleOutlinedIcon />
          </div>
          <div className="settings-user-details">
            <div className="settings-user-role">System Manager</div>

            <div className="settings-user-name">Hnin Min Aung</div>
          </div>
        </button>
      </div>

      <div className="settings-main">
        <aside className="settings-sidebar">
          <div className="settings-menu-list">
            {menuItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`settings-menu-item ${
                  activeMenu === item.id ? "settings-menu-item-active" : ""
                }`}
                onClick={() => setActiveMenu(item.id)}
              >
                <div className="settings-menu-icon">{item.icon}</div>

                <div className="settings-menu-text">
                  <div className="settings-menu-title">{item.title}</div>

                  <div className="settings-menu-subtitle">{item.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="settings-main-content">
          {activeMenu === "general" && renderGeneralProfile()}

          {activeMenu === "receipt" && renderReceiptSettings()}

          {activeMenu === "schedule" && renderScheduleSettings()}
        </main>
      </div>

      {popup.show && (
        <div className="settings-popup">
          <div
            className={`settings-popup-icon ${
              popup.type === "error"
                ? "settings-popup-icon-error"
                : "settings-popup-icon-success"
            }`}
          >
            {popup.type === "error" ? <CloseIcon /> : <CheckCircleIcon />}
          </div>

          <div className="settings-popup-message">{popup.message}</div>

          <button
            type="button"
            className="settings-popup-close"
            onClick={closePopup}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {showManagerProfile && (
        <div
          className="manager-profile-overlay"
          onClick={handleCloseManagerProfile}
        >
          <div
            className="manager-profile-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="manager-profile-header">
              <div className="manager-profile-title">
                Manager Profile Settings
              </div>

              <button
                type="button"
                className="manager-profile-close"
                onClick={handleCloseManagerProfile}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="manager-profile-body">
              <div className="manager-profile-avatar">
                <AccountCircleOutlinedIcon />
              </div>

              <div className="manager-profile-name">
                {managerProfile.fullName}
              </div>

              <div className="manager-profile-role">System Manager</div>

              <div className="manager-profile-form">
                <div className="manager-profile-field">
                  <label className="manager-profile-label">FULL NAME</label>

                  <div className="manager-profile-input-box">
                    <input
                      className="manager-profile-input"
                      type="text"
                      name="fullName"
                      value={managerProfile.fullName}
                      onChange={handleManagerProfileChange}
                    />
                    <EditOutlinedIcon className="manager-profile-edit-icon" />
                  </div>
                </div>

                <div className="manager-profile-field">
                  <label className="manager-profile-label">WORK EMAIL</label>

                  <div className="manager-profile-input-box">
                    <input
                      className="manager-profile-input"
                      type="email"
                      name="email"
                      value={managerProfile.email}
                      onChange={handleManagerProfileChange}
                    />

                    <EditOutlinedIcon className="manager-profile-edit-icon" />
                  </div>
                </div>

                <div className="manager-profile-field">
                  <label className="manager-profile-label">PASSWORD</label>

                  <div className="manager-profile-input-box">
                    <input
                      className="manager-profile-input"
                      type={showManagerPassword ? "text" : "password"}
                      name="password"
                      value={managerProfile.password}
                      onChange={handleManagerProfileChange}
                    />

                    <button
                      type="button"
                      className="manager-profile-password-button"
                      onClick={() => setShowManagerPassword((prev) => !prev)}
                    >
                      {showManagerPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </button>

                    <EditOutlinedIcon className="manager-profile-edit-icon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="manager-profile-footer">
              <button
                type="button"
                className="manager-profile-save-button"
                onClick={handleSaveManagerProfile}
              >
                Save Profile Changes
              </button>

              <button
                type="button"
                className="manager-profile-logout-button"
                onClick={handleOpenLogoutVerification}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutVerification && (
        <div className="logout-verification-overlay">
          <div className="logout-verification-modal">
            <div className="logout-verification-icon">
              <LockOutlinedIcon />
            </div>

            <div className="logout-verification-title">
              Security Verification
            </div>

            <div className="logout-verification-description">
              To proceed with logout, please enter your account password to
              verify your identity.
            </div>

            <div className="logout-verification-info">
              <InfoOutlinedIcon />

              <div className="logout-verification-info-text">
                This step helps protect your account before signing out.
              </div>
            </div>

            <div className="logout-verification-field">
              <label className="logout-verification-label">
                CURRENT ACCOUNT PASSWORD
              </label>
              <div
                className={`logout-verification-input-box ${
                  logoutError ? "logout-verification-input-error" : ""
                }`}
              >
                <LockOutlinedIcon className="logout-verification-lock-icon" />

                <input
                  className="logout-verification-input"
                  type={showLogoutPassword ? "text" : "password"}
                  value={logoutPassword}
                  onChange={(e) => {
                    setLogoutPassword(e.target.value);
                    setLogoutError("");
                  }}
                  placeholder="Enter your password"
                  autoFocus
                />

                <button
                  type="button"
                  className="logout-verification-eye-button"
                  onClick={() => setShowLogoutPassword((prev) => !prev)}
                >
                  {showLogoutPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </button>
              </div>

              {logoutError && (
                <div className="logout-verification-error">
                  <CloseIcon />
                  <span>{logoutError}</span>
                </div>
              )}
            </div>

            <div className="logout-verification-actions">
              <button
                type="button"
                className="logout-verification-cancel"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>

              <button
                type="button"
                className="logout-verification-confirm"
                onClick={() => navigate(-1)}
              >
                Confirm &amp; Proceed
                <ArrowForwardIcon />
              </button>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsActionButtons = ({ onCancel, onSave }) => {
  return (
    <div className="settings-action-area">
      <button
        type="button"
        className="settings-cancel-button"
        onClick={onCancel}
      >
        Cancel
      </button>

      <button type="button" className="settings-save-button" onClick={onSave}>
        <CheckCircleIcon />
        Save Changes
      </button>
    </div>
  );
};

export default OnlineSetting;
