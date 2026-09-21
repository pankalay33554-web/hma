import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import * as XLSX from "xlsx";

import "./onlinereport.css";

const monthlyRevenue = [
  { month: "Jan", revenue: 160000 },
  { month: "Feb", revenue: 240000 },
  { month: "Mar", revenue: 400000 },
  { month: "Apr", revenue: 280000 },
  { month: "May", revenue: 350000 },
  { month: "Jun", revenue: 430000 },
  { month: "Jul", revenue: 520000 },
  { month: "Aug", revenue: 410000 },
  { month: "Sep", revenue: 360000 },
  { month: "Oct", revenue: 310000 },
  { month: "Nov", revenue: 240000 },
  { month: "Dec", revenue: 420000 },
];

const weeklyRevenue = [
  { month: "Week 1", revenue: 95000 },
  { month: "Week 2", revenue: 135000 },
  { month: "Week 3", revenue: 110000 },
  { month: "Week 4", revenue: 180000 },
  { month: "Week 5", revenue: 125000 },
];

const reportData = [
  {
    id: "#PRO-001",
    items: "Beef Burger, Apple Juice",
    amount: 10500,
    date: "2026-01-04",
    payment: "Cash",
    table: "T01",
  },
  {
    id: "#PRO-002",
    items: "Chicken Burger, Cola",
    amount: 12500,
    date: "2026-01-08",
    payment: "KBZ Pay",
    table: "T02",
  },
  {
    id: "#PRO-003",
    items: "Beef Burger, French Fries",
    amount: 15000,
    date: "2026-01-15",
    payment: "Cash",
    table: "T03",
  },
  {
    id: "#PRO-004",
    items: "Beef Burger, Apple Juice",
    amount: 10500,
    date: "2026-02-03",
    payment: "Cash",
    table: "T04",
  },
  {
    id: "#PRO-005",
    items: "Chicken Burger, Coffee",
    amount: 13500,
    date: "2026-02-10",
    payment: "Wave Pay",
    table: "T05",
  },
  {
    id: "#PRO-006",
    items: "Cheese Burger, Cola",
    amount: 14000,
    date: "2026-02-18",
    payment: "Cash",
    table: "T06",
  },
  {
    id: "#PRO-007",
    items: "Beef Burger, Apple Juice",
    amount: 10500,
    date: "2026-03-02",
    payment: "Cash",
    table: "T07",
  },
  {
    id: "#PRO-008",
    items: "Chicken Burger, Fries",
    amount: 16000,
    date: "2026-03-11",
    payment: "KBZ Pay",
    table: "T08",
  },
  {
    id: "#PRO-009",
    items: "Beef Burger, Cola",
    amount: 11500,
    date: "2026-03-25",
    payment: "Cash",
    table: "T09",
  },
  {
    id: "#PRO-010",
    items: "Beef Burger, Apple Juice",
    amount: 10500,
    date: "2026-04-04",
    payment: "Wave Pay",
    table: "T10",
  },
  {
    id: "#PRO-011",
    items: "Chicken Burger, Cola",
    amount: 12500,
    date: "2026-04-15",
    payment: "Cash",
    table: "T11",
  },
  {
    id: "#PRO-012",
    items: "Cheese Burger, Fries",
    amount: 14500,
    date: "2026-05-02",
    payment: "KBZ Pay",
    table: "T12",
  },
  {
    id: "#PRO-013",
    items: "Beef Burger, Coffee",
    amount: 11000,
    date: "2026-05-12",
    payment: "Cash",
    table: "T13",
  },
  {
    id: "#PRO-014",
    items: "Chicken Burger, Apple Juice",
    amount: 13500,
    date: "2026-05-25",
    payment: "Wave Pay",
    table: "T14",
  },
  {
    id: "#PRO-015",
    items: "Beef Burger, Fries",
    amount: 15000,
    date: "2026-06-03",
    payment: "Cash",
    table: "T15",
  },
  {
    id: "#PRO-016",
    items: "Cheese Burger, Cola",
    amount: 14000,
    date: "2026-06-14",
    payment: "KBZ Pay",
    table: "T16",
  },
  {
    id: "#PRO-017",
    items: "Beef Burger, Apple Juice",
    amount: 10500,
    date: "2026-06-28",
    payment: "Cash",
    table: "T17",
  },
  {
    id: "#PRO-018",
    items: "Chicken Burger, Fries",
    amount: 16000,
    date: "2026-07-01",
    payment: "Cash",
    table: "T18",
  },
  {
    id: "#PRO-019",
    items: "Beef Burger, Apple Juice",
    amount: 10500,
    date: "2026-07-03",
    payment: "Cash",
    table: "T19",
  },
  {
    id: "#PRO-020",
    items: "Chicken Burger, Cola",
    amount: 12500,
    date: "2026-07-05",
    payment: "KBZ Pay",
    table: "T20",
  },
  {
    id: "#PRO-021",
    items: "Beef Burger, Fries",
    amount: 15000,
    date: "2026-07-08",
    payment: "Cash",
    table: "T21",
  },
  {
    id: "#PRO-022",
    items: "Cheese Burger, Apple Juice",
    amount: 14500,
    date: "2026-07-12",
    payment: "Wave Pay",
    table: "T22",
  },
  {
    id: "#PRO-023",
    items: "Beef Burger, Cola",
    amount: 11500,
    date: "2026-07-16",
    payment: "Cash",
    table: "T23",
  },
  {
    id: "#PRO-024",
    items: "Chicken Burger, Fries",
    amount: 16000,
    date: "2026-07-19",
    payment: "KBZ Pay",
    table: "T24",
  },
  {
    id: "#PRO-025",
    items: "Beef Burger, Apple Juice",
    amount: 10500,
    date: "2026-07-22",
    payment: "Cash",
    table: "T25",
  },
  {
    id: "#PRO-026",
    items: "Cheese Burger, Cola",
    amount: 14000,
    date: "2026-07-25",
    payment: "Wave Pay",
    table: "T26",
  },
  {
    id: "#PRO-027",
    items: "Beef Burger, Fries",
    amount: 15000,
    date: "2026-07-27",
    payment: "Cash",
    table: "T27",
  },
  {
    id: "#PRO-028",
    items: "Chicken Burger, Apple Juice",
    amount: 13500,
    date: "2026-07-29",
    payment: "KBZ Pay",
    table: "T28",
  },
  {
    id: "#PRO-029",
    items: "Beef Burger, Cola",
    amount: 11500,
    date: "2026-07-30",
    payment: "Cash",
    table: "T29",
  },
  {
    id: "#PRO-030",
    items: "Beef Burger, Apple Juice",
    amount: 10500,
    date: "2026-07-31",
    payment: "Cash",
    table: "T30",
  },
];

