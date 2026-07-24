import "../ownercss/shop.css";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNavigate, Outlet } from "react-router";

const shops = [
  {
    id: 1,
    name: "Shop 1",
    address: "No(1), Hlaing Township, Yangon",
    phone: "09 123456789",
    manager: "Ko Ko",
  },
  {
    id: 2,
    name: "Shop 1",
    address: "No(1), Hlaing Township, Yangon",
    phone: "09 123456789",
    manager: "Ko Ko",
  },
  {
    id: 3,
    name: "Shop 1",
    address: "No(1), Hlaing Township, Yangon",
    phone: "09 123456789",
    manager: "Ko Ko",
  },
  {
    id: 4,
    name: "Shop 1",
    address: "No(1), Hlaing Township, Yangon",
    phone: "09 123456789",
    manager: "Ko Ko",
  },
];

const Shop = () => {
  const navigate = useNavigate();
  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <h2 className="shop-title">Shop Management</h2>

        <button className="add-shop-btn" onClick={() => navigate("addnewshop")}>
          <AddCircleIcon />
          <span>Add New Shop</span>
        </button>
        <Outlet />
      </div>

      {/* Shop Card List */}
      <div className="shop-grid">
        {shops.map((shop) => (
          <div className="shop-card" key={shop.id}>
            {/* Card Header */}
            <div className="card-header">
              <div className="shop-icon">
                <StorefrontOutlinedIcon className="shop-store-icon" />
              </div>

              <div className="card-actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate("updateshop")}
                >
                  <EditOutlinedIcon />
                </button>

                <span className="action-divider"></span>

                <button className="delete-btn">
                  <DeleteIcon />
                </button>
              </div>
            </div>

            {/* Shop Info */}
            <div className="card-body">
              <h3 className="shop-name">Name ({shop.name})</h3>

              <div className="info-row">
                <LocationOnOutlinedIcon className="info-icon" />
                <span>{shop.address}</span>
              </div>

              <div className="info-row">
                <LocalPhoneOutlinedIcon className="info-icon" />
                <span>{shop.phone}</span>
              </div>

              <div className="info-row">
                <PersonOutlineOutlinedIcon className="info-icon" />
                <span>Manager - {shop.manager}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination (Only show when 20 or more records) */}
      {shops.length >= 20 && (
        <div className="pagination-wrapper">Pagination</div>
      )}
    </div>
  );
};

export default Shop;
