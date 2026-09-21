import { useNavigate, useLocation } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import "./orderprint.css";

const PrintFrom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderData = location.state || {};

  const cart = orderData.cart || [];

  const subtotal =
    orderData.subtotal ??
    cart.reduce(
      (total, item) =>
        total + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );

  const tax = orderData.tax ?? subtotal * 0.05;
  const total = orderData.total ?? subtotal + tax;

  const money = (value) => `${Number(value).toLocaleString()} MMK`;

  const handleClose = () => {
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printfrom-overlay">
      <div className="printfrom-popup">
        <div className="printfrom-header">
          <div className="printfrom-title-area">
            <div className="printfrom-icon">
              <ReceiptLongRoundedIcon />
            </div>

            <div className="printfrom-title-content">
              <h2 className="printfrom-title">Print From</h2>
              <span className="printfrom-subtitle">
                Select an action for the current order
              </span>
            </div>
          </div>

          <button
            className="printfrom-close"
            type="button"
            onClick={handleClose}
          >
            <CloseRoundedIcon />
          </button>
        </div>

        <div className="printfrom-content">
          <div className="printfrom-preview">
            <div className="printfrom-store-icon">
              <StorefrontRoundedIcon />
            </div>

            <h3 className="printfrom-store-name">Fashion Hub</h3>

            <span className="printfrom-order-id">
              Order #{orderData.orderId || "ORD-98241"}
            </span>

            <div className="printfrom-divider" />

            <div className="printfrom-items">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div
                    className="printfrom-item"
                    key={`${item.productId || index}-${item.size || ""}`}
                  >
                    <div className="printfrom-item-left">
                      <span className="printfrom-item-qty">
                        {item.quantity}x
                      </span>

                      <div className="printfrom-item-info">
                        <strong className="printfrom-item-name">
                          {item.name}
                        </strong>

                        {item.size && (
                          <span className="printfrom-item-size">
                            Size {item.size}
                          </span>
                        )}
                      </div>
                    </div>

                    <strong className="printfrom-item-price">
                      {money(
                        Number(item.price || 0) * Number(item.quantity || 0),
                      )}
                    </strong>
                  </div>
                ))
              ) : (
                <div className="printfrom-empty">No items in current order</div>
              )}
            </div>

            <div className="printfrom-divider" />

            <div className="printfrom-summary">
              <div className="printfrom-summary-row">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <div className="printfrom-summary-row">
                <span>Tax (5%)</span>
                <strong>{money(tax)}</strong>
              </div>

              <div className="printfrom-total">
                <span>Total Payable</span>
                <strong>{money(total)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="printfrom-footer">
          <button
            className="printfrom-cancel"
            type="button"
            onClick={handleClose}
          >
            <CloseRoundedIcon />
            <span>Cancel</span>
          </button>

          <button
            className="printfrom-print"
            type="button"
            onClick={handlePrint}
          >
            <PrintRoundedIcon />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintFrom;
