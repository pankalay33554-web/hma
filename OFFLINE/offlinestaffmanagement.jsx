import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate, Outlet } from "react-router";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import "./offlinestaffmanagement.css";

const PAGE_SIZE = 10;

const roleList = [
  "Kitchen Supervisor",
  "Sale Person",
  "Delivery Rider",
  "Customer Service",
];

const initialStaffData = [
  {
    id: "#USR-001",
    name: "Ko Kyaw",
    phone: "09123456789",
    address: "Yangon",
    status: "Active",
  },
  {
    id: "#USR-002",
    name: "Ma Nwe Zu",
    phone: "09987654321",
    address: "Dawei",
    status: "Warning",
  },
  {
    id: "#USR-003",
    name: "Ko Zaw",
    phone: "09664523789",
    address: "Mandalay",
    status: "Leave",
  },
  {
    id: "#USR-004",
    name: "Ko Hein",
    phone: "09664523789",
    address: "Mandalay",
    status: "Active",
  },
  {
    id: "#USR-005",
    name: "Ko Kyaw",
    phone: "09664523789",
    address: "Mandalay",
    status: "Active",
  },
  {
    id: "#USR-006",
    name: "Su Su",
    phone: "09451234567",
    address: "Yangon",
    status: "Active",
  },
  {
    id: "#USR-007",
    name: "Mg Mg",
    phone: "09771234567",
    address: "Naypyidaw",
    status: "Warning",
  },
  {
    id: "#USR-008",
    name: "Hnin Hnin",
    phone: "09881234567",
    address: "Mandalay",
    status: "Active",
  },
  {
    id: "#USR-009",
    name: "Thiri",
    phone: "09991234567",
    address: "Yangon",
    status: "Leave",
  },
  {
    id: "#USR-010",
    name: "Aung Aung",
    phone: "09661234567",
    address: "Bago",
    status: "Active",
  },
  {
    id: "#USR-011",
    name: "May May",
    phone: "09441234567",
    address: "Dawei",
    status: "Active",
  },
  {
    id: "#USR-012",
    name: "Nay Lin",
    phone: "09771231234",
    address: "Yangon",
    status: "Active",
  },
  {
    id: "#USR-013",
    name: "Ei Ei",
    phone: "09881231234",
    address: "Mandalay",
    status: "Warning",
  },
  {
    id: "#USR-014",
    name: "Zaw Zaw",
    phone: "09991231234",
    address: "Yangon",
    status: "Active",
  },
  {
    id: "#USR-015",
    name: "Mya Mya",
    phone: "09661231234",
    address: "Bago",
    status: "Leave",
  },
  {
    id: "#USR-016",
    name: "Thant Zin",
    phone: "09441231234",
    address: "Mandalay",
    status: "Active",
  },
  {
    id: "#USR-017",
    name: "Su Mon",
    phone: "09771239876",
    address: "Yangon",
    status: "Active",
  },
  {
    id: "#USR-018",
    name: "Aye Chan",
    phone: "09881239876",
    address: "Dawei",
    status: "Warning",
  },
  {
    id: "#USR-019",
    name: "Phyo Wai",
    phone: "09991239876",
    address: "Mandalay",
    status: "Active",
  },
  {
    id: "#USR-020",
    name: "Khin Khin",
    phone: "09661239876",
    address: "Yangon",
    status: "Active",
  },
  {
    id: "#USR-021",
    name: "Tun Tun",
    phone: "09441239876",
    address: "Bago",
    status: "Leave",
  },
  {
    id: "#USR-022",
    name: "Wai Yan",
    phone: "09771239865",
    address: "Yangon",
    status: "Active",
  },
  {
    id: "#USR-023",
    name: "Nilar",
    phone: "09881239865",
    address: "Mandalay",
    status: "Active",
  },
  {
    id: "#USR-024",
    name: "Htet Htet",
    phone: "09991239865",
    address: "Dawei",
    status: "Warning",
  },
  {
    id: "#USR-025",
    name: "David",
    phone: "09661239865",
    address: "Yangon",
    status: "Active",
  },
  {
    id: "#USR-026",
    name: "John",
    phone: "09441239865",
    address: "Mandalay",
    status: "Active",
  },
  {
    id: "#USR-027",
    name: "Alice",
    phone: "09771239854",
    address: "Yangon",
    status: "Leave",
  },
  {
    id: "#USR-028",
    name: "Emily",
    phone: "09881239854",
    address: "Bago",
    status: "Active",
  },
  {
    id: "#USR-029",
    name: "Michael",
    phone: "09991239854",
    address: "Mandalay",
    status: "Active",
  },
  {
    id: "#USR-030",
    name: "William",
    phone: "09661239854",
    address: "Yangon",
    status: "Warning",
  },
];

