import "../ownercss/inventory.css";
import { useState } from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Outlet, useNavigate } from "react-router";

export default function Inventory() {
  const cards = [
    { id: 1, title: "Total Stock Item", value: "100 Units" },
    { id: 2, title: "Low Stock Item", value: "10" },
    { id: 3, title: "Total Shop", value: "5" },
    { id: 4, title: "Total Revenue", value: "150,000 Ks" },
  ];

  const inventory = [
    {
      id: 1,
      date: "26-06-2026",
      code: "0001",
      item: "Flour",
      cost: "8,000/Kg",
      stock: 1500,
      unit: "Kg",
      status: "In Stock",
    },
    {
      id: 2,
      date: "26-06-2026",
      code: "0002",
      item: "Sugar",
      cost: "8,000/Kg",
      stock: 1500,
      unit: "Kg",
      status: "Low Stock",
    },
  ];

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(inventory.length / itemsPerPage);
  const currentItems = inventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="inventoryCardContainer">
      {/* Cards Section */}
      <div className="cardGrid">
        {cards.map((card) => (
          <div className="inventoryCard" key={card.id}>
            <div className="inventoryCardLeft">
              <h3 className="inventoryCardTitle">{card.title}</h3>
              <p className="inventoryCardValue">{card.value}</p>
            </div>
            <div className="inventoryCardRight">
              <Inventory2OutlinedIcon sx={{ fontSize: 35, color: "#8a817c" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Header Section */}
      <div className="inventoryHeader">
        <h3 style={{ margin: 0 }}>Inventory Items</h3>
        <div className="headerActions">
          <input type="text" placeholder="Search" className="searchInput" />
          <select className="filterDropdown">
            <option>All Categories</option>
          </select>
          <input type="date" className="dateInput" />
          <button className="exportesBtn">
            <DownloadOutlinedIcon />
            Export
          </button>
          <button
            className="addBtn"
            onClick={() => navigate("inventoryadditem")}
          >
            <AddCircleIcon />
            Add New Item
          </button>
          <Outlet />
        </div>
      </div>

      {/* Table Section */}
      <div className="inventoryTableContainer">
        <table className="inventoryTable">
          <thead className="inventoryTableHead">
            <tr>
              <th>No</th>
              <th>Update Date</th>
              <th>Code</th>
              <th>Item</th>
              <th>Cost</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="inventoryTableBody">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.code}</td>
                <td>{item.item}</td>
                <td>{item.cost}</td>
                <td>
                  {item.stock} {item.unit}
                </td>
                <td>
                  <span
                    className={
                      item.status === "In Stock" ? "statusGreen" : "statusRed"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="actionGroup">
                    <button
                      className="inventoryviewButton"
                      onClick={() => navigate("viewinventory")}
                    >
                      <VisibilityOutlinedIcon className="ViewsIcon" />
                    </button>
                    <button
                      onClick={() => navigate("inventoryupdateitem")}
                      className="editButton"
                    >
                      <EditOutlinedIcon className="editIcon" />
                    </button>
                    <DeleteOutlineOutlinedIcon className="deleteIcon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        {inventory.length > itemsPerPage && (
          <div className="paginationContainer">
            <button
              className="paginationButton"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={
                  currentPage === index + 1 ? "activePage" : "paginationButton"
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="paginationButton"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
