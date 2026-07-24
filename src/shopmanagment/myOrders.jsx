import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../shopmanagmentcss/myOrders.css";

// 7 Fake Data for Mocking Table with exact details
const MOCK_ORDERS = [
  {
    id: "#ORD-9901",
    date: "2026-06-27",
    displayDate: "27 Jun 2026",
    time: "10:15 AM",
    itemsSummary: "Flour, Beef, ...",
    totalItems: "5 items",
    status: "PENDING",
    note: "Flour stock is partially fulfilled to 500 g due to current supply limits. Other items are fully approved.",
    details: [
      { name: "Flour", qty: "500 g" },
      { name: "Beef Patty", qty: "10 pcs" },
      { name: "Cheddar Cheese", qty: "10 slices" },
      { name: "Lettuce", qty: "200 g" },
      { name: "Sauce", qty: "150 ml" },
    ],
  },
  {
    id: "#ORD-9854",
    date: "2026-06-26",
    displayDate: "26 Jun 2026",
    time: "02:30 PM",
    itemsSummary: "Lettuce, Tomato, ...",
    totalItems: "2 items",
    status: "APPROVED",
    note: "All stock requests are checked and verified against inventory reserves.",
    details: [
      { name: "Lettuce", qty: "50 kg" },
      { name: "Tomato", qty: "80 kg" },
    ],
  },
  {
    id: "#ORD-9712",
    date: "2026-06-24",
    displayDate: "24 Jun 2026",
    time: "09:00 PM",
    itemsSummary: "Buns, Mayonnaise, ...",
    totalItems: "2 items",
    status: "CANCELLED",
    note: "Order cancelled due to duplicate submission by store manager.",
    details: [
      { name: "Brioche Burger Buns", qty: "600 pcs" },
      { name: "Mayonnaise Sauce", qty: "40 tubs" },
    ],
  },
  {
    id: "#ORD-9650",
    date: "2026-06-20",
    displayDate: "20 Jun 2026",
    time: "11:00 AM",
    itemsSummary: "Cheddar Cheese, Sauce",
    totalItems: "2 items",
    status: "APPROVED",
    note: "Directly delivered via main distributor line.",
    details: [
      { name: "Cheddar Cheese", qty: "40 packs" },
      { name: "Mayonnaise Sauce", qty: "10 tubs" },
    ],
  },
  {
    id: "#ORD-9521",
    date: "2026-06-15",
    displayDate: "15 Jun 2026",
    time: "04:15 PM",
    itemsSummary: "Beef Patty, Flour",
    totalItems: "2 items",
    status: "PENDING",
    note: "Awaiting final clearance from quality assurance team.",
    details: [
      { name: "Beef Patty", qty: "150 pcs" },
      { name: "Flour", qty: "50 kg" },
    ],
  },
  {
    id: "#ORD-9410",
    date: "2026-06-10",
    displayDate: "10 Jun 2026",
    time: "08:30 AM",
    itemsSummary: "Fresh Lettuce, Tomato",
    totalItems: "2 items",
    status: "APPROVED",
    note: "Fresh produce delivered directly from local farm partners.",
    details: [
      { name: "Fresh Lettuce", qty: "45 kg" },
      { name: "Sliced Tomato", qty: "50 kg" },
    ],
  },
  {
    id: "#ORD-9302",
    date: "2026-06-05",
    displayDate: "05 Jun 2026",
    time: "01:20 PM",
    itemsSummary: "Flour (Premium)",
    totalItems: "1 item",
    status: "CANCELLED",
    note: "Supplier ran out of premium variants. Recommended alternative brand.",
    details: [{ name: "Flour (Premium)", qty: "100 kg" }],
  },
];

