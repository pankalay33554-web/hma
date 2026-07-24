import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "../shopmanagmentcss/sales.css";

// MUI Icons Imports
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PrintIcon from "@mui/icons-material/Print";

// Dummy Data for Sales List Table (Fake 7 items)
const INITIAL_SALES_DATA = [
  {
    id: "#PRD-001",
    totalAmount: "10,500 Ks",
    date: "2026-07-01",
    displayDate: "1 July 2026",
    totalItems: "3 items",
    items: "beef burger, apple juice, french fries",
    time: "12:45 PM",
  },
  {
    id: "#PRD-002",
    totalAmount: "18,000 Ks",
    date: "2026-07-02",
    displayDate: "2 July 2026",
    totalItems: "2 items",
    items: "Double Cheese Burger, Strawberry Smoothie",
    time: "02:15 PM",
  },
  {
    id: "#PRD-003",
    totalAmount: "12,500 Ks",
    date: "2026-07-03",
    displayDate: "3 July 2026",
    totalItems: "2 items",
    items: "Chicken Sandwich, Hot Coffee",
    time: "09:30 AM",
  },
  {
    id: "#PRD-004",
    totalAmount: "25,000 Ks",
    date: "2026-07-04",
    displayDate: "4 July 2026",
    totalItems: "4 items",
    items: "Cheese Cake, Iced Latte, Chocolate Donut, Green Tea",
    time: "11:00 AM",
  },
  {
    id: "#PRD-005",
    totalAmount: "8,000 Ks",
    date: "2026-07-05",
    displayDate: "5 July 2026",
    totalItems: "1 item",
    items: "Crispy Chicken Burger",
    time: "01:20 PM",
  },
  {
    id: "#PRD-006",
    totalAmount: "15,500 Ks",
    date: "2026-07-06",
    displayDate: "6 July 2026",
    totalItems: "3 items",
    items: "Pizza Slice, Coca Cola, Ice Cream",
    time: "04:10 PM",
  },
  {
    id: "#PRD-007",
    totalAmount: "21,000 Ks",
    date: "2026-07-07",
    displayDate: "7 July 2026",
    totalItems: "5 items",
    items: "Beef Burger, Potato Chips, Orange Juice, Cupcake, Espresso",
    time: "06:45 PM",
  },
];

