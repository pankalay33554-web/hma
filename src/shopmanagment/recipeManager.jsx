import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ReplayIcon from "@mui/icons-material/Replay";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import "../shopmanagmentcss/recipeManager.css";

// Production page Mock data
const MENU_DATA = {
  1: { name: "Beef Burger", variants: ["Small", "Medium", "Large"] },
  2: { name: "Honey Cake", variants: ["Medium", "Large"] },
  3: { name: "Mini Cookies", variants: ["Small", "Large"] },
  4: { name: "Artisan Croissant", variants: [] },
};

// 🎯 Mock Inventory Stock & Unit Data Mapping
const INVENTORY_ITEMS = [
  { name: "Flour", unit: "g", stock: 5000 },
  { name: "Beef Patty", unit: "pcs", stock: 100 },
  { name: "Cheddar Cheese", unit: "slices", stock: 200 },
  { name: "Lettuce", unit: "g", stock: 2000 },
  { name: "Sauce", unit: "ml", stock: 1500 },
];

const SIZE_LABELS = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "Extra Large",
};

export default function RecipeManager() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const itemName = location.state?.itemName || "Beef Burger";
  const sizesList = location.state?.sizes || ["Normal"];
  const defaultSize = location.state?.selectedSize || sizesList[0];

  // Menu Item Info
  const menuItem = MENU_DATA[id] || { name: "Unknown Item", variants: [] };

  const [history, setHistory] = useState([
    {
      id: "#PRD-005",
      name: menuItem.name,
      size: "Large",
      date: "27 Jun 2026",
      time: "04:30 PM",
      totalResults: "15 pcs",
      successResults: "13 pcs",
      failResults: "2 pcs",
      timeTaken: "45 Mins",
      ingredients: "Flour, Beef Patty, Lettuce, Sauce, Cheese",
      detailedIngs: [
        { name: "Flour", qty: "500 g" },
        { name: "Beef Patty", qty: "10 pcs" },
        { name: "Cheddar Cheese", qty: "10 slices" },
        { name: "Lettuce", qty: "200 g" },
        { name: "Sauce", qty: "150 ml" },
      ],
    },
    {
      id: "#PRD-004",
      name: menuItem.name,
      size: "Medium",
      date: "27 Jun 2026",
      time: "10:15 AM",
      totalResults: "10 pcs",
      successResults: "8 pcs",
      failResults: "2 pcs",
      timeTaken: "45 Mins",
      ingredients: "Flour, Beef Patty, Lettuce, Sauce, Cheese",
      detailedIngs: [
        { name: "Flour", qty: "500 g" },
        { name: "Beef Patty", qty: "10 pcs" },
        { name: "Cheddar Cheese", qty: "10 slices" },
        { name: "Lettuce", qty: "200 g" },
        { name: "Sauce", qty: "150 ml" },
      ],
    },
    {
      id: "#PRD-003",
      name: menuItem.name,
      size: "Small",
      date: "26 Jun 2026",
      time: "11:00 AM",
      totalResults: "20 pcs",
      successResults: "18 pcs",
      failResults: "2 pcs",
      timeTaken: "30 Mins",
      ingredients: "Flour, Sauce, Cheese",
      detailedIngs: [
        { name: "Flour", qty: "300 g" },
        { name: "Sauce", qty: "100 ml" },
        { name: "Cheddar Cheese", qty: "5 slices" },
      ],
    },
    {
      id: "#PRD-002",
      name: menuItem.name,
      size: "Large",
      date: "25 Jun 2026",
      time: "02:15 PM",
      totalResults: "12 pcs",
      successResults: "8 pcs",
      failResults: "4 pcs",
      timeTaken: "45 Mins",
      ingredients: "Flour, Beef Patty, Cheese",
      detailedIngs: [
        { name: "Flour", qty: "500 g" },
        { name: "Beef Patty", qty: "12 pcs" },
        { name: "Cheddar Cheese", qty: "12 slices" },
      ],
    },
    {
      id: "#PRD-001",
      name: menuItem.name,
      size: "Medium",
      date: "24 Jun 2026",
      time: "09:00 AM",
      totalResults: "8 pcs",
      successResults: "8 pcs",
      failResults: "0 pcs",
      timeTaken: "40 Mins",
      ingredients: "Flour, Beef Patty, Lettuce",
      detailedIngs: [
        { name: "Flour", qty: "400 g" },
        { name: "Beef Patty", qty: "8 pcs" },
        { name: "Lettuce", qty: "150 g" },
      ],
    },
    {
      id: "#PRD-000",
      name: menuItem.name,
      size: "Small",
      date: "23 Jun 2026",
      time: "05:00 PM",
      totalResults: "20 pcs",
      successResults: "18 pcs",
      failResults: "2 pcs",
      timeTaken: "35 Mins",
      ingredients: "Flour, Sauce",
      detailedIngs: [
        { name: "Flour", qty: "600 g" },
        { name: "Sauce", qty: "200 ml" },
      ],
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalBatchesCount = 124;

  //  Slice
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = history.slice(indexOfFirstRow, indexOfLastRow);

  // Modal Details Box State
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [prodTime, setProdTime] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const [successResults, setSuccessResults] = useState("");
  const [failResults, setFailResults] = useState("");

  // Ingredients List State (Unit and Error tracking added)
  const [ingredients, setIngredients] = useState([
    { id: Date.now(), item: "", quantity: "", unit: "", error: "" },
  ]);

  //  Refresh Function
  const handleRefresh = () => {
    setSelectedSize(sizesList[0]);
    setProdTime("");
    setTotalResults("");
    setSuccessResults("");
    setFailResults("");
    setIngredients([
      { id: Date.now(), item: "", quantity: "", unit: "", error: "" },
    ]);
  };

  //  Add Ingredient Rows
  const addIngredientRow = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now(), item: "", quantity: "", unit: "", error: "" },
    ]);
  };

  //  Remove Ingredient Row
  const removeIngredientRow = (rowId) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== rowId));
    }
  };

  //  Ingredient Item
  const handleIngChange = (rowId, field, value) => {
    setIngredients(
      ingredients.map((ing) => {
        if (ing.id === rowId) {
          const updated = { ...ing, [field]: value };

          // 1. Select Ingredient
          if (field === "item") {
            const matchedItem = INVENTORY_ITEMS.find(
              (inv) => inv.name === value,
            );
            updated.unit = matchedItem ? matchedItem.unit : "";

            updated.error = "";
          }

          // 2. Check Quantity
          const currentItemName = field === "item" ? value : ing.item;
          const currentQty = field === "quantity" ? value : ing.quantity;
          const matchedInv = INVENTORY_ITEMS.find(
            (inv) => inv.name === currentItemName,
          );

          if (matchedInv && currentQty !== "") {
            const numQty = parseFloat(currentQty);
            if (isNaN(numQty) || numQty <= 0) {
              updated.error = "Invalid quantity";
            } else if (numQty > matchedInv.stock) {
              updated.error = `Max stock available: ${matchedInv.stock} ${matchedInv.unit}`;
            } else {
              updated.error = "";
            }
          } else {
            updated.error = "";
          }

          return updated;
        }
        return ing;
      }),
    );
  };

  // location.state
  useEffect(() => {
    if (sizesList && sizesList.length > 0) {
      setSelectedSize(sizesList[0]);
    }
  }, [location.state]);

  // 💾 Save Recipe Function
  const handleSaveRecipe = (e) => {
    e.preventDefault();

    // Any Quantity Error check
    const hasError = ingredients.some((ing) => ing.error !== "");
    if (hasError) {
      alert(
        "အချို့ Ingredient ပမာဏများသည် Stock ထက် ကျော်လွန်နေပါသည်! ကျေးဇူးပြု၍ ပြန်စစ်ပေးပါ။",
      );
      return;
    }

    try {
      const currentItemName =
        typeof menuItem !== "undefined" ? menuItem.name : "Beef Burger";

      const currentSize =
        typeof selectedSize !== "undefined" ? selectedSize : "Medium";

      const currentProdTime = prodTime || "0";
      const currentTotal = totalResults || "0";
      const currentSuccess = successResults || "0";
      const currentFail = failResults || "0";

      const newBatch = {
        id: `#PRD-${String(history.length + 1).padStart(3, "0")}`,
        name: currentItemName,
        size: currentSize,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timeTaken: `${currentProdTime} Mins`,

        totalResults: `${currentTotal} pcs`,
        successResults: `${currentSuccess} pcs`,
        failResults: `${currentFail} pcs`,

        ingredients:
          ingredients && ingredients.length > 0
            ? ingredients
                .map((ing) => ing.item)
                .filter(Boolean)
                .join(", ")
            : "",

        detailedIngs:
          ingredients && ingredients.length > 0
            ? ingredients
                .filter((ing) => ing.item && ing.item !== "")
                .map((ing) => ({
                  name: ing.item,
                  qty: `${ing.quantity || 0} ${ing.unit}`,
                }))
            : [],
      };

      setHistory([newBatch, ...history]);

      if (typeof setCurrentPage === "function") {
        setCurrentPage(1);
      }

      if (typeof setProdTime === "function") setProdTime("");
      if (typeof setTotalResults === "function") setTotalResults("");
      if (typeof setSuccessResults === "function") setSuccessResults("");
      if (typeof setFailResults === "function") setFailResults("");
      if (typeof setIngredients === "function") {
        setIngredients([
          { id: Date.now(), item: "", quantity: "", unit: "", error: "" },
        ]);
      }

      console.log("Successfully saved batch:", newBatch);
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("တစ်ခုခု လွဲမှားနေပါသည်- " + error.message);
    }
  };

  return (
    <div className="recipe-manager-container">
      {/* 🎯 Top Bar with Back Arrow */}
      <div className="recipe-top-bar">
        <button className="back-arrow-btn" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon className="back-icon" />
        </button>
        <h2>Production & Recipe Manager</h2>
      </div>

      {/* 🎯 Configure Recipe Manager Box */}
      <div className="recipe-body-container">
        <div className="manager-card-box">
          <div className="box-header">
            <h3>Configure Recipe Manager</h3>
            <div className="box-header-actions">
              <span className="draft-badge">DRAFT MODE</span>
              <button
                className="refresh-action-btn"
                onClick={handleRefresh}
                title="Reset Form"
              >
                <ReplayIcon />
              </button>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Item Name</label>
              <input type="text" value={itemName} readOnly />
            </div>
            <div className="form-group">
              <label>Select Size/Variant</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizesList.map((size) => (
                  <option key={size} value={size}>
                    {SIZE_LABELS[size] || size}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Estimated Production Time</label>
              <div className="unit-input-wrapper">
                <input
                  type="number"
                  value={prodTime}
                  onChange={(e) => setProdTime(e.target.value)}
                />
                <span className="input-unit">Mins</span>
              </div>
            </div>

            <div className="form-group">
              <label>Total Results</label>
              <div className="unit-input-wrapper">
                <input
                  type="number"
                  value={totalResults}
                  onChange={(e) => setTotalResults(e.target.value)}
                />
                <span className="input-unit">pcs</span>
              </div>
            </div>

            <div className="form-group">
              <label>Success Results</label>
              <div className="unit-input-wrapper">
                <input
                  type="number"
                  value={successResults}
                  onChange={(e) => setSuccessResults(e.target.value)}
                />
                <span className="input-unit">pcs</span>
              </div>
            </div>

            <div className="form-group">
              <label>Fail Results</label>
              <div className="unit-input-wrapper">
                <input
                  type="number"
                  value={failResults}
                  onChange={(e) => setFailResults(e.target.value)}
                />
                <span className="input-unit">pcs</span>
              </div>
            </div>
          </div>

          {/*  Ingredients Section */}
          <div className="ingredients-section">
            <h4>Ingredients (Bill of Materials)</h4>
            <div className="ingredients-dashed-box">
              {ingredients.map((ing) => (
                <div key={ing.id} style={{ marginBottom: "8px" }}>
                  <div
                    className="ingredient-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {/* 1. Select Dropdown Box */}
                    <select
                      value={ing.item}
                      onChange={(e) =>
                        handleIngChange(ing.id, "item", e.target.value)
                      }
                      className={`ingredient-dropdown ${
                        ing.item === "" ? "placeholder-active" : ""
                      }`}
                      style={{ flex: 2 }}
                    >
                      <option value="" disabled hidden>
                        Select Ingredient
                      </option>

                      {INVENTORY_ITEMS.map((inv) => (
                        <option key={inv.name} value={inv.name}>
                          {inv.name}
                        </option>
                      ))}
                    </select>

                    {/* 2. Manual Quantity Input Box */}
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={ing.quantity}
                      onChange={(e) =>
                        handleIngChange(ing.id, "quantity", e.target.value)
                      }
                      className="quantity-input"
                      style={{
                        flex: 1,
                        borderColor: ing.error ? "#dc2626" : "",
                      }}
                    />

                    {/* 3. Automatic Unit Display Box (Read-only) */}
                    <input
                      type="text"
                      placeholder="Unit"
                      value={ing.unit}
                      readOnly
                      className="readonly-input"
                      style={{
                        flex: 0.8,
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #e2d8c9",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontWeight: "500",
                        height: "40px",
                      }}
                    />

                    {/* 4. Delete Row Button */}
                    <button
                      className="delete-row-btn"
                      onClick={() => removeIngredientRow(ing.id)}
                      disabled={ingredients.length === 1}
                      type="button"
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>

                  {/* Stock Exceeded Validation Warning Text */}
                  {ing.error && (
                    <span
                      style={{
                        color: "#dc2626",
                        fontSize: "0.78rem",
                        marginTop: "2px",
                        display: "block",
                        paddingLeft: "4px",
                      }}
                    >
                      ⚠️ {ing.error}
                    </span>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="add-ingredient-link"
                onClick={addIngredientRow}
              >
                <AddCircleOutlineIcon className="add-icon" /> Add Ingredient
              </button>
            </div>
          </div>

          <div className="box-footer-actions">
            <button
              type="submit"
              className="save-recipe-btn"
              onClick={handleSaveRecipe}
            >
              <SaveIcon className="save-icon" /> Save Recipe
            </button>
          </div>
        </div>

        {/* 🎯 Production History Table Box */}
        <div className="manager-card-box table-box-margin">
          <div className="box-header">
            <div className="table-title-group">
              <h3 className="table-heading">Production History</h3>
            </div>
            <button className="export-btn">
              <FileDownloadIcon className="export-icon" /> Export
            </button>
          </div>

          <div className="table-responsive-wrapper">
            <table className="production-history-table">
              <thead>
                <tr>
                  <th>BATCH ID</th>
                  <th>ITEM NAME</th>
                  <th>SIZE</th>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>SUCCESS RESULTS</th>
                  <th>INGREDIENTS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td className="bold-text">{row.name}</td>
                    <td>{row.size}</td>
                    <td>{row.date}</td>
                    <td>{row.time}</td>
                    <td>{row.successResults}</td>
                    <td className="truncate-cell" title={row.ingredients}>
                      {row.ingredients}
                    </td>
                    <td>
                      <button
                        className="view-details-btn"
                        onClick={() => setSelectedBatch(row)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🎯 Pagination Section */}
          <div className="table-pagination-footer">
            <span className="pagination-info">
              Showing {indexOfFirstRow + 1}-
              {Math.min(indexOfLastRow, history.length)} of {totalBatchesCount}{" "}
              batches
            </span>
            <div className="pagination-controls">
              <button
                className="pag-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <button
                className={`pag-btn ${currentPage === 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className={`pag-btn ${currentPage === 2 ? "active" : ""}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button className="pag-btn" onClick={() => setCurrentPage(3)}>
                3
              </button>
              <button
                className="pag-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 3))}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* 🎯 View Details Modal Card Box */}
        {selectedBatch && (
          <div className="modal-overlay-backdrop">
            <div className="recipe-details-modal-card">
              <div className="modal-card-header">
                <h3>Production Batch Details</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedBatch(null)}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="modal-card-split-body">
                {/* Main Info */}
                <div className="modal-left-info-column">
                  <div className="modal-info-row-item">
                    <span className="info-label-text">BATCH ID:</span>
                    <span className="batch-id-pill-badge">
                      {selectedBatch.id}
                    </span>
                  </div>
                  <div className="modal-info-row-item">
                    <span className="info-label-text">Item Name:</span>
                    <span className="info-value-text bold-text">
                      {selectedBatch.name}
                    </span>
                  </div>
                  <div className="modal-info-row-item">
                    <span className="info-label-text">Size:</span>
                    <span className="info-value-text">
                      {selectedBatch.size}
                    </span>
                  </div>
                  <div className="modal-info-row-item">
                    <span className="info-label-text">Date:</span>
                    <span className="info-value-text">
                      {selectedBatch.date}
                    </span>
                  </div>
                  <div className="modal-info-row-item">
                    <span className="info-label-text">Time:</span>
                    <span className="info-value-text">
                      {selectedBatch.time}
                    </span>
                  </div>
                  <p className="modal-info-row-item">
                    <span className="info-label-text">Production Time:</span>
                    <span className="info-value-text">
                      {selectedBatch.timeTaken}
                    </span>{" "}
                  </p>

                  <div className="modal-results-summary-block">
                    <div className="result-sub-item">
                      <span className="result-sub-label">Total Results:</span>
                      <span className="result-sub-value total-color">
                        {selectedBatch.totalResults}
                      </span>
                    </div>
                    <div className="result-sub-item">
                      <span className="result-sub-label">Success Results:</span>
                      <span className="result-sub-value success-color">
                        {selectedBatch.successResults}
                      </span>
                    </div>
                    <div className="result-sub-item">
                      <span className="result-sub-label">Fail Results:</span>
                      <span className="result-sub-value fail-color">
                        {selectedBatch.failResults}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ingredients Used Table List */}
                <div className="modal-right-ingredients-column">
                  <h4 className="ingredients-list-heading-title">
                    INGREDIENTS USED (BOM)
                  </h4>
                  <div className="modal-ingredients-custom-table-list">
                    {(selectedBatch.detailedIngs || []).map((ing, i) => (
                      <div key={i} className="modal-ingredient-table-row">
                        <span className="ing-name-label">{ing.name}</span>
                        <span className="ing-qty-value">{ing.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-card-footer-action-block">
                <button
                  className="modal-action-close-btn"
                  onClick={() => setSelectedBatch(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
