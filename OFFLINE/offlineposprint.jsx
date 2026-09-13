import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./offlineposprint.css";

const OrderSlipPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const slipRef = useRef(null);

  const {
    orderId = "ORD-1042",
    orderType = "dine-in",
    selectedTable = "T02",
    guestCount = 2,
    cart = [],
    subtotal = 0,
    tax = 0,
    grandTotal = 0,
  } = location.state || {};

  const [showPrintPopup, setShowPrintPopup] = useState(true);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!location.state) {
      navigate("/pos-register", {
        replace: true,
      });
    }
  }, [location.state, navigate]);

  const handleClose = () => {
    navigate(-1);
  };

  const handlePNG = async () => {
    if (!slipRef.current) {
      return;
    }

    try {
      const canvas = await html2canvas(slipRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");

      link.href = image;
      link.download = `${orderId}-order-slip.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowPrintPopup(false);
      setMessage("Order slip PNG saved successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Unable to create the PNG file.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handlePrint = () => {
    setShowPrintPopup(false);

    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="order-slip-page">
      <div className="order-slip-popup">
        <div className="order-slip-header">
          <div className="order-slip-header-left">
            <div className="order-slip-icon">
              <ReceiptLongIcon />
            </div>

            <div className="order-slip-heading">
              <div className="order-slip-title">
                {orderType === "dine-in"
                  ? "Dine-In Order Slip Preview"
                  : "Takeaway Order Slip Preview"}
              </div>

              <div className="order-slip-ready">
                <span className="order-slip-ready-dot"></span>
                Ready to Print
              </div>
            </div>
          </div>

          <button className="order-slip-close" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="order-slip-content">
          <div ref={slipRef} className="order-slip-paper">
            <div className="order-slip-store-icon">
              <StorefrontIcon />
            </div>

            <div className="order-slip-shop-name">Best Wish Bakery & Cafe</div>

            <div className="order-slip-address">
              No. 45, Bogyoke Road, Yangon
            </div>

            <div className="order-slip-contact">
              Tel: 09-987654321 • TAX ID: MM-POS-2026-8831
            </div>

            <div className="order-slip-type">
              {orderType === "dine-in" ? (
                <>
                  <div className="order-slip-table">TABLE: {selectedTable}</div>
                  <div className="order-slip-guests">
                    <PeopleIcon />
                    {guestCount} Guests
                  </div>
                </>
              ) : (
                <div className="order-slip-takeaway">TAKEAWAY</div>
              )}
            </div>

            <div className="order-slip-info">
              <div className="order-slip-info-column">
                <div className="order-slip-label">ORDER REFERENCE</div>

                <div className="order-slip-value order-slip-reference">
                  #{orderId}
                </div>

                <div className="order-slip-label order-slip-second-label">
                  SERVER / CASHIER
                </div>

                <div className="order-slip-value">Hein Min Aung</div>
              </div>

              <div className="order-slip-info-column">
                <div className="order-slip-label">DATE & TIME</div>

                <div className="order-slip-value">
                  {new Date().toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>

                <div className="order-slip-label order-slip-second-label">
                  POS TERMINAL
                </div>

                <div className="order-slip-value">
                  {orderType === "dine-in"
                    ? "Table Service #01"
                    : "Takeaway Counter #01"}
                </div>
              </div>
            </div>

            <div className="order-slip-divider"></div>

            <div className="order-slip-items-header">
              <span>QTY</span>
              <span>ITEM DETAILS</span>
              <span>PRICE (MMK)</span>
            </div>

            <div className="order-slip-items">
              {cart.map((item) => (
                <div className="order-slip-item" key={item.id}>
                  <div className="order-slip-qty">{item.quantity}x</div>

                  <div className="order-slip-item-details">
                    <div className="order-slip-item-name">{item.name}</div>

                    <div className="order-slip-options">
                      ({item.options || "Normal"})
                    </div>
                  </div>

                  <div className="order-slip-price">
                    {(item.price * item.quantity).toLocaleString()} MMK
                  </div>
                </div>
              ))}
            </div>

            <div className="order-slip-divider"></div>

            <div className="order-slip-total-row">
              <span>Subtotal</span>

              <strong>{subtotal.toLocaleString()} MMK</strong>
            </div>

            <div className="order-slip-total-row">
              <span>Commercial Tax (5%)</span>

              <strong>{tax.toLocaleString()} MMK</strong>
            </div>

            <div className="order-slip-grand-total">
              <div className="order-slip-total-label">
                <strong>TOTAL AMOUNT</strong>

                <span>All taxes inclusive</span>
              </div>

              <strong className="order-slip-total-price">
                {grandTotal.toLocaleString()} MMK
              </strong>
            </div>
            <div className="order-slip-thanks">
              Thank you for dining with us!
            </div>

            <div className="order-slip-footer-text">
              Please visit again • Free Wi-Fi: BestWishGuest
            </div>
          </div>
        </div>

        <div className="order-slip-actions">
          <button className="order-slip-close-button" onClick={handleClose}>
            <CloseIcon />
            Close
          </button>

          <div className="order-slip-right-actions">
            <button
              className="order-slip-pdf-button"
              onClick={() => setShowPrintPopup(true)}
            >
              <DownloadIcon />
              PDF
            </button>

            <button
              className="order-slip-print-button"
              onClick={() => setShowPrintPopup(true)}
            >
              <PrintIcon />
              Print Slip
            </button>
          </div>
        </div>
      </div>

      {showPrintPopup && (
        <div className="print-from-overlay">
          <div className="print-from-popup">
            <div className="print-from-header">
              <div className="print-from-header-left">
                <div className="print-from-icon">
                  <PrintIcon />
                </div>

                <div>
                  <div className="print-from-title">Print From</div>

                  <div className="print-from-subtitle">
                    Select how you want to print this order slip
                  </div>
                </div>
              </div>

              <button
                className="print-from-close"
                onClick={() => setShowPrintPopup(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="print-from-options">
              <button className="print-from-option" onClick={handlePNG}>
                <div className="print-from-option-icon">
                  <DownloadIcon />
                </div>

                <div className="print-from-option-content">
                  <strong>Save as PNG</strong>

                  <span>Save this order slip as PNG</span>
                </div>
              </button>

              <button className="print-from-option" onClick={handlePrint}>
                <div className="print-from-option-icon">
                  <PrintIcon />
                </div>

                <div className="print-from-option-content">
                  <strong>Print Slip</strong>

                  <span>Print this order slip</span>
                </div>
              </button>
            </div>

            <div className="print-from-footer">
              <button
                className="print-from-cancel"
                onClick={() => setShowPrintPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className="order-slip-message">
          <div className="order-slip-message-icon">
            <CheckCircleIcon />
          </div>

          <div className="order-slip-message-text">{message}</div>

          <button
            className="order-slip-message-close"
            onClick={() => setMessage("")}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSlipPreview;
