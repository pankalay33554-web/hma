import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Pagination, MenuItem, Select } from "@mui/material";

import "./offlineinventory.css";

const initialInventory = [
  {
    id: "ITM-001",
    name: "Rice 5kg",
    category: "Grocery",
    stock: 50,
    unit: "kg",
    status: "In Stock",
    date: "2026-09-01",
  },
  {
    id: "ITM-002",
    name: "Beef Patty",
    category: "Frozen",
    stock: 12,
    unit: "pcs",
    status: "Low Stock",
    date: "2026-09-02",
  },
  {
    id: "ITM-003",
    name: "Chicken Breast",
    category: "Dairy",
    stock: 38,
    unit: "packs",
    status: "In Stock",
    date: "2026-09-03",
  },
  {
    id: "ITM-004",
    name: "Fresh Lettuce",
    category: "Produce",
    stock: 8,
    unit: "kg",
    status: "Low Stock",
    date: "2026-09-04",
  },
  {
    id: "ITM-005",
    name: "Milk",
    category: "Dairy",
    stock: 100,
    unit: "ml",
    status: "In Stock",
    date: "2026-09-05",
  },
  {
    id: "ITM-006",
    name: "Potato",
    category: "Produce",
    stock: 65,
    unit: "kg",
    status: "In Stock",
    date: "2026-09-05",
  },
  {
    id: "ITM-007",
    name: "Tomato Sauce",
    category: "Grocery",
    stock: 18,
    unit: "bottles",
    status: "Low Stock",
    date: "2026-09-06",
  },
  {
    id: "ITM-008",
    name: "Cheese",
    category: "Dairy",
    stock: 42,
    unit: "packs",
    status: "In Stock",
    date: "2026-09-06",
  },
  {
    id: "ITM-009",
    name: "Chicken Wings",
    category: "Frozen",
    stock: 25,
    unit: "kg",
    status: "In Stock",
    date: "2026-09-07",
  },
  {
    id: "ITM-010",
    name: "Burger Bun",
    category: "Bakery",
    stock: 15,
    unit: "packs",
    status: "Low Stock",
    date: "2026-09-07",
  },
  {
    id: "ITM-011",
    name: "Cooking Oil",
    category: "Grocery",
    stock: 30,
    unit: "L",
    status: "In Stock",
    date: "2026-08-30",
  },
  {
    id: "ITM-012",
    name: "Onion",
    category: "Produce",
    stock: 45,
    unit: "kg",
    status: "In Stock",
    date: "2026-08-30",
  },
  {
    id: "ITM-013",
    name: "Egg",
    category: "Dairy",
    stock: 10,
    unit: "trays",
    status: "Low Stock",
    date: "2026-08-29",
  },
  {
    id: "ITM-014",
    name: "French Fries",
    category: "Frozen",
    stock: 28,
    unit: "kg",
    status: "In Stock",
    date: "2026-08-29",
  },
  {
    id: "ITM-015",
    name: "Salt",
    category: "Grocery",
    stock: 55,
    unit: "kg",
    status: "In Stock",
    date: "2026-08-28",
  },
  {
    id: "ITM-016",
    name: "Black Pepper",
    category: "Grocery",
    stock: 20,
    unit: "packs",
    status: "In Stock",
    date: "2026-08-28",
  },
  {
    id: "ITM-017",
    name: "Mayonnaise",
    category: "Grocery",
    stock: 9,
    unit: "bottles",
    status: "Low Stock",
    date: "2026-08-27",
  },
  {
    id: "ITM-018",
    name: "Ketchup",
    category: "Grocery",
    stock: 34,
    unit: "bottles",
    status: "In Stock",
    date: "2026-08-27",
  },
  {
    id: "ITM-019",
    name: "Mineral Water",
    category: "Beverage",
    stock: 80,
    unit: "bottles",
    status: "In Stock",
    date: "2026-08-26",
  },
  {
    id: "ITM-020",
    name: "Orange Juice",
    category: "Beverage",
    stock: 14,
    unit: "bottles",
    status: "Low Stock",
    date: "2026-08-26",
  },
  {
    id: "ITM-021",
    name: "Apple Juice",
    category: "Beverage",
    stock: 35,
    unit: "bottles",
    status: "In Stock",
    date: "2026-08-25",
  },
  {
    id: "ITM-022",
    name: "Coffee Beans",
    category: "Beverage",
    stock: 22,
    unit: "kg",
    status: "In Stock",
    date: "2026-08-25",
  },
];

