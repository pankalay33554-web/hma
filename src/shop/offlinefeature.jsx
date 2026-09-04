import { CheckCircle, Close, OfflineBolt } from "@mui/icons-material";
import "./offlinefeature.css";
import { useNavigate, Outlet } from "react-router";

const offlineFeatures = [
  {
    title: "Quick Billing & Receipt Printing",
    description:
      "Instant receipt generation with offline thermal printer integration.",
  },
  {
    title: "Item & Category Catalog",
    description:
      "Create and organize items, prices, and product groups easily.",
  },
  {
    title: "Cash Drawer Kick",
    description:
      "Automatic trigger for connected POS cash registers on checkout.",
  },
  {
    title: "Stock In/Out Alerts",
    description:
      "Basic stock count tracking with simple low-inventory warnings.",
  },
  {
    title: "Manual Discounts",
    description: "Apply custom order-level or item-level discounts directly.",
  },
  {
    title: "Daily X/Z Cash Reports",
    description:
      "Instant end-of-day cash reconciliation and register closing summaries.",
  },
  {
    title: "Offline Data Storage",
    description:
      "Secure local database operations without requiring internet connection.",
  },
  {
    title: "Receipt Branding",
    description:
      "Customize header, footer, logo, and tax details on printed receipts.",
  },
];

export default function OfflineFeaturesModal() {
  const navigate = useNavigate();
  return (
    <div className="offlineOverlay">
      <div className="offlineModal">
        <div className="offlineHeader">
          <div className="offlineHeaderLeft">
            <OfflineBolt className="offlineHeaderIcon" />

            <h2 className="offlineTitle">Offline Version Features</h2>
          </div>

          <button
            className="offlineCloseButton"
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Close"
          >
            <Close className="offlineCloseIcon" />
          </button>
          <Outlet />
        </div>

        <div className="offlineContent">
          <div className="offlineFeatureGrid">
            {offlineFeatures.map((feature) => (
              <div className="offlineFeature" key={feature.title}>
                <div className="offlineCheckBox">
                  <CheckCircle className="offlineCheckIcon" />
                </div>

                <div className="offlineFeatureContent">
                  <h3 className="offlineFeatureTitle">{feature.title}</h3>

                  <p className="offlineFeatureDescription">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
