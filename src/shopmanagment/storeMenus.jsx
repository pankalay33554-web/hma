import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../shopmanagmentcss/storeMenus.css";

// MUI Icons
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import EditIcon from "@mui/icons-material/Edit";

const INITIAL_CATEGORIES = [
  { id: "burgers", name: "Burgers" },
  { id: "breads", name: "Fresh Breads" },
  { id: "cakes", name: "Sweet Cakes" },
  { id: "drinks", name: "Cold Drinks" },
];

const INITIAL_MENU_ITEMS = [
  {
    id: 1,
    category: "burgers",
    name: "Beef Burger",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
    hasVariants: true,
    price: 4500,
    quantity: 15,
    variants: [
      { size: "S", price: 4500, quantity: 12 },
      { size: "M", price: 6500, quantity: 15 },
      { size: "L", price: 8000, quantity: 10 },
    ],
  },
  {
    id: 2,
    category: "burgers",
    name: "Cheesy BBQ",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=300&auto=format&fit=crop",
    hasVariants: true,
    price: 8000,
    quantity: 15,
    variants: [
      { size: "M", price: 8000, quantity: 15 },
      { size: "L", price: 9500, quantity: 10 },
    ],
  },
  {
    id: 3,
    category: "burgers",
    name: "Big Monster",
    inStock: false, // OUT OF STOCK
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=300&auto=format&fit=crop",
    hasVariants: true,
    price: 2500,
    quantity: 15,
    variants: [
      { size: "S", price: 2500, quantity: 12 },
      { size: "L", price: 4500, quantity: 10 },
    ],
  },
  {
    id: 4,
    category: "burgers",
    name: "Spicy Crispy",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=300&auto=format&fit=crop",
    hasVariants: true,
    price: 4500,
    quantity: 15,
    variants: [],
  },
  {
    id: 5,
    category: "breads",
    name: "Butter Croissant",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop",
    hasVariants: true,
    price: 3500,
    quantity: 20,
    variants: [],
  },
];

