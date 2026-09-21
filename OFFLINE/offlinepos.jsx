import { useMemo, useState } from "react";
import {
  Add,
  Remove,
  Close,
  Search,
  Delete,
  ShoppingCart,
  Restaurant,
  TableRestaurant,
  PeopleAlt,
  Print,
  Assessment,
  CheckCircle,
  WarningAmber,
  AddCircle,
  TakeoutDining,
} from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router";

import "./offlinepos.css";
import img1 from "../src/shop/img1.jpg";

const categories = ["All Items", "Burgers", "Fresh Breads", "Cold Drinks"];

const menuItems = [
  {
    id: 1,
    name: "Artisan Beef Burger",
    price: 15000,
    category: "Burgers",
    status: "Normal",
  },
  {
    id: 2,
    name: "Beef Burger",
    price: 30000,
    category: "Burgers",
    status: "Normal",
  },
  {
    id: 3,
    name: "Iced Americano",
    price: 5000,
    category: "Cold Drinks",
    status: "Normal",
  },
  {
    id: 4,
    name: "Iced Latte",
    price: 7000,
    category: "Cold Drinks",
    status: "Normal",
  },
  {
    id: 5,
    name: "Croissant",
    price: 7000,
    category: "Fresh Breads",
    status: "Normal",
  },
  {
    id: 6,
    name: "Chicken Burger",
    price: 18000,
    category: "Burgers",
    status: "Normal",
  },
];

const initialTables = [
  {
    id: "T01",
    guests: 3,
    status: "Occupied",
  },
  {
    id: "T02",
    guests: 2,
    status: "Ordering",
  },
  {
    id: "T03",
    guests: 0,
    status: "Available",
  },
  {
    id: "T04",
    guests: 0,
    status: "Available",
  },
];

const formatMoney = (value) => `${value.toLocaleString()} MMK`;

