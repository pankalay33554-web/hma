import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../shopmanagmentcss/pointofSales.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Mock Data - Owner ဘက်က သတ်မှတ်ပေးထားတဲ့ Inventory ကုန်ကြမ်းများ
const INITIAL_INVENTORY = [
  {
    id: 1,
    name: "Flour (Premium)",
    available: "500 kg",
    unit: "kg",
    category: "bakery",
  },
  {
    id: 2,
    name: "Beef Patty (150g)",
    available: "1,200 pcs",
    unit: "pcs",
    category: "protein",
  },
  {
    id: 3,
    name: "Cheddar Cheese",
    available: "300 packs",
    unit: "packs",
    category: "dairy",
  },
  {
    id: 4,
    name: "Fresh Lettuce",
    available: "80 kg",
    unit: "kg",
    category: "produce",
  },
  {
    id: 5,
    name: "Sliced Tomato",
    available: "50 kg",
    unit: "kg",
    category: "produce",
  },
  {
    id: 6,
    name: "Brioche Burger Buns",
    available: "600 pcs",
    unit: "pcs",
    category: "bakery",
  },
  {
    id: 7,
    name: "Mayonnaise Sauce",
    available: "40 tubs",
    unit: "tubs",
    category: "condiments",
  },
];

export default function PointofSales() {
  const [inventory] = useState(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Current Order List State
  const [orderList, setOrderList] = useState([]);
  // Success Modal Control State
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 🔍 Filter Logic (Search text နဲ့ Category ကို တွဲစစ်ပေးခြင်း)
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ➕ Add to Order Logic (ဝင်ဝင်ချင်း 0 သို့မဟုတ် 1 ကနေ စိတ်ကြိုက်စတင်နိုင်သည်၊ Figma အတိုင်း 0 ဖြင့် စတင်ထားပါသည်)
  const addToOrder = (item) => {
    const isExist = orderList.find((orderItem) => orderItem.id === item.id);
    if (!isExist) {
      setOrderList([...orderList, { ...item, quantity: 0 }]);
    }
  };

  // 🔢 Quantity Update Logic (အတိုး/အလျော့)
  const updateQuantity = (id, amount) => {
    setOrderList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty >= 0 ? newQty : 0 };
        }
        return item;
      }),
    );
  };

  // 🗑️ Remove from Order List
  const removeFromOrder = (id) => {
    setOrderList(orderList.filter((item) => item.id !== id));
  };

  // 📊 Dynamic Calculation Metrics
  const uniqueItemsCount = orderList.length;

  // 🚀 Send Order Handler
  const handleSendOrder = () => {
    if (orderList.length === 0) {
      alert("ကျေးဇူးပြု၍ အော်ဒါမှာရန် ပစ္စည်းအရင်ရွေးချယ်ပေးပါဗျာ။");
      return;
    }
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setOrderList([]); // Order တင်ပြီးရင် list ကို ရှင်းပေးခြင်း
  };

  return (
    <div className="sales-page-wrapper">
      {/* Dynamic Header (Dynamic Router Integration) */}
      <header className="sales-top-bar">
        <div className="top-title-area">
          <h1>Sales List</h1>
          <span className="badge-shop">Burger Shop 1</span>
        </div>
        <div className="user-profile">
          <div className="profile-divider"></div>
          <div className="profile-text">
            <span className="role">Executive Manager</span>
            <span className="name">HEIN MIN AUNG</span>
          </div>
        </div>
      </header>

      {/* Main Two-Column View Box Layout */}
      <div className="sales-body-container">
        <div className="pos-split-grid">
          {/* ဘယ်ဘက်ခြမ်း - Inventory Stock Section */}
          <div className="pos-inventory-card-column">
            {/* Top Search Filter Toolbar Block */}
            <div className="pos-filter-toolbar-row">
              <div className="search-input-wrapper-box">
                <SearchIcon className="search-icon-inside" />
                <input
                  type="text"
                  placeholder="Search Stock Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* 🎯 ၂။ ညာဘက်ကပ်နေတဲ့မြှားကို လှပအောင် Wrapper နှင့် Icon ပြောင်းလဲခြင်း */}
              <div className="category-select-wrapper">
                <select
                  className="category-select-dropdown-box"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="protein">Protein</option>
                  <option value="bakery">Bakery</option>
                  <option value="produce">Produce</option>
                  <option value="dairy">Dairy / Cheese</option>
                  <option value="condiments">Condiments</option>
                </select>
                <KeyboardArrowDownIcon className="custom-dropdown-arrow-icon" />
              </div>
            </div>

            {/* List Box Items Container */}
            <div className="inventory-items-scroller-list">
              {filteredInventory.map((item) => {
                const isInOrder = orderList.some((o) => o.id === item.id);
                return (
                  <div key={item.id} className="inventory-stock-item-row-card">
                    <div className="stock-info-meta-group">
                      <h4 className="stock-item-heading-title">{item.name}</h4>
                      <p className="stock-available-indicator">
                        Available:{" "}
                        <span className="bold-qty">{item.available}</span>
                      </p>
                    </div>
                    <button
                      className={`add-to-order-action-btn ${isInOrder ? "already-added-status" : ""}`}
                      onClick={() => addToOrder(item)}
                      disabled={isInOrder}
                    >
                      <AddIcon className="btn-inline-plus-icon" />{" "}
                      {isInOrder ? "Added" : "Add to Order"}
                    </button>
                  </div>
                );
              })}
              {filteredInventory.length === 0 && (
                <div className="no-matching-data-blank">
                  ပစ္စည်းရှာမတွေ့ပါဗျာ။
                </div>
              )}
            </div>
          </div>

          {/* ညာဘက်ခြမ်း - Current Order Side Sheet Summary List */}
          <div className="pos-order-summary-list-column">
            <div className="order-sidebar-header-box">
              <h3 className="sidebar-heading-title">Current Order List</h3>
              <span className="dynamic-badge-selected-items-count">
                {uniqueItemsCount} Items Selected
              </span>
            </div>

            {/* Scroller Area For Order Rows */}
            <div className="current-ordered-items-scroller-block">
              {orderList.map((item) => (
                <div key={item.id} className="ordered-item-widget-card-row">
                  <div className="ordered-row-top-flex">
                    <h4 className="ordered-item-title-text">{item.name}</h4>
                    <button
                      className="delete-row-trash-btn"
                      onClick={() => removeFromOrder(item.id)}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>

                  <div className="ordered-row-bottom-controls">
                    <div className="quantity-stepper-counter-group">
                      <button
                        className="step-btn-minus"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <RemoveIcon />
                      </button>
                      <span className="stepper-numerical-value-display">
                        {item.quantity}
                      </span>
                      <button
                        className="step-btn-plus"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <AddIcon />
                      </button>
                    </div>
                    <span className="ordered-unit-label-text">{item.unit}</span>
                  </div>
                </div>
              ))}

              {orderList.length === 0 && (
                <div className="empty-order-placeholder-graphic">
                  <p>
                    ယခုအချိန်ထိ မည်သည့်ကုန်ကြမ်းမျှ
                    <br />
                    ရွေးချယ်ထားခြင်း မရှိသေးပါဗျာ။
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Total Footer Pricing Block */}
            <div className="sidebar-footer-order-checkout-block">
              <div className="footer-total-summary-row-label">
                <span className="label-total-title">Items Total:</span>
                <span className="value-total-count">
                  {uniqueItemsCount} items
                </span>
              </div>

              <button
                className="send-order-to-owner-action-btn"
                onClick={handleSendOrder}
              >
                Send Order to Owner <SendIcon className="inline-send-icon" />
              </button>

              <p className="disclaimer-info-caption-text">
                ⓘ Once sent, this request will be forwarded to the Owner's
                Orders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 ဒုတိယပုံထဲကအတိုင်း Order Sent Successfully Modal Card Box */}
      {showSuccessModal && (
        <div className="modal-overlay-backdrop">
          <div className="order-success-modal-card-view">
            <div className="success-icon-wrapper-circle">
              <CheckCircleIcon className="mui-circle-check-icon" />
            </div>

            <h3 className="success-modal-main-title">
              Order Sent Successfully!
            </h3>
            <p className="success-modal-subtitle-caption">
              Your stock order has been submitted.
            </p>

            <div className="success-summary-pill-row-box">
              <span className="summary-left-label">Items Total:</span>
              <span className="summary-right-val-items">
                {uniqueItemsCount} Items
              </span>
            </div>

            <button
              className="success-modal-ok-action-btn"
              onClick={handleCloseModal}
            >
              OK &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
