import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StorageIcon from "@mui/icons-material/Storage";
import CategoryIcon from "@mui/icons-material/Category";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const MOCK_INVENTORY_LOGS = [
  {
    id: "#STK-901",
    timestamp: "2026-07-01T10:15:00",
    displayTime: "1 July 2026, 10:15 AM",
    name: "Flour (Kz)",
    category: "Protein",
    qty: "15.0 kg",
    balance: "75.0 kg",
  },
  {
    id: "#STK-902",
    timestamp: "2026-07-01T11:30:00",
    displayTime: "1 July 2026, 11:30 AM",
    name: "Beef Patty",
    category: "Bakery",
    qty: "40 pcs",
    balance: "60 pcs",
  },
  {
    id: "#STK-903",
    timestamp: "2026-07-01T14:45:00",
    displayTime: "1 July 2026, 02:45 PM",
    name: "Cheddar Cheese",
    category: "Dairy",
    qty: "120 slices",
    balance: "30 slices",
  },
  {
    id: "#STK-904",
    timestamp: "2026-07-01T18:00:00",
    displayTime: "1 July 2026, 06:00 PM",
    name: "Fresh Lettuce",
    category: "Produce",
    qty: "5.2 kg",
    balance: "2.8 kg",
  },
  {
    id: "#STK-905",
    timestamp: "2026-06-29T09:00:00",
    displayTime: "29 June 2026, 09:00 AM",
    name: "Sauce",
    category: "Condiments",
    qty: "2.0 L",
    balance: "18.0 L",
  },
  {
    id: "#STK-906",
    timestamp: "2026-06-28T10:00:00",
    displayTime: "28 June 2026, 10:00 AM",
    name: "Brioche Buns",
    category: "Bakery",
    qty: "50 pcs",
    balance: "150 pcs",
  },
  {
    id: "#STK-907",
    timestamp: "2026-06-25T15:30:00",
    displayTime: "25 June 2026, 03:30 PM",
    name: "Tomato",
    category: "Produce",
    qty: "10.0 kg",
    balance: "15.0 kg",
  },
];

export default function InventoryReportView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filteredLogs = MOCK_INVENTORY_LOGS.filter((log) => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.name.toLowerCase().includes(searchQuery.toLowerCase());
    const logDate = new Date(log.timestamp);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDate =
      (!start || logDate >= start) && (!end || logDate <= end);
    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentRows = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {/* 🎯 Inventory Card Elements - Vertical layouts standard styling */}
      <div className="inventory-summary-cards-grid non-printable">
        <div className="summary-info-card">
          <div className="card-icon-box orange-tint">
            <StorageIcon />
          </div>
          <div className="card-data-text">
            <span className="card-label">Total Consumed (Today)</span>
            <h2 className="card-value">45.8 kg</h2>
          </div>
        </div>
        <div className="summary-info-card">
          <div className="card-icon-box blue-tint">
            <CategoryIcon />
          </div>
          <div className="card-data-text">
            <span className="card-label">Most Used Category</span>
            <h2 className="card-value mini-subtitle">Protein</h2>
          </div>
        </div>
        <div className="summary-info-card">
          <div className="card-icon-box red-tint">
            <ReportProblemIcon />
          </div>
          <div className="card-data-text">
            <span className="card-label">Most Deleted Ingredient</span>
            <h2 className="card-value mini-subtitle crimson-text">
              Beef Patty
            </h2>
          </div>
        </div>
        <div className="summary-info-card">
          <div className="card-icon-box purple-tint">
            <LocalShippingIcon />
          </div>
          <div className="card-data-text">
            <span className="card-label">Order Qty (Month)</span>
            <h2 className="card-value">24</h2>
          </div>
        </div>
      </div>

      {/* 🎯 Ingredient Analytics - 3D Multibar Chart Graph Block with 12 Months abbreviation labels */}
      <div className="report-chart-card-wrapper non-printable">
        <div className="chart-inner-headers-meta flex-header-legend">
          <div>
            <h3>Ingredient Analytics</h3>
            <p>Monthly tracking of top ingredient usage volume</p>
          </div>
          <div className="chart-legends-horizontal-badges">
            <span className="legend-node">
              <span className="legend-dot color-p"></span> Protein (Beef Patty,
              etc.)
            </span>
            <span className="legend-node">
              <span className="legend-dot color-b"></span> Bakery (Flour, Buns)
            </span>
            <span className="legend-node">
              <span className="legend-dot color-pr"></span> Produce (Lettuce,
              Veggies)
            </span>
          </div>
        </div>

        <div className="chart-bar-graph-graphic-panel">
          <div className="graph-vertical-y-axis-labels">
            <span>1,000 KG</span>
            <span>800 KG</span>
            <span>600 KG</span>
            <span>400 KG</span>
            <span>200 KG</span>
            <span>0 KG</span>
          </div>

          <div className="graph-bars-horizontal-container">
            {[
              { m: "Jan", p: "40%", b: "30%", pr: "25%" },
              { m: "Feb", p: "45%", b: "35%", pr: "30%" },
              { m: "Mar", p: "55%", b: "45%", pr: "38%" },
              { m: "Apr", p: "60%", b: "50%", pr: "45%" },
              { m: "May", p: "50%", b: "48%", pr: "55%" },
              { m: "Jun", p: "70%", b: "53%", pr: "58%" },
              { m: "Jul", p: "78%", b: "62%", pr: "50%" },
              { m: "Aug", p: "72%", b: "60%", pr: "42%" },
              { m: "Sep", p: "65%", b: "58%", pr: "46%" },
              { m: "Oct", p: "68%", b: "55%", pr: "52%" },
              { m: "Nov", p: "72%", b: "60%", pr: "48%" },
              { m: "Dec", p: "85%", b: "65%", pr: "54%" },
            ].map((bar, idx) => (
              <div key={idx} className="bar-column-node-stack">
                <div className="triple-bar-pillars-group-wrap">
                  <div
                    className="bar-pillar-fill color-p"
                    style={{ height: bar.p }}
                  ></div>
                  <div
                    className="bar-pillar-fill color-b"
                    style={{ height: bar.b }}
                  ></div>
                  <div
                    className="bar-pillar-fill color-pr"
                    style={{ height: bar.pr }}
                  ></div>
                </div>
                {/* 🎯 သတ်မှတ်ထားသည့်အတိုင်း အောက်ခြေတွင် ၁၂ လ၏ နာမည်အတိုကောက်များ တပ်ဆင်ခြင်း */}
                <span className="bar-x-axis-month-label">{bar.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Log Table Section */}
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
              <th>LOG ID</th>
              <th>DATE & TIME</th>
              <th>INGREDIENT NAME</th>
              <th>CATEGORY</th>
              <th>QUANTITY USED</th>
              <th>BALNCE</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((log) => (
                <tr key={log.id}>
                  <td className="highlight-order-id-cell">{log.id}</td>
                  <td>{log.displayTime}</td>
                  <td className="bold-ingredient-title">{log.name}</td>
                  <td className="dimmed-summary-text">{log.category}</td>
                  <td className="bold-total-items-cell">{log.qty}</td>
                  <td>{log.balance}</td>
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

        {/* Pagination Block */}
        <div className="table-pagination-footer-bar non-printable">
          <span className="pagination-entries-count-indicator">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredLogs.length)} of 30 report
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
    </>
  );
}