const OfflinePos = () => {
  const [mode, setMode] = useState("dine-in");
  const navigate = useNavigate();

  const [tables, setTables] = useState(initialTables);

  const [selectedTable, setSelectedTable] = useState("T02");

  const [guests, setGuests] = useState(2);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All Items");

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(true);

  const [showAddTable, setShowAddTable] = useState(false);

  const [showReport, setShowReport] = useState(false);

  const [tableNumber, setTableNumber] = useState("");

  const [tableError, setTableError] = useState("");

  const [reportText, setReportText] = useState("");

  const [reportError, setReportError] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Items" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const tax = Math.round(subtotal * 0.05);

  const grandTotal = subtotal + tax;

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    window.setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 2500);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);

    setShowCart(true);

    setSearch("");

    setCategory("All Items");
  };

  const handleTableSelect = (table) => {
    if (table.status === "Occupied") {
      showToast("This table is currently occupied.", "error");

      return;
    }

    setSelectedTable(table.id);

    const nextGuests = table.guests || 1;

    setGuests(nextGuests);
    if (table.status === "Available") {
      setTables((previous) =>
        previous.map((item) =>
          item.id === table.id
            ? {
                ...item,
                status: "Ordering",
                guests: 1,
              }
            : item,
        ),
      );
    }

    setShowCart(true);
  };

  const increaseGuests = () => {
    if (guests >= 20) {
      showToast("Maximum 20 guests allowed.", "warning");

      return;
    }

    const nextGuests = guests + 1;

    setGuests(nextGuests);

    setTables((previous) =>
      previous.map((item) =>
        item.id === selectedTable
          ? {
              ...item,
              guests: nextGuests,
              status: "Ordering",
            }
          : item,
      ),
    );
  };

  const decreaseGuests = () => {
    if (guests <= 1) {
      showToast("At least 1 guest is required.", "warning");

      return;
    }

    const nextGuests = guests - 1;

    setGuests(nextGuests);

    setTables((previous) =>
      previous.map((item) =>
        item.id === selectedTable
          ? {
              ...item,
              guests: nextGuests,
            }
          : item,
      ),
    );
  };

  const handleAddItem = (product) => {
    setCart((previous) => {
      const exists = previous.find((item) => item.id === product.id);

      if (exists) {
        return previous.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...previous,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setShowCart(true);

    showToast(`${product.name} added to order.`);
  };

  const increaseItem = (id) => {
    setCart((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseItem = (id) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const deleteItem = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id));

    showToast("Item removed from order.", "warning");
  };

  const clearCart = () => {
    if (cart.length === 0) {
      showToast("Order cart is already empty.", "warning");

      return;
    }

    setCart([]);

    showToast("All items removed from order.", "warning");
  };

  const handleAddTable = () => {
    const cleanNumber = tableNumber.trim().toUpperCase();

    if (!cleanNumber) {
      setTableError("Please enter a table number.");

      return;
    }

    if (!/^T\d{1,3}$/.test(cleanNumber)) {
      setTableError("Table format must be like T05.");

      return;
    }

    const exists = tables.some((item) => item.id === cleanNumber);

    if (exists) {
      setTableError("This table already exists.");

      return;
    }

    setTables((previous) => [
      ...previous,
      {
        id: cleanNumber,
        guests: 0,
        status: "Available",
      },
    ]);

    setTableNumber("");

    setTableError("");

    setShowAddTable(false);

    showToast(`${cleanNumber} added successfully.`);
  };

  return (
    <div className="pos-page">
      <header className="pos-header">
        <div className="pos-header-left">
          <div className="pos-title">POS Register</div>

          <div className="mode-switch">
            <button
              className={`mode-button ${
                mode === "dine-in" ? "mode-button-active" : ""
              }`}
              type="button"
              onClick={() => handleModeChange("dine-in")}
            >
              <Restaurant />
              Dine-In
            </button>

            <button
              className={`mode-button ${
                mode === "takeaway" ? "mode-button-active" : ""
              }`}
              type="button"
              onClick={() => handleModeChange("takeaway")}
            >
              <TakeoutDining />
              Takeaway
            </button>
          </div>

          <div className="pos-user">
            <div className="pos-user-icon">
              <PeopleAlt />
            </div>

            <div className="pos-user-info">
              <div className="pos-user-name">System Manager</div>

              <div className="pos-user-role">HERMAN HUNUNG</div>
            </div>
          </div>
        </div>
      </header>

      <div className="pos-body">
        <main className="pos-main">
          {mode === "dine-in" && (
            <section className="floor-section">
              <div className="floor-header">
                <div className="floor-title">Floor Plan - Main Dining</div>

                <button
                  className="add-table-button"
                  type="button"
                  onClick={() => {
                    setTableNumber("");
                    setTableError("");
                    setShowAddTable(true);
                  }}
                >
                  <AddCircle />
                  Add Table
                </button>
              </div>

              <div className="table-grid">
                {tables.map((table) => {
                  const selected = selectedTable === table.id;
                  return (
                    <button
                      className={`table-card ${
                        selected ? "table-card-selected" : ""
                      } ${
                        table.status === "Occupied" ? "table-card-occupied" : ""
                      }`}
                      type="button"
                      key={table.id}
                      onClick={() => handleTableSelect(table)}
                    >
                      <div className="table-card-top">
                        <div className="table-number">{table.id}</div>

                        {table.status === "Occupied" && (
                          <div className="occupied-badge">Occupied</div>
                        )}

                        {table.status === "Ordering" && (
                          <div className="ordering-badge">Ordering</div>
                        )}
                      </div>

                      <div className="table-card-bottom">
                        <div className="guest-count">
                          <PeopleAlt />
                          {table.guests} Guests
                        </div>

                        {table.status === "Available" && (
                          <div className="available-status">
                            <span className="available-dot" />
                            Available
                          </div>
                        )}

                        {table.status === "Ordering" && (
                          <div className="ordering-status">
                            <span className="ordering-dot" />
                            Ordering
                          </div>
                        )}
                      </div>

                      <div className="table-icon">
                        <TableRestaurant />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <section className="menu-section">
            <div className="search-wrapper">
              <Search className="search-icon" />

              <input
                className="search-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="search menu name..."
              />

              {search && (
                <button
                  className="search-clear"
                  type="button"
                  onClick={() => setSearch("")}
                >
                  <Close />
                </button>
              )}

              <div className="search-shortcut">[⌘]</div>
            </div>

            <div className="category-list">
              {categories.map((item) => (
                <button
                  className={`category-button ${
                    category === item ? "category-button-active" : ""
                  }`}
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item === "All Items" && <ShoppingCart />}

                  {item}
                </button>
              ))}
            </div>
            <div className="menu-heading">Menu Items</div>

            <div className="menu-grid">
              {filteredItems.map((item) => (
                <div className="menu-card" key={item.id}>
                  <div className="menu-image">
                    <img src={img1} />
                  </div>

                  <div className="menu-card-content">
                    <div className="menu-item-name">{item.name}</div>

                    <div className="menu-item-meta">
                      <span className="menu-status">{item.status}</span>

                      <span className="menu-category">{item.category}</span>
                    </div>

                    <div className="menu-bottom">
                      <div className="menu-price">
                        {formatMoney(item.price)}
                      </div>

                      <button
                        className="menu-add-button"
                        type="button"
                        onClick={() => handleAddItem(item)}
                      >
                        <ShoppingCart />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="empty-menu">
                  <Search />

                  <div className="empty-menu-title">No menu items found</div>

                  <div className="empty-menu-text">Try another search.</div>
                </div>
              )}
            </div>
          </section>
        </main>

        <aside
          className={`order-sidebar ${
            showCart ? "order-sidebar-visible" : "order-sidebar-hidden"
          }`}
        >
          <div className="order-header">
            <div className="order-title-box">
              {mode === "dine-in" ? (
                <div className="order-table-badge">{selectedTable}</div>
              ) : (
                <div className="order-table-badge">T/O</div>
              )}

              <div className="order-title">Order Cart</div>
            </div>

            <button
              className="order-delete-all"
              type="button"
              onClick={clearCart}
            >
              <Delete />
            </button>
          </div>
          {mode === "dine-in" && (
            <div className="guest-control">
              <div className="guest-control-left">
                <PeopleAlt />
                <span>Guests</span>
              </div>

              <div className="guest-control-box">
                <button
                  className="guest-control-button"
                  type="button"
                  onClick={decreaseGuests}
                >
                  <Remove />
                </button>

                <span className="guest-value">{guests}</span>

                <button
                  className="guest-control-button"
                  type="button"
                  onClick={increaseGuests}
                >
                  <Add />
                </button>
              </div>
            </div>
          )}{" "}
          {mode === "takeaway" && (
            <div className="takeaway-info">
              <div className="takeaway-info-icon">
                <TakeoutDining />
              </div>

              <div className="takeaway-info-content">
                <div className="takeaway-info-title">Takeaway Order</div>

                <div className="takeaway-info-text">
                  Add menu items to create an order.
                </div>
              </div>
            </div>
          )}
          <div className="cart-list">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart />

                <div className="empty-cart-title">No items in order</div>

                <div className="empty-cart-text">
                  Add menu items to this order.
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div className="cart-product" key={item.id}>
                  <div className="cart-product-top">
                    <div className="cart-product-name">{item.name}</div>

                    <button
                      className="cart-delete"
                      type="button"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Close />
                    </button>
                  </div>

                  <div className="cart-product-status">{item.status}</div>

                  <div className="cart-product-bottom">
                    <div className="cart-quantity">
                      <button
                        className="cart-quantity-button"
                        type="button"
                        onClick={() => decreaseItem(item.id)}
                      >
                        <Remove />
                      </button>

                      <span className="cart-quantity-value">
                        {item.quantity}
                      </span>

                      <button
                        className="cart-quantity-button"
                        type="button"
                        onClick={() => increaseItem(item.id)}
                      >
                        <Add />
                      </button>
                    </div>

                    <div className="cart-price">
                      {formatMoney(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="order-footer">
            <div className="total-row">
              <span>Subtotal ({cart.length} items)</span>

              <span>{formatMoney(subtotal)}</span>
            </div>

            <div className="total-row">
              <span>Tax (5%)</span>

              <span>{formatMoney(tax)}</span>
            </div>

            <div className="total-divider" />

            <div className="grand-total">
              <span>Grand Total</span>

              <span>{formatMoney(grandTotal)}</span>
            </div>

            <div className="order-buttons">
              <button
                className="order-cancel-button"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Cancel
              </button>

              <button
                className="order-report-button"
                type="button"
                onClick={() => {
                  if (cart.length === 0) {
                    showToast("There is no order to report.", "error");

                    return;
                  }

                  setReportError("");

                  setShowReport(true);
                }}
              >
                <Assessment />
                Report
              </button>

              <button
                className="order-checkout-button"
                type="button"
                onClick={() => navigate("posslip")}
              >
                <Print />
                CHECKOUT & PRINT
              </button>
              <Outlet />
            </div>
          </div>
        </aside>
      </div>

      {showAddTable && (
        <div className="popup-overlay">
          <div className="add-table-popup">
            <div className="popup-header">
              <div>
                <div className="popup-title">Add New Table</div>

                <div className="popup-subtitle">Add a table to Main Dining</div>
              </div>

              <button
                className="popup-close"
                type="button"
                onClick={() => setShowAddTable(false)}
              >
                <Close />
              </button>
            </div>

            <div className="popup-field">
              <div className="popup-label">Table Number</div>

              <input
                className={`popup-input ${
                  tableError ? "popup-input-error" : ""
                }`}
                value={tableNumber}
                onChange={(event) => {
                  setTableNumber(event.target.value.toUpperCase());

                  setTableError("");
                }}
                placeholder="Example: T05"
              />

              {tableError && (
                <div className="validation-message">
                  <WarningAmber />

                  {tableError}
                </div>
              )}
            </div>

            <div className="popup-actions">
              <button
                className="popup-cancel"
                type="button"
                onClick={() => setShowAddTable(false)}
              >
                Cancel
              </button>

              <button
                className="popup-submit"
                type="button"
                onClick={handleAddTable}
              >
                <Add />
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}

      {showReport && (
        <div className="popup-overlay">
          <div className="report-popup">
            <div className="popup-header">
              <div>
                <div className="popup-title">Order Report</div>

                <div className="popup-subtitle">
                  {mode === "dine-in"
                    ? `Report for ${selectedTable}`
                    : "Report for Takeaway Order"}
                </div>
              </div>

              <button
                className="popup-close"
                type="button"
                onClick={() => setShowReport(false)}
              >
                <Close />
              </button>
            </div>

            <div className="report-info">
              {mode === "dine-in" && (
                <div className="report-info-item">
                  <span>Table</span>

                  <strong>{selectedTable}</strong>
                </div>
              )}

              {mode === "dine-in" && (
                <div className="report-info-item">
                  <span>Guests</span>

                  <strong>{guests}</strong>
                </div>
              )}

              <div className="report-info-item">
                <span>Total</span>

                <strong>{formatMoney(grandTotal)}</strong>
              </div>
            </div>

            <div className="popup-field">
              <div className="popup-label">Report Description</div>

              <textarea
                className={`report-textarea ${
                  reportError ? "report-textarea-error" : ""
                }`}
                value={reportText}
                onChange={(event) => {
                  setReportText(event.target.value);

                  setReportError("");
                }}
                placeholder="Enter report..."
              />

              {reportError && (
                <div className="validation-message">
                  <WarningAmber />

                  {reportError}
                </div>
              )}
            </div>

            <div className="popup-actions">
              <button
                className="popup-cancel"
                type="button"
                onClick={() => setShowReport(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`pos-toast pos-toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === "success" && <CheckCircle />}

            {toast.type === "warning" && <WarningAmber />}

            {toast.type === "error" && <WarningAmber />}
          </div>

          <div className="toast-message">{toast.message}</div>

          <button
            className="toast-close"
            type="button"
            onClick={() =>
              setToast({
                show: false,
                message: "",
                type: "success",
              })
            }
          >
            <Close />
          </button>
        </div>
      )}
    </div>
  );
};

export default OfflinePos;
