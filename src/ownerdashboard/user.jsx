import "../ownercss/user.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
const user = [
  {
    id: 1,
    name: "U Kaung",
    email: "kaung123@gmail.com",
    phone: "09-111111111",
    address: "Yangon",
    role: "Manager",
    branch: "Shop 1",
    status: "Active",
  },
  {
    id: 2,
    name: "Hla Hla",
    email: "susu2@gmail.com",
    phone: "09-222222222",
    address: "Mandalay",
    role: "Seller",
    branch: "Shop 2",
    status: "De-active",
  },
];

export default function Users() {
  return (
    <div className="userManagement">
      <div className="userCard">
        <h2 className="userTitle">User Management</h2>

        <div className="userTop">
          <div className="usersearchBox">
            <SearchIcon />
            <input className="usersearchInput" placeholder="Search" />
          </div>

          <select className="filterSelect">
            <option>Filter</option>
          </select>

          <button className="exportBtn">
            <DownloadIcon />
            Export
          </button>
        </div>

        <div className="tableWrapper">
          <table className="userTable">
            <thead className="tableHead">
              <tr className="headRow">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone no.</th>
                <th>Address</th>
                <th>Role</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="tableBody">
              {user.map((user) => (
                <tr className="bodyRow" key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                  <td>{user.branch}</td>

                  <td>
                    <span
                      className={
                        user.status === "Active"
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <div className="actionGroup">
                      <VisibilityOutlinedIcon className="viewIcon" />

                      <EditOutlinedIcon className="editIcon" />

                      <DeleteIcon className="deleteIcon" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
