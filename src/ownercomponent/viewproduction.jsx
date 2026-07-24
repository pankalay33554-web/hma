import "../ownercss/viewproduction.css";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const productionData = [
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

const ViewProduct = () => {
  return (
    <div className="productionHistory">
      <h2 className="historyTitle">Production History</h2>

      {/* Filter */}

      <div className="historyFilter">
        <div className="search-box">
          <SearchIcon className="icon" />
          <input type="text" placeholder="Search" className="search-boxinput" />
        </div>

        <div className="selectBox">
          <span>Shop 1</span>
          <KeyboardArrowDownIcon />
        </div>

        <div className="selectBox">
          <span>All Categories</span>
          <KeyboardArrowDownIcon />
        </div>

        <div className="dateBox">
          <span>Today</span>
          <CalendarTodayIcon />
        </div>

        <button className="export-Btn">
          <FileDownloadOutlinedIcon />
          Export
        </button>
      </div>

      {/* Table */}

      <div className="tableWrapper">
        <table className="historyTable">
          <thead className="tableHead">
            <tr className="headRow">
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

          <tbody className="tableBody">
            {productionData.map((item) => (
              <tr key={item.id} className="bodyRow">
                <td>{item.id}</td>
                <td>{item.shop}</td>
                <td>{item.batch}</td>
                <td>{item.item}</td>
                <td>{item.size}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.total}</td>

                <td className="successText">{item.success}</td>

                <td className="failText">{item.fail}</td>

                <td>
                  <button className="viewBtn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="pagination">
        <button className="pageBtn">
          <KeyboardArrowLeftIcon fontSize="small" />
        </button>

        <button className="pageBtn activePage">1</button>

        <button className="pageBtn">2</button>

        <button className="pageBtn">3</button>

        <button className="pageBtn">
          <KeyboardArrowRightIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
