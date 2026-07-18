import "../ownercss/summarys.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export default function SummaryCards() {
  return (
    <div className="summaryCards">
      <div className="card">
        <h3 className="cardtext">Total Revenue</h3>

        <div className="cardBottom">
          <h2 className="cardBottomtext">100,000 Ks</h2>
          <DescriptionOutlinedIcon className="cardIcon" />
        </div>
      </div>

      <div className="card">
        <h3 className="cardtext">Total Order</h3>

        <div className="cardBottom">
          <h2 className="cardBottomtext">100</h2>
          <DescriptionOutlinedIcon className="cardIcon" />
        </div>
      </div>

      <div className="card">
        <h3 className="cardtext">Low Stock</h3>

        <div className="cardBottom">
          <h2 className="cardBottomtext">10</h2>
          <DescriptionOutlinedIcon className="cardIcon" />
        </div>
      </div>

      <div className="card">
        <h3 className="cardtext">Total Inventory</h3>

        <div className="cardBottom">
          <h2 className="cardBottomtext">100</h2>
          <DescriptionOutlinedIcon className="cardIcon" />
        </div>
      </div>
    </div>
  );
}
