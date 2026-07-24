import "../ownercss/inventoryadditem.css";
import { Outlet, useNavigate } from "react-router";
export default function InventoryUpdateItem() {
  const navigate = useNavigate();
  return (
    <div className="addItemContainer">
      <div className="addItemMain">
        <h2 className="title-H2">Add New Item</h2>
        <div className="body">
          <div className="body-left">
            <div className="body-container">
              <label className="body-label">Code</label>
              <input type="text" className="body-input" />
            </div>

            <div className="body-container">
              <label className="body-label">Stock</label>
              <input type="text" className="body-input" />
            </div>

            <div className="body-container">
              <label className="body-label">Cost</label>
              <input type="text" className="body-input" />
            </div>
          </div>

          <div className="body-right">
            <div className="body-container">
              <label className="body-label">Item</label>
              <input type="text" className="body-input" />
            </div>
            <div className="body-container">
              <label className="body-label">Unit</label>
              <input type="text" className="body-input" />
            </div>
            <div className="body-container">
              <label className="body-label">Date</label>
              <input type="text" className="body-input" />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-btn">
        <button className="Cancel-Btn" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <Outlet />
        <button className="Save-Btn">Update</button>
      </div>
    </div>
  );
}
