import { useMemo, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PersonIcon from "@mui/icons-material/Person";

import "./onlinestaff.css";

const ADMIN_PASSCODE = "123456";
const PAGE_SIZE = 15;

const initialRoles = [
  "Kitchen Supervisor",
  "Sale Person",
  "Delivery Rider",
  "Customer Service",
];

const initialStaff = [
  {
    id: "USR-001",
    name: "Hnin",
    phone: "09123456789",
    address: "Yangon",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Maung Za",
    phone: "0987654321",
    address: "Insein",
    role: "Kitchen Supervisor",
    status: "Warning",
  },
  {
    id: "USR-003",
    name: "Ko Zaw",
    phone: "09402327388",
    address: "Mandalay",
    role: "Kitchen Supervisor",
    status: "Leave",
  },
  {
    id: "USR-004",
    name: "Kyaw",
    phone: "09791234578",
    address: "Mandalay",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-005",
    name: "Mg Ko",
    phone: "09456327890",
    address: "Mandalay",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-006",
    name: "Aung Aung",
    phone: "09987654321",
    address: "Yangon",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-007",
    name: "Thura",
    phone: "09234567891",
    address: "Yangon",
    role: "Kitchen Supervisor",
    status: "Warning",
  },
  {
    id: "USR-008",
    name: "Min Min",
    phone: "09765432109",
    address: "Bago",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-009",
    name: "Nay Lin",
    phone: "09456789123",
    address: "Mandalay",
    role: "Kitchen Supervisor",
    status: "Leave",
  },
  {
    id: "USR-010",
    name: "Htet Htet",
    phone: "09876543210",
    address: "Yangon",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-011",
    name: "Myo Min",
    phone: "09223344556",
    address: "Insein",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-012",
    name: "Aye Chan",
    phone: "09988776655",
    address: "Yangon",
    role: "Kitchen Supervisor",
    status: "Warning",
  },
  {
    id: "USR-013",
    name: "Tun Tun",
    phone: "09445566778",
    address: "Bago",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-014",
    name: "Kyaw Zin",
    phone: "09778899001",
    address: "Mandalay",
    role: "Kitchen Supervisor",
    status: "Leave",
  },
  {
    id: "USR-015",
    name: "Su Su",
    phone: "09221133445",
    address: "Yangon",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-016",
    name: "Moe Moe",
    phone: "09441122334",
    address: "Yangon",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-017",
    name: "Zaw Zaw",
    phone: "09912233445",
    address: "Bago",
    role: "Kitchen Supervisor",
    status: "Warning",
  },
  {
    id: "USR-018",
    name: "Ei Ei",
    phone: "09773322110",
    address: "Mandalay",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-019",
    name: "Hla Hla",
    phone: "09442211335",
    address: "Yangon",
    role: "Kitchen Supervisor",
    status: "Active",
  },
  {
    id: "USR-020",
    name: "Lin Lin",
    phone: "09881122334",
    address: "Insein",
    role: "Kitchen Supervisor",
    status: "Leave",
  },
];

const OnlineStaff = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [staffList, setStaffList] = useState(initialStaff);

  const [selectedRole, setSelectedRole] = useState(initialRoles[0]);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showStaffPopup, setShowStaffPopup] = useState(false);
  const [showRolePopup, setShowRolePopup] = useState(false);

  const [deleteStaff, setDeleteStaff] = useState(null);
  const [showSecurityPopup, setShowSecurityPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");

  const navigate = useNavigate();

  const [message, setMessage] = useState({
    show: false,
    type: "success",
    text: "",
  });

  const [staffForm, setStaffForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [roleName, setRoleName] = useState("");

  const showMessage = (text, type = "success") => {
    setMessage({
      show: true,
      type,
      text,
    });

    setTimeout(() => {
      setMessage((prev) => ({
        ...prev,
        show: false,
      }));
    }, 2500);
  };

  const filteredStaff = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return staffList.filter((staff) => {
      const matchesRole = staff.role === selectedRole;

      const matchesSearch =
        !search ||
        staff.id.toLowerCase().includes(search) ||
        staff.name.toLowerCase().includes(search) ||
        staff.phone.toLowerCase().includes(search) ||
        staff.address.toLowerCase().includes(search) ||
        staff.status.toLowerCase().includes(search);

      return matchesRole && matchesSearch;
    });
  }, [staffList, selectedRole, searchText]);

  const totalPages = Math.ceil(filteredStaff.length / PAGE_SIZE);

  const visibleStaff = filteredStaff.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setSearchText("");
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (staffId, status) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff.id === staffId
          ? {
              ...staff,
              status,
            }
          : staff,
      ),
    );

    showMessage("Staff status updated successfully.");
  };

  const handleAddStaff = () => {
    const name = staffForm.name.trim();
    const phone = staffForm.phone.trim();
    const address = staffForm.address.trim();

    if (!name || !phone || !address) {
      showMessage("Please fill in all staff information.", "error");
      return;
    }

    if (!/^[0-9+\-\s]+$/.test(phone)) {
      showMessage("Please enter a valid phone number.", "error");
      return;
    }

    const newStaff = {
      id: `USR-${String(staffList.length + 1).padStart(3, "0")}`,
      name,
      phone,
      address,
      role: selectedRole,
      status: "Active",
    };

    setStaffList((prev) => [...prev, newStaff]);

    setStaffForm({
      name: "",
      phone: "",
      address: "",
    });

    setShowStaffPopup(false);
    setCurrentPage(1);

    showMessage("Staff added successfully.");
  };

  const handleAddRole = () => {
    const newRole = roleName.trim();

    if (!newRole) {
      showMessage("Please enter a job role.", "error");
      return;
    }
    const roleExists = roles.some(
      (role) => role.toLowerCase() === newRole.toLowerCase(),
    );

    if (roleExists) {
      showMessage("This job role already exists.", "error");
      return;
    }

    setRoles((prev) => [...prev, newRole]);
    setSelectedRole(newRole);
    setRoleName("");
    setShowRolePopup(false);

    showMessage("Job role added successfully.");
  };

  const handleDeleteClick = (staff) => {
    setDeleteStaff(staff);

    setPasscode("");
    setPasscodeError("");
    setShowPasscode(false);

    setShowDeleteConfirm(false);
    setShowSecurityPopup(true);
  };

  const handleSecurityVerify = () => {
    if (!passcode.trim()) {
      setPasscodeError("Please enter your passcode.");
      return;
    }

    if (passcode !== ADMIN_PASSCODE) {
      setPasscodeError("Incorrect passcode. Please try again.");
      return;
    }

    setPasscode("");
    setPasscodeError("");
    setShowPasscode(false);
    setShowSecurityPopup(false);

    setTimeout(() => {
      setShowDeleteConfirm(true);
    }, 200);
  };

  const handleCancelSecurity = () => {
    setShowSecurityPopup(false);
    setDeleteStaff(null);
    setPasscode("");
    setPasscodeError("");
    setShowPasscode(false);
  };

  const handleCancelDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setDeleteStaff(null);
  };

  const confirmDeleteStaff = () => {
    if (!deleteStaff) return;

    setStaffList((prev) => prev.filter((staff) => staff.id !== deleteStaff.id));

    setShowDeleteConfirm(false);
    setDeleteStaff(null);
    setCurrentPage(1);

    showMessage("Staff deleted successfully.");
  };

  const handleExport = () => {
    if (!filteredStaff.length) {
      showMessage("There is no staff data to export.", "error");
      return;
    }

    const headers = [
      "Staff ID",
      "Name",
      "Phone",
      "Address",
      "Job Role",
      "Status",
    ];

    const rows = filteredStaff.map((staff) => [
      staff.id,
      staff.name,
      staff.phone,
      staff.address,
      staff.role,
      staff.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((item) => `"${String(item).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "staff-list.csv";
    link.click();

    URL.revokeObjectURL(url);

    showMessage("Staff list exported successfully.");
  };

  return (
    <div className="staff-page">
      <div className="staff-header">
        <div className="staff-header-title">
          <h1>Staff Management</h1>
        </div>

        <div className="staff-manager">
          <div className="staff-manager-icon">
            <PersonIcon />
          </div>

          <div className="staff-manager-info">
            <span className="staff-manager-role">System Manager</span>

            <span className="staff-manager-name">HMIN MIN AUNG</span>
          </div>
        </div>
      </div>

      <div className="staff-content">
        <div className="role-section">
          <div className="section-heading-row">
            <h2>Job Roles</h2>

            <button
              className="outline-add-button"
              onClick={() => setShowRolePopup(true)}
            >
              <AddIcon />
              Add Role
            </button>
          </div>

          <div className="role-list">
            {roles.map((role) => (
              <button
                key={role}
                className={`role-card ${
                  selectedRole === role ? "role-card-active" : ""
                }`}
                onClick={() => handleRoleChange(role)}
              >
                <span>{role}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="staff-list-section">
          <div className="section-heading-row">
            <h2>Staff List</h2>

            <button
              className="add-staff-button"
              onClick={() => navigate("addstaff")}
            >
              <AddIcon />
              Add Staff
            </button>
            <Outlet />
          </div>

          <div className="staff-table-card">
            <div className="staff-toolbar">
              <div className="staff-search-box">
                <SearchIcon />

                <input
                  value={searchText}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search staff by ID or term..."
                />
              </div>

              <button className="export-button" onClick={handleExport}>
                <DownloadIcon />
                Export
              </button>
            </div>

            <div className="staff-table">
              <div className="staff-table-header">
                <div className="staff-column staff-id-column">STAFF ID</div>

                <div className="staff-column staff-name-column">NAME</div>

                <div className="staff-column staff-phone-column">PHONE</div>

                <div className="staff-column staff-address-column">ADDRESS</div>

                <div className="staff-column staff-status-column">STATUS</div>

                <div className="staff-column staff-action-column">ACTION</div>
              </div>

              {visibleStaff.length > 0 ? (
                visibleStaff.map((staff) => (
                  <div className="staff-table-row" key={staff.id}>
                    <div className="staff-column staff-id-column">
                      {staff.id}
                    </div>

                    <div className="staff-column staff-name-column">
                      {staff.name}
                    </div>

                    <div className="staff-column staff-phone-column">
                      {staff.phone}
                    </div>

                    <div className="staff-column staff-address-column">
                      {staff.address}
                    </div>

                    <div className="staff-column staff-status-column">
                      <select
                        className={`status-select status-${staff.status.toLowerCase()}`}
                        value={staff.status}
                        onChange={(event) =>
                          handleStatusChange(staff.id, event.target.value)
                        }
                      >
                        <option value="Active">Active</option>

                        <option value="Warning">Warning</option>

                        <option value="Leave">Leave</option>
                      </select>
                    </div>
                    <div className="staff-column staff-action-column">
                      <button
                        className="view-action"
                        onClick={() => navigate("staffdetail")}
                      >
                        View
                      </button>

                      <button
                        className="delete-action"
                        onClick={() => handleDeleteClick(staff)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-staff">
                  <PersonIcon />
                  <span>No staff found.</span>
                </div>
              )}
            </div>

            <div className="staff-table-footer">
              <div className="staff-result-text">
                Showing{" "}
                {filteredStaff.length === 0
                  ? 0
                  : (currentPage - 1) * PAGE_SIZE + 1}{" "}
                - {Math.min(currentPage * PAGE_SIZE, filteredStaff.length)} of{" "}
                {filteredStaff.length} staff entries
              </div>

              {filteredStaff.length >= PAGE_SIZE && (
                <div className="pagination">
                  <button
                    className="pagination-button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                  >
                    <KeyboardArrowLeftIcon />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      className={`pagination-button ${
                        currentPage === page ? "pagination-active" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="pagination-button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                  >
                    <KeyboardArrowRightIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showStaffPopup && (
        <div className="popup-overlay">
          <div className="staff-popup">
            <div className="popup-header">
              <div>
                <h3>Add Staff</h3>

                <span>{selectedRole}</span>
              </div>

              <button
                className="popup-close"
                onClick={() => setShowStaffPopup(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="popup-form">
              <div className="form-field">
                <label>Staff Name</label>
                <input
                  value={staffForm.name}
                  onChange={(event) =>
                    setStaffForm((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Enter staff name"
                />
              </div>

              <div className="form-field">
                <label>Phone</label>

                <input
                  value={staffForm.phone}
                  onChange={(event) =>
                    setStaffForm((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-field">
                <label>Address</label>

                <input
                  value={staffForm.address}
                  onChange={(event) =>
                    setStaffForm((prev) => ({
                      ...prev,
                      address: event.target.value,
                    }))
                  }
                  placeholder="Enter address"
                />
              </div>

              <div className="popup-info-box">
                <span>Status</span>

                <strong>Active</strong>

                <small>Admin can change the status after staff creation.</small>
              </div>
            </div>

            <div className="popup-actions">
              <button
                className="popup-cancel-button"
                onClick={() => setShowStaffPopup(false)}
              >
                Cancel
              </button>

              <button className="popup-save-button" onClick={handleAddStaff}>
                Add Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {showRolePopup && (
        <div className="popup-overlay">
          <div className="role-popup">
            <div className="popup-header">
              <div>
                <h3>Add Job Role</h3>

                <span>Create a new staff role</span>
              </div>

              <button
                className="popup-close"
                onClick={() => setShowRolePopup(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="popup-form">
              <div className="form-field">
                <label>Job Role</label>

                <input
                  value={roleName}
                  onChange={(event) => setRoleName(event.target.value)}
                  placeholder="Enter job role"
                />
              </div>
            </div>

            <div className="popup-actions">
              <button
                className="popup-cancel-button"
                onClick={() => setShowRolePopup(false)}
              >
                Cancel
              </button>

              <button className="popup-save-button" onClick={handleAddRole}>
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}

      {showSecurityPopup && deleteStaff && (
        <div className="popup-overlay">
          <div className="security-popup">
            <div className="security-popup-header">
              <div className="security-title">
                <LockIcon />

                <h3>Security Verification</h3>
              </div>

              <button
                className="security-close-button"
                onClick={handleCancelSecurity}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="security-popup-content">
              <p className="security-description">
                Please enter your manager password to continue with this action.
              </p>

              <div className="passcode-field">
                <label>Manager Password</label>

                <div className="passcode-input-wrapper">
                  <input
                    className={`passcode-input ${
                      passcodeError ? "passcode-input-error" : ""
                    }`}
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(event) => {
                      setPasscode(event.target.value);
                      setPasscodeError("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSecurityVerify();
                      }
                    }}
                    placeholder="Enter passcode"
                    autoFocus
                  />

                  <button
                    className="passcode-visibility-button"
                    onClick={() => setShowPasscode((prev) => !prev)}
                  >
                    {showPasscode ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>

                {passcodeError && (
                  <div className="passcode-error-message">
                    <WarningAmberIcon />

                    <span>{passcodeError}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="security-popup-actions">
              <button
                className="security-cancel-button"
                onClick={handleCancelSecurity}
              >
                Cancel
              </button>

              <button
                className="security-verify-button"
                onClick={handleSecurityVerify}
              >
                Verify & Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && deleteStaff && (
        <div className="popup-overlay">
          <div className="delete-popup">
            <div className="delete-warning-icon">
              <WarningAmberIcon />
            </div>

            <h3>Delete Staff?</h3>

            <p>Are you sure you want to delete?</p>

            <div className="delete-popup-actions">
              <button
                className="delete-cancel-button"
                onClick={handleCancelDeleteConfirm}
              >
                Cancel
              </button>

              <button
                className="delete-confirm-button"
                onClick={confirmDeleteStaff}
              >
                Delete Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {message.show && (
        <div
          className={`message-popup ${
            message.type === "error" ? "message-error" : "message-success"
          }`}
        >
          <span>{message.text}</span>

          <button
            className="message-close"
            onClick={() =>
              setMessage((prev) => ({
                ...prev,
                show: false,
              }))
            }
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default OnlineStaff;
