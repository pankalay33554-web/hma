import { useMemo, useState } from "react";
import { useNavigate, Outlet } from "react-router";

import SearchIcon from "@mui/icons-material/Search";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorIcon from "@mui/icons-material/Error";
import "./onlinepos.css";

const products = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    category: "Men Wear",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    variants: {
      S: { price: 125000, stock: 18 },
      M: { price: 130000, stock: 12 },
      L: { price: 135000, stock: 45 },
      XL: { price: 145000, stock: 0 },
    },
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    category: "Men Wear",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    variants: {
      S: { price: 40000, stock: 20 },
      M: { price: 45000, stock: 35 },
      L: { price: 48000, stock: 12 },
      XL: { price: 50000, stock: 0 },
    },
  },
  {
    id: 3,
    name: "Premium Leather Wallet",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    variants: {
      S: { price: 65000, stock: 8 },
      M: { price: 70000, stock: 4 },
      L: { price: 75000, stock: 0 },
    },
  },
  {
    id: 4,
    name: "Women Classic Blazer",
    category: "Women Wear",
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=80",
    variants: {
      S: { price: 95000, stock: 15 },
      M: { price: 105000, stock: 25 },
      L: { price: 115000, stock: 6 },
      XL: { price: 125000, stock: 0 },
    },
  },
  {
    id: 5,
    name: "Women Casual Dress",
    category: "Women Wear",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    variants: {
      S: { price: 85000, stock: 11 },
      M: { price: 90000, stock: 18 },
      L: { price: 98000, stock: 5 },
      XL: { price: 105000, stock: 0 },
    },
  },
  {
    id: 6,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    variants: {
      S: { price: 120000, stock: 7 },
      M: { price: 130000, stock: 9 },
      L: { price: 145000, stock: 0 },
    },
  },
];

const categories = [
  {
    name: "All Items",
  },
  {
    name: "Men Wear",
  },
  {
    name: "Women Wear",
  },
  {
    name: "Accessories",
  },
];

const money = (value) => `${value.toLocaleString()} MMK`;

const getDefaultSize = (product) => {
  const sizes = Object.keys(product.variants);
  return sizes.find((size) => product.variants[size].stock > 0) || sizes[0];
};