const PAGE_SIZE = 15;

const formatMoney = (amount) => {
  return `${Number(amount).toLocaleString()} Ks`;
};

const formatDate = (date) => {
  const value = new Date(`${date}T00:00:00`);

  return value.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const isDateInRange = (date, startDate, endDate) => {
  return date >= startDate && date <= endDate;
};

const OnlineReport = () => {
  const [chartMode, setChartMode] = useState("Monthly");

  const [search, setSearch] = useState("");

  const [startDate, setStartDate] = useState("2026-01-01");

  const [endDate, setEndDate] = useState("2026-12-31");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedReport, setSelectedReport] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "",
        message: "",
      });
    }, 2500);
  };

  const filteredReports = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return reportData.filter((report) => {
      const matchesSearch =
        !keyword ||
        report.id.toLowerCase().includes(keyword) ||
        report.items.toLowerCase().includes(keyword) ||
        report.payment.toLowerCase().includes(keyword) ||
        report.table.toLowerCase().includes(keyword);

      const matchesDate = isDateInRange(report.date, startDate, endDate);

      return matchesSearch && matchesDate;
    });
  }, [search, startDate, endDate]);
  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));

  const visibleReports = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredReports.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredReports, currentPage]);

  const totalRevenue = useMemo(() => {
    return filteredReports.reduce((total, report) => total + report.amount, 0);
  }, [filteredReports]);

  const topSellingItem = useMemo(() => {
    const itemCount = {};

    filteredReports.forEach((report) => {
      const firstItem = report.items.split(",")[0].trim();

      itemCount[firstItem] = (itemCount[firstItem] || 0) + 1;
    });

    return (
      Object.entries(itemCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "Beef Burger"
    );
  }, [filteredReports]);

  const chartData = useMemo(() => {
    if (chartMode === "Monthly") {
      return monthlyRevenue.map((item, index) => {
        const monthNumber = String(index + 1).padStart(2, "0");

        const monthStart = `2026-${monthNumber}-01`;

        const lastDay = new Date(2026, index + 1, 0).getDate();

        const monthEnd = `2026-${monthNumber}-${String(lastDay).padStart(
          2,
          "0",
        )}`;

        const active = startDate <= monthEnd && endDate >= monthStart;

        return {
          ...item,
          active,
        };
      });
    }

    return weeklyRevenue;
  }, [chartMode, startDate, endDate]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStartDate = (value) => {
    setStartDate(value);
    setCurrentPage(1);
  };

  const handleEndDate = (value) => {
    setEndDate(value);
    setCurrentPage(1);
  };

  const handleChartMode = (mode) => {
    setChartMode(mode);
  };

  const handleExport = () => {
    if (!filteredReports.length) {
      showPopup("error", "There is no report data to export.");
      return;
    }

    const excelData = filteredReports.map((report) => ({
      "Report ID": report.id,
      "Order Items": report.items,
      "Total Amount": report.amount,
      Date: formatDate(report.date),
      "Payment Method": report.payment,
      Table: report.table,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

    const fileName = `sales-report-${startDate}-to-${endDate}.xlsx`;

    XLSX.writeFile(workbook, fileName);

    showPopup("success", "Sales report exported successfully.");
  };

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNext = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const startRecord =
    filteredReports.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const endRecord = Math.min(currentPage * PAGE_SIZE, filteredReports.length);

  return (
    <div className="sales-report-page">
      <div className="sales-report-header">
        <div className="sales-report-header-left">
          <h1 className="sales-report-title">Sales Report</h1>
        </div>

        <div className="sales-report-profile">
          <div className="sales-report-profile-icon">
            <ShoppingBagOutlinedIcon />
          </div>

          <div className="sales-report-profile-info">
            <span className="sales-report-profile-role">System Manager</span>

            <span className="sales-report-profile-name">HEN MIN AUNG</span>
          </div>
        </div>
      </div>
      <div className="sales-report-content">
        <div className="sales-report-summary-grid">
          <div className="sales-report-summary-card sales-report-card-orders">
            <div className="sales-report-summary-icon">
              <ShoppingBagOutlinedIcon />
            </div>

            <div className="sales-report-summary-content">
              <span className="sales-report-summary-label">Today Orders</span>

              <strong className="sales-report-summary-value">
                {filteredReports.length} orders
              </strong>
            </div>
          </div>

          <div className="sales-report-summary-card sales-report-card-revenue">
            <div className="sales-report-summary-icon">
              <PaymentsOutlinedIcon />
            </div>

            <div className="sales-report-summary-content">
              <span className="sales-report-summary-label">
                Today Total Revenue
              </span>

              <strong className="sales-report-summary-value">
                {formatMoney(totalRevenue)}
              </strong>
            </div>
          </div>

          <div className="sales-report-summary-card sales-report-card-units">
            <div className="sales-report-summary-icon">
              <PercentOutlinedIcon />
            </div>

            <div className="sales-report-summary-content">
              <span className="sales-report-summary-label">Total Revenue</span>

              <strong className="sales-report-summary-value">
                {filteredReports.length * 50} Units
              </strong>
            </div>
          </div>

          <div className="sales-report-summary-card sales-report-card-top">
            <div className="sales-report-summary-icon">
              <EmojiEventsOutlinedIcon />
            </div>

            <div className="sales-report-summary-content">
              <span className="sales-report-summary-label">
                Top Selling Item
              </span>

              <strong className="sales-report-summary-value">
                {topSellingItem}
              </strong>
            </div>

            <span className="sales-report-best-badge">BEST</span>
          </div>
        </div>

        <div className="sales-report-chart-card">
          <div className="sales-report-chart-header">
            <div className="sales-report-chart-heading">
              <h2 className="sales-report-chart-title">
                Sales Performance Trend (2026)
              </h2>

              <p className="sales-report-chart-subtitle">
                Gross revenue comparison across{" "}
                {chartMode === "Monthly" ? "12 months" : "weekly periods"}
              </p>
            </div>

            <div className="sales-report-chart-tabs">
              <button
                type="button"
                className={`sales-report-chart-tab ${
                  chartMode === "Monthly" ? "sales-report-chart-tab-active" : ""
                }`}
                onClick={() => handleChartMode("Monthly")}
              >
                Monthly
              </button>

              <button
                type="button"
                className={`sales-report-chart-tab ${
                  chartMode === "Weekly" ? "sales-report-chart-tab-active" : ""
                }`}
                onClick={() => handleChartMode("Weekly")}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="sales-report-chart-wrapper">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 10,
                  left: 5,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e9edf5"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#8b8f98",
                    fontSize: 13,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#8b8f98",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) => `${value / 1000}K`}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(91, 79, 233, 0.06)",
                  }}
                  formatter={(value) => [formatMoney(value), "Revenue"]}
                />

                <Bar
                  dataKey="revenue"
                  radius={[8, 8, 0, 0]}
                  fill="#dfe5ee"
                  activeBar={{
                    fill: "#5146e5",
                  }}
                  animationDuration={900}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="sales-report-table-card">
          <div className="sales-report-filter-row">
            <div className="sales-report-search-box">
              <SearchIcon className="sales-report-search-icon" />

              <input
                className="sales-report-search-input"
                type="text"
                value={search}
                placeholder="Search orders by ID or item..."
                onChange={(event) => handleSearch(event.target.value)}
              />
            </div>

            <div className="sales-report-date-box">
              <CalendarMonthIcon className="sales-report-date-icon" />

              <input
                className="sales-report-date-input"
                type="date"
                value={startDate}
                onChange={(event) => handleStartDate(event.target.value)}
              />
            </div>

            <span className="sales-report-date-to">to</span>

            <div className="sales-report-date-box">
              <CalendarMonthIcon className="sales-report-date-icon" />

              <input
                className="sales-report-date-input"
                type="date"
                value={endDate}
                min={startDate}
                onChange={(event) => handleEndDate(event.target.value)}
              />
            </div>

            <button
              type="button"
              className="sales-report-export-button"
              onClick={handleExport}
            >
              <DownloadIcon />

              <span>Export</span>
            </button>
          </div>

          <div className="sales-report-table-wrapper">
            <div className="sales-report-table-head sales-report-table-grid">
              <div className="sales-report-table-cell">REPORT ID</div>
              <div className="sales-report-table-cell">ORDER ITEMS</div>
              <div className="sales-report-table-cell">TOTAL AMOUNT</div>
              <div className="sales-report-table-cell">DATE</div>{" "}
              <div className="sales-report-table-cell">PAYMENT METHOD</div>
              <div className="sales-report-table-cell sales-report-action-cell">
                ACTION
              </div>
            </div>

            {visibleReports.length > 0 ? (
              visibleReports.map((report) => (
                <div
                  className="sales-report-table-row sales-report-table-grid"
                  key={report.id}
                >
                  <div className="sales-report-table-cell sales-report-report-id">
                    {report.id}
                  </div>

                  <div className="sales-report-table-cell sales-report-items">
                    {report.items}
                  </div>

                  <div className="sales-report-table-cell sales-report-amount">
                    {formatMoney(report.amount)}
                  </div>

                  <div className="sales-report-table-cell">
                    {formatDate(report.date)}
                  </div>

                  <div className="sales-report-table-cell">
                    <span
                      className={`sales-report-payment sales-report-payment-${report.payment
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {report.payment}
                    </span>
                  </div>

                  <div className="sales-report-table-cell sales-report-action-cell">
                    <button
                      type="button"
                      className="sales-report-view-button"
                      onClick={() => setSelectedReport(report)}
                    >
                      <VisibilityOutlinedIcon />

                      <span>View</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="sales-report-empty">
                <SearchIcon className="sales-report-empty-icon" />

                <span className="sales-report-empty-title">
                  No report found
                </span>

                <span className="sales-report-empty-text">
                  Try changing your search or date filter.
                </span>
              </div>
            )}
          </div>

          <div className="sales-report-pagination">
            <span className="sales-report-pagination-info">
              Showing {startRecord}-{endRecord} of {filteredReports.length}
            </span>

            {filteredReports.length >= PAGE_SIZE && (
              <div className="sales-report-pagination-buttons">
                <button
                  type="button"
                  className="sales-report-pagination-button"
                  disabled={currentPage === 1}
                  onClick={handlePrevious}
                >
                  <ArrowBackIosNewIcon />
                </button>

                {pageNumbers.map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={`sales-report-pagination-button ${
                      currentPage === page
                        ? "sales-report-pagination-active"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="sales-report-pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={handleNext}
                >
                  <ArrowForwardIosIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedReport && (
        <div className="sales-report-detail-overlay">
          <div className="sales-report-detail-modal">
            <div className="sales-report-detail-modal-header">
              <h2 className="sales-report-detail-modal-title">
                Sales Report Details
              </h2>

              <button
                type="button"
                className="sales-report-detail-close"
                onClick={() => setSelectedReport(null)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="sales-report-detail-divider"></div>

            <div className="sales-report-detail-grid">
              <div className="sales-report-detail-field">
                <span className="sales-report-detail-field-label">
                  REPORT ID
                </span>

                <strong className="sales-report-detail-field-value">
                  {selectedReport.id}
                </strong>
              </div>

              <div className="sales-report-detail-field">
                <span className="sales-report-detail-field-label">DATE</span>

                <strong className="sales-report-detail-field-value">
                  {formatDate(selectedReport.date)}
                </strong>
              </div>

              <div className="sales-report-detail-field">
                <span className="sales-report-detail-field-label">
                  ORDER ITEMS
                </span>

                <strong className="sales-report-detail-field-value">
                  {selectedReport.items}
                </strong>
              </div>

              <div className="sales-report-detail-field">
                <span className="sales-report-detail-field-label">
                  PAYMENT METHOD
                </span>

                <strong className="sales-report-detail-field-value">
                  {selectedReport.payment}
                </strong>
              </div>

              <div className="sales-report-detail-field">
                <span className="sales-report-detail-field-label">
                  TOTAL AMOUNT
                </span>

                <strong className="sales-report-detail-field-value sales-report-detail-amount">
                  {formatMoney(selectedReport.amount)}
                </strong>
              </div>

              <div className="sales-report-detail-field">
                <span className="sales-report-detail-field-label">
                  TIME OF TRANSACTION
                </span>

                <strong className="sales-report-detail-field-value">
                  {selectedReport.time || "12:45 PM"}
                </strong>
              </div>
            </div>

            <div className="sales-report-detail-footer">
              <button
                type="button"
                className="sales-report-detail-close-button"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {popup.show && (
        <div className="sales-report-toast-overlay">
          <div
            className={`sales-report-toast sales-report-toast-${popup.type}`}
          >
            <div className="sales-report-toast-icon">
              {popup.type === "success" ? "✓" : "!"}
            </div>

            <span className="sales-report-toast-message">{popup.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineReport;
