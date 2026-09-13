import { useMemo, useState } from "react";
import {
  Search,
  CalendarMonth,
  ReceiptLong,
  AttachMoney,
  TrendingUp,
  EmojiEvents,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  Visibility,
  Storefront,
} from "@mui/icons-material";

import "./offlinesalelist.css";

const salesData = [
  {
    id: "INV-001",
    customer: "Best Super, Yangon",
    total: 125000,
    date: "2026-07-01",
    payment: "Cash",
  },
  {
    id: "INV-002",
    customer: "Best Super, Mandalay",
    total: 98000,
    date: "2026-07-01",
    payment: "Cash",
  },
  {
    id: "INV-003",
    customer: "Best Super, Naypyidaw",
    total: 156000,
    date: "2026-07-02",
    payment: "Cash",
  },
  {
    id: "INV-004",
    customer: "Best Super, Bago",
    total: 88000,
    date: "2026-07-02",
    payment: "Cash",
  },
  {
    id: "INV-005",
    customer: "Best Super, Yangon",
    total: 173000,
    date: "2026-07-03",
    payment: "Cash",
  },
  {
    id: "INV-006",
    customer: "Best Super, Mawlamyine",
    total: 92000,
    date: "2026-07-03",
    payment: "Cash",
  },
  {
    id: "INV-007",
    customer: "Best Super, Taunggyi",
    total: 148000,
    date: "2026-07-04",
    payment: "Cash",
  },
  {
    id: "INV-008",
    customer: "Best Super, Yangon",
    total: 110000,
    date: "2026-07-05",
    payment: "Cash",
  },
  {
    id: "INV-009",
    customer: "Best Super, Mandalay",
    total: 132000,
    date: "2026-07-05",
    payment: "Cash",
  },
  {
    id: "INV-010",
    customer: "Best Super, Yangon",
    total: 76000,
    date: "2026-07-06",
    payment: "Cash",
  },
  {
    id: "INV-011",
    customer: "Best Super, Bago",
    total: 187000,
    date: "2026-07-06",
    payment: "Cash",
  },
  {
    id: "INV-012",
    customer: "Best Super, Yangon",
    total: 145000,
    date: "2026-07-07",
    payment: "Cash",
  },
  {
    id: "INV-013",
    customer: "Best Super, Mandalay",
    total: 99000,
    date: "2026-07-07",
    payment: "Cash",
  },
  {
    id: "INV-014",
    customer: "Best Super, Naypyidaw",
    total: 121000,
    date: "2026-07-08",
    payment: "Cash",
  },
  {
    id: "INV-015",
    customer: "Best Super, Yangon",
    total: 210000,
    date: "2026-07-08",
    payment: "Cash",
  },
  {
    id: "INV-016",
    customer: "Best Super, Taunggyi",
    total: 105000,
    date: "2026-07-09",
    payment: "Cash",
  },
  {
    id: "INV-017",
    customer: "Best Super, Yangon",
    total: 87000,
    date: "2026-07-09",
    payment: "Cash",
  },
  {
    id: "INV-018",
    customer: "Best Super, Mawlamyine",
    total: 156000,
    date: "2026-07-10",
    payment: "Cash",
  },
  {
    id: "INV-019",
    customer: "Best Super, Bago",
    total: 133000,
    date: "2026-07-10",
    payment: "Cash",
  },
  {
    id: "INV-020",
    customer: "Best Super, Yangon",
    total: 99000,
    date: "2026-07-11",
    payment: "Cash",
  },
  {
    id: "INV-021",
    customer: "Best Super, Mandalay",
    total: 178000,
    date: "2026-07-11",
    payment: "Cash",
  },
  {
    id: "INV-022",
    customer: "Best Super, Yangon",
    total: 92000,
    date: "2026-07-12",
    payment: "Cash",
  },
  {
    id: "INV-023",
    customer: "Best Super, Naypyidaw",
    total: 145000,
    date: "2026-07-12",
    payment: "Cash",
  },
  {
    id: "INV-024",
    customer: "Best Super, Yangon",
    total: 119000,
    date: "2026-07-13",
    payment: "Cash",
  },
  {
    id: "INV-025",
    customer: "Best Super, Taunggyi",
    total: 187000,
    date: "2026-07-13",
    payment: "Cash",
  },
  {
    id: "INV-026",
    customer: "Best Super, Yangon",
    total: 87000,
    date: "2026-07-14",
    payment: "Cash",
  },
  {
    id: "INV-027",
    customer: "Best Super, Mandalay",
    total: 151000,
    date: "2026-07-14",
    payment: "Cash",
  },
  {
    id: "INV-028",
    customer: "Best Super, Bago",
    total: 113000,
    date: "2026-07-15",
    payment: "Cash",
  },
  {
    id: "INV-029",
    customer: "Best Super, Yangon",
    total: 167000,
    date: "2026-07-15",
    payment: "Cash",
  },
  {
    id: "INV-030",
    customer: "Best Super, Mawlamyine",
    total: 94000,
    date: "2026-07-16",
    payment: "Cash",
  },
  {
    id: "INV-031",
    customer: "Best Super, Yangon",
    total: 128000,
    date: "2026-07-16",
    payment: "Cash",
  },
  {
    id: "INV-032",
    customer: "Best Super, Mandalay",
    total: 192000,
    date: "2026-07-17",
    payment: "Cash",
  },
  {
    id: "INV-033",
    customer: "Best Super, Yangon",
    total: 101000,
    date: "2026-07-17",
    payment: "Cash",
  },
  {
    id: "INV-034",
    customer: "Best Super, Naypyidaw",
    total: 143000,
    date: "2026-07-18",
    payment: "Cash",
  },
  {
    id: "INV-035",
    customer: "Best Super, Bago",
    total: 99000,
    date: "2026-07-18",
    payment: "Cash",
  },
  {
    id: "INV-036",
    customer: "Best Super, Yangon",
    total: 175000,
    date: "2026-07-19",
    payment: "Cash",
  },
  {
    id: "INV-037",
    customer: "Best Super, Taunggyi",
    total: 114000,
    date: "2026-07-19",
    payment: "Cash",
  },
  {
    id: "INV-038",
    customer: "Best Super, Yangon",
    total: 136000,
    date: "2026-07-20",
    payment: "Cash",
  },
  {
    id: "INV-039",
    customer: "Best Super, Mandalay",
    total: 89000,
    date: "2026-07-20",
    payment: "Cash",
  },
  {
    id: "INV-040",
    customer: "Best Super, Yangon",
    total: 157000,
    date: "2026-07-21",
    payment: "Cash",
  },
  {
    id: "INV-041",
    customer: "Best Super, Bago",
    total: 123000,
    date: "2026-07-21",
    payment: "Cash",
  },
  {
    id: "INV-042",
    customer: "Best Super, Yangon",
    total: 199000,
    date: "2026-07-22",
    payment: "Cash",
  },
  {
    id: "INV-043",
    customer: "Best Super, Mawlamyine",
    total: 108000,
    date: "2026-07-22",
    payment: "Cash",
  },
  {
    id: "INV-044",
    customer: "Best Super, Yangon",
    total: 145000,
    date: "2026-07-23",
    payment: "Cash",
  },
  {
    id: "INV-045",
    customer: "Best Super, Mandalay",
    total: 168000,
    date: "2026-07-23",
    payment: "Cash",
  },
];

