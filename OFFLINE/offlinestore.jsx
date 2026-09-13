import { useState } from "react";
import {
  Add,
  Close,
  Inventory2,
  Person,
  CheckCircle,
  RemoveCircle,
  LocalDrink,
  BakeryDining,
  LunchDining,
} from "@mui/icons-material";
import "./offlinestore.css";

const initialCategories = [
  "Burgers",
  "Fresh Breads",
  "Cold Drinks",
  "Pastries",
];

const initialItems = [
  {
    id: 1,
    name: "Beef Burger",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    sizes: {
      S: {
        price: 3500,
        stock: true,
      },
      M: {
        price: 4500,
        stock: true,
      },
      L: {
        price: 5500,
        stock: false,
      },
    },
  },
  {
    id: 2,
    name: "Cheesy BBQ",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=700&q=80",
    sizes: {
      S: {
        price: 6500,
        stock: true,
      },
      M: {
        price: 8000,
        stock: true,
      },
      L: {
        price: 9500,
        stock: true,
      },
    },
  },
  {
    id: 3,
    name: "Big Monster",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
    sizes: {
      S: {
        price: 2500,
        stock: false,
      },
      M: {
        price: 4500,
        stock: false,
      },
      L: {
        price: 6500,
        stock: false,
      },
    },
  },
  {
    id: 4,
    name: "Spicy Crispy",
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1619881600757-1f6a4f3e6e0d?auto=format&fit=crop&w=700&q=80",
    sizes: {
      Normal: {
        price: 4500,
        stock: true,
      },
    },
  },
  {
    id: 5,
    name: "Garlic Bread",
    category: "Fresh Breads",
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=700&q=80",
    sizes: {
      S: {
        price: 2500,
        stock: true,
      },
      M: {
        price: 3000,
        stock: true,
      },
      L: {
        price: 3500,
        stock: false,
      },
    },
  },
  {
    id: 6,
    name: "Fresh Milk",
    category: "Cold Drinks",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80",
    sizes: {
      S: {
        price: 2000,
        stock: true,
      },
      M: {
        price: 2500,
        stock: true,
      },
      L: {
        price: 3000,
        stock: true,
      },
    },
  },
  {
    id: 7,
    name: "Chocolate Pastry",
    category: "Pastries",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80",
    sizes: {
      Normal: {
        price: 3500,
        stock: true,
      },
    },
  },
];

const categoryIcons = {
  Burgers: <LunchDining />,
  "Fresh Breads": <BakeryDining />,
  "Cold Drinks": <LocalDrink />,
  Pastries: <BakeryDining />,
};

const createEmptySizes = () => ({
  S: {
    enabled: true,
    price: "",
    stock: true,
  },
  M: {
    enabled: true,
    price: "",
    stock: true,
  },
  L: {
    enabled: true,
    price: "",
    stock: true,
  },
  Normal: {
    enabled: false,
    price: "",
    stock: true,
  },
});

