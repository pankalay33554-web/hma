// Reports.jsx

import "../ownercss/report.css";

import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Reports() {
  const reports = [
    {
      id: 1,
      shop: "Shop 1",
      batch: "#PRD-004",
      item: "Beef Burger",
      size: "Medium",
      date: "26-6-2026",
      time: "10:15 AM",
      total: 10,
      success: 10,
      fail: 0,
    },
    {
      id: 2,
      shop: "Shop 2",
      batch: "#PRD-005",
      item: "Beef Burger",
      size: "Large",
      date: "26-6-2026",
      time: "11:00 AM",
      total: 15,
      success: 10,
      fail: 5,
    },
  ];

  return (
    <div className="reports">
      {/* Summary Cards */}
      <div className="summaryGrid">
        <div className="summaryCard">
          <div>
            <h3>Total Revenue</h3>
            <h2>150,000 Ks</h2>
          </div>
          <ReceiptLongOutlinedIcon />
        </div>

        <div className="summaryCard">
          <div>
            <h3>Total Cost</h3>
            <h2>100,000 Ks</h2>
          </div>
          <ReceiptLongOutlinedIcon />
        </div>

        <div className="summaryCard">
          <div>
            <h3>Net Profit</h3>
            <h2>50,000 Ks</h2>
          </div>
          <ReceiptLongOutlinedIcon />
        </div>

        <div className="summaryCard">
          <div>
            <h3>Total Orders</h3>
            <h2>120</h2>
          </div>
          <ReceiptLongOutlinedIcon />
        </div>
      </div>

      {/* Filter */}

      <div className="filterCard">
        <div className="filterItem">
          <label>Report Type</label>
          <div className="inputBox">
            <span>Production</span>
            <KeyboardArrowDownRoundedIcon />
          </div>
        </div>

        <div className="filterItem">
          <label>Date (From)</label>
          <div className="inputBox">
            <input type="date" className="inputBox-input" />
          </div>
        </div>

        <div className="filterItem">
          <label>Date (To)</label>
          <div className="inputBox">
            <input type="date" className="inputBox-input" />
          </div>
        </div>

        <div className="filterItem">
          <label>Shop</label>
          <div className="inputBox">
            <span>All Shops</span>
            <KeyboardArrowDownRoundedIcon />
          </div>
        </div>

        <button className="searchesBtn">
          <SearchIcon />
          Search
        </button>

        <button className="exportBtn">
          <FileDownloadOutlinedIcon />
          Export
        </button>
      </div>

      {/* Tabs */}

      <div className="tabBox">
        <button className="tabActive">Shops Report Detail</button>
        <button className="tabBtn">Production Report Detail</button>
      </div>

      {/* Table */}
      <div className="tableCard">
        <table className="reportTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Shop</th>
              <th>Batch ID</th>
              <th>Item Name</th>
              <th>Size</th>
              <th>Date</th>
              <th>Time</th>
              <th>Total Qty</th>
              <th>Success Qty</th>
              <th>Fail Qty</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.shop}</td>
                <td>{report.batch}</td>
                <td>{report.item}</td>
                <td>{report.size}</td>
                <td>{report.date}</td>
                <td>{report.time}</td>
                <td>{report.total}</td>

                <td className="successText">{report.success}</td>

                <td className="failText">{report.fail}</td>

                <td>
                  <button className="viewBtn">
                    <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="pagination">
        <button className="pageBtn">
          <ChevronLeftIcon />
        </button>

        <button className="pageActive">1</button>

        <button className="pageBtn">2</button>

        <button className="pageBtn">3</button>

        <button className="pageBtn">
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
