import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";

import "./onlineinventory.css";

const PAGE_SIZE = 15;

const inventoryData = [
  {
    id: "#INV-8821",
    name: "Cotton T-shirt",
    category: "Men Wear",
    stock: 38,
    status: "In Stock",
  },
  {
    id: "#INV-9004",
    name: "Classic Denim Jacket",
    category: "Men Wear",
    stock: 7,
    status: "Low Stock",
  },
  {
    id: "#INV-1234",
    name: "Floral Dress",
    category: "Women Wear",
    stock: 20,
    status: "In Stock",
  },
  {
    id: "#INV-5562",
    name: "Black Bag",
    category: "Accessories",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "#INV-7731",
    name: "Leather Wallet",
    category: "Accessories",
    stock: 21,
    status: "In Stock",
  },
  {
    id: "#INV-8822",
    name: "Slim Fit Shirt",
    category: "Men Wear",
    stock: 32,
    status: "In Stock",
  },
  {
    id: "#INV-8823",
    name: "Oversized Hoodie",
    category: "Men Wear",
    stock: 14,
    status: "In Stock",
  },
  {
    id: "#INV-8824",
    name: "Pleated Skirt",
    category: "Women Wear",
    stock: 18,
    status: "In Stock",
  },
  {
    id: "#INV-8825",
    name: "Summer Blouse",
    category: "Women Wear",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: "#INV-8826",
    name: "Canvas Backpack",
    category: "Accessories",
    stock: 25,
    status: "In Stock",
  },
  {
    id: "#INV-8827",
    name: "Running Shoes",
    category: "Footwear",
    stock: 16,
    status: "In Stock",
  },
  {
    id: "#INV-8828",
    name: "Classic Sneakers",
    category: "Footwear",
    stock: 6,
    status: "Low Stock",
  },
  {
    id: "#INV-8829",
    name: "Formal Pants",
    category: "Men Wear",
    stock: 23,
    status: "In Stock",
  },
  {
    id: "#INV-8830",
    name: "Cargo Pants",
    category: "Men Wear",
    stock: 19,
    status: "In Stock",
  },
  {
    id: "#INV-8831",
    name: "Long Sleeve Dress",
    category: "Women Wear",
    stock: 11,
    status: "In Stock",
  },
  {
    id: "#INV-8832",
    name: "Denim Skirt",
    category: "Women Wear",
    stock: 9,
    status: "Low Stock",
  },
  {
    id: "#INV-8833",
    name: "Crossbody Bag",
    category: "Accessories",
    stock: 27,
    status: "In Stock",
  },
  {
    id: "#INV-8834",
    name: "Leather Belt",
    category: "Accessories",
    stock: 13,
    status: "In Stock",
  },
  {
    id: "#INV-8835",
    name: "High Heel Shoes",
    category: "Footwear",
    stock: 4,
    status: "Low Stock",
  },
  {
    id: "#INV-8836",
    name: "Loafers",
    category: "Footwear",
    stock: 22,
    status: "In Stock",
  },
  {
    id: "#INV-8837",
    name: "Polo Shirt",
    category: "Men Wear",
    stock: 30,
    status: "In Stock",
  },
  {
    id: "#INV-8838",
    name: "Leather Jacket",
    category: "Men Wear",
    stock: 7,
    status: "Low Stock",
  },
  {
    id: "#INV-8839",
    name: "Maxi Dress",
    category: "Women Wear",
    stock: 24,
    status: "In Stock",
  },
  {
    id: "#INV-8840",
    name: "Silk Scarf",
    category: "Accessories",
    stock: 17,
    status: "In Stock",
  },
  {
    id: "#INV-8841",
    name: "Bucket Hat",
    category: "Accessories",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "#INV-8842",
    name: "Walking Shoes",
    category: "Footwear",
    stock: 29,
    status: "In Stock",
  },
  {
    id: "#INV-8843",
    name: "Basic Tank Top",
    category: "Women Wear",
    stock: 34,
    status: "In Stock",
  },
  {
    id: "#INV-8844",
    name: "Chino Pants",
    category: "Men Wear",
    stock: 15,
    status: "In Stock",
  },
  {
    id: "#INV-8845",
    name: "Mini Handbag",
    category: "Accessories",
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "#INV-8846",
    name: "Flat Sandals",
    category: "Footwear",
    stock: 26,
    status: "In Stock",
  },
];

const categories = [
  "All Categories",
  "Men Wear",
  "Women Wear",
  "Accessories",
  "Footwear",
];

