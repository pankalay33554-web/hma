import "../ownercss/viewproductdetail.css";
import { useNavigate, Outlet } from "react-router";

export default function ViewProductDetail() {
  const navigate = useNavigate();
  return (
    <div className="viewproductdetail">
      <div className="viewproductdetailcontainer">
        <h2 className="viewproductdetailtitle">Product Details</h2>

        <div className="viewproductdetailbodycontainer">
          <div className="viewproductdetailbodyleft">
            <div className="bodyleft">
              <p>Shop Name:</p>
              <p>Batch ID:</p>
              <p>Item ID:</p>
              <p>Size:</p>
              <p>Date:</p>
              <p>Time:</p>
              <p>Total Qty:</p>
              <p>Success Qty:</p>
              <p>Fail Qty:</p>
            </div>
            <div className="bodyright">
              <p>Shop1</p>
              <p className="p">#PRD-004</p>
              <p>beef</p>
              <p>Beef Burger</p>
              <p>26 June 2026</p>
              <p>10:15 AM</p>
              <p>15</p>
              <p className="pp">10</p>
              <p className="ppp">5</p>
            </div>
          </div>

          <div className="bodylines"></div>

          <div className="viewproductdetailbodyright">
            <h3 className="righttitle">Ingredients Used(BOM)</h3>
            <div className="cccc">
              <div className="bodylefts">
                <p>Flour</p>
                <p>Beef Patty</p>
                <p>Cheddar Cheese</p>
                <p>Lettuce</p>
                <p>Sauce</p>
              </div>
              <div classNamae="bodyrights">
                <p>500 g</p>
                <p>10 pcs</p>
                <p>10 slics</p>
                <p>200 g</p>
                <p>150 ml</p>
              </div>
            </div>
          </div>
        </div>

        <button className="viewproductdetailclose" onClick={() => navigate(-1)}>
          Close
        </button>
        <Outlet />
      </div>
    </div>
  );
}