function OnlinePos() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [category, setCategory] = useState("All Items");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showMessage = (type, message) => {
    setPopup({
      show: true,
      type,
      message,
    });

    window.setTimeout(() => {
      setPopup((prev) => ({
        ...prev,
        show: false,
      }));
    }, 2500);
  };

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatch =
        category === "All Items" || product.category === category;

      const searchMatch =
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword);

      return categoryMatch && searchMatch;
    });
  }, [search, category]);

  const getSelectedSize = (product) => {
    return selectedSizes[product.id] || getDefaultSize(product);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const addToCart = (product) => {
    const size = getSelectedSize(product);
    const variant = product.variants[size];

    if (!variant || variant.stock <= 0) {
      showMessage(`"error", ${product.name} - Size ${size} is out of stock.`);
      return;
    }

    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.size === size,
    );

    if (existingIndex !== -1) {
      const existingItem = cart[existingIndex];

      if (existingItem.quantity >= variant.stock) {
        showMessage(
          "error",
          `Only ${variant.stock} items available for Size ${size}.`,
        );
        return;
      }

      setCart((prev) =>
        prev.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );

      showMessage(`"success", ${product.name} quantity increased.`);
      return;
    }

    setCart((prev) => [
      ...prev,
      {
        productId: product.id,
        name: product.name,
        image: product.image,
        size,
        price: variant.price,
        quantity: 1,
        stock: variant.stock,
      },
    ]);

    showMessage(`"success", ${product.name} added to current order.`);
  };

  const increaseQuantity = (index) => {
    setCart((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        if (item.quantity >= item.stock) {
          showMessage(
            "error",
            `Only ${item.stock} items available for Size ${item.size}.`,
          );
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  };

  const decreaseQuantity = (index) => {
    setCart((prev) =>
      prev
        .map((item, itemIndex) => {
          if (itemIndex !== index) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeCartItem = (index) => {
    setCart((prev) => prev.filter((_, itemIndex) => itemIndex !== index));

    showMessage("success", "Item removed from current order.");
  };

  const clearCart = () => {
    if (cart.length === 0) {
      showMessage("error", "Current order is already empty.");
      return;
    }

    setCart([]);
    showMessage("success", "Current order cancelled.");
  };

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const totalItems = cart.reduce(
    (totalCount, item) => totalCount + item.quantity,
    0,
  );

  return (
    <div className="pos-page">
      <header className="pos-header">
        <div className="pos-header-title">
          <h1 className="pos-title">POS Register</h1>
        </div>

        <div className="pos-manager">
          <div className="pos-manager-icon">
            <PersonOutlineRoundedIcon />
          </div>

          <div className="pos-manager-info">
            <span className="pos-manager-role">System Manager</span>
            <span className="pos-manager-name">HEN MN AUNG</span>
          </div>
        </div>
      </header>

      <main className="pos-main">
        <section className="pos-products-section">
          <div className="pos-search-box">
            <SearchIcon className="pos-search-icon" />

            <input
              className="pos-search-input"
              type="text"
              placeholder="Scan barcode or search product name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <span className="pos-search-shortcut">F2</span>

            <button className="pos-search-button" type="button">
              <SearchIcon />
            </button>
          </div>

          <div className="pos-category-list">
            {categories.map((item) => (
              <button
                key={item.name}
                className={`pos-category-button ${
                  category === item.name ? "pos-category-active" : ""
                }`}
                type="button"
                onClick={() => setCategory(item.name)}
              >
                {item.icon}
                <span className="pos-category-text">{item.name}</span>
              </button>
            ))}
          </div>

          <div className="pos-product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const selectedSize = getSelectedSize(product);
                const selectedVariant = product.variants[selectedSize];

                return (
                  <div className="pos-product-card" key={product.id}>
                    <div className="pos-product-image-box">
                      <img
                        className="pos-product-image"
                        src={product.image}
                        alt={product.name}
                      />

                      <div
                        className={`pos-stock-badge ${
                          selectedVariant.stock === 0
                            ? "pos-stock-out"
                            : selectedVariant.stock <= 5
                              ? "pos-stock-low"
                              : "pos-stock-available"
                        }`}
                      >
                        {selectedVariant.stock === 0
                          ? "Out of stock"
                          : `${selectedVariant.stock} left`}
                      </div>
                    </div>

                    <div className="pos-product-content">
                      <h2 className="pos-product-name">{product.name}</h2>

                      <div className="pos-size-list">
                        {Object.keys(product.variants).map((size) => {
                          const variant = product.variants[size];
                          const isSelected = selectedSize === size;
                          const isOut = variant.stock === 0;

                          return (
                            <button
                              key={size}
                              className={`pos-size-button ${
                                isSelected ? "pos-size-active" : ""
                              } ${isOut ? "pos-size-out" : ""}`}
                              type="button"
                              disabled={isOut}
                              onClick={() => handleSizeChange(product.id, size)}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pos-product-bottom">
                        <div className="pos-price-box">
                          <span className="pos-product-price">
                            {money(selectedVariant.price)}
                          </span>
                          <span className="pos-product-currency">MMK</span>
                        </div>

                        <button
                          className={`pos-add-button ${
                            selectedVariant.stock === 0
                              ? "pos-add-disabled"
                              : ""
                          }`}
                          type="button"
                          disabled={selectedVariant.stock === 0}
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCartOutlinedIcon />
                          <span>
                            {selectedVariant.stock === 0 ? "Out" : "Add"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="pos-empty-products">
                <SearchIcon className="pos-empty-icon" />
                <h2 className="pos-empty-title">No products found</h2>
                <p className="pos-empty-text">
                  Try another product name or category.
                </p>
              </div>
            )}
          </div>
        </section>

        <aside className="pos-order-panel">
          <div className="pos-order-header">
            <div className="pos-order-heading">
              <div className="pos-order-icon">
                <ShoppingCartOutlinedIcon />
              </div>

              <div className="pos-order-title-box">
                <h2 className="pos-order-title">Current Order</h2>
                <span className="pos-order-number"># 1042</span>
              </div>
            </div>

            <button
              className="pos-clear-button"
              type="button"
              onClick={clearCart}
            >
              <DeleteOutlineRoundedIcon />
            </button>
          </div>

          <div className="pos-cart-list">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  className="pos-cart-item"
                  key={`${item.productId}-${item.size}`}
                >
                  <div className="pos-cart-item-header">
                    <h3 className="pos-cart-item-name">{item.name}</h3>

                    <button
                      className="pos-cart-remove"
                      type="button"
                      onClick={() => removeCartItem(index)}
                    >
                      <CloseRoundedIcon />
                    </button>
                  </div>

                  <div className="pos-cart-meta">
                    <span className="pos-cart-size">Size {item.size}</span>
                    <span className="pos-cart-unit-price">
                      {money(item.price)}
                    </span>
                  </div>

                  <div className="pos-cart-footer">
                    <div className="pos-quantity-control">
                      <button
                        className="pos-quantity-button"
                        type="button"
                        onClick={() => decreaseQuantity(index)}
                      >
                        <RemoveRoundedIcon />
                      </button>
                      <span className="pos-quantity-number">
                        {item.quantity}
                      </span>

                      <button
                        className="pos-quantity-button"
                        type="button"
                        onClick={() => increaseQuantity(index)}
                      >
                        <AddRoundedIcon />
                      </button>
                    </div>

                    <strong className="pos-cart-total">
                      {money(item.price * item.quantity)}
                    </strong>
                  </div>

                  <div className="pos-cart-stock">
                    {item.quantity >= item.stock
                      ? "Maximum stock selected"
                      : `${item.stock - item.quantity} left`}
                  </div>
                </div>
              ))
            ) : (
              <div className="pos-empty-cart">
                <ShoppingCartOutlinedIcon className="pos-empty-cart-icon" />
                <h3 className="pos-empty-cart-title">Current order is empty</h3>
                <p className="pos-empty-cart-text">
                  Select a product and press Add.
                </p>
              </div>
            )}
          </div>

          <div className="pos-summary">
            <div className="pos-summary-row">
              <span>Subtotal ({totalItems} Items)</span>
              <strong>{money(subtotal)}</strong>
            </div>

            <div className="pos-summary-row">
              <span>Tax (5%)</span>
              <strong>{money(tax)}</strong>
            </div>

            <div className="pos-summary-divider" />

            <div className="pos-total-row">
              <span>Total Payable</span>
              <strong>{money(total)}</strong>
            </div>

            <div className="pos-action-row">
              <button
                className="pos-cancel-button"
                type="button"
                onClick={clearCart}
              >
                Cancel
              </button>

              <button
                className="pos-checkout-button"
                type="button"
                onClick={() => navigate("orderprint")}
              >
                <PrintRoundedIcon />
                <span>CHECKOUT & PRINT</span>
              </button>
              <Outlet />
            </div>
          </div>
        </aside>
      </main>

      {popup.show && (
        <div className="pos-message-popup">
          <div
            className={`pos-message-icon ${
              popup.type === "error"
                ? "pos-message-error"
                : "pos-message-success"
            }`}
          >
            {popup.type === "error" ? (
              <ErrorIcon />
            ) : (
              <CheckCircleRoundedIcon />
            )}
          </div>

          <div className="pos-message-content">
            <strong className="pos-message-title">
              {popup.type === "error" ? "Error" : "Success"}
            </strong>
            <span className="pos-message-text">{popup.message}</span>
          </div>

          <button
            className="pos-message-close"
            type="button"
            onClick={() =>
              setPopup((prev) => ({
                ...prev,
                show: false,
              }))
            }
          >
            <CloseRoundedIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default OnlinePos;