export default function MyOrders() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  // Pagination & Modal States
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter Logic
  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.itemsSummary.toLowerCase().includes(searchQuery.toLowerCase());

    const orderDateObj = new Date(order.date);
    const startRange = startDate ? new Date(startDate) : null;
    const endRange = endDate ? new Date(endDate) : null;

    // Date နှစ်ခုလုံး ကွက်တိဝင်မှ စစ်ထုတ်ပေးမည့် Logic
    const matchesDate =
      (!startRange || orderDateObj >= startRange) &&
      (!endRange || orderDateObj <= endRange);

    const matchesTab = activeTab === "ALL" || order.status === activeTab;

    return matchesSearch && matchesDate && matchesTab;
  });

  // 🎯 ၂။ Dynamic Pagination Calculating Logic (၅ ခုစီ ဖြတ်ထုတ်ခြင်း)
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentDisplayedRows = filteredOrders.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Handle Printing Layout on Export Click
  const handleExportPrint = () => {
    window.print();
  };

  return (
    <div className="sales-page-wrapper printable-area-target">
      {/* Top Bar Header Layout */}
      <header className="sales-top-bar non-printable">
        <div className="top-title-area">
          <h1>My Orders List</h1>
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

      {/* Main Container Area */}
      <div className="sales-body-container">
        {/* Filter Toolbar Controls Layout */}
        <div className="orders-filter-toolbar-row non-printable">
          <div className="search-input-wrapper-box">
            <SearchIcon className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search orders by ID or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="date-picker-range-group">
            <div className="date-input-icon-wrapper">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <CalendarTodayIcon className="inside-date-icon" />
            </div>
            <span className="range-to-text">to</span>
            <div className="date-input-icon-wrapper">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <CalendarTodayIcon className="inside-date-icon" />
            </div>
          </div>

          <button
            className="export-action-trigger-btn"
            onClick={handleExportPrint}
          >
            <FileDownloadIcon className="btn-export-icon" /> Export
          </button>
        </div>

        {/* Status Filtering Tabs Layout */}
        <div className="status-tab-navigation-bar non-printable">
          {["ALL", "PENDING", "APPROVED", "CANCELLED"].map((tab) => (
            <button
              key={tab}
              className={`status-filter-nav-item ${activeTab === tab ? "active-tab-selected" : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Core Sheet Table Section */}
        <div className="orders-table-card-container">
          <table className="orders-data-grid-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>ORDER ITEMS</th>
                <th>TOTAL ITEMS</th>
                <th>STATUS</th>
                <th className="non-printable">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentDisplayedRows.length > 0 ? (
                currentDisplayedRows.map((order) => (
                  <tr key={order.id}>
                    <td className="highlight-order-id-cell">{order.id}</td>
                    <td>{order.displayDate}</td>
                    <td>{order.time}</td>
                    <td className="dimmed-summary-text">
                      {order.itemsSummary}
                    </td>
                    <td className="bold-total-items-cell">
                      {order.totalItems}
                    </td>
                    <td>
                      <span
                        className={`status-pill-badge variant-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="non-printable">
                      <button
                        className="table-action-view-details-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-table-placeholder-cell">
                    ရှာဖွေမှုနှင့် ကိုက်ညီသော အော်ဒါစာရင်း မရှိပါဗျာ။
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls Section */}
          <div className="table-pagination-footer-bar non-printable">
            <span className="pagination-entries-count-indicator">
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </span>

            <div className="pagination-stepper-buttons-block">
              {/* Prev Button */}
              <button
                className="pag-nav-arrow-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeftIcon />
              </button>

              {/* Dynamic Number Buttons Generation */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    className={`pag-number-btn ${currentPage === pageNumber ? "active-page" : ""}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next Button */}
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

      {/* 🎯 Order Details Modal Box - Second Image Design Specification */}
      {selectedOrder && (
        <div className="modal-overlay-backdrop unique-modal-z-index">
          <div className="order-details-modal-card-view">
            <div className="modal-header-top-title-row">
              <h3>Order Details</h3>
              <button
                className="modal-close-cross-btn"
                onClick={() => setSelectedOrder(null)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-split-layout-grid">
              {/* Left Column - Order Items Sheet */}
              <div className="modal-items-list-pane">
                <span className="modal-section-small-headline">
                  ORDER ITEMS
                </span>
                <div className="modal-items-rows-container">
                  {selectedOrder.details.map((item, idx) => (
                    <div key={idx} className="modal-item-single-row">
                      <span className="item-name-lbl">{item.name}</span>
                      <span className="item-qty-val">{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Meta Parameters Box */}
              <div className="modal-meta-spec-pane">
                <div className="meta-spec-row">
                  <span className="spec-label">ORDER ID:</span>
                  <span className="spec-value highlight-box-id">
                    {selectedOrder.id}
                  </span>
                </div>
                <div className="meta-spec-row">
                  <span className="spec-label">Date:</span>
                  <span className="spec-value">
                    {selectedOrder.displayDate}
                  </span>
                </div>
                <div className="meta-spec-row">
                  <span className="spec-label">Time:</span>
                  <span className="spec-value">{selectedOrder.time}</span>
                </div>
                <div className="meta-spec-row">
                  <span className="spec-label">Total Items:</span>
                  <span className="spec-value">
                    {selectedOrder.details.length} Items
                  </span>
                </div>
                <div className="meta-spec-row">
                  <span className="spec-label">Status:</span>
                  <span
                    className={`status-pill-badge variant-${selectedOrder.status.toLowerCase()}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Section - Owner's Note */}
            <div className="modal-owner-note-block-sheet">
              <span className="note-title-lbl">Owner's Note</span>
              <p className="note-content-body-paragraph">
                "{selectedOrder.note}"
              </p>
            </div>

            <div className="modal-footer-action-row">
              <button
                className="modal-close-action-btn"
                onClick={() => setSelectedOrder(null)}
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