const ITEMS_PER_PAGE = 20;

function formatMoney(value) {
  return `${value.toLocaleString()} Ks`;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function OfflineSaleList() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSales = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return salesData.filter((sale) => {
      const matchesSearch =
        !keyword ||
        sale.id.toLowerCase().includes(keyword) ||
        sale.customer.toLowerCase().includes(keyword) ||
        sale.payment.toLowerCase().includes(keyword);

      const matchesStartDate = !startDate || sale.date >= startDate;

      const matchesEndDate = !endDate || sale.date <= endDate;

      return matchesSearch && matchesStartDate && matchesEndDate;
    });
  }, [search, startDate, endDate]);

  const totalPages = Math.ceil(filteredSales.length / ITEMS_PER_PAGE);

  const visibleSales = filteredSales.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);

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

  const clearFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="sales-layout">
      <main className="sales-main">
        <header className="sales-header">
          <div className="sales-page-title">Sales List</div>

          <div className="sales-user">
            <div className="sales-user-avatar">
              <Storefront />
            </div>

            <div className="sales-user-info">
              <div className="sales-user-name">Bakery Manager</div>
              <div className="sales-user-role">Administrator</div>
            </div>
          </div>
        </header>

        <div className="sales-content">
          <section className="sales-summary-grid">
            <div className="sales-summary-card">
              <div className="sales-summary-icon sales-icon-orders">
                <ReceiptLong />
              </div>

              <div className="sales-summary-info">
                <div className="sales-summary-label">Today Orders</div>

                <div className="sales-summary-value">
                  {filteredSales.length}
                </div>
              </div>
            </div>

            <div className="sales-summary-card">
              <div className="sales-summary-icon sales-icon-revenue">
                <AttachMoney />
              </div>

              <div className="sales-summary-info">
                <div className="sales-summary-label">Today Total Revenue</div>

                <div className="sales-summary-value">
                  {formatMoney(totalRevenue)}
                </div>
              </div>
            </div>

            <div className="sales-summary-card">
              <div className="sales-summary-icon sales-icon-profit">
                <TrendingUp />
              </div>

              <div className="sales-summary-info">
                <div className="sales-summary-label">Total Revenue</div>
                <div className="sales-summary-value">
                  {formatMoney(totalRevenue)}
                </div>
              </div>
            </div>

            <div className="sales-summary-card">
              <div className="sales-summary-badge">BEST</div>

              <div className="sales-summary-icon sales-icon-top">
                <EmojiEvents />
              </div>

              <div className="sales-summary-info">
                <div className="sales-summary-label">Top Selling Item</div>

                <div className="sales-summary-value sales-top-item">
                  Best Burger
                </div>
              </div>
            </div>
          </section>

          <section className="sales-table-card">
            <div className="sales-filter-bar">
              <div className="sales-search-box">
                <Search className="sales-search-icon" />

                <input
                  className="sales-search-input"
                  type="text"
                  placeholder="Search orders by ID or name..."
                  value={search}
                  onChange={(event) => handleSearch(event.target.value)}
                />
              </div>

              <div className="sales-date-box">
                <CalendarMonth className="sales-date-icon" />

                <input
                  className="sales-date-input"
                  type="date"
                  value={startDate}
                  onChange={(event) => handleStartDate(event.target.value)}
                />
              </div>

              <div className="sales-date-separator">to</div>

              <div className="sales-date-box">
                <CalendarMonth className="sales-date-icon" />

                <input
                  className="sales-date-input"
                  type="date"
                  value={endDate}
                  onChange={(event) => handleEndDate(event.target.value)}
                />
              </div>

              {(search || startDate || endDate) && (
                <button className="sales-clear-button" onClick={clearFilters}>
                  Clear
                </button>
              )}
            </div>

            <div className="sales-result-info">
              Showing <strong>{visibleSales.length}</strong> of{" "}
              <strong>{filteredSales.length}</strong> sales
            </div>

            <div className="sales-table-wrapper">
              <table className="sales-table">
                <thead className="sales-table-head">
                  <tr className="sales-table-row">
                    <th className="sales-table-header">SALE ID</th>

                    <th className="sales-table-header">CUSTOMER / STORE</th>

                    <th className="sales-table-header">TOTAL AMOUNT</th>

                    <th className="sales-table-header">DATE</th>

                    <th className="sales-table-header">PAYMENT METHOD</th>

                    <th className="sales-table-header sales-action-header">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="sales-table-body">
                  {visibleSales.map((sale, index) => (
                    <tr
                      className="sales-table-row sales-data-row"
                      key={sale.id}
                      style={{
                        animationDelay: `${index * 35}ms`,
                      }}
                    >
                      <td className="sales-table-cell sales-id">{sale.id}</td>

                      <td className="sales-table-cell">
                        <div className="sales-customer">{sale.customer}</div>
                      </td>

                      <td className="sales-table-cell sales-amount">
                        {formatMoney(sale.total)}
                      </td>

                      <td className="sales-table-cell sales-date">
                        {formatDate(sale.date)}
                      </td>

                      <td className="sales-table-cell">
                        <span className="sales-payment">{sale.payment}</span>
                      </td>

                      <td className="sales-table-cell sales-action-cell">
                        <button className="sales-view-button" title="View sale">
                          <Visibility />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {visibleSales.length === 0 && (
                    <tr className="sales-empty-row">
                      <td className="sales-empty-cell" colSpan="6">
                        <div className="sales-empty">
                          <Search />
                          <div className="sales-empty-title">
                            No sales found
                          </div>
                          <div className="sales-empty-text">
                            Try another search or date range.
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredSales.length > ITEMS_PER_PAGE && (
              <div className="sales-pagination">
                <div className="sales-pagination-info">
                  Page {currentPage} of {totalPages}
                </div>

                <div className="sales-pagination-controls">
                  <button
                    className="sales-page-button"
                    disabled={currentPage === 1}
                    onClick={() => changePage(1)}
                  >
                    <FirstPage />
                  </button>

                  <button
                    className="sales-page-button"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                  >
                    <ChevronLeft />
                  </button>

                  <div className="sales-page-numbers">
                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        className={`sales-page-number ${
                          currentPage === page ? "sales-page-active" : ""
                        }`}
                        onClick={() => changePage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    className="sales-page-button"
                    disabled={currentPage === totalPages}
                    onClick={() => changePage(currentPage + 1)}
                  >
                    <ChevronRight />
                  </button>

                  <button
                    className="sales-page-button"
                    disabled={currentPage === totalPages}
                    onClick={() => changePage(totalPages)}
                  >
                    <LastPage />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
