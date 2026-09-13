import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import "./offlineaddmenuitem.css";

const OfflineAddMenuItem = ({ onClose, onCreate }) => {
  const [menuName, setMenuName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const [hasVariants, setHasVariants] = useState(false);

  const [variants, setVariants] = useState([
    {
      size: "Small",
      price: "4,500",
      quantity: "12",
    },
    {
      size: "Medium",
      price: "6,500",
      quantity: "15",
    },
    {
      size: "Large",
      price: "8,000",
      quantity: "10",
    },
  ]);

  const [popup, setPopup] = useState({
    show: false,
    type: "error",
    message: "",
  });

  const showPopup = (message, type = "error") => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "error",
        message: "",
      });
    }, 3000);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      showPopup("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showPopup("Image size must be less than 5MB.");
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleVariantChange = (index, field, value) => {
    setVariants((previous) =>
      previous.map((variant, variantIndex) =>
        variantIndex === index
          ? {
              ...variant,
              [field]: value,
            }
          : variant,
      ),
    );
  };

  const addAnotherSize = () => {
    setVariants((previous) => [
      ...previous,
      {
        size: "",
        price: "",
        quantity: "",
      },
    ]);
  };

  const removeImage = () => {
    setImage(null);
  };

  const validateVariants = () => {
    if (variants.length === 0) {
      showPopup("Please add at least one size.");
      return false;
    }

    for (let index = 0; index < variants.length; index++) {
      const variant = variants[index];

      if (!variant.size.trim()) {
        showPopup(`Please enter the size for row ${index + 1}.`);
        return false;
      }

      if (!variant.price.trim()) {
        showPopup(`Please enter the price for ${variant.size}.`);
        return false;
      }

      const numericPrice = Number(variant.price.replace(/,/g, ""));

      if (Number.isNaN(numericPrice) || numericPrice <= 0) {
        showPopup(`Please enter a valid price for ${variant.size}.`);
        return false;
      }

      if (variant.quantity === "") {
        showPopup(`Please enter quantity for ${variant.size}.`);
        return false;
      }

      const numericQuantity = Number(variant.quantity);

      if (Number.isNaN(numericQuantity) || numericQuantity < 0) {
        showPopup(`Please enter a valid quantity for ${variant.size}.`);
        return false;
      }
    }

    const sizeNames = variants.map((variant) =>
      variant.size.trim().toLowerCase(),
    );

    const hasDuplicate = sizeNames.some(
      (size, index) => sizeNames.indexOf(size) !== index,
    );

    if (hasDuplicate) {
      showPopup("Size names cannot be duplicated.");
      return false;
    }

    return true;
  };

  const validateForm = () => {
    if (!menuName.trim()) {
      showPopup("Please enter the menu name.");
      return false;
    }

    if (menuName.trim().length < 2) {
      showPopup("Menu name must be at least 2 characters.");
      return false;
    }

    if (!category) {
      showPopup("Please select a category.");
      return false;
    }

    if (!image) {
      showPopup("Please upload a menu image.");
      return false;
    }

    if (hasVariants) {
      return validateVariants();
    }

    if (!price.trim()) {
      showPopup("Please enter the price.");
      return false;
    }

    const numericPrice = Number(price.replace(/,/g, ""));

    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      showPopup("Please enter a valid price.");
      return false;
    }

    if (quantity === "") {
      showPopup("Please enter the quantity.");
      return false;
    }

    const numericQuantity = Number(quantity);

    if (Number.isNaN(numericQuantity) || numericQuantity < 0) {
      showPopup("Please enter a valid quantity.");
      return false;
    }

    return true;
  };

  const handleCreate = () => {
    if (!validateForm()) {
      return;
    }

    const menuItem = {
      menuName: menuName.trim(),
      category,
      image: image.file,
      hasVariants,
      price: hasVariants ? null : Number(price.replace(/,/g, "")),
      quantity: hasVariants ? null : Number(quantity),
      variants: hasVariants
        ? variants.map((variant) => ({
            size: variant.size.trim(),
            price: Number(variant.price.replace(/,/g, "")),
            quantity: Number(variant.quantity),
          }))
        : [],
    };

    if (onCreate) {
      onCreate(menuItem);
    }

    showPopup("Menu item created successfully!", "success");

    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 1200);
  };

  return (
    <div className="add-menu-item__overlay">
      <div className="add-menu-item__modal">
        <div className="add-menu-item__header">
          <div className="add-menu-item__title">Add New Menu Item</div>

          <button
            type="button"
            className="add-menu-item__close-button"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="add-menu-item__body">
          <div className="add-menu-item__top-grid">
            <div className="add-menu-item__field">
              <div className="add-menu-item__label">Menu Name</div>

              <input
                className="add-menu-item__input"
                type="text"
                placeholder="e.g. Classic Burger"
                value={menuName}
                onChange={(event) => setMenuName(event.target.value)}
              />
            </div>

            <div className="add-menu-item__field">
              <div className="add-menu-item__label">Category</div>

              <div className="add-menu-item__select-wrapper">
                <select
                  className="add-menu-item__select"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">select category</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Rice">Rice</option>
                </select>

                <KeyboardArrowDownIcon className="add-menu-item__select-icon" />
              </div>
            </div>
          </div>

          <div className="add-menu-itemfield add-menu-itemimage-field">
            <div className="add-menu-item__label">Menu Image</div>

            <label className="add-menu-item__upload-box">
              <input
                className="add-menu-item__file-input"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
              />

              {image ? (
                <div className="add-menu-item__image-preview-wrapper">
                  <img
                    className="add-menu-item__image-preview"
                    src={image.preview}
                    alt="Menu preview"
                  />

                  <div className="add-menu-item__image-overlay">
                    <CloudUploadOutlinedIcon />
                    <span>Change image</span>
                  </div>
                </div>
              ) : (
                <div className="add-menu-item__upload-content">
                  <CloudUploadOutlinedIcon className="add-menu-item__upload-icon" />

                  <div className="add-menu-item__upload-text">
                    Click or drag to upload menu image
                  </div>
                </div>
              )}
            </label>
          </div>

          {!hasVariants && (
            <div className="add-menu-item__top-grid">
              <div className="add-menu-item__field">
                <div className="add-menu-item__label">Price</div>

                <input
                  className="add-menu-item__input"
                  type="text"
                  inputMode="numeric"
                  placeholder="4,500"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>

              <div className="add-menu-item__field">
                <div className="add-menu-item__label">Quantity</div>

                <input
                  className="add-menu-item__input"
                  type="number"
                  min="0"
                  placeholder="number"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />
              </div>
            </div>
          )}

          <div className="add-menu-item__variant-toggle-row">
            <div className="add-menu-item__variant-label">
              This item has multiple sizes/variants (e.g., S, M, L)
            </div>

            <button
              type="button"
              className={`add-menu-item__toggle ${
                hasVariants ? "add-menu-item__toggle--active" : ""
              }`}
              onClick={() => setHasVariants((previous) => !previous)}
            >
              <div className="add-menu-item__toggle-circle"></div>
            </button>
          </div>

          {hasVariants && (
            <div className="add-menu-item__sizes-section">
              <div className="add-menu-item__sizes-header">
                <div className="add-menu-item__sizes-header-item">Sizes</div>

                <div className="add-menu-item__sizes-header-item">
                  Selling Price (Ks)
                </div>

                <div className="add-menu-item__sizes-header-item">Quantity</div>
              </div>

              <div className="add-menu-item__sizes-body">
                {variants.map((variant, index) => (
                  <div className="add-menu-item__size-row" key={index}>
                    <input
                      className="add-menu-item__size-input"
                      type="text"
                      placeholder="Small"
                      value={variant.size}
                      onChange={(event) =>
                        handleVariantChange(index, "size", event.target.value)
                      }
                    />

                    <input
                      className="add-menu-item__size-input"
                      type="text"
                      inputMode="numeric"
                      placeholder="4,500"
                      value={variant.price}
                      onChange={(event) =>
                        handleVariantChange(index, "price", event.target.value)
                      }
                    />

                    <input
                      className="add-menu-item__size-input"
                      type="number"
                      min="0"
                      placeholder="12"
                      value={variant.quantity}
                      onChange={(event) =>
                        handleVariantChange(
                          index,
                          "quantity",
                          event.target.value,
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="add-menu-item__add-size-button"
                onClick={addAnotherSize}
              >
                + Add Another Size
              </button>
            </div>
          )}
        </div>

        <div className="add-menu-item__footer">
          <button
            type="button"
            className="add-menu-item__cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="add-menu-item__create-button"
            onClick={handleCreate}
          >
            Create Menu Item
          </button>
        </div>

        {popup.show && (
          <div
            className={`add-menu-item__popup ${
              popup.type === "success"
                ? "add-menu-item__popup--success"
                : "add-menu-item__popup--error"
            }`}
          >
            <div className="add-menu-item__popup-icon">
              {popup.type === "success" ? <CheckCircleIcon /> : <ErrorIcon />}
            </div>

            <div className="add-menu-item__popup-message">{popup.message}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineAddMenuItem;