export default function OfflineStaffManagement() {
  const [staffData, setStaffData] = useState(initialStaffData);
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("Kitchen Supervisor");

  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [deleteStaff, setDeleteStaff] = useState(null);

  const [viewStaff, setViewStaff] = useState(null);

  const [showRolePopup, setShowRolePopup] = useState(false);

  const [newRole, setNewRole] = useState("");

  const showMessage = (message, type = "success") => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "success",
        message: "",
      });
    }, 3000);
  };

  const filteredStaff = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return staffData.filter((staff) => {
      const roleMatch =
        selectedRole === "Kitchen Supervisor" ||
        selectedRole === "Sale Person" ||
        selectedRole === "Delivery Rider" ||
        selectedRole === "Customer Service";

      const searchMatch =
        !search ||
        staff.id.toLowerCase().includes(search) ||
        staff.name.toLowerCase().includes(search) ||
        staff.phone.toLowerCase().includes(search) ||
        staff.address.toLowerCase().includes(search) ||
        staff.status.toLowerCase().includes(search);

      return roleMatch && searchMatch;
    });
  }, [staffData, selectedRole, searchText]);

  const totalPages = Math.ceil(filteredStaff.length / PAGE_SIZE);

  const currentStaff = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredStaff.slice(start, start + PAGE_SIZE);
  }, [filteredStaff, currentPage]);

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  const handleExport = () => {
    if (!filteredStaff.length) {
      showMessage("Export လုပ်ရန် Staff data မရှိပါ။", "error");
      return;
    }

    try {
      const exportData = filteredStaff.map((staff) => ({
        "Staff ID": staff.id,
        Name: staff.name,
        Phone: staff.phone,
        Address: staff.address,
        Status: staff.status,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);

      worksheet["!cols"] = [
        { wch: 15 },
        { wch: 22 },
        { wch: 18 },
        { wch: 18 },
        { wch: 15 },
      ];

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Staff List");

      XLSX.writeFile(workbook, "staff-list.xlsx");
      showMessage(
        "Staff list ကို Excel file အဖြစ် Export လုပ်ပြီးပါပြီ။",
        "success",
      );
    } catch (error) {
      showMessage("Excel Export လုပ်ရာမှာ Error ဖြစ်သွားပါတယ်။", "error");
    }
  };

  const handleAddRole = () => {
    if (!newRole.trim()) {
      showMessage("Role name ထည့်ပေးပါ။", "error");
      return;
    }

    setShowRolePopup(false);
    setNewRole("");

    showMessage("Role အသစ်ကို ထည့်ပြီးပါပြီ။", "success");
  };

  const handleDeleteConfirm = () => {
    if (!deleteStaff) {
      return;
    }

    setStaffData((previous) =>
      previous.filter((staff) => staff.id !== deleteStaff.id),
    );

    setDeleteStaff(null);

    const newTotal = Math.ceil((filteredStaff.length - 1) / PAGE_SIZE);

    if (currentPage > newTotal && newTotal > 0) {
      setCurrentPage(newTotal);
    }

    showMessage(`${deleteStaff.name} ကို Delete လုပ်ပြီးပါပြီ။`, "success");
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPopupIcon = () => {
    if (popup.type === "error") {
      return <ErrorIcon className="staff-popup__icon-svg" />;
    }

    if (popup.type === "info") {
      return <InfoIcon className="staff-popup__icon-svg" />;
    }

    return <CheckCircleIcon className="staff-popup__icon-svg" />;
  };

  return (
    <div className="staff-management">
      <div className="staff-management__header">
        <h1 className="staff-management__title">Staff Management</h1>

        <div className="staff-management__manager">
          <div className="staff-management__manager-icon">
            <InfoIcon />
          </div>

          <div className="staff-management__manager-info">
            <span className="staff-management__manager-name">
              System Manager
            </span>

            <span className="staff-management__manager-id">HMIN MIN AUNG</span>
          </div>
        </div>
      </div>

      <section className="staff-management__role-section">
        <div className="staff-management__role-header">
          <h2 className="staff-management__section-title">Job Roles</h2>

          <button
            type="button"
            className="staff-management__outline-button"
            onClick={() => setShowRolePopup(true)}
          >
            <AddIcon />
            Add Role
          </button>
        </div>
        <div className="staff-management__role-list">
          {roleList.map((role) => (
            <button
              type="button"
              key={role}
              className={`staff-management__role-card ${
                selectedRole === role
                  ? "staff-management__role-card--active"
                  : ""
              }`}
              onClick={() => handleRoleChange(role)}
            >
              <span className="staff-management__role-name">{role}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="staff-management__staff-section">
        <div className="staff-management__staff-header">
          <h2 className="staff-management__section-title">Staff List</h2>

          <button
            type="button"
            className="staff-management__add-staff-button"
            onClick={() => navigate("addstaff")}
          >
            <AddIcon />
            Add Staff
          </button>
          <Outlet />
        </div>

        <div className="staff-management__table-card">
          <div className="staff-management__toolbar">
            <div className="staff-management__search">
              <SearchIcon className="staff-management__search-icon" />

              <input
                className="staff-management__search-input"
                type="text"
                value={searchText}
                placeholder="Search orders by ID or item..."
                onChange={(event) => handleSearch(event.target.value)}
              />
            </div>

            <button
              type="button"
              className="staff-management__export-button"
              onClick={handleExport}
            >
              <FileDownloadIcon />
              Export
            </button>
          </div>

          <div className="staff-management__table-wrapper">
            <table className="staff-management__table">
              <thead className="staff-management__table-head">
                <tr className="staff-management__table-row">
                  <th className="staff-management__table-heading">STAFF ID</th>

                  <th className="staff-management__table-heading">NAME</th>

                  <th className="staff-management__table-heading">PHONE</th>

                  <th className="staff-management__table-heading">ADDRESS</th>

                  <th className="staff-management__table-heading">STATUS</th>

                  <th className="staff-management__table-heading">ACTION</th>
                </tr>
              </thead>

              <tbody className="staff-management__table-body">
                {currentStaff.map((staff, index) => (
                  <tr
                    key={staff.id}
                    className="staff-managementtable-row staff-managementtable-row--body"
                    style={{
                      animationDelay: `${index * 0.04}s`,
                    }}
                  >
                    <td className="staff-managementtable-cell staff-managementid-cell">
                      {staff.id}
                    </td>

                    <td className="staff-managementtable-cell staff-managementname-cell">
                      {staff.name}
                    </td>

                    <td className="staff-management__table-cell">
                      {staff.phone}
                    </td>
                    <td className="staff-management__table-cell">
                      {staff.address}
                    </td>

                    <td className="staff-management__table-cell">
                      <span
                        className={`staff-management__status staff-management__status--${staff.status.toLowerCase()}`}
                      >
                        {staff.status}
                      </span>
                    </td>

                    <td className="staff-management__table-cell">
                      <div className="staff-management__actions">
                        <button
                          type="button"
                          className="staff-management__view-button"
                          onClick={() => navigate("staffdetail")}
                        >
                          [View]
                        </button>
                        <Outlet />

                        <button
                          type="button"
                          className="staff-management__delete-button"
                          onClick={() => setDeleteStaff(staff)}
                        >
                          [Delete]
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!currentStaff.length && (
                  <tr className="staff-management__table-row">
                    <td className="staff-management__empty" colSpan="6">
                      No staff entries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="staff-management__footer">
            <span className="staff-management__result-text">
              Showing{" "}
              {filteredStaff.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              -{Math.min(currentPage * PAGE_SIZE, filteredStaff.length)} of{" "}
              {filteredStaff.length} Staff entries
            </span>

            {totalPages > 1 && (
              <div className="staff-management__pagination">
                <button
                  type="button"
                  className="staff-management__page-arrow"
                  disabled={currentPage === 1}
                  onClick={handlePrevious}
                >
                  <KeyboardArrowLeftIcon />
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={`staff-management__page-number ${
                      currentPage === page
                        ? "staff-management__page-number--active"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="staff-management__page-arrow"
                  disabled={currentPage === totalPages}
                  onClick={handleNext}
                >
                  <KeyboardArrowRightIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {showRolePopup && (
        <div className="staff-modal-overlay">
          <div className="staff-modal">
            <div className="staff-modal__header">
              <h3 className="staff-modal__title">Add Role</h3>

              <button
                type="button"
                className="staff-modal__close"
                onClick={() => setShowRolePopup(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="staff-modal__body">
              <label className="staff-modal__label">Role Name</label>

              <input
                className="staff-modal__input"
                type="text"
                value={newRole}
                placeholder="Enter role name"
                onChange={(event) => setNewRole(event.target.value)}
              />
            </div>

            <div className="staff-modal__footer">
              <button
                type="button"
                className="staff-modal__cancel"
                onClick={() => setShowRolePopup(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="staff-modal__confirm"
                onClick={handleAddRole}
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}

      {viewStaff && (
        <div className="staff-modal-overlay">
          <div className="staff-modal">
            <div className="staff-modal__header">
              <h3 className="staff-modal__title">Staff Details</h3>

              <button
                type="button"
                className="staff-modal__close"
                onClick={() => setViewStaff(null)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="staff-view">
              <div className="staff-view__row">
                <span className="staff-view__label">Staff ID</span>

                <span className="staff-viewvalue staff-viewvalue--id">
                  {viewStaff.id}
                </span>
              </div>

              <div className="staff-view__row">
                <span className="staff-view__label">Name</span>

                <span className="staff-view__value">{viewStaff.name}</span>
              </div>

              <div className="staff-view__row">
                <span className="staff-view__label">Phone</span>

                <span className="staff-view__value">{viewStaff.phone}</span>
              </div>

              <div className="staff-view__row">
                <span className="staff-view__label">Address</span>

                <span className="staff-view__value">{viewStaff.address}</span>
              </div>

              <div className="staff-view__row">
                <span className="staff-view__label">Status</span>

                <span
                  className={`staff-management__status staff-management__status--${viewStaff.status.toLowerCase()}`}
                >
                  {viewStaff.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteStaff && (
        <div className="staff-modal-overlay">
          <div className="staff-modal staff-modal--delete">
            <div className="staff-delete__icon">
              <DeleteIcon />
            </div>

            <h3 className="staff-delete__title">Delete Staff?</h3>

            <p className="staff-delete__message">
              {deleteStaff.name} ကို Staff List ထဲကနေ Delete လုပ်မှာသေချာပါသလား။
            </p>

            <div className="staff-modal__footer">
              <button
                type="button"
                className="staff-modal__cancel"
                onClick={() => setDeleteStaff(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="staff-modal__delete-confirm"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {popup.show && (
        <div className={`staff-popup staff-popup--${popup.type}`}>
          <div className="staff-popup__content">
            <div className="staff-popup__icon">{getPopupIcon()}</div>

            <div className="staff-popup__message">{popup.message}</div>

            <button
              type="button"
              className="staff-popup__close"
              onClick={() =>
                setPopup({
                  show: false,
                  type: "success",
                  message: "",
                })
              }
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
