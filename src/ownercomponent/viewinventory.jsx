import "../ownercss/viewinventory.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Outlet } from "react-router";

export default function ViewInventory() {
  const navigate = useNavigate();

  return (
    <div className="viewinventorycontainermain">
      <div className="viewinventorycontainer">
        <div className="viewinventorytitle">
          <h2 className="viewinventoryh2">View Inventory</h2>
          <button onClick={() => navigate(-1)} className="Close-BTN">
            <CloseIcon />
          </button>
          <Outlet />
        </div>

        <div className="line"></div>

        <div className="viewcontainerbody">
          <div className="viewinventoryleft">
            <p>No:</p>
            <p>Update date:</p>
            <p>Code:</p>
            <p>Item:</p>
            <p>Cost:</p>
            <p>Stock:</p>
          </div>

          <div className="viewinventoryright">
            <p>1</p>
            <p>20-6-2026</p>
            <p>001</p>
            <p>Flour</p>
            <p>8000ks/kg</p>
            <p>500kg</p>
          </div>
        </div>
        <button className="viewinventoryclose" onClick={() => navigate(-1)}>
          Close
        </button>
      </div>
    </div>
  );
}
