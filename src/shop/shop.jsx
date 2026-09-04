import { useState } from "react";
import "./shop.css";
import { useNavigate, Outlet } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const shops = [
  {
    id: 1,
    name: "Aung Htoo Pharmacy",
    location: "Yangon, Downtown Branch",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=80",
    status: "Offline",
  },
  {
    id: 2,
    name: "The Beast Clothing",
    location: "Yangon, Shopping Mall Branch",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    status: "Online",
  },
  {
    id: 3,
    name: "Best Wish Burger",
    location: "Hlaing, Main Road",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
    status: "Online",
    featured: true,
  },
];

function Shop() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "Hein Min Aung",
    email: "heinmin@gmail.com",
    password: "1234567890",
  });

  const filteredShops = shops.filter((shop) => {
    const filterMatch = activeFilter === "All" || shop.status === activeFilter;

    const searchMatch =
      shop.name.toLowerCase().includes(search.toLowerCase()) ||
      shop.location.toLowerCase().includes(search.toLowerCase());

    return filterMatch && searchMatch;
  });

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    setProfileOpen(false);
    alert("Profile changes saved successfully!");
  };

  return (
    <div className="shop-app-manger">
      <div className="shop-header-manager">
        <div className="shop-header-left-manager">
          <div className="shop-logo-icon">
            <StorefrontIcon />
          </div>

          <div className="shop-brand-title">Store Management Portal</div>
        </div>

        <div className="shop-header-right">
          <button
            className="create-pos-btn"
            onClick={() => navigate("/createpos")}
          >
            <AddIcon className="create-icon" />
            <span>Create New POS</span>
          </button>
          <Outlet />

          <button className="profile-area" onClick={() => setProfileOpen(true)}>
            <div className="profile-icon">
              <PersonIcon />
            </div>

            <div className="profile-info">
              <div className="profile-name">System Manager</div>

              <div className="profile-role">Super Admin</div>
            </div>
          </button>
        </div>
      </div>

      <div className="shop-main-content">
        <div className="shop-page-heading">
          <div className="shop-page-title">Registered Shops List</div>

          <div className="shop-page-description">
            View and manage all registered POS shops
          </div>
        </div>

        <div className="shop-filter-container">
          <div className="shop-filter-buttons">
            <button
              className={
                activeFilter === "All" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setActiveFilter("All")}
            >
              All Shops
            </button>

            <button
              className={
                activeFilter === "Offline" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setActiveFilter("Offline")}
            >
              Offline
            </button>

            <button
              className={
                activeFilter === "Online" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setActiveFilter("Online")}
            >
              Online
            </button>
          </div>

          <div className="shop-search-box">
            <SearchIcon className="shop-search-icon" />

            <input
              className="shop-search-input"
              type="text"
              placeholder="Search merchants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="shop-grid-manager">
          {filteredShops.map((shop) => (
            <div className="shop-card-manager" key={shop.id}>
              <div className="shop-image-wrapper">
                <img
                  className="shop-image-manager"
                  src={shop.image}
                  alt={shop.name}
                />
              </div>

              <div className="shop-content-manager">
                <div className="shop-name-manager">{shop.name}</div>

                <div className="shop-location">
                  <LocationOnIcon className="location-icon" />

                  <span>{shop.location}</span>
                </div>

                <div className="shop-status-area">
                  <div
                    className={
                      shop.status === "Online"
                        ? "status-badge online"
                        : "status-badge offline"
                    }
                  >
                    {shop.status}
                  </div>

                  {shop.featured && (
                    <div className="featured-badge">
                      <StarIcon className="featured-icon" />

                      <span>Featured</span>
                    </div>
                  )}
                </div>

                <button
                  className="details-btn"
                  onClick={() => navigate("/shopdetails")}
                >
                  <span>View Details</span>

                  <ArrowForwardIcon className="arrow-icon" />
                </button>
                <Outlet />
              </div>
            </div>
          ))}

          {filteredShops.length === 0 && (
            <div className="no-result">
              <div className="no-result-icon">
                <StorefrontIcon />
              </div>

              <div className="no-result-title">No shops found</div>

              <div className="no-result-text">
                Try another filter or search keyword.
              </div>
            </div>
          )}
        </div>
      </div>

      {profileOpen && (
        <div className="profile-overlay" onClick={() => setProfileOpen(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div className="profile-modal-title">
                Manager Profile Settings
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setProfileOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="profile-modal-body">
              <div className="profile-avatar">
                <PersonIcon />
              </div>

              <div className="profile-user-name">{profile.name}</div>

              <div className="profile-user-role">System Manager</div>

              <div className="profile-field">
                <div className="profile-label">Full Name</div>

                <div className="profile-input-wrapper">
                  <input
                    className="profile-input"
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      handleProfileChange("name", e.target.value)
                    }
                  />

                  <EditIcon className="edit-icon" />
                </div>
              </div>

              <div className="profile-field">
                <div className="profile-label">Work Email</div>

                <div className="profile-input-wrapper">
                  <input
                    className="profile-input"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleProfileChange("email", e.target.value)
                    }
                  />

                  <EditIcon className="edit-icon" />
                </div>
              </div>

              <div className="profile-field">
                <div className="profile-label">Password</div>

                <div className="profile-input-wrapper">
                  <input
                    className="profile-input password-input"
                    type={showPassword ? "text" : "password"}
                    value={profile.password}
                    onChange={(e) =>
                      handleProfileChange("password", e.target.value)
                    }
                  />

                  <button
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>

                  <EditIcon className="edit-icon" />
                </div>
              </div>
            </div>

            <div className="profile-modal-footer">
              <button className="save-profile-btn" onClick={handleSaveProfile}>
                Save Profile Changes
              </button>

              <button className="logout-btn" onClick={() => navigate("/login")}>
                Log Out
              </button>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
