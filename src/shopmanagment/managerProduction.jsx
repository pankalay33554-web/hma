import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import "../shopmanagmentcss/managerProduction.css";

const INITIAL_MENU_ITEMS = [
  {
    id: 1,
    category: "burgers",
    name: "Beef Burger",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
    hasVariants: true,
    price: 4500,
    quantity: 15,
    variants: [
      { size: "S", price: 4500, quantity: 12 },
      { size: "M", price: 6500, quantity: 15 },
      { size: "L", price: 8000, quantity: 10 },
    ],
  },
  {
    id: 2,
    category: "burgers",
    name: "Cheesy BBQ",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=300&auto=format&fit=crop",
    hasVariants: true,
    price: 8000,
    quantity: 15,
    variants: [
      { size: "M", price: 8000, quantity: 15 },
      { size: "L", price: 9500, quantity: 10 },
    ],
  },
  {
    id: 3,
    category: "burgers",
    name: "Big Monster",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=300&auto=format&fit=crop",
    hasVariants: true,
    price: 2500,
    quantity: 15,
    variants: [
      { size: "S", price: 2500, quantity: 12 },
      { size: "L", price: 4500, quantity: 10 },
    ],
  },
  {
    id: 4,
    category: "burgers",
    name: "Spicy Crispy",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=300&auto=format&fit=crop",
    hasVariants: true,
    price: 4500,
    quantity: 15,
    variants: [],
  },
  {
    id: 5,
    category: "breads",
    name: "Butter Croissant",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop",
    hasVariants: true,
    price: 3500,
    quantity: 20,
    variants: [],
  },
];
const CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "burgers", name: "Burgers" },
  { id: "breads", name: "Fresh Breads" },
];

export default function ManagerProduction() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState({});

  const filteredItems = INITIAL_MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="production-container">
      {/* 🎯 Top Title & Manager Section */}
      <header className="sales-top-bar">
        <div className="top-title-area">
          <h1>Production</h1>
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

      {/* 🎯 Search Bar and Dropdown Section */}
      <div className="menu-body-container">
        <div className="production-filter-bar">
          <div className="prod-search-box">
            <SearchIcon className="prod-search-icon" />
            <input
              type="text"
              placeholder="Search by menu name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="prod-dropdown-box">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 🎯 Grid View */}
        <div className="menu-items-grid">
          {filteredItems.map((item) => {
            const sizes =
              item.variants && item.variants.length > 0
                ? item.variants.map((v) => v.size)
                : ["Normal"];

            const currentSize = selectedSizes[item.id] || sizes[0];
            const variantObj = item.variants
              ? item.variants.find((v) => v.size === currentSize)
              : null;
            const displayPrice = variantObj ? variantObj.price : item.price;

            return (
              <div key={item.id} className="menu-item-card">
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.name} />
                  <span
                    className={`stock-status ${item.inStock ? "in-stock" : "out-of-stock"}`}
                  >
                    <span className="dot">●</span>{" "}
                    {item.inStock ? "IN STOCK" : "OUT OF STOCK"}
                  </span>
                </div>

                <div className="card-content">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">
                      {displayPrice.toLocaleString()} Ks
                    </span>
                  </div>

                  <div className="size-variants">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-btn ${currentSize === size ? "active" : ""}`}
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [item.id]: size,
                          }))
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <button
                    className="configure-recipe-btn"
                    onClick={() => {
                      // 🎯
                      const availableSizes =
                        item.variants && item.variants.length > 0
                          ? item.variants.map((v) => v.size)
                          : ["Normal"];

                      navigate(`/shop-detail/production/recipe/${item.id}`, {
                        state: {
                          itemName: item.name,
                          sizes: availableSizes,
                          selectedSize: currentSize,
                        },
                      });
                    }}
                  >
                    Configure Recipe &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
