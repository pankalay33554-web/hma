import React, { useState, useMemo } from "react";
import "../shopmanagmentcss/managerDashboard.css";
import { useParams } from "react-router-dom";

// MUI Icons Imports
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PrintIcon from "@mui/icons-material/Print";

// Chart Component (Recharts Library)
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Fake Data for Table (7 Rows as requested)
const INITIAL_SALES_DATA = [
  {
    id: "#PRD-001",
    totalAmount: "12,500 Ks",
    date: "2026-07-01",
    displayDate: "1 July 2026",
    totalItems: "2 items",
    items: "Beef Burger, Apple Juice",
    time: "11:30 AM",
  },
  {
    id: "#PRD-002",
    totalAmount: "25,000 Ks",
    date: "2026-07-05",
    displayDate: "5 July 2026",
    totalItems: "2 items",
    items: "Double Cheese Burger, Strawberry Smoothie",
    time: "01:15 PM",
  },
  {
    id: "#PRD-003",
    totalAmount: "8,500 Ks",
    date: "2026-07-10",
    displayDate: "10 July 2026",
    totalItems: "2 items",
    items: "Chicken Sandwich, Hot Coffee",
    time: "09:45 AM",
  },
  {
    id: "#PRD-004",
    totalAmount: "10,500 Ks",
    date: "2026-07-12",
    displayDate: "12 July 2026",
    totalItems: "2 items",
    items: "Beef Burger, Apple Juice",
    time: "12:45 PM",
  },
  {
    id: "#PRD-005",
    totalAmount: "18,000 Ks",
    date: "2026-07-15",
    displayDate: "15 July 2026",
    totalItems: "2 items",
    items: "Cheese Cake, Iced Latte",
    time: "03:20 PM",
  },
  {
    id: "#PRD-006",
    totalAmount: "9,500 Ks",
    date: "2026-07-16",
    displayDate: "16 July 2026",
    totalItems: "2 items",
    items: "Chicken Burger, Orange Juice",
    time: "10:30 AM",
  },
  {
    id: "#PRD-007",
    totalAmount: "32,000 Ks",
    date: "2026-07-18",
    displayDate: "18 July 2026",
    totalItems: "3 items",
    items: "2x Club Sandwich, Mango Shake, Chocolate Cake",
    time: "04:10 PM",
  },
];

const revenueData = [
  { name: "Burger", value: 35, fill: "#a78bfa" },
  { name: "Sandwich", value: 60, fill: "#f87171" },
  { name: "Cake", value: 115, fill: "#22d3ee" },
  { name: "Juice", value: 78, fill: "#f87171" },
  { name: "Water", value: 83, fill: "#f87171" },
];

