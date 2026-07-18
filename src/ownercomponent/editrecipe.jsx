import { useState } from "react";
import "../ownercss/editrecipe.css";

import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
export default function EditRecipe() {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      ingredient: "Flour",
      qty: "500",
      unit: "gram",
    },
    {
      id: 2,
      ingredient: "Sugar",
      qty: "200",
      unit: "gram",
    },
  ]);

  const handleAddMore = () => {
    setIngredients([
      ...ingredients,
      {
        id: Date.now(),
        ingredient: "",
        qty: "",
        unit: "",
      },
    ]);
  };

  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="editoverlay">
      <div className="edit-modal">
        <div className="modal-title">
          <h2 className="modaltitleh2">Edit Recipe</h2>

          <button onClick={() => navigate(-1)} className="modaltitlebutton">
            <CloseIcon />
          </button>
        </div>

        <div className="modal-content">
          <div className="top-section">
            <div className="left">
              <label className="leftlabel">Item Name</label>

              {/* Input */}
              <input
                type="text"
                placeholder="Beef Burger"
                className="leftinput"
              />

              <label className="leftlabel">Select Size / Variant</label>

              {/* Select */}
              <select className="leftselect">
                <option>Medium</option>
                <option>Large</option>
                <option>Small</option>
              </select>
            </div>

            <div className="right">
              <label className="leftlabel">Upload Photo</label>

              <div className="upload-box">
                <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 70 }} />
              </div>
            </div>
          </div>

          <hr />

          <h3 className="modalcontenth3">Ingredients (Bill of Materials)</h3>

          {ingredients.map((item) => (
            <div className="ingredient-row" key={item.id}>
              {/* Select */}
              <select defaultValue={item.ingredient} className="leftselect">
                <option>Flour</option>
                <option>Sugar</option>
                <option>Butter</option>
                <option>Egg</option>
              </select>

              {/* Input */}
              <input
                type="number"
                defaultValue={item.qty}
                placeholder="Quantity"
                className="leftinput"
              />

              {/* Select */}
              <select defaultValue={item.unit} className="leftselect">
                <option>gram</option>
                <option>kg</option>
                <option>pcs</option>
              </select>
            </div>
          ))}

          <button className="add-more-btn" onClick={handleAddMore}>
            Add More
          </button>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn">Cancel</button>

          <button className="update-btn">Update</button>
        </div>
      </div>
    </div>
  );
}
