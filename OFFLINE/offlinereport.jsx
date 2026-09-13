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
import * as XLSX from "xlsx";
import { useNavigate, Outlet } from "react-router";

import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import "./offlinereport.css";

const monthlyData = [
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

const weeklyData = [
  { month: "Week 1", revenue: 95000 },
  { month: "Week 2", revenue: 135000 },
  { month: "Week 3", revenue: 110000 },
  { month: "Week 4", revenue: 180000 },
  { month: "Week 5", revenue: 125000 },
];

const initialReports = [
  {
    id: "RSLO-001",
    table: "Table T01",
    items: "beef burger, apple juice, fries",
    amount: 18500,
    date: "2026-07-01",
    payment: "Cash",
    type: "Dine-in",
  },

  {
    id: "RSLO-004",
    table: "Table T04",
    items: "pizza, cola, chicken wings",
    amount: 22000,
    date: "2026-07-02",
    payment: "Cash",
    type: "Dine-in",
  },

  {
    id: "RSLO-007",
    table: "Table T07",
    items: "beef burger, fries",
    amount: 9500,
    date: "2026-07-04",
    payment: "Cash",
    type: "Dine-in",
  },
  {
    id: "RSLO-008",
    table: "Table T08",
    items: "pizza, apple juice",
    amount: 18000,
    date: "2026-07-04",
    payment: "KBZ Pay",
    type: "Dine-in",
  },
  {
    id: "RSLO-009",
    table: "Table T09",
    items: "chicken burger, fries",
    amount: 12000,
    date: "2026-07-05",
    payment: "Cash",
    type: "Dine-in",
  },
  {
    id: "RSLO-010",
    table: "Table T10",
    items: "beef burger, cola, fries",
    amount: 13000,
    date: "2026-07-05",
    payment: "Cash",
    type: "Dine-in",
  },

  {
    id: "RSLO-014",
    table: "Table T14",
    items: "beef burger, fries, cola",
    amount: 14000,
    date: "2026-07-07",
    payment: "Cash",
    type: "Dine-in",
  },
  {
    id: "RSLO-015",
    table: "Table T15",
    items: "pizza, apple juice, fries",
    amount: 21000,
    date: "2026-07-08",
    payment: "Cash",
    type: "Dine-in",
  },
  {
    id: "RSLO-016",
    table: "Table T16",
    items: "beef burger, fries",
    amount: 9500,
    date: "2026-07-08",
    payment: "Cash",
    type: "Dine-in",
  },
  {
    id: "RSLO-017",
    table: "Table T17",
    items: "chicken burger, apple juice",
    amount: 13500,
    date: "2026-07-09",
    payment: "Wave Pay",
    type: "Dine-in",
  },
  {
    id: "RSLO-018",
    table: "Table T18",
    items: "pizza, cola, fries",
    amount: 20000,
    date: "2026-07-09",
    payment: "KBZ Pay",
    type: "Dine-in",
  },
  {
    id: "RSLO-019",
    table: "Table T19",
    items: "beef burger, apple juice",
    amount: 10500,
    date: "2026-07-10",
    payment: "Cash",
    type: "Dine-in",
  },

  {
    id: "RSLO-022",
    table: "Table T22",
    items: "pizza, chicken wings",
    amount: 23500,
    date: "2026-07-11",
    payment: "Cash",
    type: "Dine-in",
  },
  {
    id: "RSLO-023",
    table: "Table T23",
    items: "beef burger, fries, cola",
    amount: 14000,
    date: "2026-07-12",
    payment: "KBZ Pay",
    type: "Dine-in",
  },
  {
    id: "RSLO-024",
    table: "Table T24",
    items: "chicken burger, apple juice",
    amount: 13500,
    date: "2026-07-12",
    payment: "Cash",
    type: "Dine-in",
  },
  {
    id: "RSLO-025",
    table: "Table T25",
    items: "pizza, fries, cola",
    amount: 19500,
    date: "2026-07-13",
    payment: "Cash",
    type: "Dine-in",
  },

  {
    id: "RSLO-028",
    table: "Table T28",
    items: "beef burger, cola, fries",
    amount: 13000,
    date: "2026-07-14",
    payment: "KBZ Pay",
    type: "Dine-in",
  },
  {
    id: "RSLO-029",
    table: "Table T29",
    items: "pizza, orange juice",
    amount: 19000,
    date: "2026-07-15",
    payment: "Cash",
    type: "Dine-in",
  },

  {
    id: "RSLO-032",
    table: "",
    items: "chicken burger, cola",
    amount: 11000,
    date: "2026-07-02",
    payment: "Wave Pay",
    type: "Takeaway",
  },

  {
    id: "RSLO-034",
    table: "",
    items: "pizza, apple juice",
    amount: 18000,
    date: "2026-07-04",
    payment: "KBZ Pay",
    type: "Takeaway",
  },

  {
    id: "RSLO-037",
    table: "",
    items: "pizza, chicken wings",
    amount: 23500,
    date: "2026-07-07",
    payment: "Wave Pay",
    type: "Takeaway",
  },

  {
    id: "RSLO-040",
    table: "",
    items: "pizza, fries, cola",
    amount: 19500,
    date: "2026-07-10",
    payment: "Cash",
    type: "Takeaway",
  },
];

const PAGE_SIZE = 15;

const formatMoney = (value) => {
  return `${Number(value).toLocaleString()} Ks`;
};

const formatDate = (value) => {
  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function OfflineReport() {
  const [orderType, setOrderType] = useState("Takeaway");
  const [chartMode, setChartMode] = useState("Monthly");

  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("2026-07-01");
  const [endDate, setEndDate] = useState("2026-07-31");

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showMessage = (message, type = "success") => {
    setPopup({
      show: true,
      type,
      message,
    });

    window.setTimeout(() => {
      setPopup((previous) => ({
        ...previous,
        show: false,
      }));
    }, 3000);
  };

  const filteredReports = useMemo(() => {
    const searchValue = searchText.trim().toLowerCase();

    return initialReports.filter((report) => {
      const matchesType = report.type === orderType;

      const matchesSearch =
        !searchValue ||
        report.id.toLowerCase().includes(searchValue) ||
        report.items.toLowerCase().includes(searchValue) ||
        report.payment.toLowerCase().includes(searchValue) ||
        report.table.toLowerCase().includes(searchValue);

      const matchesStart = !startDate || report.date >= startDate;

      const matchesEnd = !endDate || report.date <= endDate;

      return matchesType && matchesSearch && matchesStart && matchesEnd;
    });
  }, [orderType, searchText, startDate, endDate]);

  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE);

  const visibleReports = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredReports.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredReports, currentPage]);

  const firstItem =
    filteredReports.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const lastItem = Math.min(currentPage * PAGE_SIZE, filteredReports.length);

  const handleTypeChange = (type) => {
    setOrderType(type);
    setCurrentPage(1);
    setSearchText("");
  };

  const handleChartChange = (mode) => {
    setChartMode(mode);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
    setCurrentPage(1);
  };

  const handleView = (report) => {
    navigate(`details/${report.id}?type=${encodeURIComponent(report.type)}`);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const handleExport = () => {
    if (!filteredReports.length) {
      showMessage("There is no report data to export.", "info");
      return;
    }

    const exportData = filteredReports.map((report) => ({
      "Sale ID": report.id,
      ...(orderType === "Dine-in" ? { "Table Name": report.table } : {}),
      "Order Items": report.items,
      "Total Amount": report.amount,
      Date: formatDate(report.date),
      "Payment Method": report.payment,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

    worksheet["!cols"] = [
      { wch: 15 },
      ...(orderType === "Dine-in" ? [{ wch: 18 }] : []),
      { wch: 42 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
    ];

    XLSX.writeFile(workbook, `${orderType.toLowerCase()}-sales-report.xlsx`);

    showMessage("Sales report exported successfully.");
  };

  const chartData = chartMode === "Monthly" ? monthlyData : weeklyData;

  return (
    <div className="sales-report">
      <div className="sales-report__header">
        <div className="sales-report__title">Sales Report</div>

        <div className="sales-report__manager">
          <div className="sales-report__manager-icon">
            <ShoppingBagOutlinedIcon />
          </div>

          <div className="sales-report__manager-info">
            <div className="sales-report__manager-role">System Manager</div>

            <div className="sales-report__manager-name">HMIN MIN AUNG</div>
          </div>
        </div>
      </div>

      <div className="sales-report__summary">
        <div className="sales-report__card">
          <div className="sales-reportcard-icon ">
            <ShoppingBagOutlinedIcon />
          </div>

          <div className="sales-report__card-label">Today Orders</div>

          <div className="sales-report__card-value">50 orders</div>
        </div>

        <div className="sales-report__card">
          <div className="sales-reportcard-icon">
            <MonetizationOnOutlinedIcon />
          </div>

          <div className="sales-report__card-label">Today Total Revenue</div>

          <div className="sales-report__card-value">120,000 Ks</div>
        </div>

        <div className="sales-report__card">
          <div className="sales-reportcard-icon sales-reportcard-icon--pink">
            <PercentIcon />
          </div>

          <div className="sales-report__card-label">Total Revenue</div>

          <div className="sales-report__card-value">1,450 Units</div>
        </div>

        <div className="sales-report__card">
          <div className="sales-reportcard-icon sales-reportcard-icon--purple">
            <EmojiEventsOutlinedIcon />
          </div>

          <div className="sales-report__card-label">Top Selling Item</div>

          <div className="sales-report__card-value">Beef Burger</div>
          <div className="sales-report__best">BEST</div>
        </div>
      </div>

      <div className="sales-report__chart-card">
        <div className="sales-report__chart-header">
          <div>
            <div className="sales-report__chart-title">
              Sales Performance Trend (2026)
            </div>

            <div className="sales-report__chart-subtitle">
              {chartMode === "Monthly"
                ? "Gross monthly revenue comparison across 12 months"
                : "Gross weekly revenue comparison"}
            </div>
          </div>

          <div className="sales-report__chart-switch">
            <button
              type="button"
              className={`sales-report__chart-switch-button ${
                chartMode === "Monthly"
                  ? "sales-report__chart-switch-button--active"
                  : ""
              }`}
              onClick={() => handleChartChange("Monthly")}
            >
              Monthly
            </button>

            <button
              type="button"
              className={`sales-report__chart-switch-button ${
                chartMode === "Weekly"
                  ? "sales-report__chart-switch-button--active"
                  : ""
              }`}
              onClick={() => handleChartChange("Weekly")}
            >
              Weekly
            </button>
          </div>
        </div>

        <div className="sales-report__chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 15,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="month" axisLine={false} tickLine={false} />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value / 1000}K`}
              />

              <Tooltip
                formatter={(value) => [formatMoney(value), "Revenue"]}
                cursor={{
                  fill: "rgba(76, 69, 223, 0.06)",
                }}
              />

              <Bar
                dataKey="revenue"
                radius={[8, 8, 0, 0]}
                fill="#dce4ef"
                activeBar={{
                  fill: "#4b45df",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="sales-report__type-tabs">
        <button
          type="button"
          className={`sales-report__type-button ${
            orderType === "Takeaway" ? "sales-report__type-button--active" : ""
          }`}
          onClick={() => handleTypeChange("Takeaway")}
        >
          <LocalShippingOutlinedIcon />
          <span>Takeaway</span>
        </button>

        <button
          type="button"
          className={`sales-report__type-button ${
            orderType === "Dine-in" ? "sales-report__type-button--active" : ""
          }`}
          onClick={() => handleTypeChange("Dine-in")}
        >
          <RestaurantOutlinedIcon />
          <span>Dine-in</span>
        </button>
      </div>

      <div className="sales-report__table-card">
        <div className="sales-report__toolbar">
          <div className="sales-report__search">
            <SearchIcon className="sales-report__search-icon" />
            <input
              className="sales-report__search-input"
              type="text"
              value={searchText}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search orders by ID or item..."
            />
          </div>

          <div className="sales-report__date-group">
            <div className="sales-report__date-input">
              <CalendarMonthIcon />

              <input
                className="sales-report__date-field"
                type="date"
                value={startDate}
                onChange={(event) => handleStartDateChange(event.target.value)}
              />
            </div>

            <div className="sales-report__date-to">to</div>

            <div className="sales-report__date-input">
              <CalendarMonthIcon />

              <input
                className="sales-report__date-field"
                type="date"
                value={endDate}
                onChange={(event) => handleEndDateChange(event.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className="sales-report__export-button"
            onClick={handleExport}
          >
            <DownloadIcon />
            <span>Export</span>
          </button>
        </div>

        <div className="sales-report__table-wrapper">
          <div className="sales-report__table">
            <div
              className={`sales-report__table-head ${
                orderType === "Dine-in"
                  ? "sales-report__table-head--dine-in"
                  : ""
              }`}
            >
              <div className="sales-reportcell sales-reportcell--id">
                SALE ID
              </div>

              {orderType === "Dine-in" && (
                <div className="sales-reportcell sales-reportcell--table">
                  TABLE NAME
                </div>
              )}

              <div className="sales-reportcell sales-reportcell--items">
                ORDER ITEMS
              </div>

              <div className="sales-reportcell sales-reportcell--amount">
                TOTAL
                <span>AMOUNT</span>
              </div>

              <div className="sales-reportcell sales-reportcell--date">
                DATE
              </div>

              <div className="sales-reportcell sales-reportcell--payment">
                PAYMENT
                <span>METHOD</span>
              </div>

              <div className="sales-reportcell sales-reportcell--action">
                ACTION
              </div>
            </div>

            {visibleReports.length > 0 ? (
              visibleReports.map((report) => (
                <div
                  className={`sales-report__table-row ${
                    orderType === "Dine-in"
                      ? "sales-report__table-row--dine-in"
                      : ""
                  }`}
                  key={report.id}
                >
                  <div className="sales-reportcell sales-reportcell--id">
                    {report.id}
                  </div>
                  {orderType === "Dine-in" && (
                    <div className="sales-reportcell sales-reportcell--table">
                      {report.table}
                    </div>
                  )}
                  <div className="sales-reportcell sales-reportcell--items">
                    <span
                      className="sales-report__item-text"
                      title={report.items}
                    >
                      {report.items}
                    </span>
                  </div>{" "}
                  <div className="sales-reportcell sales-reportcell--amount">
                    {formatMoney(report.amount)}
                  </div>
                  <div className="sales-reportcell sales-reportcell--date">
                    {formatDate(report.date)}
                  </div>
                  <div className="sales-reportcell sales-reportcell--payment">
                    {report.payment}
                  </div>
                  <div className="sales-reportcell sales-reportcell--action">
                    <button
                      type="button"
                      className="sales-report__view-button"
                      onClick={() => handleView(report)}
                    >
                      <VisibilityOutlinedIcon />
                      <span>View</span>
                    </button>
                    <Outlet />
                  </div>
                </div>
              ))
            ) : (
              <div className="sales-report__empty">
                <div className="sales-report__empty-icon">
                  <SearchIcon />
                </div>

                <div className="sales-report__empty-title">
                  No reports found
                </div>

                <div className="sales-report__empty-text">
                  Try changing your search or date filter.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sales-report__footer">
          <div className="sales-report__showing">
            Showing {firstItem}-{lastItem} of {filteredReports.length} report
            entries
          </div>

          {filteredReports.length > PAGE_SIZE && (
            <div className="sales-report__pagination">
              <button
                type="button"
                className="sales-report__page-arrow"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <KeyboardArrowLeftIcon />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={`sales-report__page-button ${
                      currentPage === page
                        ? "sales-report__page-button--active"
                        : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                className="sales-report__page-arrow"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <KeyboardArrowRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {popup.show && (
        <div
          className={`sales-report__popup ${
            popup.type === "info"
              ? "sales-report__popup--info"
              : "sales-report__popup--success"
          }`}
        >
          <div className="sales-report__popup-icon">
            {popup.type === "info" ? <InfoOutlinedIcon /> : <CheckCircleIcon />}
          </div>

          <div className="sales-report__popup-message">{popup.message}</div>

          <button
            type="button"
            className="sales-report__popup-close"
            onClick={() =>
              setPopup((previous) => ({
                ...previous,
                show: false,
              }))
            }
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default OfflineReport;
