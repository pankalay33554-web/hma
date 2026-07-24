import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LayersIcon from "@mui/icons-material/Layers";
import "../shopmanagmentcss/managerInventory.css";

// 7 Fake Data Items for full pagination experience
const MOCK_INVENTORY = [
  {
    id: "#INV-8821",
    name: "Flour (Kz)",
    category: "Protein",
    stock: "700 g",
    status: "In Stock",
    date: "27 Jun 2026",
    time: "10:15 AM",
  },
  {
    id: "#INV-9904",
    name: "Beef Patty",
    category: "Bakery",
    stock: "10 pcs",
    status: "Low Stock",
    date: "26 Jun 2026",
    time: "02:30 PM",
  },
  {
    id: "#INV-1234",
    name: "Cheddar Cheese",
    category: "Dairy",
    stock: "20 slices",
    status: "In Stock",
    date: "24 Jun 2026",
    time: "09:00 PM",
  },
  {
    id: "#INV-5562",
    name: "Fresh Lettuce",
    category: "Produce",
    stock: "100 g",
    status: "Low Stock",
    date: "20 Jun 2026",
    time: "11:00 AM",
  },
  {
    id: "#INV-7731",
    name: "Sauce",
    category: "Condiments",
    stock: "200 ml",
    status: "In Stock",
    date: "18 Jun 2026",
    time: "08:15 AM",
  },
  {
    id: "#INV-4412",
    name: "Brioche Buns",
    category: "Bakery",
    stock: "600 pcs",
    status: "In Stock",
    date: "15 Jun 2026",
    time: "04:45 PM",
  },
  {
    id: "#INV-3321",
    name: "Tomato",
    category: "Produce",
    stock: "2 pcs",
    status: "Low Stock",
    date: "10 Jun 2026",
    time: "01:20 PM",
  },
];

