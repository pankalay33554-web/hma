import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import PointOfSaleRoundedIcon from "@mui/icons-material/PointOfSaleRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import "./createpos.css";

const POS_PLANS = {
  offline: {
    name: "Offline",
    price: 0,
    suffix: "/mo",
    description:
      "Essential tools for back-office management, inventory tracking, and standard reporting.",
  },

  online: {
    name: "Online",
    price: 20,
    suffix: "/mo",
    description:
      "Full digital workflow synchronization, remote order management, and web dashboard access.",
  },

  extra: {
    name: "Extra",
    price: 15,
    suffix: "/mo per device",
    description:
      "Advanced AI analytics, multi-location support, and priority 24/7 technical assistance.",
  },
};

const BUSINESS_CATEGORIES = [
  "Restaurant",
  "Cafe",
  "Retail Shop",
  "Grocery",
  "Clothing",
  "Pharmacy",
  "Other",
];

export default function CreatePOS() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    shopName: "",
    shopAddress: "",
    shopContactNumber: "",
    businessCategory: "",
  });

  const [selectedPlan, setSelectedPlan] = useState("offline");

  const [showPassword, setShowPassword] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);

  const [logoPreview, setLogoPreview] = useState("");

  const [error, setError] = useState("");

  const selectedPlanData = POS_PLANS[selectedPlan];

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleCategorySelect = (category) => {
    setFormData((previous) => ({
      ...previous,
      businessCategory: category,
    }));

    setCategoryOpen(false);
    setError("");
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Logo image must be smaller than 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setLogoPreview(imageUrl);
    setError("");
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setError("");
  };

  const handleCreatePOS = () => {
    if (!formData.fullName.trim()) {
      setError("Please enter full name.");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setError("Please enter phone number.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter login email address.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter password.");
      return;
    }

    if (!formData.shopName.trim()) {
      setError("Please enter shop name.");
      return;
    }

    if (!formData.shopAddress.trim()) {
      setError("Please enter shop address.");
      return;
    }

    if (!formData.shopContactNumber.trim()) {
      setError("Please enter shop contact number.");
      return;
    }

    if (!formData.businessCategory) {
      setError("Please select business category.");
      return;
    }

    const posData = {
      client: {
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        password: formData.password,
      },

      shop: {
        name: formData.shopName.trim(),
        address: formData.shopAddress.trim(),
        contactNumber: formData.shopContactNumber.trim(),
        category: formData.businessCategory,
        logo: logoPreview,
      },

      plan: {
        id: selectedPlan,
        name: selectedPlanData.name,
        price: selectedPlanData.price,
      },
    };

    console.log("CREATE POS FLOW:", posData);

    if (selectedPlan === "offline") {
      navigate("/pos/offlinea");
      return;
    }

    if (selectedPlan === "online") {
      navigate("/pos/online");
      return;
    }

    if (selectedPlan === "extra") {
      navigate("/pos/extra");
    }
  };

  const renderCheck = (plan) => {
    if (selectedPlan !== plan) {
      return null;
    }

    return <CheckRoundedIcon className="tierCheckIcon" />;
  };

  return (
    <div className="posPage">
      <div className="posHeader">
        <button
          type="button"
          className="backButton"
          onClick={() => navigate(-1)}
        >
          <ArrowBackRoundedIcon className="backIcon" />
        </button>

        <span className="headerTitle">Create New POS</span>
      </div>

      <div className="posContent">
        <div className="introSection">
          <h1 className="pageTitle">Register New Shop</h1>

          <p className="pageSubtitle">
            Enter shop details to set up a new point-of-sale system.
          </p>
        </div>

        <div className="posCard">
          <div className="formSection">
            <div className="sectionHeading">
              <PersonRoundedIcon className="sectionIcon" />

              <span className="sectionTitle">
                Client &amp; Account Information
              </span>
            </div>

            <div className="accountGrid">
              <div className="fieldGroup">
                <label className="fieldLabel">Full Name</label>

                <input
                  className="fieldControl"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div className="fieldGroup">
                <label className="fieldLabel">Phone Number</label>

                <input
                  className="fieldControl"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="fieldGroup">
                <label className="fieldLabel">Login Email Address</label>

                <input
                  className="fieldControl"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="sarah@business.com"
                  autoComplete="off"
                />
              </div>

              <div className="fieldGroup">
                <label className="fieldLabel">Password</label>
                <div className="passwordField">
                  <input
                    className="fieldControl passwordControl"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••••"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="passwordToggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                  >
                    {showPassword ? (
                      <VisibilityOffRoundedIcon className="passwordIcon" />
                    ) : (
                      <VisibilityRoundedIcon className="passwordIcon" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="formSection">
            <div className="sectionHeading">
              <StoreRoundedIcon className="sectionIcon" />

              <span className="sectionTitle">Shop &amp; Business Details</span>
            </div>

            <div className="shopLayout">
              <div className="shopFields">
                <div className="fieldGroup">
                  <label className="fieldLabel">Shop Name</label>

                  <input
                    className="fieldControl"
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleInputChange}
                    placeholder="The Artisan Bakery"
                  />
                </div>

                <div className="fieldGroup shopAddressField">
                  <label className="fieldLabel">Shop Address</label>

                  <input
                    className="fieldControl"
                    type="text"
                    name="shopAddress"
                    value={formData.shopAddress}
                    onChange={handleInputChange}
                    placeholder="123 Commerce Blvd, Suite 200"
                  />
                </div>

                <div className="shopBottomGrid">
                  <div className="fieldGroup">
                    <label className="fieldLabel">Shop Contact Number</label>

                    <input
                      className="fieldControl"
                      type="tel"
                      name="shopContactNumber"
                      value={formData.shopContactNumber}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="fieldGroup">
                    <label className="fieldLabel">Business Category</label>

                    <div className="categoryWrapper">
                      <button
                        type="button"
                        className="categoryButton"
                        onClick={() => setCategoryOpen((previous) => !previous)}
                      >
                        <span
                          className={
                            formData.businessCategory
                              ? "categoryValue"
                              : "categoryPlaceholder"
                          }
                        >
                          {formData.businessCategory || "Select Category"}
                        </span>

                        <KeyboardArrowDownRoundedIcon className="categoryArrow" />
                      </button>

                      {categoryOpen && (
                        <div className="categoryMenu">
                          {BUSINESS_CATEGORIES.map((category) => (
                            <button
                              type="button"
                              className="categoryOption"
                              key={category}
                              onClick={() => handleCategorySelect(category)}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="logoArea">
                <label className="fieldLabel">Shop Logo/Photo</label>

                <label className="uploadBox">
                  {logoPreview ? (
                    <img
                      className="logoPreview"
                      src={logoPreview}
                      alt="Shop logo preview"
                    />
                  ) : (
                    <>
                      <div className="uploadIconBox">
                        <ImageRoundedIcon className="uploadIcon" />
                      </div>

                      <span className="uploadTitle">Upload Logo/Photo</span>

                      <span className="uploadHint">PNG, JPG up to 5MB</span>
                    </>
                  )}

                  <input
                    className="fileInput"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="formSection tierSection">
            <div className="sectionHeading">
              <PointOfSaleRoundedIcon className="sectionIcon" />

              <span className="sectionTitle">
                Select POS Tier &amp; Add-ons
              </span>
            </div>

            <div className="tierGrid">
              <button
                type="button"
                className={`tierCard tierOffline ${
                  selectedPlan === "offline" ? "tierSelected" : ""
                }`}
                onClick={() => handlePlanSelect("offline")}
              >
                <div className="tierTop">
                  <div className="tierNameRow">
                    <span
                      className={`tierRadio ${
                        selectedPlan === "offline" ? "tierRadioSelected" : ""
                      }`}
                    >
                      {renderCheck("offline")}
                    </span>

                    <span className="tierName">Offline</span>
                  </div>

                  <button
                    onClick={() => navigate("offlinefeatures")}
                    className="msh"
                  >
                    <InfoOutlinedIcon className="tierInfoIcon" />
                  </button>
                  <Outlet />
                </div>

                <span className="tierDescription">
                  Essential tools for back-office management, inventory
                  tracking, and standard reporting.
                </span>

                <div className="tierPrice">
                  <span className="priceValue">$0</span>

                  <span className="priceSuffix">/mo</span>
                </div>
              </button>

              <button
                type="button"
                className={`tierCard tierOnline ${
                  selectedPlan === "online" ? "tierSelected" : ""
                }`}
                onClick={() => handlePlanSelect("online")}
              >
                <div className="tierTop">
                  <div className="tierNameRow">
                    <span
                      className={`tierRadio ${
                        selectedPlan === "online" ? "tierRadioSelected" : ""
                      }`}
                    >
                      {renderCheck("online")}
                    </span>

                    <span className="tierName">Online</span>
                  </div>

                  <InfoOutlinedIcon className="tierInfoIcon" />
                </div>

                <span className="tierDescription">
                  Full digital workflow synchronization, remote order
                  management, and web dashboard access.
                </span>

                <div className="tierPrice">
                  <span className="priceValue">$20</span>

                  <span className="priceSuffix">/mo</span>
                </div>
              </button>

              <button
                type="button"
                className={`tierCard tierExtra ${
                  selectedPlan === "extra" ? "tierSelected" : ""
                }`}
                onClick={() => handlePlanSelect("extra")}
              >
                <div className="tierTop">
                  <div className="tierNameRow">
                    <span
                      className={`tierRadio tierSquare ${
                        selectedPlan === "extra" ? "tierRadioSelected" : ""
                      }`}
                    >
                      {renderCheck("extra")}
                    </span>

                    <span className="tierName">Extra</span>
                  </div>

                  <InfoOutlinedIcon className="tierInfoIcon" />
                </div>

                <span className="tierDescription">
                  Advanced analytics, multi-location support, and priority 24/7
                  technical assistance.
                </span>

                <div className="tierPrice">
                  <span className="priceValue">$15</span>

                  <span className="priceSuffix">/mo per device</span>
                </div>
              </button>
            </div>
          </div>

          {error && (
            <div className="errorArea">
              <span className="errorMessage">{error}</span>
            </div>
          )}

          <div className="formFooter">
            <div className="totalBox">
              <span className="totalLabel">TOTAL MONTHLY AMOUNT</span>
              <div className="totalRow">
                <span className="totalValue">${selectedPlanData.price}</span>

                <span className="totalCurrency">USD / month</span>
              </div>
            </div>

            <div className="footerActions">
              <button
                type="button"
                className="cancelButton"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="createButton"
                onClick={handleCreatePOS}
              >
                <span className="createButtonText">Create POS Account</span>

                <ArrowForwardRoundedIcon className="createIcon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
