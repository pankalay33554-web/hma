import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./orderHistory.css";

// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PrintIcon from "@mui/icons-material/Print";

// Dummy Data for Order History
const INITIAL_ORDER_DATA = [
  {
    id: "#ORD-1001",
    totalAmount: "10,500 Ks",
    rawAmount: 10500,
    date: "2026-07-01",
    displayDate: "1 July 2026",
    time: "12:45 PM",
    totalItems: 2,
    cashier: "Hla Hla",
    itemsList: [
      { name: "Beef Burger (Normal)", qty: 1, price: "7,000" },
      { name: "Apple Juice", qty: 1, price: "3,500" },
    ],
  },
  {
    id: "#ORD-1002",
    totalAmount: "18,000 Ks",
    rawAmount: 18000,
    date: "2026-07-03",
    displayDate: "3 July 2026",
    time: "02:15 PM",
    totalItems: 3,
    cashier: "Hla Hla",
    itemsList: [
      { name: "Double Cheese Burger", qty: 2, price: "12,000" },
      { name: "Strawberry Smoothie", qty: 1, price: "6,000" },
    ],
  },
  {
    id: "#ORD-1003",
    totalAmount: "12,500 Ks",
    rawAmount: 12500,
    date: "2026-07-05",
    displayDate: "5 July 2026",
    time: "09:30 AM",
    totalItems: 2,
    cashier: "Mya Mya",
    itemsList: [
      { name: "Chicken Sandwich", qty: 1, price: "7,500" },
      { name: "Hot Coffee", qty: 1, price: "5,000" },
    ],
  },
  {
    id: "#ORD-1004",
    totalAmount: "25,000 Ks",
    rawAmount: 25000,
    date: "2026-07-10",
    displayDate: "10 July 2026",
    time: "11:00 AM",
    totalItems: 3,
    cashier: "Hla Hla",
    itemsList: [
      { name: "Cheese Cake", qty: 2, price: "16,000" },
      { name: "Iced Latte", qty: 1, price: "9,000" },
    ],
  },
  {
    id: "#ORD-1005",
    totalAmount: "8,500 Ks",
    rawAmount: 8500,
    date: "2026-07-12",
    displayDate: "12 July 2026",
    time: "01:20 PM",
    totalItems: 1,
    cashier: "Kyaw Kyaw",
    itemsList: [{ name: "Spicy Fried Chicken", qty: 1, price: "8,500" }],
  },
  {
    id: "#ORD-1006",
    totalAmount: "15,000 Ks",
    rawAmount: 15000,
    date: "2026-07-15",
    displayDate: "15 July 2026",
    time: "03:40 PM",
    totalItems: 2,
    cashier: "Hla Hla",
    itemsList: [
      { name: "Club Sandwich", qty: 1, price: "8,000" },
      { name: "Mango Milkshake", qty: 1, price: "7,000" },
    ],
  },
  {
    id: "#ORD-1007",
    totalAmount: "22,000 Ks",
    rawAmount: 22000,
    date: "2026-07-16",
    displayDate: "16 July 2026",
    time: "05:10 PM",
    totalItems: 4,
    cashier: "Mya Mya",
    itemsList: [
      { name: "French Fries", qty: 2, price: "8,000" },
      { name: "Coca Cola", qty: 2, price: "14,000" },
    ],
  },
  {
    id: "#ORD-1008",
    totalAmount: "11,000 Ks",
    rawAmount: 11000,
    date: "2026-07-18",
    displayDate: "18 July 2026",
    time: "06:30 PM",
    totalItems: 2,
    cashier: "Hla Hla",
    itemsList: [
      { name: "Hot Dog", qty: 1, price: "6,000" },
      { name: "Lemon Tea", qty: 1, price: "5,000" },
    ],
  },
  {
    id: "#ORD-1009",
    totalAmount: "30,000 Ks",
    rawAmount: 30000,
    date: "2026-07-20",
    displayDate: "20 July 2026",
    time: "07:15 PM",
    totalItems: 5,
    cashier: "Kyaw Kyaw",
    itemsList: [
      { name: "Family Set Burger", qty: 1, price: "20,000" },
      { name: "Large Drinks", qty: 4, price: "10,000" },
    ],
  },
  {
    id: "#ORD-1010",
    totalAmount: "14,500 Ks",
    rawAmount: 14500,
    date: "2026-07-21",
    displayDate: "21 July 2026",
    time: "08:00 PM",
    totalItems: 2,
    cashier: "Hla Hla",
    itemsList: [
      { name: "BBQ Chicken Wings", qty: 1, price: "9,500" },
      { name: "Iced Tea", qty: 1, price: "5,000" },
    ],
  },
  {
    id: "#ORD-1011",
    totalAmount: "9,000 Ks",
    rawAmount: 9000,
    date: "2026-07-22",
    displayDate: "22 July 2026",
    time: "08:45 PM",
    totalItems: 1,
    cashier: "Hla Hla",
    itemsList: [{ name: "Matcha Latte", qty: 1, price: "9,000" }],
  },
];

