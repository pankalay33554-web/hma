import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import "./salesPerson.css";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80",
    sizes: { S: 3500, M: 4500, L: 5500 },
    selectedSize: "M",
  },
  {
    id: 2,
    name: "Cheesy BBQ Burger",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80",
    sizes: { M: 6500, L: 8000 },
    selectedSize: "M",
  },
  {
    id: 3,
    name: "Big Monster Double",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80",
    sizes: { S: 7500, L: 9500 },
    selectedSize: "L",
  },
  {
    id: 4,
    name: "Spicy Crispy Chicken",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop&q=80",
    sizes: null,
    defaultPrice: 4500,
  },
  {
    id: 5,
    name: "French Garlic Baguette",
    category: "Fresh Breads",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80",
    sizes: null,
    defaultPrice: 3000,
  },
  {
    id: 6,
    name: "Butter Croissant",
    category: "Fresh Breads",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80",
    sizes: { S: 2000, M: 2800 },
    selectedSize: "S",
  },
  {
    id: 7,
    name: "Whole Wheat Loaf",
    category: "Fresh Breads",
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop&q=80",
    sizes: null,
    defaultPrice: 4000,
  },
  {
    id: 8,
    name: "Soft Milk Bread",
    category: "Fresh Breads",
    image:
      "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=500&auto=format&fit=crop&q=80",
    sizes: { M: 3200, L: 4200 },
    selectedSize: "M",
  },
  {
    id: 9,
    name: "Chocolate Fudge Cake",
    category: "Sweet Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80",
    sizes: { S: 3500, M: 5000, L: 8500 },
    selectedSize: "M",
  },
  {
    id: 10,
    name: "Red Velvet Slice",
    category: "Sweet Cakes",
    image:
      "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&auto=format&fit=crop&q=80",
    sizes: null,
    defaultPrice: 4200,
  },
  {
    id: 11,
    name: "Strawberry Cheesecake",
    category: "Sweet Cakes",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop&q=80",
    sizes: { S: 4000, L: 7500 },
    selectedSize: "S",
  },
  {
    id: 12,
    name: "Matcha Tiramisu",
    category: "Sweet Cakes",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&auto=format&fit=crop&q=80",
    sizes: null,
    defaultPrice: 4800,
  },
  {
    id: 13,
    name: "Iced Caramel Latte",
    category: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=80",
    sizes: { M: 3500, L: 4500 },
    selectedSize: "M",
  },
  {
    id: 14,
    name: "Fresh Orange Juice",
    category: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80",
    sizes: null,
    defaultPrice: 3000,
  },
  {
    id: 15,
    name: "Matcha Ice Blended",
    category: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80",
    sizes: { S: 3800, M: 4800, L: 5800 },
    selectedSize: "M",
  },
  {
    id: 16,
    name: "Sparkling Lemonade",
    category: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80",
    sizes: null,
    defaultPrice: 2500,
  },
];

