import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../ownercss/order.css";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

export default function Orders() {
  const orders = [
    {
      id: 1,
      shop: "Shop A",
      orderid: "#ac-001",
      date: "2023-01-01",
      time: "10:00",
      total: 100.0,
      totalItems: 5,
      status: "Pending",
    },
    {
      id: 2,
      shop: "Shop B",
      orderid: "#ac-002",
      date: "2023-01-02",
      time: "14:30",
      total: 150.0,
      totalItems: 3,
      status: "Completed",
    },
    {
      id: 3,
      shop: "Shop C",
      orderid: "#ac-003",
      date: "2023-01-03",
      time: "09:15",
      total: 200.0,
      totalItems: 2,
      status: "Cancelled",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Completed":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="order-container">
      <div className="ordercontainer">
        <div className="ordercontainersearchgroup">
          <SearchIcon className="ordercontainersearchicon" />
          <input
            type="text"
            placeholder="Search By ID, Item..."
            className="ordercontainerinput"
          />
        </div>

        <div className="ordercontainerdate">
          <input type="date" className="orderdateinput" />
        </div>

        <p>to</p>

        <div className="ordercontainerdate">
          <input type="date" className="orderdateinput" />
        </div>

        <div className="ordercontainerexportgroup">
          <SaveAltIcon />
          <button className="order-export">Export</button>
        </div>
      </div>

      <table cellPadding="10">
        <thead>
          <tr>
            <th>Id</th>
            <th>Shop</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Items</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.shop}</td>
              <td>{order.orderid}</td>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>{order.totalItems}</td>

              <td>
                <div className="order-btngroup">
                  <VisibilityOutlinedIcon className="order-view" />
                  <div className="order-line"></div>
                  <EditIcon className="order-edit" />
                  <div className="order-line"></div>
                  <DeleteIcon className="order-delete" />
                </div>
              </td>

              <td>
                <span
                  style={{
                    background: getStatusColor(order.status),
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "5px",
                  }}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