export default function SalesPage() {
  // Filter & Pagination States
  const [searchId, setSearchId] = useState("");

  // 💡 Date Picker
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Modal States
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Handlers
  const handleOpenModal = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSale(null);
    setIsModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (filteredSales.length === 0) return;

    const headers = [
      "REPORT ID,ORDER ITEMS,TOTAL AMOUNT,DATE,TOTAL ITEMS,TIME\n",
    ];
    const rows = filteredSales.map(
      (item) =>
        `"${item.id}","${item.items}","${item.totalAmount}","${item.displayDate}","${item.totalItems}","${item.time}"`,
    );

    const csvContent =
      "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `sales_report_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering Logic (ID/Item & Date Range)
  const filteredSales = useMemo(() => {
    setCurrentPage(1);
    return INITIAL_SALES_DATA.filter((item) => {
      const matchesId =
        item.id.toLowerCase().includes(searchId.toLowerCase()) ||
        item.items.toLowerCase().includes(searchId.toLowerCase());

      if (!startDate && !endDate) return matchesId;

      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end)
        return matchesId && itemDate >= start && itemDate <= end;
      if (start) return matchesId && itemDate >= start;
      if (end) return matchesId && itemDate <= end;
      return matchesId;
    });
  }, [searchId, startDate, endDate]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredSales.length / rowsPerPage);
  const paginatedSales = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredSales.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredSales, currentPage]);

  const startRowNumber =
    filteredSales.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const endRowNumber = Math.min(
    currentPage * rowsPerPage,
    filteredSales.length,
  );

  return (
    <div className="sales-page-wrapper">
      {/* Dynamic Header */}
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

      {/* Main Container */}
      <div className="sales-body-container">
        {/* 1. Dashboard Style Square Cards Grid */}
        <div className="sales-cards-grid">
          <div className="sales-stat-card">
            <div className="card-top">
              <div className="icon-wrapper bg-gray">
                <LocalMallOutlinedIcon
                  fontSize="small"
                  style={{ color: "#5a5a5a" }}
                />
              </div>
            </div>
            <p className="card-label">TODAY ORDERS</p>
            <h3 className="card-value">50 orders</h3>
          </div>

          <div className="sales-stat-card">
            <div className="card-top">
              <div className="icon-wrapper bg-blue">
                <MonetizationOnOutlinedIcon
                  fontSize="small"
                  style={{ color: "#3b82f6" }}
                />
              </div>
            </div>
            <p className="card-label">TODAY TOTAL REVENUE</p>
            <h3 className="card-value">120,000 Ks</h3>
          </div>

          <div className="sales-stat-card">
            <div className="card-top">
              <div className="icon-wrapper bg-pink">
                <PercentOutlinedIcon
                  fontSize="small"
                  style={{ color: "#ec4899" }}
                />
              </div>
            </div>
            <p className="card-label">TOTAL REVENUE</p>
            <h3 className="card-value">1,450 Units</h3>
          </div>

          <div className="sales-stat-card">
            <div className="card-top">
              <div className="icon-wrapper bg-orange">
                <EmojiEventsOutlinedIcon
                  fontSize="small"
                  style={{ color: "#f97316" }}
                />
              </div>
              <span className="card-badge">BEST</span>
            </div>
            <p className="card-label">TOP SELLING ITEM</p>
            <h3 className="card-value">Beef Burger</h3>
          </div>
        </div>

        {/* 2. Table Section */}
        <div className="sales-table-card">
          <div className="sales-table-filters">
            <div className="sales-filter-controls">
              {/* Search Bar */}
              <div className="sales-search-input-wrapper">
                <SearchOutlinedIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Search orders by ID or item..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>

              {/* Date Inputs */}
              <div className="sales-date-picker-group">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="to-text">to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Export Button */}
              <button className="sales-export-btn" onClick={handleExportCSV}>
                <FileDownloadOutlinedIcon fontSize="small" />
                Export
              </button>
            </div>
          </div>

          {/* Table Design */}
          <div className="sales-table-responsive">
            <table>
              <thead>
                <tr>
                  <th>REPORT ID</th>
                  <th>ORDER ITEMS</th>
                  <th>TOTAL AMOUNT</th>
                  <th>DATE</th>
                  <th>TOTAL ITEMS</th>
                  <th style={{ textAlign: "center" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSales.length > 0 ? (
                  paginatedSales.map((row, index) => (
                    <tr key={index}>
                      <td className="font-medium text-gray-dark">{row.id}</td>
                      <td
                        className="text-gray-dark truncate-col"
                        title={row.items}
                      >
                        {row.items}
                      </td>
                      <td className="font-bold text-black">
                        {row.totalAmount}
                      </td>
                      <td>{row.displayDate}</td>
                      <td>{row.totalItems}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="view-btn"
                          onClick={() => handleOpenModal(row)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#888",
                      }}
                    >
                      No matching reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="sales-table-pagination">
            <span>
              Showing {startRowNumber}-{endRowNumber} of {filteredSales.length}{" "}
              report entries
            </span>
            <div className="sales-page-buttons">
              <button
                className="arrow-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`page-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                className="arrow-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 Sales Details Modal Box */}
      {isModalOpen && selectedSale && (
        <div className="sales-modal-overlay" onClick={handleCloseModal}>
          <div
            className="sales-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sales-modal-header">
              <h2>Sales Report Details</h2>
              <button
                className="sales-modal-close-icon"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            <div className="sales-modal-body">
              <div className="sales-modal-grid-row">
                <div className="sales-modal-grid-item">
                  <label>REPORT ID</label>
                  <span>{selectedSale.id}</span>
                </div>
                <div className="sales-modal-grid-item">
                  <label>DATE</label>
                  <span>{selectedSale.displayDate}</span>
                </div>
              </div>

              <div className="sales-modal-grid-row">
                <div className="sales-modal-grid-item">
                  <label>ORDER ITEMS</label>
                  <span>{selectedSale.items}</span>
                </div>
                <div className="sales-modal-grid-item">
                  <label>TOTAL ITEMS</label>
                  <span>{selectedSale.totalItems}</span>
                </div>
              </div>

              <div className="sales-modal-grid-row">
                <div className="sales-modal-grid-item">
                  <label>TOTAL AMOUNT</label>
                  <span className="total-highlight">
                    {selectedSale.totalAmount}
                  </span>
                </div>
                <div className="sales-modal-grid-item">
                  <label>TIME OF TRANSACTION</label>
                  <span>{selectedSale.time}</span>
                </div>
              </div>
            </div>

            <div className="sales-modal-footer">
              <button
                className="sales-modal-close-btn"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button className="sales-modal-print-btn" onClick={handlePrint}>
                <PrintIcon style={{ fontSize: "1rem", marginRight: "4px" }} />{" "}
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