export default function SalesPerson() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [cart, setCart] = useState([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const cashierName = "Hla Hla";
  const shopName = "Burger Shop 1";
  const currentDate = "Jul 22, 2026";

  const handleSizeChange = (productId, sizeKey) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, selectedSize: sizeKey } : item,
      ),
    );
  };

  const getItemPrice = (item) => {
    if (item.sizes) {
      return item.sizes[item.selectedSize];
    }
    return item.defaultPrice;
  };

  const addToCart = (product) => {
    const price = getItemPrice(product);
    const sizeLabel = product.sizes ? product.selectedSize : "Normal";
    const cartItemId = `${product.id}-${sizeLabel}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }
      return [
        ...prevCart,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          size: sizeLabel,
          price: price,
          qty: 1,
        },
      ];
    });
  };

  const updateQty = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  const handleLogout = () => {
    // Navigate to Login route (adjust URL if your login route is different)
    navigate("/");
  };

  const subTotalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subTotalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const discount = 0;
  const taxAmount = Math.round(subTotalPrice * 0.05);
  const totalPrice = subTotalPrice + taxAmount - discount;

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pos-desktop-container">
      {/* 🟢 TOP BAR */}
      <header className="pos-topbar">
        <div className="pos-brand-info">
          <StorefrontIcon className="topbar-store-icon" />
          <span className="pos-shop-title">{shopName}</span>
        </div>

        <div
          className="pos-user-profile"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="user-details">
            <span className="user-role-label">Sales Person</span>
            <span className="user-name">{cashierName}</span>
          </div>
          <AccountCircleIcon className="user-avatar-icon" />

          {/* ➖ Vertical Faint Divider Line */}
          <div
            style={{
              height: "22px",
              width: "1px",
              backgroundColor: "#ccc",
              margin: "0 7px",
              opacity: 0.7,
            }}
          />

          {/* 🚪 Logout Button */}
          <button
            type="button"
            className="btn-logout"
            title="Logout"
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              color: "#82000A",
              borderRadius: "50%",
            }}
          >
            <LogoutIcon style={{ fontSize: "1.5rem" }} />
          </button>
        </div>
      </header>

      {/* 🟢 MAIN WORKSPACE */}
      <div className="pos-workspace-body">
        {/* 👈 LEFT PANEL */}
        <div className="pos-left-catalog">
          <div className="pos-controls-row">
            <div className="search-input-wrapper">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="category-dropdown-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              <option value="Burgers">Burgers</option>
              <option value="Fresh Breads">Fresh Breads</option>
              <option value="Sweet Cakes">Sweet Cakes</option>
              <option value="Cold Drinks">Cold Drinks</option>
            </select>

            {/* 🔗 Order History Route Navigation */}
            <button
              type="button"
              className="btn-order-history"
              onClick={() => navigate("/order-history")}
            >
              <HistoryIcon style={{ fontSize: "1.1rem", marginRight: "6px" }} />
              Order History
            </button>
          </div>

          <div className="menu-cards-scroll-grid">
            {filteredProducts.map((product) => {
              const currentPrice = getItemPrice(product);
              return (
                <div key={product.id} className="pos-menu-card">
                  <div className="card-image-box">
                    <img src={product.image} alt={product.name} />
                    <span className="category-tag-badge">
                      {product.category}
                    </span>
                  </div>

                  <div className="card-content">
                    <h4 className="product-title">{product.name}</h4>

                    <div className="size-selector-row">
                      {product.sizes ? (
                        Object.keys(product.sizes).map((sizeKey) => (
                          <button
                            key={sizeKey}
                            type="button"
                            className={`size-btn ${
                              product.selectedSize === sizeKey ? "active" : ""
                            }`}
                            onClick={() =>
                              handleSizeChange(product.id, sizeKey)
                            }
                          >
                            {sizeKey}
                          </button>
                        ))
                      ) : (
                        <button
                          type="button"
                          className="size-btn normal-btn active"
                        >
                          Normal
                        </button>
                      )}
                    </div>

                    <div className="card-bottom-action">
                      <span className="price-display">
                        {currentPrice.toLocaleString()} Ks
                      </span>

                      <button
                        type="button"
                        className="btn-add-to-order"
                        onClick={() => addToCart(product)}
                      >
                        <AddShoppingCartIcon style={{ fontSize: "0.95rem" }} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 👉 RIGHT PANEL */}
        <div className="pos-right-cart">
          <div className="cart-header-info">
            <h3>Current Order</h3>
            <div className="meta-info-grid">
              <div>
                <label>Date: </label> <span>{currentDate}</span>
              </div>
              <div>
                <label>Cashier: </label> <span>{cashierName}</span>
              </div>
            </div>
          </div>

          <div className="cart-table-head">
            <span className="col-product">Product</span>
            <span className="col-qty">Qty</span>
            <span className="col-price">Price</span>
            <span className="col-action"></span>
          </div>

          <div className="cart-items-list-scroll">
            {cart.length === 0 ? (
              <div className="empty-cart-view">
                <p>No items added to cart</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="cart-item-row">
                  <div className="col-product item-detail">
                    <span className="item-name">{item.name}</span>
                    <span className="item-size-badge">({item.size})</span>
                  </div>

                  <div className="col-qty qty-controls">
                    <button
                      type="button"
                      onClick={() => updateQty(item.cartItemId, -1)}
                    >
                      -
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.cartItemId, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="col-price item-total">
                    {(item.price * item.qty).toLocaleString()} Ks
                  </div>

                  <div className="col-action">
                    <button
                      type="button"
                      className="btn-delete-cart-item"
                      title="Remove item"
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      <DeleteOutlineIcon style={{ fontSize: "1.4rem" }} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary-section">
            <div className="summary-line">
              <span>Sub Total ({subTotalCount} items):</span>
              <strong>{subTotalPrice.toLocaleString()} Ks</strong>
            </div>
            <div className="summary-line">
              <span>Discount:</span>
              <span>{discount} Ks</span>
            </div>
            <div className="summary-line">
              <span>Tax (5%):</span>
              <span>{taxAmount.toLocaleString()} Ks</span>
            </div>
            <div className="summary-line total-highlight">
              <span>Total Amount:</span>
              <strong>{totalPrice.toLocaleString()} Ks</strong>
            </div>

            <div className="cart-action-buttons">
              <button
                type="button"
                className="btn-cart-cancel"
                onClick={() => setCart([])}
                disabled={cart.length === 0}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-cart-pay"
                onClick={() => setShowReceiptModal(true)}
                disabled={cart.length === 0}
              >
                Pay & Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🌁 RECEIPT PRINT MODAL */}
      {showReceiptModal && (
        <div className="receipt-modal-overlay">
          <div className="receipt-modal-card">
            <div className="printable-receipt-slip" id="printable-area">
              <div className="receipt-header">
                <h2>{shopName}</h2>
                <p>09 123456789</p>
                <p>shop.stock@gmail.com</p>
                <p>Yangon, Myanmar</p>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-meta">
                <div>Date: {currentDate}</div>
                <div>Cashier: {cashierName}</div>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-table">
                <div className="receipt-th">
                  <span className="th-item">Products</span>
                  <span className="th-qty">Qty</span>
                  <span className="th-price">Price</span>
                </div>
                {cart.map((item) => (
                  <div key={item.cartItemId} className="receipt-tr">
                    <span className="td-item">
                      {item.name} <br />
                      <small>({item.size})</small>
                    </span>
                    <span className="td-qty">{item.qty}</span>
                    <span className="td-price">
                      {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-totals">
                <div className="r-line">
                  <span>Sub Total :</span>
                  <span>{subTotalPrice.toLocaleString()} Ks</span>
                </div>
                <div className="r-line">
                  <span>Discount :</span>
                  <span>0 Ks</span>
                </div>
                <div className="r-line">
                  <span>Tax (5%) :</span>
                  <span>{taxAmount.toLocaleString()} Ks</span>
                </div>
                <div className="r-line r-total">
                  <span>Total :</span>
                  <span>{totalPrice.toLocaleString()} Ks</span>
                </div>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-footer-text">
                Thank you for dining with us! Please come again.
              </div>
            </div>

            {/* Modal Actions (With Border Top) */}
            <div className="receipt-modal-footer no-print">
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowReceiptModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-modal-print"
                onClick={handlePrint}
              >
                <PrintIcon style={{ fontSize: "1rem", marginRight: "4px" }} />
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
