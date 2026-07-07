import "../ownercss/dashboard.css";

import SearchBar from "../ownercomponent/search";
import SummaryCards from "../ownercomponent/dashboardsummarys";
import RevenueChart from "../ownercomponent/dashboardchart";
import InventoryStatus from "../ownercomponent/dashboardbar";
import ShopPerformance from "../ownercomponent/dashboardshoptable";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <SearchBar />
      </div>

      <SummaryCards />

      <div className="dashboard-grid">
        <RevenueChart />
        <InventoryStatus />
      </div>

      <ShopPerformance />
    </div>
  );
}
