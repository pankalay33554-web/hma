import React, { useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SaveIcon from "@mui/icons-material/Save";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

export default function PosReceiptTemplate() {
  // --- Form States ---
  const [tax, setTax] = useState("5");
  const [serviceCharge, setServiceCharge] = useState("0");
  const [paperSize, setPaperSize] = useState("80mm Standard Receipt");
  const [autoPrint, setAutoPrint] = useState("Enabled (Auto-Print)");
  const [headerNote, setHeaderNote] = useState(
    "Welcome to Burger Shop 1! Best Burgers in Town.",
  );
  const [footerNote, setFooterNote] = useState(
    "Thank you for dining with us! Please come again.",
  );

  const handleSave = (e) => {
    e.preventDefault();
    const settingsPayload = {
      commercialTaxPercent: parseFloat(tax) || 0,
      serviceChargePercent: parseFloat(serviceCharge) || 0,
      paperSize: paperSize,
      autoPrintOnCheckout: autoPrint,
      receiptHeaderNote: headerNote,
      receiptFooterNote: footerNote,
    };

    console.log("Saving POS Receipt Settings to Backend:", settingsPayload);
    alert("Receipt Settings updated successfully!");
  };

  return (
    <div className="settings-card-container animate-fade-in">
      {/* Title Header */}
      <div className="settings-card-header">
        <ReceiptLongIcon className="header-info-icon" />
        <h2>POS & Receipt Printing Settings</h2>
      </div>

      <form onSubmit={handleSave}>
        {/* Row 1: Tax & Service Charge */}
        <div className="form-grid-two-cols">
          <div className="input-block">
            <label>COMMERCIAL TAX (%)</label>
            <input
              type="text"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              placeholder="5%"
            />
          </div>
          <div className="input-block">
            <label>SERVICE CHARGE (%)</label>
            <input
              type="text"
              value={serviceCharge}
              onChange={(e) => setServiceCharge(e.target.value)}
              placeholder="0%"
            />
          </div>
        </div>

        {/* Row 2: Paper Size & Auto-Print Dropdowns */}
        <div className="form-grid-two-cols mt-15">
          <div className="input-block">
            <label>THERMAL PAPER SIZE</label>
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              className="styled-select-input"
            >
              <option value="80mm Standard Receipt">
                80mm Standard Receipt
              </option>
              <option value="58mm Small Receipt">58mm Small Receipt</option>
              <option value="A4 / Invoice Standard">A4 Standard Page</option>
            </select>
          </div>

          <div className="input-block">
            <label>AUTOMATIC PRINT ON CHECKOUT</label>
            <select
              value={autoPrint}
              onChange={(e) => setAutoPrint(e.target.value)}
              className="styled-select-input"
            >
              <option value="Enabled (Auto-Print)">Enabled (Auto-Print)</option>
              <option value="Disabled (Manual Print)">
                Disabled (Manual Print)
              </option>
              <option value="Ask Every Time">Ask Every Time</option>
            </select>
          </div>
        </div>

        {/* Row 3: Receipt Header Note */}
        <div className="input-block mt-15">
          <label>RECEIPT HEADER NOTE</label>
          <textarea
            rows="3"
            value={headerNote}
            onChange={(e) => setHeaderNote(e.target.value)}
            placeholder="Welcome message or tax ID..."
          ></textarea>
        </div>

        {/* Row 4: Receipt Footer Note */}
        <div className="input-block mt-15">
          <label>RECEIPT FOOTER NOTE</label>
          <textarea
            rows="3"
            value={footerNote}
            onChange={(e) => setFooterNote(e.target.value)}
            placeholder="Thank you message, terms, return policy..."
          ></textarea>
        </div>

        {/* Dynamic Preview Box Section */}
        <div className="dynamic-preview-wrapper-box mt-25">
          {/* Mockup Receipt Paper */}
          <div className="receipt-paper-simulation">
            <div className="receipt-logo-icon-circle">
              <RestaurantOutlinedIcon
                sx={{ fontSize: "1.2rem", color: "#8a1e2b" }}
              />
            </div>
            <h4 className="receipt-shop-title">BURGER SHOP 1</h4>
            <p className="receipt-dynamic-header">
              {headerNote || "Header Note..."}
            </p>

            <div className="receipt-dashed-line"></div>

            <div className="receipt-items-table">
              <div className="receipt-row">
                <span>1x Classic Grill</span>
                <span>12.50</span>
              </div>
              <div className="receipt-row">
                <span>1x Golden Fries</span>
                <span>4.00</span>
              </div>
              <div className="receipt-row">
                <span>1x Craft Cola</span>
                <span>3.50</span>
              </div>
            </div>

            <div className="receipt-dashed-line"></div>

            <div className="receipt-summary-block">
              <div className="receipt-row">
                <span>SUBTOTAL</span>
                <span>20.00</span>
              </div>
              <div className="receipt-row">
                <span>TAX ({tax}%)</span>
                <span>{((20 * (parseFloat(tax) || 0)) / 100).toFixed(2)}</span>
              </div>
              {parseFloat(serviceCharge) > 0 && (
                <div className="receipt-row">
                  <span>SERVICE ({serviceCharge}%)</span>
                  <span>
                    {((20 * (parseFloat(serviceCharge) || 0)) / 100).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="receipt-row total-row">
                <strong>TOTAL</strong>
                <strong>
                  $
                  {(
                    20 +
                    (20 * (parseFloat(tax) || 0)) / 100 +
                    (20 * (parseFloat(serviceCharge) || 0)) / 100
                  ).toFixed(2)}
                </strong>
              </div>
            </div>

            <div className="receipt-dashed-line"></div>

            <p className="receipt-dynamic-footer">
              {footerNote || "Footer Note..."}
            </p>
          </div>

          {/* Right Side Explanation */}
          <div className="preview-explanation-side">
            <h3 style={{ color: "#8a1e2b" }}>Dynamic Preview</h3>
            <p>
              Real-time simulation of how your headers and footers will appear
              on the <strong>{paperSize.split(" ")[0]}</strong> thermal paper.
              Note how the "Burger Shop 1" branding and logo are automatically
              included.
            </p>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="settings-form-footer-actions mt-30">
          <button type="button" className="btn-cancel-flat">
            Cancel
          </button>
          <button type="submit" className="btn-save-maroon">
            <SaveIcon style={{ fontSize: "1.1rem", marginRight: "6px" }} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