export default function Dashboard() {
  // States for Filter & Pagination
  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // 🌟 Modal State Management
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open Modal function
  const handleOpenModal = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  // Close Modal function
  const handleCloseModal = () => {
    setSelectedSale(null);
    setIsModalOpen(false);
  };

  // Print Function
  const handlePrint = () => {
    window.print();
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    if (filteredSales.length === 0) return;

    const headers = [
      "SALES ID,ORDER ITEMS,TOTAL AMOUNT,DATE,TOTAL ITEMS,TIME\n",
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
      `recent_sales_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Filtering Logic
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

  // 2. Dynamic Pagination Logic
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
    <div className="dashboard-page-wrapper">
      {/* Dynamic Top Bar */}
      <header className="manager-top-bar">
        <div className="top-title-area">
          <h1>Manager Dashboard</h1>
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

      {/* Dashboard Main Content Body */}
      <div className="dashboard-body-container">
        {/* 1. Top 4 Cards Grid */}
        <div className="cards-grid">
          <div className="stat-card">
            <div className="card-top">
              <div className="icon-wrapper wrapper-gold">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="trend-text text-green">+12.5%</span>
            </div>
            <p className="card-label">TOTAL REVENUE</p>
            <h3 className="card-value">100,000 Ks</h3>
          </div>

          <div className="stat-card">
            <div className="card-top">
              <div className="icon-wrapper wrapper-blue">
                <LocalMallOutlinedIcon fontSize="small" />
              </div>
              <span className="trend-text text-blue">+8</span>
            </div>
            <p className="card-label">ACTIVE ORDERS</p>
            <h3 className="card-value">100</h3>
          </div>

          <div className="stat-card">
            <div className="card-top">
              <div className="icon-wrapper wrapper-red">
                <ErrorOutlineOutlinedIcon fontSize="small" />
              </div>
              <span className="trend-text text-red font-bold">URGENT</span>
            </div>
            <p className="card-label">STOCK ALERT</p>
            <h3 className="card-value text-red">10</h3>
          </div>

          <div className="stat-card">
            <div className="card-top">
              <div className="icon-wrapper wrapper-purple">
                <Inventory2OutlinedIcon fontSize="small" />
              </div>
              <span className="trend-text text-gray">Eggs</span>
            </div>
            <p className="card-label">TOTAL INVENTORY</p>
            <h3 className="card-value">50</h3>
          </div>
        </div>

        {/* 2. Middle Charts Section */}
        <div className="charts-section">
          <div className="chart-card revenue-chart-box">
            <div className="chart-header">
              <h3>Revenue Status (Shop 1)</h3>
              <button className="time-filter-btn">
                <CalendarMonthOutlinedIcon fontSize="small" />
                This Week
              </button>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={revenueData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e5e5"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 11 }}
                  />
                  <YAxis
                    domain={[0, 120]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 11 }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card inventory-status-box">
            <h3>Inventory Status</h3>
            <p className="sub-label">(Shop 1) Core Ingredients</p>

            <div className="progress-list">
              <div className="progress-item">
                <div className="progress-info">
                  <span>Flour</span>
                  <span className="font-bold">82%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill color-brown"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-info">
                  <span>Sugar</span>
                  <span className="font-bold">45%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill color-brown"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>

              <div className="progress-item alert-item">
                <div className="progress-info">
                  <span className="text-red">
                    Eggs{" "}
                    <ErrorOutlineOutlinedIcon
                      style={{ fontSize: 14, verticalAlign: "middle" }}
                    />
                  </span>
                  <span className="text-red font-bold">12%</span>
                </div>
                <div className="progress-bar-bg bg-light-red">
                  <div
                    className="progress-bar-fill color-red"
                    style={{ width: "12%" }}
                  ></div>
                </div>
                <span className="alert-desc">
                  LOW STOCK: Refill required immediately
                </span>
              </div>

              <div className="progress-item">
                <div className="progress-info">
                  <span>Butter</span>
                  <span className="font-bold">58%</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill color-brown"
                    style={{ width: "58%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Table Section (Updated) */}
        <div className="table-card">
          <div className="table-filters">
            <h2>Recent Sales</h2>
            <div className="filter-controls">
              <div className="search-input-wrapper">
                <SearchOutlinedIcon className="search-icon" />
                <input
                  type="text"
                  placeholder="Search orders by ID or item..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <div className="date-picker-group">
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
              {/* Export Button Added */}
              <button
                className="dashboard-export-btn"
                onClick={handleExportCSV}
              >
                <FileDownloadOutlinedIcon fontSize="small" />
                Export
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>SALES ID</th>
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
                        padding: "24px",
                        color: "#888",
                      }}
                    >
                      No matching sales records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dynamic Pagination Footer */}
          <div className="table-pagination">
            <span>
              Showing {startRowNumber}-{endRowNumber} of {filteredSales.length}{" "}
              report entries
            </span>
            <div className="page-buttons">
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
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* 1. Modal Header */}
            <div className="modal-header">
              <h2>Sales Report Details</h2>
              <button className="modal-close-icon" onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            {/* 2. Modal Body */}
            <div className="modal-body">
              <div className="modal-grid-row">
                <div className="modal-grid-item">
                  <label>REPORT ID</label>
                  <span>{selectedSale.id}</span>
                </div>
                <div className="modal-grid-item">
                  <label>DATE</label>
                  <span>{selectedSale.displayDate}</span>
                </div>
              </div>

              <div className="modal-grid-row">
                <div className="modal-grid-item">
                  <label>ORDER ITEMS</label>
                  <span>{selectedSale.items}</span>
                </div>
                <div className="modal-grid-item">
                  <label>TOTAL ITEMS</label>
                  <span>{selectedSale.totalItems}</span>
                </div>
              </div>

              <div className="modal-grid-row">
                <div className="modal-grid-item">
                  <label>TOTAL AMOUNT</label>
                  <span className="total-highlight">
                    {selectedSale.totalAmount}
                  </span>
                </div>
                <div className="modal-grid-item">
                  <label>TIME OF TRANSACTION</label>
                  <span>{selectedSale.time}</span>
                </div>
              </div>
            </div>

            {/* 3. Modal Footer (Inside modal-container) */}
            <div className="modal-footer">
              <button
                className="dashboard-modal-close-btn"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button className="modal-print-btn" onClick={handlePrint}>
                <PrintIcon style={{ fontSize: "1rem", marginRight: "10px" }} />{" "}
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
