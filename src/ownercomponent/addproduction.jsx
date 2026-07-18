import { useState } from "react";
import "../ownercss/addproduction.css";
import { Outlet, useNavigate } from "react-router";

import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

export default function AddProduction() {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      ingredient: "",
      quantity: "",
      unit: "",
    },
  ]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: Date.now(),
        ingredient: "",
        quantity: "",
        unit: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const data = [...ingredients];
    data[index][field] = value;
    setIngredients(data);
  };

  const navigate = useNavigate();

  return (
    <div className="popupOverlay">
      <div className="popupContainer">
        {/* Header */}

        <div className="popupHeader">
          <h2 className="popupTitle">Add New Production</h2>

          <button className="closeButton" onClick={() => navigate(-1)}>
            <CloseIcon />
          </button>
          <Outlet />
        </div>

        {/* Body */}

        <div className="popupBody">
          <div className="topSection">
            <div className="leftSection">
              <div className="fieldGroup">
                <label className="fieldLabel">Item Name</label>

                <input
                  className="textInput"
                  type="text"
                  placeholder="Enter item name"
                />
              </div>

              <div className="fieldGroup">
                <label className="fieldLabel">Select Size / Variant</label>

                <select className="selectInput">
                  <option>Select Size</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>

            <div className="rightSection">
              <label className="fieldLabel">Upload Photo</label>

              <div className="uploadBox">
                <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 70 }} />
              </div>
            </div>
          </div>

          <div className="bottomSection">
            <div className="fieldGroup">
              <label className="fieldLabel">Target Result Quantity</label>

              <input className="textInput" type="number" placeholder="0" />
            </div>

            <div className="fieldGroup">
              <label className="fieldLabel">
                Estimated Production Time (Minutes)
              </label>

              <input className="textInput" type="number" placeholder="0" />
            </div>
          </div>

          <h3 className="ingredientTitle">Ingredients (Bill of Materials)</h3>

          {ingredients.map((item, index) => (
            <div className="ingredientRow" key={item.id}>
              <select
                className="ingredientSelect"
                value={item.ingredient}
                onChange={(e) =>
                  handleChange(index, "ingredient", e.target.value)
                }
              >
                <option>Select Ingredient</option>
                <option>Flour</option>
                <option>Sugar</option>
                <option>Butter</option>
                <option>Milk</option>
              </select>
              <input
                className="quantityInput"
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
              />

              <select
                className="unitSelect"
                value={item.unit}
                onChange={(e) => handleChange(index, "unit", e.target.value)}
              >
                <option>Select Unit</option>
                <option>Gram</option>
                <option>Kg</option>
                <option>Pcs</option>
                <option>Litre</option>
              </select>
            </div>
          ))}

          <button className="addMoreButton" onClick={addIngredient}>
            Add More
          </button>
        </div>

        {/* Footer */}

        <div className="popupFooter">
          <button className="cancelButton">Cancel</button>

          <button className="saveButton">Save</button>
        </div>
      </div>
    </div>
  );
}
