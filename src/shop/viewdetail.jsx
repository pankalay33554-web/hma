import { useState } from "react";
import { useNavigate, Outlet } from "react-router";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./shopdetail.css";

const ShopDetails = () => {
  const [plan, setPlan] = useState("online");
  const [extraFeatures, setExtraFeatures] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [announcement, setAnnouncement] = useState("");
  const [announcementPopup, setAnnouncementPopup] = useState(false);

  const [deletePopup, setDeletePopup] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [subscriptionPopup, setSubscriptionPopup] = useState(false);

  const planPrice = plan === "online" ? 20 : 0;
  const extraPrice = extraFeatures ? 15 : 0;

  const total = planPrice + extraPrice;

  const handleUpdateSubscription = () => {
    setSubscriptionPopup(true);
  };

  const closeSubscriptionPopup = () => {
    setSubscriptionPopup(false);
  };

  const handleSendMessage = () => {
    if (!announcement.trim()) {
      return;
    }

    setAnnouncementPopup(true);
    setAnnouncement("");
  };

  const closeAnnouncementPopup = () => {
    setAnnouncementPopup(false);
  };

  const openDeletePopup = () => {
    setDeletePopup(true);
    setAdminPassword("");
    setDeleteError("");
    setShowAdminPassword(false);
  };

  const closeDeletePopup = () => {
    setDeletePopup(false);
    setAdminPassword("");
    setDeleteError("");
    setShowAdminPassword(false);
  };

  const handleConfirmDelete = () => {
    if (!adminPassword.trim()) {
      setDeleteError("Please enter your admin password.");
      return;
    }

    console.log("Shop deletion confirmed");

    setDeletePopup(false);
    setAdminPassword("");
    setDeleteError("");
    setShowAdminPassword(false);
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="shop-header-left">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon className="back-icon" />
          </button>
          <Outlet />
          <h1 className="page-title">Shop Details & Subscription</h1>
        </div>

        <div className="header-actions">
          <button className="suspend-button">
            <PauseCircleIcon className="action-icon" />
            Suspend Access
          </button>

          <button className="delete-button" onClick={openDeletePopup}>
            <DeleteIcon className="action-icon" />
            Delete Shop
          </button>
        </div>
      </div>

      <div className="shop-container">
        <section className="subscription-summary">
          <div className="summary-shop">
            <h2 className="summary-shop-name">Best Wish Burger</h2>

            <span className="active-badge">
              <CheckCircleIcon className="active-icon" />
              Subscription: Active
            </span>
          </div>

          <div className="summary-price">
            <div className="summary-details">
              <span>Online Version ($20/mo)</span>

              <span className="summary-divider">|</span>

              <span>Extra Features Suite ($15/mo)</span>

              <StarIcon className="summary-star" />
            </div>

            <div className="summary-total">Total: ${total} / Month</div>
          </div>
        </section>

        <div className="main-grid">
          <div className="left-column">
            <section className="content-card shop-details-card">
              <div className="card-heading">
                <h2 className="card-title">Shop Details</h2>
              </div>

              <div className="shop-info-grid">
                <div className="info-item">
                  <span className="info-label">Shop Name</span>

                  <span className="info-value">Best Wish Burger</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Category</span>

                  <span className="info-value">Food & Beverage (F&B)</span>
                </div>

                <div className="info-item info-full">
                  <span className="info-label">Address</span>

                  <span className="info-value">
                    No. 45, Main Road, Chanayethazan Township, Mandalay
                  </span>
                </div>

                <div className="info-item info-full">
                  <span className="info-label">Shop Imagery</span>

                  <div className="shop-image-wrapper">
                    <img
                      className="shop-image"
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                      alt="Best Wish Burger"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="content-card credentials-card">
              <div className="card-heading">
                <h2 className="card-title">Credentials & Contact</h2>
              </div>

              <div className="credentials-grid">
                <div className="info-item">
                  <span className="info-label">Primary Contact</span>

                  <span className="info-value">U Ko Ko</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Phone Number</span>

                  <span className="info-value">09-791234567</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Email Address</span>

                  <span className="info-value">
                    bestwishburger123@gmail.com
                  </span>
                </div>

                <div className="info-item password-item">
                  <span className="info-label">Account Password</span>

                  <div className="password-wrapper">
                    <span className="password-value">
                      {showPassword ? "BestWish@12345" : "••••••••••••"}
                    </span>

                    <button
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon className="password-icon" />
                      ) : (
                        <VisibilityIcon className="password-icon" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="content-card subscription-card">
            <div className="card-heading">
              <h2 className="card-title">POS Tier Configuration</h2>
            </div>

            <button
              className={`plan-card ${
                plan === "offline" ? "plan-card-selected" : ""
              }`}
              onClick={() => setPlan("offline")}
            >
              <span
                className={`radio-circle ${
                  plan === "offline" ? "radio-selected" : ""
                }`}
              >
                {plan === "offline" && <span className="radio-dot" />}
              </span>

              <span className="plan-content">
                <span className="plan-title">Offline / Basic</span>

                <span className="plan-description">
                  Standard offline features.
                </span>
              </span>
            </button>

            <button
              className={`plan-card online-plan ${
                plan === "online" ? "plan-card-selected" : ""
              }`}
              onClick={() => setPlan("online")}
            >
              {plan === "online" && (
                <span className="selected-check">
                  <CheckCircleIcon className="selected-check-icon" />
                </span>
              )}

              <span
                className={`radio-circle ${
                  plan === "online" ? "radio-selected" : ""
                }`}
              >
                {plan === "online" && <span className="radio-dot" />}
              </span>

              <span className="plan-content">
                <span className="plan-title-row">
                  <span className="plan-title">Online Version</span>

                  <span className="plan-price">$20/mo</span>
                </span>

                <span className="plan-description">
                  Cloud sync, multi-device
                  <br />
                  support, remote access.
                </span>
              </span>
            </button>

            <div className="addon-section">
              <span className="addon-heading">ADD-ONS</span>

              <button
                className={`addon-card ${
                  extraFeatures ? "addon-selected" : ""
                }`}
                onClick={() => setExtraFeatures(!extraFeatures)}
              >
                <span
                  className={`addon-checkbox ${
                    extraFeatures ? "addon-checkbox-active" : ""
                  }`}
                >
                  {extraFeatures && (
                    <CheckCircleIcon className="addon-check-icon" />
                  )}
                </span>

                <div className="addon-content">
                  <div className="addon-title-row">
                    <span className="addon-star">
                      <StarIcon />
                    </span>

                    <span className="addon-title">Extra Features</span>

                    <span className="addon-price">+$15/mo</span>
                  </div>

                  <div className="addon-list">
                    <span>Kitchen Display System (KDS)</span>

                    <span>Delivery Aggregator API</span>

                    <span>Advanced Staff Management</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="subscription-total-line">
              <span>Total</span>

              <strong>${total} / Month</strong>
            </div>

            <button
              className="update-button"
              onClick={handleUpdateSubscription}
            >
              <LockOutlinedIcon className="update-icon" />
              Update Subscription
            </button>
          </section>
        </div>

        <section className="billing-card">
          <div className="billing-header">
            <h2 className="billing-title">Billing History</h2>

            <button className="invoice-button">
              View All Invoices
              <ArrowForwardIosIcon className="invoice-icon" />
            </button>
          </div>

          <div className="billing-table">
            <div className="billing-row billing-table-header">
              <span>Service / Tier</span>
              <span>Period</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            <div className="billing-row">
              <span>Online Version + Extra Features</span>

              <span>Oct 1 - Oct 31, 2026</span>

              <span>$45.00</span>

              <span className="paid-badge">PAID</span>
            </div>

            <div className="billing-row">
              <span>Online Version Feature</span>

              <span>Sep 1 - Sep 30, 2026</span>

              <span>$20.00</span>

              <span className="paid-badge">PAID</span>
            </div>

            <div className="billing-row">
              <span>Offline Version Feature</span>

              <span>Aug 1 - Aug 31, 2026</span>

              <span>$0.00</span>

              <span className="paid-badge">PAID</span>
            </div>
          </div>
        </section>

        <section className="announcement-card">
          <div className="announcement-content">
            <div className="announcement-title-row">
              <CampaignIcon className="announcement-icon" />

              <h2 className="announcement-title">Send System Announcement</h2>
            </div>

            <p className="announcement-description">
              Send an administrative notice directly to this shop's dashboard.
            </p>

            <div className="announcement-form">
              <textarea
                className="announcement-input"
                placeholder="Type your message here..."
                value={announcement}
                onChange={(event) => setAnnouncement(event.target.value)}
              />

              <button className="send-button" onClick={handleSendMessage}>
                <SendIcon className="send-icon" />
                Send Message
              </button>
            </div>
          </div>
        </section>
      </div>

      {announcementPopup && (
        <div
          className="announcement-popup-overlay"
          onClick={closeAnnouncementPopup}
        >
          <div
            className="announcement-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="announcement-success-icon">
              <CheckIcon className="announcement-check-icon" />
            </div>

            <div className="announcement-popup-content">
              <h2 className="announcement-popup-title">Announcement Sent!</h2>

              <p className="announcement-popup-message">
                Your message has been sent successfully.
              </p>
            </div>
            <button
              className="announcement-popup-button"
              onClick={closeAnnouncementPopup}
            >
              <span className="announcement-popup-button-text">OK</span>

              <ArrowForwardIcon className="announcement-popup-arrow" />
            </button>
          </div>
        </div>
      )}

      {subscriptionPopup && (
        <div
          className="announcement-popup-overlay"
          onClick={closeSubscriptionPopup}
        >
          <div
            className="announcement-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="announcement-success-icon">
              <CheckIcon className="announcement-check-icon" />
            </div>

            <div className="announcement-popup-content">
              <h2 className="announcement-popup-title">
                Subscription Updated!
              </h2>

              <p className="announcement-popup-message">
                Your subscription has been updated successfully.
                <br />
                Total: ${total} / Month
              </p>
            </div>

            <button
              className="announcement-popup-button"
              onClick={closeSubscriptionPopup}
            >
              <span className="announcement-popup-button-text">OK</span>

              <ArrowForwardIcon className="announcement-popup-arrow" />
            </button>
          </div>
        </div>
      )}

      {deletePopup && (
        <div className="delete-popup-overlay" onClick={closeDeletePopup}>
          <div
            className="delete-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="delete-popup-icon-wrapper">
              <DeleteForeverIcon className="delete-popup-icon" />
            </div>

            <div className="delete-popup-content">
              <h2 className="delete-popup-title">Delete Shop?</h2>

              <p className="delete-popup-description">
                All active store configurations, credentials,
                <br />
                and data will be permanently removed.
              </p>

              <p className="delete-password-label">
                Enter your Admin Password to confirm
              </p>

              <div
                className={`delete-password-wrapper ${
                  deleteError ? "delete-password-error" : ""
                }`}
              >
                <LockOutlinedIcon className="delete-lock-icon" />

                <input
                  className="delete-password-input"
                  type={showAdminPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(event) => {
                    setAdminPassword(event.target.value);

                    setDeleteError("");
                  }}
                />

                <button
                  className="delete-password-toggle"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                >
                  {showAdminPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </button>
              </div>

              {deleteError && (
                <p className="delete-error-message">{deleteError}</p>
              )}
            </div>

            <div className="delete-popup-actions">
              <button
                className="delete-cancel-button"
                onClick={closeDeletePopup}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={handleConfirmDelete}
              >
                <DeleteForeverIcon className="confirm-delete-icon" />
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDetails;
