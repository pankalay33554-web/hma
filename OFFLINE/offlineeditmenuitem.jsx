import { useState } from "react";
import { useNavigate, Outlet } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloudUploadOutlineIcon from "@mui/icons-material/CloudUploadOutlined";

import "./offlineeditmenuitem.css";

const OfflineEditMenuItem = ({ menuItem, onUpdate, onDelete }) => {
  const [menuName, setMenuName] = useState(menuItem?.menuName || "Beef Burger");
  const navigate = useNavigate();

  const [category, setCategory] = useState(menuItem?.category || "Burgers");

  const [image, setImage] = useState(menuItem?.image || null);

  const [isInStock, setIsInStock] = useState(menuItem?.isInStock ?? true);

  const [variants, setVariants] = useState(
    menuItem?.variants?.length
      ? menuItem.variants
      : [
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
        ],
  );

  const [showDeletePopup, setShowDeletePopup] = useState(false);

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

    if (file.size > 2 * 1024 * 1024) {
      showPopup("Image size must be less than 2MB.");
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

  const removeVariant = (index) => {
    if (variants.length === 1) {
      showPopup("At least one size is required.");
      return;
    }

    setVariants((previous) =>
      previous.filter((_, variantIndex) => variantIndex !== index),
    );
  };

  const validateForm = () => {
    if (!menuName.trim()) {
      showPopup("Please enter the menu name.");
      return false;
    }

    if (!category) {
      showPopup("Please select a category.");
      return false;
    }

    if (!isInStock) {
      return true;
    }

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

  const handleUpdate = () => {
    if (!validateForm()) {
      return;
    }

    const updatedItem = {
      ...menuItem,
      menuName: menuName.trim(),
      category,
      image,
      isInStock,
      variants: variants.map((variant) => ({
        size: variant.size.trim(),
        price: Number(variant.price.replace(/,/g, "")),
        quantity: Number(variant.quantity),
      })),
    };

    if (onUpdate) {
      onUpdate(updatedItem);
    }

    showPopup("Menu item updated successfully!", "success");
  };

  const handleDeleteConfirm = () => {
    setShowDeletePopup(false);

    if (onDelete) {
      onDelete(menuItem);
    }
  };

  return (
    <div className="edit-menu-item__overlay">
      <div className="edit-menu-item__modal">
        <div className="edit-menu-item__header">
          <div className="edit-menu-item__title">Edit Menu Item</div>

          <button
            type="button"
            className="edit-menu-item__close-button"
            onClick={() => navigate(-1)}
          >
            <CloseIcon />
          </button>
          <Outlet />
        </div>

        <div className="edit-menu-item__body">
          <div className="edit-menu-item__availability">
            <div className="edit-menu-item__availability-label">
              Item Availability Status
            </div>

            <div className="edit-menu-item__availability-right">
              <div
                className={`edit-menu-item__stock-text ${
                  isInStock
                    ? "edit-menu-item__stock-text--active"
                    : "edit-menu-item__stock-text--inactive"
                }`}
              >
                {isInStock ? "IN STOCK" : "OUT OF STOCK"}
              </div>

              <button
                type="button"
                className={`edit-menu-item__toggle ${
                  isInStock ? "edit-menu-item__toggle--active" : ""
                }`}
                onClick={() => setIsInStock((previous) => !previous)}
              >
                <div className="edit-menu-item__toggle-circle"></div>
              </button>
            </div>
          </div>

          <div className="edit-menu-item__top-grid">
            <div className="edit-menu-item__field">
              <div className="edit-menu-item__label">Menu Name</div>

              <input
                className="edit-menu-item__input"
                type="text"
                value={menuName}
                onChange={(event) => setMenuName(event.target.value)}
              />
            </div>

            <div className="edit-menu-item__field">
              <div className="edit-menu-item__label">Category</div>{" "}
              <div className="edit-menu-item__select-wrapper">
                <select
                  className="edit-menu-item__select"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="">select category</option>
                  <option value="Burgers">Burgers</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Rice">Rice</option>
                </select>

                <KeyboardArrowDownIcon className="edit-menu-item__select-icon" />
              </div>
            </div>
          </div>

          <div className="edit-menu-itemfield edit-menu-itemimage-field">
            <div className="edit-menu-item__label">Menu Image</div>

            <div className="edit-menu-item__image-box">
              {image ? (
                <div className="edit-menu-item__current-image">
                  <img
                    className="edit-menu-item__image-preview"
                    src={typeof image === "string" ? image : image.preview}
                    alt="Menu preview"
                  />

                  <div className="edit-menu-item__image-actions">
                    <label className="edit-menu-item__replace-button">
                      <input
                        className="edit-menu-item__file-input"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleImageChange}
                      />
                      <CameraAltOutlinedIcon />
                      Replace Image
                    </label>

                    <div className="edit-menu-item__image-info">
                      Recommended size: 1200×800px. Max 2MB.
                    </div>
                  </div>
                </div>
              ) : (
                <label className="edit-menu-item__upload-box">
                  <input
                    className="edit-menu-item__file-input"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                  />

                  <CloudUploadOutlineIcon className="edit-menu-item__upload-icon" />

                  <div className="edit-menu-item__upload-text">
                    Click to upload menu image
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="edit-menu-item__variants-title">
            Sizes & Pricing Variants
          </div>

          <div className="edit-menu-item__sizes-section">
            <div className="edit-menu-item__sizes-header">
              <div className="edit-menu-item__sizes-header-item">Sizes</div>

              <div className="edit-menu-item__sizes-header-item">
                Selling Price (Ks)
              </div>

              <div className="edit-menu-item__sizes-header-item">Quantity</div>

              <div className="edit-menu-item__sizes-header-item"></div>
            </div>
            <div className="edit-menu-item__sizes-body">
              {variants.map((variant, index) => (
                <div className="edit-menu-item__size-row" key={index}>
                  <input
                    className="edit-menu-item__size-input"
                    type="text"
                    value={variant.size}
                    placeholder="Small"
                    onChange={(event) =>
                      handleVariantChange(index, "size", event.target.value)
                    }
                  />

                  <input
                    className="edit-menu-item__size-input"
                    type="text"
                    inputMode="numeric"
                    value={variant.price}
                    placeholder="4,500"
                    onChange={(event) =>
                      handleVariantChange(index, "price", event.target.value)
                    }
                  />

                  <input
                    className="edit-menu-item__size-input"
                    type="number"
                    min="0"
                    value={variant.quantity}
                    placeholder="12"
                    onChange={(event) =>
                      handleVariantChange(index, "quantity", event.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="edit-menu-item__remove-button"
                    onClick={() => removeVariant(index)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="edit-menu-item__add-size-button"
            onClick={addAnotherSize}
          >
            + Add Another Size
          </button>
        </div>

        <div className="edit-menu-item__footer">
          <button
            type="button"
            className="edit-menu-item__delete-button"
            onClick={() => setShowDeletePopup(true)}
          >
            <DeleteIcon />
            Delete Menu Item
          </button>

          <div className="edit-menu-item__footer-right">
            <button
              type="button"
              className="edit-menu-item__cancel-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <Outlet />

            <button
              type="button"
              className="edit-menu-item__update-button"
              onClick={handleUpdate}
            >
              Update Changes
            </button>
          </div>
        </div>

        {popup.show && (
          <div
            className={`edit-menu-item__popup ${
              popup.type === "success"
                ? "edit-menu-item__popup--success"
                : "edit-menu-item__popup--error"
            }`}
          >
            <div className="edit-menu-item__popup-icon">
              {popup.type === "success" ? <CheckCircleIcon /> : <ErrorIcon />}
            </div>

            <div className="edit-menu-item__popup-message">{popup.message}</div>
          </div>
        )}

        {showDeletePopup && (
          <div className="edit-menu-item__delete-overlay">
            <div className="edit-menu-item__delete-popup">
              <div className="edit-menu-item__delete-icon">
                <DeleteIcon />
              </div>

              <div className="edit-menu-item__delete-title">
                Delete Menu Item
              </div>
              <div className="edit-menu-item__delete-message">
                Are you sure you want to delete this menu item?
              </div>

              <div className="edit-menu-item__delete-actions">
                <button
                  type="button"
                  className="edit-menu-item__delete-cancel"
                  onClick={() => setShowDeletePopup(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="edit-menu-item__delete-confirm"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineEditMenuItem;
