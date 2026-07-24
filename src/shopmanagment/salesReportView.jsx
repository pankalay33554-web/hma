import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PaidIcon from "@mui/icons-material/Paid";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import StarIcon from "@mui/icons-material/Star";

const MOCK_SALES = [
  {
    id: "#PRD-001",
    items: "Beef Burger, Apple Juice",
    amount: "10,500 Ks",
    date: "2026-07-01",
    displayDate: "1 July 2026",
    time: "12:45 PM",
    method: "Cash",
  },
  {
    id: "#PRD-002",
    items: "Cheese Pizza, Cola",
    amount: "18,000 Ks",
    date: "2026-07-01",
    displayDate: "1 July 2026",
    time: "01:15 PM",
    method: "Mobile Wallet",
  },
  {
    id: "#PRD-003",
    items: "Chicken Buns, Green Tea",
    amount: "8,500 Ks",
    date: "2026-06-28",
    displayDate: "28 June 2026",
    time: "03:10 PM",
    method: "Cash",
  },
  {
    id: "#PRD-004",
    items: "Beef Burger, Fries, Coffee",
    amount: "14,500 Ks",
    date: "2026-06-25",
    displayDate: "25 June 2026",
    time: "11:20 AM",
    method: "Cash",
  },
  {
    id: "#PRD-005",
    items: "Double Cheeseburger",
    amount: "12,000 Ks",
    date: "2026-06-20",
    displayDate: "20 June 2026",
    time: "06:45 PM",
    method: "Mobile Wallet",
  },
  {
    id: "#PRD-006",
    items: "Club Sandwich, Orange Juice",
    amount: "9,500 Ks",
    date: "2026-06-15",
    displayDate: "15 June 2026",
    time: "02:30 PM",
    method: "Cash",
  },
  {
    id: "#PRD-007",
    items: "Hot Dog, Milkshake",
    amount: "7,000 Ks",
    date: "2026-06-10",
    displayDate: "10 June 2026",
    time: "09:15 AM",
    method: "Mobile Wallet",
  },
];