function OfflineStore() {
  const [categories, setCategories] = useState(initialCategories);
  const [items, setItems] = useState(initialItems);

  const [activeCategory, setActiveCategory] = useState("Burgers");

  const [selectedSizes, setSelectedSizes] = useState({});

  const [categoryPopup, setCategoryPopup] = useState(false);
  const [itemPopup, setItemPopup] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  const [itemForm, setItemForm] = useState({
    name: "",
    category: "Burgers",
    image: "",
    sizes: createEmptySizes(),
  });

  const filteredItems = items.filter(
    (item) => item.category === activeCategory,
  );

  const getSelectedSize = (item) => {
    const availableSizes = Object.keys(item.sizes).filter(
      (size) => item.sizes[size].stock,
    );

    if (availableSizes.length === 0) {
      return Object.keys(item.sizes)[0];
    }

    if (selectedSizes[item.id] && item.sizes[selectedSizes[item.id]]?.stock) {
      return selectedSizes[item.id];
    }

    return availableSizes[0];
  };

  const handleSelectSize = (itemId, size, stock) => {
    if (!stock) return;

    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const handleAddCategory = () => {
    const newCategory = categoryName.trim();

    if (!newCategory) return;

    const exists = categories.some(
      (category) => category.toLowerCase() === newCategory.toLowerCase(),
    );

    if (exists) return;

    setCategories((prev) => [...prev, newCategory]);
    setCategoryName("");
    setCategoryPopup(false);
    setActiveCategory(newCategory);
  };

  const handleItemChange = (field, value) => {
    setItemForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSizeChange = (size, field, value) => {
    setItemForm((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: {
          ...prev.sizes[size],
          [field]: value,
        },
      },
    }));
  };

  const toggleFormSize = (size) => {
    setItemForm((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: {
          ...prev.sizes[size],
          enabled: !prev.sizes[size].enabled,
        },
      },
    }));
  };

  const handleAddItem = () => {
    if (!itemForm.name.trim()) return;

    const activeSizes = {};

    Object.keys(itemForm.sizes).forEach((size) => {
      const sizeData = itemForm.sizes[size];

      if (sizeData.enabled && sizeData.price !== "") {
        activeSizes[size] = {
          price: Number(sizeData.price),
          stock: sizeData.stock,
        };
      }
    });

    if (Object.keys(activeSizes).length === 0) return;

    const newItem = {
      id: Date.now(),
      name: itemForm.name.trim(),
      category: itemForm.category,
      image:
        itemForm.image ||
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
      sizes: activeSizes,
    };

    setItems((prev) => [...prev, newItem]);
    setActiveCategory(itemForm.category);

    setItemForm({
      name: "",
      category: "Burgers",
      image: "",
      sizes: createEmptySizes(),
    });

    setItemPopup(false);
  };

  return (
    <div className="store-page">
      <div className="store-header">
        <div className="store-title-section">
          <div className="store-title-icon">
            <Inventory2 />
          </div>

          <div className="store-title">
            <div className="store-title-main">Store Items</div>

            <div className="store-title-subtitle">Manage your menu items</div>
          </div>
        </div>

        <div className="manager-section">
          <div className="manager-icon">
            <Person />
          </div>

          <div className="manager-info">
            <div className="manager-name">System Manager</div>

            <div className="manager-user">HEIN MIN AUNG</div>
          </div>
        </div>
      </div>

      <div className="store-content">
        <div className="section-header">
          <div className="section-heading">
            <div className="section-title">Menu Categories</div>
          </div>

          <button
            className="category-add-button"
            onClick={() => setCategoryPopup(true)}
          >
            <Add />
            <span className="button-text">Add Category</span>
          </button>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                activeCategory === category ? "category-active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="category-icon">
                {categoryIcons[category] || <Inventory2 />}
              </span>

              <span className="category-text">{category}</span>
            </button>
          ))}
        </div>

        <div className="menu-section-header">
          <div className="menu-title-wrapper">
            <div className="menu-title">Menu Items List</div>

            <div className="item-count">{filteredItems.length} Items</div>
          </div>

          <button
            className="menu-add-button"
            onClick={() => setItemPopup(true)}
          >
            <Add />
            <span className="button-text">Add Menu Item</span>
          </button>
        </div>

        <div className="menu-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const selectedSize = getSelectedSize(item);
              const selectedData = item.sizes[selectedSize];

              return (
                <div
                  className="menu-card"
                  key={item.id}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  <div className="menu-image-wrapper">
                    <img
                      className="menu-img"
                      src={item.image}
                      alt={item.name}
                    />

                    <div
                      className={`stock-badge ${
                        selectedData?.stock ? "stock-active" : "stock-out"
                      }`}
                    >
                      {selectedData?.stock ? <CheckCircle /> : <RemoveCircle />}

                      <span className="stock-text">
                        {selectedData?.stock ? "IN STOCK" : "OUT OF STOCK"}
                      </span>
                    </div>
                  </div>

                  <div className="menu-card-content">
                    <div className="menu-name-price">
                      <div className="menu-name">{item.name}</div>

                      <div className="menu-price">
                        {selectedData?.price?.toLocaleString()} Ks
                      </div>
                    </div>

                    <div className="size-list">
                      {Object.entries(item.sizes).map(([size, data]) => {
                        const isSelected = selectedSize === size;

                        return (
                          <button
                            key={size}
                            disabled={!data.stock}
                            className={`size-button ${
                              isSelected ? "size-selected" : ""
                            } ${!data.stock ? "size-disabled" : ""}`}
                            onClick={() =>
                              handleSelectSize(item.id, size, data.stock)
                            }
                          >
                            <span className="size-label">{size}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="size-stock-info">
                      <div
                        className={`selected-stock-status ${
                          selectedData?.stock
                            ? "selected-stock-in"
                            : "selected-stock-out"
                        }`}
                      >
                        {selectedSize} Size
                        {" • "}
                        {selectedData?.stock ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-menu">
              <Inventory2 className="empty-icon" />

              <div className="empty-title">No Menu Items</div>

              <div className="empty-description">
                There are no items in the {activeCategory} category.
              </div>
            </div>
          )}
        </div>
      </div>

      {categoryPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              <div className="popup-title">
                <div className="popup-icon">
                  <Add />
                </div>

                <div className="popup-title-content">
                  <div className="popup-title-main">Add Category</div>

                  <div className="popup-title-subtitle">
                    Create a new menu category
                  </div>
                </div>
              </div>

              <button
                className="popup-close"
                onClick={() => setCategoryPopup(false)}
              >
                <Close />
              </button>
            </div>

            <div className="popup-body">
              <div className="popup-field">
                <label className="popup-label">Category Name</label>

                <input
                  className="popup-input"
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>

            <div className="popup-actions">
              <button
                className="cancel-button"
                onClick={() => setCategoryPopup(false)}
              >
                Cancel
              </button>

              <button className="save-button" onClick={handleAddCategory}>
                <Add />
                <span className="button-text">Add Category</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {itemPopup && (
        <div className="popup-overlay">
          <div className="popup-box item-popup">
            <div className="popup-header">
              <div className="popup-title">
                <div className="popup-icon">
                  <Inventory2 />
                </div>

                <div className="popup-title-content">
                  <div className="popup-title-main">Add Menu Item</div>:{" "}
                  <div className="popup-title-subtitle">
                    Add price and stock for each size
                  </div>
                </div>
              </div>

              <button
                className="popup-close"
                onClick={() => setItemPopup(false)}
              >
                <Close />
              </button>
            </div>

            <div className="popup-body">
              <div className="popup-field">
                <label className="popup-label">Item Name</label>

                <input
                  className="popup-input"
                  type="text"
                  placeholder="Enter item name"
                  value={itemForm.name}
                  onChange={(e) => handleItemChange("name", e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="popup-field">
                  <label className="popup-label">Category</label>

                  <select
                    className="popup-input"
                    value={itemForm.category}
                    onChange={(e) =>
                      handleItemChange("category", e.target.value)
                    }
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="popup-field">
                  <label className="popup-label">Image URL</label>

                  <input
                    className="popup-input"
                    type="text"
                    placeholder="https://..."
                    value={itemForm.image}
                    onChange={(e) => handleItemChange("image", e.target.value)}
                  />
                </div>
              </div>

              <div className="size-form-section">
                <div className="size-form-title">Size / Price / Stock</div>

                <div className="size-form-list">
                  {["S", "M", "L", "Normal"].map((size) => {
                    const sizeData = itemForm.sizes[size];

                    return (
                      <div
                        className={`size-form-card ${
                          sizeData.enabled
                            ? "size-form-active"
                            : "size-form-disabled"
                        }`}
                        key={size}
                      >
                        <div className="size-form-top">
                          <button
                            className={`form-size-button ${
                              sizeData.enabled ? "form-size-selected" : ""
                            }`}
                            onClick={() => toggleFormSize(size)}
                          >
                            {size}
                          </button>

                          <div className="size-form-name">
                            {size === "Normal" ? "Normal Size" : `${size} Size`}
                          </div>
                        </div>
                        <div className="size-form-row">
                          <div className="size-price-box">
                            <div className="size-field-label">Price</div>

                            <input
                              className="size-price-input"
                              type="number"
                              placeholder="4500"
                              disabled={!sizeData.enabled}
                              value={sizeData.price}
                              onChange={(e) =>
                                handleSizeChange(size, "price", e.target.value)
                              }
                            />
                          </div>

                          <button
                            className={`stock-toggle ${
                              sizeData.stock
                                ? "stock-toggle-in"
                                : "stock-toggle-out"
                            }`}
                            disabled={!sizeData.enabled}
                            onClick={() =>
                              handleSizeChange(size, "stock", !sizeData.stock)
                            }
                          >
                            {sizeData.stock ? (
                              <CheckCircle />
                            ) : (
                              <RemoveCircle />
                            )}

                            <span className="stock-toggle-text">
                              {sizeData.stock ? "In Stock" : "Out of Stock"}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="popup-actions">
              <button
                className="cancel-button"
                onClick={() => setItemPopup(false)}
              >
                Cancel
              </button>

              <button className="save-button" onClick={handleAddItem}>
                <Add />
                <span className="button-text">Add Menu Item</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OfflineStore;