export default function ManagerInventory() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pagination & Modal States
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5; // 🎯 Row ၅ ခုပဲ ကွက်တိဖြတ်ပြရန်
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter Logic
  const filteredItems = MOCK_INVENTORY.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Pagination Calculation
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentDisplayedRows = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handleExportPrint = () => {
    window.print();
  };

  return (
    <div className="sales-page-wrapper printable-area-target">
      {/* Top Bar Header Section */}
      <header className="sales-top-bar non-printable">
        <div className="top-title-area">
          <h1>Inventory List</h1>
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

      {/* Main Container Body */}
      <div className="sales-body-container">
        {/*  Cards Summary Layout */}
        <div className="inventory-summary-cards-grid non-printable">
          <div className="summary-info-card">
            <div className="card-icon-box orange-tint">
              <InventoryIcon />
            </div>
            <div className="card-data-text">
              <span className="card-label">Total Items</span>
              <h2 className="card-value">24 Items</h2>
            </div>
          </div>

          <div className="summary-info-card critical-alert-border">
            <div className="card-icon-box red-tint">
              <WarningAmberIcon />
            </div>
            <div className="card-data-text">
              <span className="urgent-tag">URGENT</span>
              <span className="card-label">Low Stock Alerts</span>
              <h2 className="card-value crimson-text">3 Items</h2>
            </div>
          </div>

          <div className="summary-info-card">
            <div className="card-icon-box blue-tint">
              <AccessTimeIcon />
            </div>
            <div className="card-data-text">
              <span className="card-label">Last Stock Count</span>
              <h2 className="card-value mini-subtitle">Today, 10:15 AM</h2>
            </div>
          </div>

          <div className="summary-info-card">
            <div className="card-icon-box purple-tint">
              <LayersIcon />
            </div>
            <div className="card-data-text">
              <span className="card-label">Total Units In-Shop</span>
              <h2 className="card-value">1,450 Units</h2>
            </div>
          </div>
        </div>

        {/* Inventory Table Main Sheet */}
        <div className="inventory-table-card-container">
          {/* Table Toolbar Header Section */}
          <div className="table-inner-toolbar-header non-printable">
            <h2 className="table-block-headline">Inventory Status</h2>

            <div className="table-controls-right-group">
              <div className="search-input-wrapper-box">
                <SearchIcon className="search-icon-inside" />
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="category-select-wrapper">
                <select
                  className="category-select-dropdown-box"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="protein">Protein</option>
                  <option value="bakery">Bakery</option>
                  <option value="dairy">Dairy</option>
                  <option value="produce">Produce</option>
                  <option value="condiments">Condiments</option>
                </select>
                <KeyboardArrowDownIcon className="custom-dropdown-arrow-icon" />
              </div>

              <button
                className="export-action-trigger-btn"
                onClick={handleExportPrint}
              >
                <FileDownloadIcon className="btn-export-icon" /> Export
              </button>
            </div>
          </div>

          {/* Core Table Grid Elements */}
          <table className="orders-data-grid-table">
            <thead>
              <tr>
                <th>ITEM CODE</th>
                <th>INGREDIENT NAME</th>
                <th>CATEGORY</th>
                <th>CURRENT STOCK</th>
                <th>STATUS</th>
                <th className="non-printable">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentDisplayedRows.length > 0 ? (
                currentDisplayedRows.map((item) => (
                  <tr key={item.id}>
                    <td className="highlight-order-id-cell">{item.id}</td>
                    <td className="bold-ingredient-title">{item.name}</td>
                    <td className="dimmed-summary-text">{item.category}</td>
                    <td className="bold-total-items-cell">{item.stock}</td>
                    <td>
                      <span
                        className={`status-pill-badge status-variant-${item.status.toLowerCase().replace(" ", "-")}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="non-printable">
                      <button
                        className="table-action-view-details-btn"
                        onClick={() => setSelectedItem(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-table-placeholder-cell">
                    မရှိပါဗျာ။
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Table Footer Pagination Controls Area */}
          <div className="table-pagination-footer-bar non-printable">
            <span className="pagination-entries-count-indicator">
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredItems.length)} of 24 items
            </span>

            <div className="pagination-stepper-buttons-block">
              <button
                className="pag-nav-arrow-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeftIcon />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    className={`pag-number-btn ${currentPage === pageNum ? "active-page" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="pag-nav-arrow-btn"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 Inventory Item Details Modal Box - ဒုတိယပုံစံ Design Specification အတိုင်း */}
      {selectedItem && (
        <div className="modal-overlay-backdrop unique-modal-z-index">
          <div className="order-details-modal-card-view item-details-modal-width">
            <div className="modal-header-top-title-row">
              <h3>Inventory Item Details</h3>
              <button
                className="modal-close-cross-btn"
                onClick={() => setSelectedItem(null)}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Two-Column Grid Info block based on layout */}
            <div className="modal-item-details-split-grid">
              <div className="detail-info-cell-group">
                <span className="cell-label-headline">ITEM CODE</span>
                <p className="cell-value-text bold-black">{selectedItem.id}</p>
              </div>

              <div className="detail-info-cell-group">
                <span className="cell-label-headline">DATE</span>
                <p className="cell-value-text standard-gray">
                  {selectedItem.date}
                </p>
              </div>

              <div className="detail-info-cell-group">
                <span className="cell-label-headline">INGREDIENT NAME</span>
                <p className="cell-value-text bold-black">
                  {selectedItem.name}
                </p>
              </div>

              <div className="detail-info-cell-group">
                <span className="cell-label-headline">CATEGORY</span>
                <p className="cell-value-text standard-gray">
                  {selectedItem.category}
                </p>
              </div>

              <div className="detail-info-cell-group">
                <span className="cell-label-headline">CURRENT STOCK</span>
                <p className="cell-value-text large-bold-black">
                  {selectedItem.stock}
                </p>
              </div>

              <div className="detail-info-cell-group">
                <span className="cell-label-headline">TIME OF UPDATE</span>
                <p className="cell-value-text standard-gray">
                  {selectedItem.time}
                </p>
              </div>

              <div className="detail-info-cell-group span-full-row-width">
                <span className="cell-label-headline">STOCK STATUS</span>
                <div className="modal-pill-wrapper-box">
                  <span
                    className={`status-pill-badge status-variant-${selectedItem.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {selectedItem.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer-action-row">
              <button
                className="modal-close-action-btn"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