export default function StoreMenus() {
  // Data States
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState("burgers");
  const [selectedSizes, setSelectedSizes] = useState({});

  // File Upload Reference
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Modals Controlling States
  const [modalState, setModalState] = useState({
    addCategory: false,
    editCategory: false,
    deleteCategoryConfirm: false,
    addItem: false,
    editItem: false,
    deleteItemConfirm: false,
  });

  // Target Active Pointers
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);

  // Forms Binding States
  const [categoryForm, setCategoryForm] = useState({ name: "" });
  const [itemForm, setItemForm] = useState({
    name: "",
    category: "",
    inStock: true,
    price: "",
    quantity: "",
    hasVariants: false,
    variants: [{ size: "", price: "", quantity: "" }],
  });

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory,
  );

  // --- Handlers for Image Preview ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // --- Category Operations ---
  const openAddCategory = () => {
    setCategoryForm({ name: "" });
    setModalState((prev) => ({ ...prev, addCategory: true }));
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;
    const newId = categoryForm.name.toLowerCase().replace(/\s+/g, "-");
    setCategories([...categories, { id: newId, name: categoryForm.name }]);
    setModalState((prev) => ({ ...prev, addCategory: false }));
  };

  const openEditCategory = (cat) => {
    setActiveCategoryId(cat.id);
    setCategoryForm({ name: cat.name });
    setModalState((prev) => ({ ...prev, editCategory: true }));
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    setCategories(
      categories.map((cat) =>
        cat.id === activeCategoryId ? { ...cat, name: categoryForm.name } : cat,
      ),
    );
    setModalState((prev) => ({ ...prev, editCategory: false }));
  };

  const handleDeleteCategory = () => {
    setCategories(categories.filter((cat) => cat.id === activeCategoryId));
    setMenuItems(
      menuItems.filter((item) => item.category !== activeCategoryId),
    );
    setModalState((prev) => ({ ...prev, deleteCategoryConfirm: false }));
    if (selectedCategory === activeCategoryId) {
      setSelectedCategory(categories[0]?.id || "");
    }
  };

  // --- Menu Item Operations ---
  const openAddItem = () => {
    setPreviewImage(null);
    setItemForm({
      name: "",
      category: selectedCategory,
      inStock: true,
      price: "",
      quantity: "",
      hasVariants: false,
      variants: [{ size: "", price: "", quantity: "" }],
    });
    setModalState((prev) => ({ ...prev, addItem: true }));
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      category: itemForm.category,
      name: itemForm.name,
      inStock: itemForm.inStock,
      image:
        previewImage ||
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=400&auto=format&fit=crop",
      hasVariants: itemForm.hasVariants,
      price: Number(itemForm.price) || 0,
      quantity: Number(itemForm.quantity) || 0,
      variants: itemForm.hasVariants
        ? itemForm.variants.map((v) => ({
            ...v,
            price: Number(v.price),
            quantity: Number(v.quantity),
          }))
        : [],
    };
    setMenuItems([...menuItems, newItem]);
    setModalState((prev) => ({ ...prev, addItem: false }));
  };

  const openEditItem = (item) => {
    setActiveItemId(item.id);
    setPreviewImage(item.image);
    setItemForm({
      name: item.name,
      category: item.category,
      inStock: item.inStock,
      price: item.price,
      quantity: item.quantity,
      hasVariants: item.hasVariants,
      variants: item.hasVariants
        ? [...item.variants]
        : [{ size: "", price: "", quantity: "" }],
    });
    setModalState((prev) => ({ ...prev, editItem: true }));
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    setMenuItems(
      menuItems.map((item) => {
        if (item.id === activeItemId) {
          return {
            ...item,
            name: itemForm.name,
            category: itemForm.category,
            inStock: itemForm.inStock,
            image: previewImage,
            hasVariants: itemForm.hasVariants,
            price: Number(itemForm.price) || 0,
            quantity: Number(itemForm.quantity) || 0,
            variants: itemForm.hasVariants
              ? itemForm.variants.map((v) => ({
                  ...v,
                  price: Number(v.price),
                  quantity: Number(v.quantity),
                }))
              : [],
          };
        }
        return item;
      }),
    );
    setModalState((prev) => ({ ...prev, editItem: false }));
  };

  const handleDeleteItem = () => {
    setMenuItems(menuItems.filter((item) => item.id !== activeItemId));
    setModalState((prev) => ({ ...prev, deleteItemConfirm: false }));
  };

  // --- Dynamic Rows Inputs Logic ---
  const addAnotherSizeRow = () => {
    setItemForm({
      ...itemForm,
      variants: [...itemForm.variants, { size: "", price: "", quantity: "" }],
    });
  };

  const updateVariantFields = (index, field, value) => {
    const freshRows = [...itemForm.variants];
    freshRows[index][field] = value;
    setItemForm({ ...itemForm, variants: freshRows });
  };

  const removeVariantRow = (index) => {
    const freshRows = itemForm.variants.filter((_, idx) => idx !== index);
    setItemForm({
      ...itemForm,
      variants: freshRows.length
        ? freshRows
        : [{ size: "", price: "", quantity: "" }],
    });
  };

  return (
    <div className="store-menus-wrapper">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* Top Navigation */}
      <header className="sales-top-bar">
        <div className="top-title-area">
          <h1>Store Menus</h1>
          <span className="badge-shop">Burger Shop 1</span>
        </div>
        <div className="user-profile">
          <div className="profile-divider"></div>
          <div className="profile-text">
            <span className="role">Executive Manager</span>
            <span className="name">HEIN MIN AUNG</span>
          </div>
        </div>
      </header>

      <div className="menu-body-container">
        {/* Categories Pills Row */}
        <section className="categories-section">
          <div className="section-header">
            <h2>
              Menu Categories{" "}
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "400",
                  color: "#888",
                }}
              >
                (Double click to edit)
              </span>
            </h2>
            <button className="add-category-btn" onClick={openAddCategory}>
              + Add Category
            </button>
          </div>
          <div className="categories-scroll-wrapper">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill-btn ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
                onDoubleClick={() => openEditCategory(cat)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        <hr className="menu-section-divider" />

        {/* Menu Items Grid Row */}
        <section className="items-section">
          <div className="section-header">
            <h2>Menu Items List</h2>
            <button className="add-item-btn" onClick={openAddItem}>
              + Add Menu Item
            </button>
          </div>

          <div className="menu-items-grid">
            {filteredItems.map((item) => {
              const sizes =
                item.hasVariants && item.variants && item.variants.length > 0
                  ? item.variants.map((v) => v.size)
                  : ["Normal"];
              const currentSize = selectedSizes[item.id] || sizes[0];
              const variantObj = item.variants.find(
                (v) => v.size === currentSize,
              );
              const displayPrice = item.hasVariants
                ? variantObj
                  ? variantObj.price
                  : item.price
                : item.price;

              return (
                <div
                  key={item.id}
                  className="menu-item-card"
                  onClick={() => openEditItem(item)}
                >
                  <div className="card-image-wrapper">
                    <img src={item.image} alt={item.name} />
                    <span
                      className={`stock-badge ${item.inStock ? "in-stock" : "out-of-stock"}`}
                    >
                      {item.inStock ? "● IN STOCK" : "● OUT OF STOCK"}
                    </span>
                  </div>
                  <div className="card-info-area">
                    <div className="title-price-row">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">
                        {displayPrice.toLocaleString()} Ks
                      </span>
                    </div>
                    {item.hasVariants && (
                      <div
                        className="sizes-btn-row"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {sizes.map((size) => (
                          <button
                            key={size}
                            className={`size-toggle-btn ${currentSize === size ? "selected" : ""}`}
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [item.id]: size,
                              }))
                            }
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ================= 🌟 ၁။ ADD CATEGORY MODAL ================= */}
      {modalState.addCategory && (
        <div
          className="menu-modal-overlay"
          onClick={() =>
            setModalState((prev) => ({ ...prev, addCategory: false }))
          }
        >
          <div
            className="category-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-modal-header">
              <h2>Add New Menu Category</h2>
              <button
                className="menu-modal-close-icon"
                onClick={() =>
                  setModalState((prev) => ({ ...prev, addCategory: false }))
                }
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateCategory}>
              <div className="menu-modal-body">
                <div className="menu-form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Classic Burger"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="menu-modal-footer">
                <button
                  type="button"
                  className="menu-cancel-btn"
                  onClick={() =>
                    setModalState((prev) => ({ ...prev, addCategory: false }))
                  }
                >
                  Cancel
                </button>
                <button type="submit" className="menu-submit-btn">
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 🌟 ၂။ EDIT CATEGORY MODAL ================= */}
      {modalState.editCategory && (
        <div
          className="menu-modal-overlay"
          onClick={() =>
            setModalState((prev) => ({ ...prev, editCategory: false }))
          }
        >
          <div
            className="category-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-modal-header">
              <h2>Edit Menu Category</h2>
              <button
                className="menu-modal-close-icon"
                onClick={() =>
                  setModalState((prev) => ({ ...prev, editCategory: false }))
                }
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleUpdateCategory}>
              <div className="menu-modal-body">
                <div className="menu-form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="menu-modal-footer space-between-footer">
                <button
                  type="button"
                  className="menu-delete-trigger-btn"
                  onClick={() =>
                    setModalState({
                      ...modalState,
                      editCategory: false,
                      deleteCategoryConfirm: true,
                    })
                  }
                >
                  <DeleteOutlineIcon className="small-icon" /> Delete Category
                </button>
                <div className="footer-right-cluster">
                  <button
                    type="button"
                    className="menu-cancel-btn"
                    onClick={() =>
                      setModalState((prev) => ({
                        ...prev,
                        editCategory: false,
                      }))
                    }
                  >
                    Cancel
                  </button>
                  <button type="submit" className="menu-submit-btn">
                    UpdateChanges
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 🌟 ၃။ CONFIRM DELETE CATEGORY ================= */}
      {modalState.deleteCategoryConfirm && (
        <div className="menu-modal-overlay">
          <div className="alert-confirm-modal-box">
            <div className="alert-circle-icon-wrapper">
              <ErrorOutlineIcon className="alert-danger-svg" />
            </div>
            <h3>Delete Menu Category?</h3>
            <p>Are you sure you want to delete ?</p>
            <div className="alert-actions-row">
              <button
                className="alert-cancel"
                onClick={() =>
                  setModalState({
                    ...modalState,
                    deleteCategoryConfirm: false,
                    editCategory: true,
                  })
                }
              >
                Cancel
              </button>
              <button
                className="alert-delete-execute"
                onClick={handleDeleteCategory}
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 🌟 ၄။ ADD MENU ITEM MODAL ================= */}
      {modalState.addItem && (
        <div
          className="menu-modal-overlay"
          onClick={() => setModalState((prev) => ({ ...prev, addItem: false }))}
        >
          <div
            className="item-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-modal-header">
              <h2>Add New Menu Item</h2>
              <button
                className="menu-modal-close-icon"
                onClick={() =>
                  setModalState((prev) => ({ ...prev, addItem: false }))
                }
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateItem}>
              <div className="menu-modal-body scrolled-body">
                <div className="menu-form-row">
                  <div className="menu-form-group">
                    <label>Menu Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Classic Burger"
                      value={itemForm.name}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="menu-form-group">
                    <label>Category</label>
                    <select
                      value={itemForm.category}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, category: e.target.value })
                      }
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="menu-form-group">
                  <label>Menu Image</label>
                  <div
                    className="image-upload-dashed-box"
                    onClick={triggerFileSelect}
                  >
                    {previewImage ? (
                      <div className="image-preview-wrapper-inside">
                        <img
                          src={previewImage}
                          alt="preview"
                          className="uploaded-temporary-preview"
                        />
                        <button
                          type="button"
                          className="replace-image-pill-btn"
                        >
                          Replace Image
                        </button>
                      </div>
                    ) : (
                      <>
                        <CloudUploadOutlinedIcon className="upload-icon" />
                        <span>Click or drag to upload menu image</span>
                      </>
                    )}
                  </div>
                </div>

                {!itemForm.hasVariants && (
                  <div className="menu-form-row fade-in-effect">
                    <div className="menu-form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        placeholder="4,500"
                        value={itemForm.price}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, price: e.target.value })
                        }
                      />
                    </div>
                    <div className="menu-form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        placeholder="number"
                        value={itemForm.quantity}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, quantity: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="switch-control-row">
                  <span>
                    This item has multiple sizes/variants (e.g., S, M, L)
                  </span>
                  <label className="toggle-switch-container">
                    <input
                      type="checkbox"
                      checked={itemForm.hasVariants}
                      onChange={(e) =>
                        setItemForm({
                          ...itemForm,
                          hasVariants: e.target.checked,
                        })
                      }
                    />
                    <span className="toggle-slider-round"></span>
                  </label>
                </div>

                {itemForm.hasVariants && (
                  <div className="multi-variant-box-replacement fade-in-effect">
                    <div className="variant-table-header-row">
                      <span>Sizes</span>
                      <span>Selling Price (Ks)</span>
                      <span>Quantity</span>
                    </div>
                    <div className="variant-rows-wrapper">
                      {itemForm.variants.map((row, idx) => (
                        <div key={idx} className="variant-inputs-fields-row">
                          <input
                            type="text"
                            placeholder="Small"
                            value={row.size}
                            onChange={(e) =>
                              updateVariantFields(idx, "size", e.target.value)
                            }
                          />
                          <input
                            type="number"
                            placeholder="4500"
                            value={row.price}
                            onChange={(e) =>
                              updateVariantFields(idx, "price", e.target.value)
                            }
                          />
                          <div className="quantity-with-trash-wrapper">
                            <input
                              type="number"
                              placeholder="12"
                              value={row.quantity}
                              onChange={(e) =>
                                updateVariantFields(
                                  idx,
                                  "quantity",
                                  e.target.value,
                                )
                              }
                            />
                            <DeleteOutlineIcon
                              className="inline-trash-btn-svg"
                              onClick={() => removeVariantRow(idx)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="add-another-size-text-btn"
                      onClick={addAnotherSizeRow}
                    >
                      + Add Another Size
                    </button>
                  </div>
                )}
              </div>
              <div className="menu-modal-footer">
                <button
                  type="button"
                  className="menu-cancel-btn"
                  onClick={() =>
                    setModalState((prev) => ({ ...prev, addItem: false }))
                  }
                >
                  Cancel
                </button>
                <button type="submit" className="menu-submit-btn">
                  Create Menu Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 🌟 ၅။ EDIT MENU ITEM MODAL ================= */}
      {modalState.editItem && (
        <div
          className="menu-modal-overlay"
          onClick={() =>
            setModalState((prev) => ({ ...prev, editItem: false }))
          }
        >
          <div
            className="item-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-modal-header">
              <h2>Edit Menu Item</h2>
              <button
                className="menu-modal-close-icon"
                onClick={() =>
                  setModalState((prev) => ({ ...prev, editItem: false }))
                }
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleUpdateItem}>
              <div className="menu-modal-body scrolled-body">
                {/* Availability Toggle */}
                <div className="availability-status-banner-row">
                  <span>Item Availability Status</span>
                  <div className="status-toggle-cluster">
                    <span
                      className={`status-text-label ${itemForm.inStock ? "active-green" : ""}`}
                    >
                      {itemForm.inStock ? "IN STOCK" : "OUT OF STOCK"}
                    </span>
                    <label className="toggle-switch-container">
                      <input
                        type="checkbox"
                        checked={itemForm.inStock}
                        onChange={(e) =>
                          setItemForm({
                            ...itemForm,
                            inStock: e.target.checked,
                          })
                        }
                      />
                      <span className="toggle-slider-round"></span>
                    </label>
                  </div>
                </div>

                <div className="menu-form-row">
                  <div className="menu-form-group">
                    <label>Menu Name</label>
                    <input
                      type="text"
                      value={itemForm.name}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="menu-form-group">
                    <label>Category</label>
                    <select
                      value={itemForm.category}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, category: e.target.value })
                      }
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="menu-form-group">
                  <label>Menu Image</label>
                  <div
                    className="image-upload-dashed-box"
                    onClick={triggerFileSelect}
                  >
                    <div className="image-preview-wrapper-inside">
                      <img
                        src={
                          previewImage ||
                          "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=400&auto=format&fit=crop"
                        }
                        alt="preview"
                        className="uploaded-temporary-preview"
                      />
                      <div className="replace-text-side-info">
                        <button
                          type="button"
                          className="replace-image-pill-btn"
                        >
                          <EditIcon style={{ fontSize: 14 }} /> Replace Image
                        </button>
                        <span className="rec-text">
                          Recommended size: 1200x800px. Max 2MB.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {!itemForm.hasVariants && (
                  <div className="menu-form-row fade-in-effect">
                    <div className="menu-form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        value={itemForm.price}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, price: e.target.value })
                        }
                      />
                    </div>
                    <div className="menu-form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        value={itemForm.quantity}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, quantity: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="switch-control-row">
                  <span>
                    This item has multiple sizes/variants (e.g., S, M, L)
                  </span>
                  <label className="toggle-switch-container">
                    <input
                      type="checkbox"
                      checked={itemForm.hasVariants}
                      onChange={(e) =>
                        setItemForm({
                          ...itemForm,
                          hasVariants: e.target.checked,
                        })
                      }
                    />
                    <span className="toggle-slider-round"></span>
                  </label>
                </div>

                {itemForm.hasVariants && (
                  <div className="multi-variant-box-replacement fade-in-effect">
                    <div className="variant-table-header-row">
                      <span>Sizes</span>
                      <span>Selling Price (Ks)</span>
                      <span>Quantity</span>
                    </div>
                    <div className="variant-rows-wrapper">
                      {itemForm.variants.map((row, idx) => (
                        <div key={idx} className="variant-inputs-fields-row">
                          <input
                            type="text"
                            placeholder="Size"
                            value={row.size}
                            onChange={(e) =>
                              updateVariantFields(idx, "size", e.target.value)
                            }
                          />
                          <input
                            type="number"
                            placeholder="Price"
                            value={row.price}
                            onChange={(e) =>
                              updateVariantFields(idx, "price", e.target.value)
                            }
                          />
                          <div className="quantity-with-trash-wrapper">
                            <input
                              type="number"
                              placeholder="Qty"
                              value={row.quantity}
                              onChange={(e) =>
                                updateVariantFields(
                                  idx,
                                  "quantity",
                                  e.target.value,
                                )
                              }
                            />
                            <DeleteOutlineIcon
                              className="inline-trash-btn-svg"
                              onClick={() => removeVariantRow(idx)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="add-another-size-text-btn"
                      onClick={addAnotherSizeRow}
                    >
                      + Add Another Size
                    </button>
                  </div>
                )}
              </div>

              <div className="menu-modal-footer space-between-footer">
                <button
                  type="button"
                  className="menu-delete-trigger-btn"
                  onClick={() =>
                    setModalState({
                      ...modalState,
                      editItem: false,
                      deleteItemConfirm: true,
                    })
                  }
                >
                  <DeleteOutlineIcon className="small-icon" /> Delete Menu Item
                </button>
                <div className="footer-right-cluster">
                  <button
                    type="button"
                    className="menu-cancel-btn"
                    onClick={() =>
                      setModalState((prev) => ({ ...prev, editItem: false }))
                    }
                  >
                    Cancel
                  </button>
                  <button type="submit" className="menu-submit-btn">
                    UpdateChanges
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 🌟 ၆။ CONFIRM DELETE MENU ITEM ================= */}
      {modalState.deleteItemConfirm && (
        <div className="menu-modal-overlay">
          <div className="alert-confirm-modal-box">
            <div className="alert-circle-icon-wrapper">
              <ErrorOutlineIcon className="alert-danger-svg" />
            </div>
            <h3>Delete Menu Item?</h3>
            <p>Are you sure you want to delete ?</p>
            <div className="alert-actions-row">
              <button
                className="alert-cancel"
                onClick={() =>
                  setModalState({
                    ...modalState,
                    deleteItemConfirm: false,
                    editItem: true,
                  })
                }
              >
                Cancel
              </button>
              <button
                className="alert-delete-execute"
                onClick={handleDeleteItem}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
