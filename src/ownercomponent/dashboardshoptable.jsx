import "../ownercss/dashboardshop.css";

import VisibilityIcon from "@mui/icons-material/Visibility";

const shops = [
  {
    id: 1,
    shop: "Yangon Main Shop",
    manager: "Aung Aung",
    date: "2023-06-15",
    revenue: "$5,200",
    orders: 120,
    status: "Open",
  },
  {
    id: 2,
    shop: "Mandalay Branch",
    manager: "Mg Mg",
    date: "2023-06-14",
    revenue: "$3,900",
    orders: 96,
    status: "Open",
  },
  {
    id: 3,
    shop: "Naypyidaw Shop",
    manager: "Kyaw Kyaw",
    date: "2023-06-13",
    revenue: "$2,450",
    orders: 70,
    status: "Closed",
  },
];

export default function ShopPerformance() {
  return (
    <div className="shop-table-card">
      <div className="table-header">
        <h2>Shop Performance</h2>

        <div className="twobtn">
          <input type="date" className="viewallinput" />
          <button className="viewallbtn">View All</button>
        </div>
      </div>

      <table className="dashboardshoptable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Shop</th>
            <th>Manager</th>
            <th>Date</th>
            <th>Revenue</th>
            <th>Orders</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td>{shop.id}</td>
              <td>{shop.shop}</td>
              <td>{shop.manager}</td>
              <td>{shop.date}</td>
              <td>{shop.revenue}</td>
              <td>{shop.orders}</td>

              <td>
                <span
                  className={
                    shop.status === "Open" ? "status-open" : "status-close"
                  }
                >
                  {shop.status}
                </span>
              </td>

              <td>
                <div className="action-buttons">
                  <button className="view-btn">
                    <VisibilityIcon fontSize="small" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