export default function SalesReportView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const [selectedDetails, setSelectedDetails] = useState(null);

  // Search and Date Range Filtering Logic
  const filteredSales = MOCK_SALES.filter((sale) => {
    const matchesSearch =
      sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.items.toLowerCase().includes(searchQuery.toLowerCase());
    const orderDate = new Date(sale.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDate =
      (!start || orderDate >= start) && (!end || orderDate <= end);
    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredSales.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentRows = filteredSales.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {/* 🎯 Vertical Icon Layout Card Grid Deck */}
      <div className="inventory-summary-cards-grid non-printable">
        <div className="summary-info-card">
          <div className="card-icon-box orange-tint">
            <ShoppingBagIcon />
          </div>
          <div className="card-data-text">
            <span className="card-label">Today Orders</span>
            <h2 className="card-value">50 orders</h2>
          </div>
        </div>
        <div className="summary-info-card">
          <div className="card-icon-box blue-tint">
            <PaidIcon />
          </div>
          <div className="card-data-text">
            <span className="card-label">Today Total Revenue</span>
            <h2 className="card-value">120,000 Ks</h2>
          </div>
        </div>
        <div className="summary-info-card">
          <div className="card-icon-box purple-tint">
            <EqualizerIcon />
          </div>
          <div className="card-data-text">
            <span className="card-label">Total Revenue</span>
            <h2 className="card-value">1,450 Units</h2>
          </div>
        </div>
        <div className="summary-info-card">
          <span className="urgent-tag red-variant-txt">BEST</span>
          <div className="card-icon-box red-tint">
            <StarIcon />
          </div>
          <div className="card-data-text">
            <span className="card-label">Top Selling Item</span>
            <h2 className="card-value">Beef Burger</h2>
          </div>
        </div>
      </div>

      {/* 🎯 Sales Column Chart Graph Block Component Area */}
      <div className="report-chart-card-wrapper non-printable">
        <div className="chart-inner-headers-meta">
          <h3>Sales Performance Trend (2026)</h3>
          <p>Gross monthly revenue comparison across 12 months</p>
        </div>

        {/* Mock Graphic Visual representation bar grids styled via raw CSS */}
        <div className="chart-bar-graph-graphic-panel">
          <div className="graph-vertical-y-axis-labels">
            <span>500,000 Ks</span>
            <span>400,000 Ks</span>
            <span>300,000 Ks</span>
            <span>200,000 Ks</span>
            <span>100,000 Ks</span>
            <span>0 Ks</span>
          </div>

          <div className="graph-bars-horizontal-container">
            {[
              { m: "Jan", h: "30%" },
              { m: "Feb", h: "50%" },
              { m: "Mar", h: "80%" },
              { m: "Apr", h: "55%" },
              { m: "May", h: "70%" },
              {
                m: "Jun",
                h: "95%",
                active: true,
                val: "June Revenue: 450,000 Ks",
              },
              { m: "Jul", h: "88%" },
              { m: "Aug", h: "78%" },
              { m: "Sep", h: "68%" },
              { m: "Oct", h: "60%" },
              { m: "Nov", h: "45%" },
              { m: "Dec", h: "82%" },
            ].map((bar, i) => (
              <div key={i} className="bar-column-node-stack">
                <div
                  className={`bar-pillar-fill ${bar.active ? "highlight-pillar" : ""}`}
                  style={{ height: bar.h }}
                >
                  {bar.active && (
                    <span className="pillar-tooltip-pop">{bar.val}</span>
                  )}
                </div>
                <span className="bar-x-axis-month-label">{bar.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Grid Table Panel */}
      <div className="inventory-table-card-container">
        <div className="table-inner-toolbar-header non-printable">
          <div className="table-controls-right-group stretch-full-line">
            <div className="search-input-wrapper-box extend-search-width">
              <SearchIcon className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search orders by ID or item..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="date-range-filter-row-inline">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <span className="date-separator-to-txt">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <button
              className="export-action-trigger-btn"
              onClick={() => window.print()}
            >
              <FileDownloadIcon className="btn-export-icon" /> Export
            </button>
          </div>
        </div>

        <table className="orders-data-grid-table">
          <thead>
            <tr>
              <th>REPORT ID</th>
              <th>ORDER ITEMS</th>
              <th>TOTAL AMOUNT</th>
              <th>DATE</th>
              <th>PAYMENT METHOD</th>
              <th className="non-printable">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((sale) => (
                <tr key={sale.id}>
                  <td className="highlight-order-id-cell">{sale.id}</td>
                  <td className="dimmed-summary-text text-truncate-width">
                    {sale.items}
                  </td>
                  <td className="bold-ingredient-title">{sale.amount}</td>
                  <td>{sale.displayDate}</td>
                  <td>{sale.method}</td>
                  <td className="non-printable">
                    <button
                      className="table-action-view-details-btn"
                      onClick={() => setSelectedDetails(sale)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-table-placeholder-cell">
                  အချက်အလက်မရှိပါ။
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer Paginate bar */}
        <div className="table-pagination-footer-bar non-printable">
          <span className="pagination-entries-count-indicator">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredSales.length)} of 30 report
            entries
          </span>
          <div className="pagination-stepper-buttons-block">
            <button
              className="pag-nav-arrow-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeftIcon />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                className={`pag-number-btn ${currentPage === idx + 1 ? "active-page" : ""}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
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

      {/* 🎯 Sales Report Details Modal Box  */}
      {selectedDetails && (
        <div className="modal-overlay-backdrop unique-modal-z-index">
          <div className="order-details-modal-card-view item-details-modal-width">
            <div className="modal-header-top-title-row">
              <h3>Sales Report Details</h3>
              <button
                className="modal-close-cross-btn"
                onClick={() => setSelectedDetails(null)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="modal-item-details-split-grid">
              <div className="detail-info-cell-group">
                <span className="cell-label-headline">REPORT ID</span>
                <p className="cell-value-text bold-black">
                  {selectedDetails.id}
                </p>
              </div>
              <div className="detail-info-cell-group">
                <span className="cell-label-headline">DATE</span>
                <p className="cell-value-text standard-gray">
                  {selectedDetails.displayDate}
                </p>
              </div>
              <div className="detail-info-cell-group">
                <span className="cell-label-headline">ORDER ITEMS</span>
                <p className="cell-value-text standard-gray">
                  {selectedDetails.items}
                </p>
              </div>
              <div className="detail-info-cell-group">
                <span className="cell-label-headline">PAYMENT METHOD</span>
                <p className="cell-value-text standard-gray">
                  {selectedDetails.method}
                </p>
              </div>
              <div className="detail-info-cell-group">
                <span className="cell-label-headline">TOTAL AMOUNT</span>
                <p className="cell-value-text large-bold-black">
                  {selectedDetails.amount}
                </p>
              </div>
              <div className="detail-info-cell-group">
                <span className="cell-label-headline">TIME OF TRANSACTION</span>
                <p className="cell-value-text standard-gray">
                  {selectedDetails.time}
                </p>
              </div>
            </div>
            <div className="modal-footer-action-row">
              <button
                className="modal-close-action-btn"
                onClick={() => setSelectedDetails(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