const ITEMS_PER_PAGE = 20;

function OfflineInventory() {
  const [inventory, setInventory] = useState(initialInventory);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [dateFilter, setDateFilter] = useState("");

  const [page, setPage] = useState(1);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    item: null,
  });

  const [form, setForm] = useState({
    name: "",
    category: "Grocery",
    stock: "",
    unit: "pcs",
    date: "",
  });

  const categories = useMemo(() => {
    return [
      "All Categories",
      ...new Set(inventory.map((item) => item.category)),
    ];
  }, [inventory]);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const keyword = search.toLowerCase().trim();

      const matchSearch =
        !keyword ||
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      const matchCategory =
        category === "All Categories" || item.category === category;

      const matchDate = !dateFilter || item.date === dateFilter;

      return matchSearch && matchCategory && matchDate;
    });
  }, [inventory, search, category, dateFilter]);

  const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);

  const paginatedInventory = filteredInventory.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const totalItems = inventory.length;

  const lowStock = inventory.filter(
    (item) => item.status === "Low Stock",
  ).length;

  const totalStock = inventory.reduce(
    (sum, item) => sum + Number(item.stock),
    0,
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
    setPage(1);
  };

  const openAddModal = () => {
    setForm({
      name: "",
      category: "Grocery",
      stock: "",
      unit: "pcs",
      date: new Date().toISOString().split("T")[0],
    });

    setModal({
      open: true,
      type: "add",
      item: null,
    });
  };

  const openEditModal = (item) => {
    setForm({
      name: item.name,
      category: item.category,
      stock: item.stock,
      unit: item.unit,
      date: item.date,
    });

    setModal({
      open: true,
      type: "edit",
      item,
    });
  };

  const closeModal = () => {
    setModal({
      open: false,
      type: "",
      item: null,
    });
  };

  const saveItem = () => {
    if (!form.name.trim() || !form.stock || !form.date) {
      return;
    }

    const stockNumber = Number(form.stock);

    const newStatus = stockNumber <= 20 ? "Low Stock" : "In Stock";

    if (modal.type === "add") {
      const newItem = {
        id: `ITM-${String(inventory.length + 1).padStart(3, "0")}`,
        name: form.name,
        category: form.category,
        stock: stockNumber,
        unit: form.unit,
        status: newStatus,
        date: form.date,
      };

      setInventory((prev) => [newItem, ...prev]);
    }
    if (modal.type === "edit") {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === modal.item.id
            ? {
                ...item,
                name: form.name,
                category: form.category,
                stock: stockNumber,
                unit: form.unit,
                date: form.date,
                status: newStatus,
              }
            : item,
        ),
      );
    }

    closeModal();
  };

  const openDeleteModal = (item) => {
    setModal({
      open: true,
      type: "delete",
      item,
    });
  };

  const deleteItem = () => {
    setInventory((prev) => prev.filter((item) => item.id !== modal.item.id));

    closeModal();

    if (page > 1 && paginatedInventory.length === 1) {
      setPage(page - 1);
    }
  };

  const exportExcel = () => {
    const exportData = filteredInventory.map((item) => ({
      "Item Code": item.id,
      "Item Name": item.name,
      Category: item.category,
      Stock: item.stock,
      Unit: item.unit,
      Status: item.status,
      Date: item.date,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

    XLSX.writeFile(workbook, "inventory-list.xlsx");
  };

  return (
    <div className="inventory-page">
      <div className="inventory-container">
        <div className="inventory-header">
          <div className="inventory-title-area">
            <h1 className="inventory-title">Inventory List</h1>

            <p className="inventory-subtitle">
              Manage and monitor your inventory
            </p>
          </div>

          <div className="inventory-user">
            <div className="inventory-user-avatar">
              <Inventory2OutlinedIcon />
            </div>

            <div className="inventory-user-info">
              <span className="inventory-user-name">System Manager</span>

              <span className="inventory-user-role">Inventory Admin</span>
            </div>
          </div>
        </div>

        <div className="inventory-summary-grid">
          <div className="inventory-summary-card inventory-card-one">
            <div className="inventory-summary-icon inventory-icon-one">
              <Inventory2OutlinedIcon />
            </div>

            <div className="inventory-summary-content">
              <span className="inventory-summary-label">Total Items</span>

              <strong className="inventory-summary-value">{totalItems}</strong>
            </div>
          </div>

          <div className="inventory-summary-card inventory-card-two">
            <div className="inventory-summary-icon inventory-icon-two">
              <WarningAmberRoundedIcon />
            </div>

            <div className="inventory-summary-content">
              <span className="inventory-summary-label">Low Stock Alerts</span>

              <strong className="inventory-summary-value inventory-danger-text">
                {lowStock}
              </strong>
            </div>

            <span className="inventory-alert-badge">ALERT</span>
          </div>

          <div className="inventory-summary-card inventory-card-three">
            <div className="inventory-summary-icon inventory-icon-three">
              <AccessTimeRoundedIcon />
            </div>

            <div className="inventory-summary-content">
              <span className="inventory-summary-label">Total Stock</span>

              <strong className="inventory-summary-value">{totalStock}</strong>
            </div>
          </div>
          <div className="inventory-summary-card inventory-card-four">
            <div className="inventory-summary-icon inventory-icon-four">
              <ShoppingBagOutlinedIcon />
            </div>

            <div className="inventory-summary-content">
              <span className="inventory-summary-label">Stock Value</span>

              <strong className="inventory-summary-value">$4,820</strong>
            </div>
          </div>
        </div>

        <div className="inventory-section-header">
          <div>
            <h2 className="inventory-section-title">Inventory Status</h2>

            <p className="inventory-section-description">
              View and manage all inventory items
            </p>
          </div>

          <button className="inventory-add-button" onClick={openAddModal}>
            <AddIcon />
            <span>Add New Item</span>
          </button>
        </div>

        <div className="inventory-table-card">
          <div className="inventory-toolbar">
            <div className="inventory-search-box">
              <SearchIcon className="inventory-search-icon" />

              <input
                className="inventory-search-input"
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search inventory..."
              />
            </div>

            <div className="inventory-filter-area">
              <div className="inventory-date-box">
                <input
                  className="inventory-date-input"
                  type="date"
                  value={dateFilter}
                  onChange={handleDateChange}
                />
              </div>

              <div className="inventory-category-box">
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  className="inventory-category-select"
                  displayEmpty
                >
                  {categories.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <button className="inventory-export-button" onClick={exportExcel}>
                <FileDownloadOutlinedIcon />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="inventory-table-wrapper">
            <div className="inventory-table-header inventory-grid">
              <div className="inventory-table-heading">ITEM CODE</div>

              <div className="inventory-table-heading">ITEM NAME</div>

              <div className="inventory-table-heading">CATEGORY</div>

              <div className="inventory-table-heading">CURRENT STOCK</div>

              <div className="inventory-table-heading">STATUS</div>

              <div className="inventory-table-heading">ACTION</div>
            </div>

            <div className="inventory-table-body">
              {paginatedInventory.length > 0 ? (
                paginatedInventory.map((item, index) => (
                  <div
                    className="inventory-table-row inventory-grid"
                    key={item.id}
                    style={{
                      animationDelay: `${index * 45}ms`,
                    }}
                  >
                    <div className="inventory-table-cell inventory-code">
                      {item.id}
                    </div>
                    <div className="inventory-table-cell inventory-name">
                      {item.name}
                    </div>

                    <div className="inventory-table-cell">{item.category}</div>

                    <div className="inventory-table-cell inventory-stock">
                      {item.stock} {item.unit}
                    </div>

                    <div className="inventory-table-cell">
                      <span
                        className={
                          item.status === "In Stock"
                            ? "inventory-status inventory-status-good"
                            : "inventory-status inventory-status-low"
                        }
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="inventory-table-cell inventory-actions">
                      <button
                        className="inventory-action-button"
                        onClick={() => openEditModal(item)}
                      >
                        <EditOutlinedIcon />
                        <span>Edit</span>
                      </button>

                      <button
                        className="inventory-delete-button"
                        onClick={() => openDeleteModal(item)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="inventory-empty">
                  <Inventory2OutlinedIcon />

                  <strong className="inventory-empty-title">
                    No inventory found
                  </strong>

                  <span className="inventory-empty-text">
                    Try changing your search or filters.
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="inventory-footer">
            <span className="inventory-result-text">
              Showing{" "}
              {filteredInventory.length === 0
                ? 0
                : (page - 1) * ITEMS_PER_PAGE + 1}
              {" - "}
              {Math.min(page * ITEMS_PER_PAGE, filteredInventory.length)}
              {" of "}
              {filteredInventory.length} items
            </span>

            {filteredInventory.length >= ITEMS_PER_PAGE && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                className="inventory-pagination"
                color="primary"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
              />
            )}
          </div>
        </div>
      </div>

      {modal.open && (
        <div className="inventory-modal-overlay">
          <div className="inventory-modal">
            {modal.type === "delete" ? (
              <>
                <div className="inventory-modal-icon inventory-delete-modal-icon">
                  <DeleteIcon />
                </div>

                <h3 className="inventory-modal-title">Delete Item?</h3>

                <p className="inventory-modal-message">
                  Are you sure you want to delete{" "}
                  <strong>{modal.item?.name}</strong>?
                </p>

                <div className="inventory-modal-actions">
                  <button
                    className="inventory-cancel-button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="inventory-confirm-delete-button"
                    onClick={deleteItem}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="inventory-modal-header">
                  <div>
                    <h3 className="inventory-modal-title">
                      {modal.type === "add" ? "Add New Item" : "Edit Item"}
                    </h3>

                    <p className="inventory-modal-subtitle">
                      Fill in the inventory information below.
                    </p>
                  </div>

                  <button
                    className="inventory-modal-close"
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="inventory-form">
                  <div className="inventory-form-field">
                    <label className="inventory-form-label">Item Name</label>

                    <input
                      className="inventory-form-input"
                      value={form.name}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          name: event.target.value,
                        })
                      }
                      placeholder="Enter item name"
                    />
                  </div>

                  <div className="inventory-form-row">
                    <div className="inventory-form-field">
                      <label className="inventory-form-label">Category</label>

                      <Select
                        value={form.category}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            category: event.target.value,
                          })
                        }
                        className="inventory-form-select"
                        fullWidth
                      >
                        {categories
                          .filter((item) => item !== "All Categories")
                          .map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>

                    <div className="inventory-form-field">
                      <label className="inventory-form-label">Stock</label>

                      <input
                        className="inventory-form-input"
                        type="number"
                        value={form.stock}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            stock: event.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="inventory-form-row">
                    <div className="inventory-form-field">
                      <label className="inventory-form-label">Unit</label>
                      <Select
                        value={form.unit}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            unit: event.target.value,
                          })
                        }
                        className="inventory-form-select"
                        fullWidth
                      >
                        <MenuItem value="pcs">pcs</MenuItem>

                        <MenuItem value="kg">kg</MenuItem>

                        <MenuItem value="packs">packs</MenuItem>

                        <MenuItem value="bottles">bottles</MenuItem>

                        <MenuItem value="L">L</MenuItem>

                        <MenuItem value="ml">ml</MenuItem>
                      </Select>
                    </div>

                    <div className="inventory-form-field">
                      <label className="inventory-form-label">Date</label>

                      <input
                        className="inventory-form-input"
                        type="date"
                        value={form.date}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            date: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="inventory-modal-actions">
                  <button
                    className="inventory-cancel-button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button className="inventory-save-button" onClick={saveItem}>
                    <CheckCircleIcon />
                    {modal.type === "add" ? "Add Item" : "Save Changes"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OfflineInventory;