export default function OrderHistory() {
  const navigate = useNavigate();

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination State (10 Rows Per Page)
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Receipt Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Handlers
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  // Thermal Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Filter Logic
  const filteredOrders = useMemo(() => {
    setCurrentPage(1);
    return INITIAL_ORDER_DATA.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.itemsList.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      if (!startDate && !endDate) return matchesSearch;

      const orderDate = new Date(order.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end)
        return matchesSearch && orderDate >= start && orderDate <= end;
      if (start) return matchesSearch && orderDate >= start;
      if (end) return matchesSearch && orderDate >= end;
      return matchesSearch;
    });
  }, [searchQuery, startDate, endDate]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredOrders.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredOrders, currentPage]);

  const startRowNumber =
    filteredOrders.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const endRowNumber = Math.min(
    currentPage * rowsPerPage,
    filteredOrders.length,
  );

  // Export to Excel (.csv) Function
  const handleExportCSV = () => {
    if (filteredOrders.length === 0) return;

    const headers = [
      "Order ID",
      "Items",
      "Total Items",
      "Total Amount",
      "Date",
      "Time",
      "Cashier",
    ];
    const rows = filteredOrders.map((ord) => [
      ord.id,
      `"${ord.itemsList.map((i) => `${i.name} (x${i.qty})`).join(", ")}"`,
      ord.totalItems,
      `"${ord.totalAmount}"`,
      ord.displayDate,
      ord.time,
      ord.cashier,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Order_History_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="order-history-wrapper">
      {/* 🟢 TOP BAR (Sales Person Page Style) */}
      <header className="oh-topbar">
        <div className="oh-topbar-left">
          <button
            className="oh-btn-back"
            onClick={() => navigate("/salesperson")}
            title="Back to Sales Person"
          >
            <ArrowBackIcon style={{ fontSize: "1.2rem" }} />
          </button>
          <div className="oh-brand">
            <StorefrontIcon className="oh-store-icon" />
            <span className="oh-shop-title">Burger Shop 1</span>
          </div>
        </div>

        <div className="oh-topbar-right">
          <div className="oh-user-details">
            <span className="oh-user-role">SALES PERSON</span>
            <span className="oh-user-name">Hla Hla</span>
          </div>
          <AccountCircleIcon className="oh-user-avatar" />
        </div>
      </header>

      {/* 🟢 MAIN BODY */}
      <div className="oh-body-container">
        <div className="oh-table-card">
          {/* Controls: Search, Date Filter & Export Button */}
          <div className="oh-controls-row">
            <div className="oh-search-wrapper">
              <SearchOutlinedIcon className="oh-search-icon" />
              <input
                type="text"
                placeholder="Search by Order ID or Item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="oh-date-picker-group">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="oh-to-text">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button className="oh-btn-export" onClick={handleExportCSV}>
              <FileDownloadOutlinedIcon style={{ fontSize: "1.1rem" }} />
              Export
            </button>
          </div>

          {/* Table Area */}
          <div className="oh-table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>ORDER ITEMS</th>
                  <th>TOTAL AMOUNT</th>
                  <th>DATE</th>
                  <th style={{ textAlign: "center" }}>TOTAL ITEMS</th>
                  <th style={{ textAlign: "center" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((row) => (
                    <tr key={row.id}>
                      <td className="font-bold text-dark">{row.id}</td>
                      <td className="text-muted">
                        {row.itemsList
                          .map((i) => `${i.name} (x${i.qty})`)
                          .join(", ")}
                      </td>
                      <td className="font-bold text-price">
                        {row.totalAmount}
                      </td>
                      <td>{row.displayDate}</td>
                      <td style={{ textAlign: "center" }}>
                        <span className="oh-badge-qty">
                          {row.totalItems} Items
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="oh-btn-view"
                          onClick={() => handleOpenModal(row)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="oh-no-data">
                      No order records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="oh-pagination-container">
            <span className="oh-pagination-info">
              Showing {startRowNumber}-{endRowNumber} of {filteredOrders.length}{" "}
              orders
            </span>
            <div className="oh-pagination-buttons">
              <button
                className="oh-pg-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`oh-pg-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                className="oh-pg-btn"
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

      {/* 🟢 RECEIPT SLIP MODAL (Sales Person Style) */}
      {isModalOpen && selectedOrder && (
        <div className="receipt-modal-overlay" onClick={handleCloseModal}>
          <div
            className="receipt-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div id="printable-area" className="printable-receipt-slip">
              <div className="receipt-header">
                <h2>Burger Shop 1</h2>
                <p>09 123456789</p>
                <p>shop.stock@gmail.com</p>
                <p>Yangon, Myanmar</p>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-meta">
                <p>
                  <strong>Order ID:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Date:</strong> {selectedOrder.displayDate} (
                  {selectedOrder.time})
                </p>
                <p>
                  <strong>Cashier:</strong> {selectedOrder.cashier}
                </p>
                <p>
                  <strong>Total Items:</strong> {selectedOrder.totalItems} Items
                </p>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-table">
                <div className="receipt-th">
                  <span className="th-item">Products</span>
                  <span className="th-qty">Qty</span>
                  <span className="th-price">Price</span>
                </div>
                {selectedOrder.itemsList.map((item, idx) => (
                  <div className="receipt-tr" key={idx}>
                    <span className="td-item">{item.name}</span>
                    <span className="td-qty">{item.qty}</span>
                    <span className="td-price">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-totals">
                <div className="r-line">
                  <span>Sub Total :</span>
                  <span>{selectedOrder.totalAmount}</span>
                </div>
                <div className="r-line">
                  <span>Discount :</span>
                  <span>0 Ks</span>
                </div>
                <div className="r-line r-total">
                  <span>Total :</span>
                  <span>{selectedOrder.totalAmount}</span>
                </div>
              </div>

              <div className="receipt-divider"></div>
              <p className="receipt-footer-text">
                Thank you for dining with us! Please come again.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="receipt-modal-footer no-print">
              <button className="btn-modal-close" onClick={handleCloseModal}>
                Close
              </button>
              <button className="btn-modal-print" onClick={handlePrint}>
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
