import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./saledetail.css";

const SalesDetail = () => {
  const navigate = useNavigate();
  const { reportId } = useParams();
  const [searchParams] = useSearchParams();

  const reportType = searchParams.get("type") || "Takeaway";
  const isDineIn = reportType === "Dine-in";

  const report = {
    id: reportId || "#REP-9404",
    tableName: "Table T01",
    items: "Beef Burger, Apple Juice",
    payment: "Cash",
    amount: "10,500 Ks",
    date: "1 July 2026",
    time: "12:45 PM",
  };

  return (
    <div className="sales-report-details">
      <div className="sales-report-details__header">
        <h1 className="sales-report-details__title">Sales Report Details</h1>

        <button
          type="button"
          className="sales-report-details__close"
          onClick={() => navigate(-1)}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="sales-report-details__content">
        <div className="sales-report-details__item">
          <span className="sales-report-details__label">SALE ID</span>

          <span className="sales-report-details__value">{report.id}</span>
        </div>

        {isDineIn && (
          <div className="sales-report-details__item">
            <span className="sales-report-details__label">TABLE NAME</span>

            <span className="sales-report-details__value">
              {report.tableName}
            </span>
          </div>
        )}

        <div className="sales-report-details__item">
          <span className="sales-report-details__label">ORDER ITEMS</span>

          <span className="sales-report-details__value">{report.items}</span>
        </div>

        <div className="sales-report-details__item">
          <span className="sales-report-details__label">PAYMENT METHOD</span>

          <span className="sales-report-details__value">{report.payment}</span>
        </div>

        <div className="sales-report-details__item">
          <span className="sales-report-details__label">TOTAL AMOUNT</span>

          <span className="sales-report-details__value sales-report-details__value--amount">
            {report.amount}
          </span>
        </div>

        <div className="sales-report-details__item">
          <span className="sales-report-details__label">
            DATE & TIME OF TRANSACTION
          </span>

          <span className="sales-report-details__value">
            {report.date} , {report.time}
          </span>
        </div>
      </div>

      <div className="sales-report-details__footer">
        <button
          type="button"
          className="sales-report-details__button"
          onClick={() => navigate(-1)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SalesDetail;