const OnlineInventory = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);

  const [toast, setToast] = useState("");

  const totalItems = inventoryData.length;

  const lowStockItems = inventoryData.filter(
    (item) => item.status === "Low Stock",
  ).length;

  const totalUnits = inventoryData.reduce((sum, item) => sum + item.stock, 0);

  const filteredItems = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return inventoryData.filter((item) => {
      const searchMatch =
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword);

      const categoryMatch =
        category === "All Categories" || item.category === category;

      return searchMatch && categoryMatch;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setCategoryOpen(false);
    setCurrentPage(1);
  };

  const handleExport = () => {
    if (filteredItems.length === 0) {
      setToast("There is no inventory data to export.");

      setTimeout(() => {
        setToast("");
      }, 2500);

      return;
    }

    const excelData = filteredItems.map((item) => ({
      "Item Code": item.id,
      "Item Name": item.name,
      Category: item.category,
      "Current Stock": item.stock,
      Status: item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet["!cols"] = [
      { wch: 18 },
      { wch: 28 },
      { wch: 20 },
      { wch: 18 },
      { wch: 18 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

    XLSX.writeFile(workbook, "inventory-report.xlsx");

    setToast("Inventory exported successfully.");

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <div className="offline-inventory-page">
      <div className="offline-inventory-top">
        <div className="offline-inventory-page-title">Inventory List</div>

        <div className="offline-inventory-manager">
          <div className="offline-inventory-manager-icon">
            <Inventory2OutlinedIcon />
          </div>

          <div className="offline-inventory-manager-info">
            <div className="offline-inventory-manager-role">System Manager</div>

            <div className="offline-inventory-manager-name">HEIN MIN AUNG</div>
          </div>
        </div>
      </div>

      <div className="offline-inventory-cards">
        <div className="offline-inventory-card">
          <div className="offline-inventory-card-icon offline-inventory-icon-one">
            <Inventory2OutlinedIcon />
          </div>

          <div className="offline-inventory-card-info">
            <div className="offline-inventory-card-label">Total Items</div>

            <div className="offline-inventory-card-value">
              {totalItems} Items
            </div>
          </div>
        </div>

        {/* Low Stock */}

        <div className="offline-inventory-card offline-inventory-low-card">
          <div className="offline-inventory-card-icon offline-inventory-icon-two">
            <WarningAmberOutlinedIcon />
          </div>

          <div className="offline-inventory-card-info">
            <div className="offline-inventory-card-label">Low Stock Alerts</div>

            <div className="offline-inventory-card-value offline-inventory-low-value">
              {lowStockItems} Items
            </div>
          </div>

          <div className="offline-inventory-urgent">URGENT</div>
        </div>

        <div className="offline-inventory-card">
          <div className="offline-inventory-card-icon offline-inventory-icon-three">
            <AccessTimeOutlinedIcon />
          </div>

          <div className="offline-inventory-card-info">
            <div className="offline-inventory-card-label">Last Stock Count</div>

            <div className="offline-inventory-card-value">Today, 10:15 AM</div>
          </div>
        </div>

        <div className="offline-inventory-card">
          <div className="offline-inventory-card-icon offline-inventory-icon-four">
            <LocalMallOutlinedIcon />
          </div>

          <div className="offline-inventory-card-info">
            <div className="offline-inventory-card-label">
              Total Units In-Shop
            </div>

            <div className="offline-inventory-card-value">
              {totalUnits.toLocaleString()} Units
            </div>
          </div>
        </div>
      </div>

      <div className="offline-inventory-container">
        <div className="offline-inventory-container-header">
          <div className="offline-inventory-section-title">
            Inventory Status
          </div>

          <div className="offline-inventory-tools">
            <div className="offline-inventory-search">
              <SearchIcon />

              <input
                className="offline-inventory-search-input"
                type="text"
                placeholder="Search ingredients..."
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
              />
            </div>

            <div className="offline-inventory-category">
              <button
                className="offline-inventory-category-button"
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span>{category}</span>

                <KeyboardArrowDownIcon
                  className={
                    categoryOpen
                      ? "offline-inventory-arrow active"
                      : "offline-inventory-arrow"
                  }
                />
              </button>

              {categoryOpen && (
                <div className="offline-inventory-category-menu">
                  {categories.map((item) => (
                    <button
                      className={
                        category === item
                          ? "offline-inventory-category-option active"
                          : "offline-inventory-category-option"
                      }
                      type="button"
                      key={item}
                      onClick={() => handleCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="offline-inventory-export-button"
              type="button"
              onClick={handleExport}
            >
              <DownloadIcon />

              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="offline-inventory-table-wrapper">
          <table className="offline-inventory-table">
            <thead className="offline-inventory-table-head">
              <tr className="offline-inventory-table-head-row">
                <th className="offline-inventory-th">ITEM CODE</th>

                <th className="offline-inventory-th">ITEM NAME</th>

                <th className="offline-inventory-th">CATEGORY</th>

                <th className="offline-inventory-th">CURRENT STOCK</th>

                <th className="offline-inventory-th">STATUS</th>

                <th className="offline-inventory-th">ACTION</th>
              </tr>
            </thead>

            <tbody className="offline-inventory-table-body">
              {currentItems.map((item) => (
                <tr className="offline-inventory-tr" key={item.id}>
                  <td className="offline-inventory-td offline-inventory-code">
                    {item.id}
                  </td>

                  <td className="offline-inventory-td offline-inventory-item-name">
                    {item.name}
                  </td>

                  <td className="offline-inventory-td">{item.category}</td>

                  <td className="offline-inventory-td offline-inventory-stock">
                    {item.stock}
                  </td>

                  <td className="offline-inventory-td">
                    <span
                      className={
                        item.status === "Low Stock"
                          ? "offline-inventory-status offline-inventory-status-low"
                          : "offline-inventory-status offline-inventory-status-good"
                      }
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="offline-inventory-td">
                    <button
                      className="offline-inventory-view-button"
                      type="button"
                      onClick={() => setSelectedItem(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {currentItems.length === 0 && (
                <tr className="offline-inventory-empty-row">
                  <td className="offline-inventory-empty-cell" colSpan="6">
                    <div className="offline-inventory-empty-content">
                      <SearchIcon />

                      <span>No inventory found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="offline-inventory-footer">
          <div className="offline-inventory-showing">
            {filteredItems.length > 0
              ? `Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
                  currentPage * PAGE_SIZE,
                  filteredItems.length,
                )} of ${filteredItems.length}`
              : "Showing 0 of 0"}
          </div>

          {filteredItems.length >= PAGE_SIZE && (
            <div className="offline-inventory-pagination">
              <button
                className="offline-inventory-pagination-button"
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              >
                <KeyboardArrowLeftIcon />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    className={
                      currentPage === page
                        ? "offline-inventory-pagination-button active"
                        : "offline-inventory-pagination-button"
                    }
                    type="button"
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                className="offline-inventory-pagination-button"
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
              >
                <KeyboardArrowRightIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <div className="offline-inventory-detail-overlay">
          <div className="offline-inventory-detail-popup">
            <div className="offline-inventory-detail-header">
              <div className="offline-inventory-detail-title">
                Inventory Item Details
              </div>

              <button
                className="offline-inventory-detail-close-icon"
                type="button"
                onClick={() => setSelectedItem(null)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="offline-inventory-detail-divider"></div>

            <div className="offline-inventory-detail-content">
              {/* ITEM CODE */}

              <div className="offline-inventory-detail-field">
                <div className="offline-inventory-detail-label">ITEM CODE</div>

                <div className="offline-inventory-detail-value">
                  {selectedItem.id}
                </div>
              </div>

              {/* DATE */}

              <div className="offline-inventory-detail-field">
                <div className="offline-inventory-detail-label">DATE</div>

                <div className="offline-inventory-detail-value">
                  {selectedItem.date || "27 Jun 2026"}
                </div>
              </div>

              {/* INGREDIENT NAME */}

              <div className="offline-inventory-detail-field">
                <div className="offline-inventory-detail-label">
                  INGREDIENT NAME
                </div>

                <div className="offline-inventory-detail-value">
                  {selectedItem.name}
                </div>
              </div>

              {/* CATEGORY */}

              <div className="offline-inventory-detail-field">
                <div className="offline-inventory-detail-label">CATEGORY</div>

                <div className="offline-inventory-detail-value">
                  {selectedItem.category}
                </div>
              </div>

              {/* CURRENT STOCK */}

              <div className="offline-inventory-detail-field">
                <div className="offline-inventory-detail-label">
                  CURRENT STOCK
                </div>

                <div className="offline-inventory-detail-value offline-inventory-detail-stock">
                  {selectedItem.stock}
                </div>
              </div>

              {/* TIME OF UPDATE */}

              <div className="offline-inventory-detail-field">
                <div className="offline-inventory-detail-label">
                  TIME OF UPDATE
                </div>

                <div className="offline-inventory-detail-value">
                  {selectedItem.updateTime || "10:15 AM"}
                </div>
              </div>

              {/* STOCK STATUS */}

              <div className="offline-inventory-detail-field offline-inventory-detail-status-field">
                <div className="offline-inventory-detail-label">
                  STOCK STATUS
                </div>

                <div
                  className={
                    selectedItem.status === "Low Stock"
                      ? "offline-inventory-detail-status offline-inventory-detail-status-low"
                      : "offline-inventory-detail-status offline-inventory-detail-status-good"
                  }
                >
                  {selectedItem.status}
                </div>
              </div>
            </div>

            <div className="offline-inventory-detail-footer">
              <button
                className="offline-inventory-detail-close-button"
                type="button"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="offline-inventory-toast">
          <div className="offline-inventory-toast-icon">✓</div>

          <span className="offline-inventory-toast-text">{toast}</span>

          <button
            className="offline-inventory-toast-close"
            type="button"
            onClick={() => setToast("")}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default OnlineInventory;
