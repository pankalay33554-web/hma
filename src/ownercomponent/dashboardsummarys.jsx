import "../ownercss/summarys.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export default function SummaryCards() {
  return (
    <div className="summaryCards">
      <div className="card">
        <h3>Total Revenue</h3>

        <div className="cardBottom">
          <h2>100,000 Ks</h2>
          <DescriptionOutlinedIcon className="cardIcon" />
        </div>
      </div>

      <div className="card">
        <h3>Total Order</h3>

        <div className="cardBottom">
          <h2>100</h2>
          <DescriptionOutlinedIcon className="cardIcon" />
        </div>
      </div>

      <div className="card">
        <h3>Low Stock</h3>

        <div className="cardBottom">
          <h2>10</h2>
          <DescriptionOutlinedIcon className="cardIcon" />
        </div>
      </div>

      <div className="card">
        <h3>Total Inventory</h3>

        <div className="cardBottom">
          <h2>100</h2>
          <DescriptionOutlinedIcon className="cardIcon" />
        </div>
      </div>
    </div>
  );
}
