import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InfoIcon from "@mui/icons-material/Info";
import StaffDetails from "./staffDetails";
import "../shopmanagmentcss/managerStaff.css";

export default function ManagerStaff() {
  const [currentView, setCurrentView] = useState("LIST");
  const [selectedStaff, setSelectedStaff] = useState(null);

  // --- Modals Toggle ---
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // --- Search & Pagination States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // --- Targets & Selected Entities ---
  const [selectedRole, setSelectedRole] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);

  // --- Add Role Inputs ---
  const [roleTitle, setRoleTitle] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const [roleSop, setRoleSop] = useState("");
  const [rolePolicy, setRolePolicy] = useState("");
  const [roleSupplies, setRoleSupplies] = useState("");
  const [roleSalary, setRoleSalary] = useState("");
  const [roleDays, setRoleDays] = useState("");

  // --- Add Staff Inputs ---
  const [staffName, setStaffName] = useState("");
  const [staffNrc, setStaffNrc] = useState("");
  const [staffDob, setStaffDob] = useState("");
  const [staffGender, setStaffGender] = useState("");
  const [staffAge, setStaffAge] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffEdu, setStaffEdu] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState(""); // State for Temporary Password
  const [staffAddress, setStaffAddress] = useState("");
  const [staffPrevEmp, setStaffPrevEmp] = useState("");
  const [staffJobRole, setStaffJobRole] = useState("");
  const [staffStart, setStaffStart] = useState("");
  const [staffContract, setStaffContract] = useState("Probationary");

  // UI Show/Hide Password State inside Modal
  const [showAddStaffPassword, setShowAddStaffPassword] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  // --- Dynamic Mock Roles Data ---
  const [roles, setRoles] = useState([
    {
      id: "r1",
      title: "Kitchen Supervisor",
      description:
        "Overseeing daily kitchen prep, managing staff shifts, quality control of burger assembly, and maintaining hygiene standards.",
      sop: "Food Safety & Hygiene Checklist, Kitchen Equipment Operation & Maintenance Manual, First-In-First-Out (FIFO) Inventory Management.",
      policy:
        "Food Safety and Sanitation Policy, Kitchen Dress Code & Personal Hygiene Policy, Waste Management & Sustainability Guidelines.",
      supplies:
        "Chef Uniform (3 sets), Aprons (3 pcs), Kitchen Safety Shoes (1 pair), Digital Thermometer, Locker Key, Supervisor ID Card.",
      salary: "450,000 Ks",
      days: "6 DAYS",
    },
    {
      id: "r2",
      title: "Sale Person",
      description: "Handling customer sales...",
      sop: "POS Guide...",
      policy: "Cashier policy...",
      supplies: "Uniform...",
      salary: "350,000 Ks",
      days: "6 DAYS",
    },
    {
      id: "r3",
      title: "Delivery Rider",
      description: "Delivering orders...",
      sop: "Safety route...",
      policy: "Speed policy...",
      supplies: "Helmet, Bag...",
      salary: "380,000 Ks",
      days: "6 DAYS",
    },
    {
      id: "r4",
      title: "Customer Service",
      description: "Managing desk...",
      sop: "Greeting guide...",
      policy: "Code of conduct...",
      supplies: "ID Card...",
      salary: "320,000 Ks",
      days: "5 DAYS",
    },
  ]);

  // --- Dynamic Mock Staff List Data ---
  const [staffList, setStaffList] = useState([
    {
      id: "#USR-001",
      name: "Ko Kyaw",
      role: "Kitchen Supervisor",
      phone: "09123456789",
      address: "Yangon",
      status: "Active",
      nrc: "12/LATHANA(N)123456",
      dob: "2002-03-21",
      gender: "Male",
      age: "24",
      education: "B.A, Myanmar",
      email: "kokyaw@email.com",
      password: "password123",
      lastEmployment:
        "Senior Kitchen Staff at Prime Grill (2019-2023) - Managed inventory and grill station operations.",
      startDate: "2024-01-01",
      contractType: "PERMANENT FULL-TIME",
      bonus: "+50,000",
      fines: "0",
      leave: "3",
      offDays: "4",
      remarks: "Excellent kitchen orchestration.",
    },
    {
      id: "#USR-002",
      name: "Ma Nan Zu",
      role: "Sale Person",
      phone: "09987654321",
      address: "Dawei",
      status: "Warning",
      nrc: "14/MAMANA(N)654321",
      dob: "2003-05-12",
      gender: "Female",
      age: "23",
      education: "B.Com",
      email: "nanzu@email.com",
      password: "password123",
      lastEmployment: "Cashier at Shop",
      startDate: "2024-02-15",
      contractType: "PROBATIONARY",
      bonus: "0",
      fines: "5,000",
      leave: "5",
      offDays: "2",
      remarks: "",
    },
    {
      id: "#USR-003",
      name: "Ko Zwe",
      role: "Delivery Rider",
      phone: "09456123789",
      address: "Mandalay",
      status: "Leave",
      nrc: "09/AMAZANA(N)789123",
      dob: "2000-11-05",
      gender: "Male",
      age: "26",
      education: "Matriculated",
      email: "kozwe@email.com",
      password: "password123",
      lastEmployment: "Food Rider",
      startDate: "2023-10-01",
      contractType: "PERMANENT FULL-TIME",
      bonus: "+20,000",
      fines: "0",
      leave: "12",
      offDays: "8",
      remarks: "",
    },
  ]);

  // --- Real-time Local Search Logic ---
  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // --- Dynamic Pagination Core Logic ---
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredStaff.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredStaff.length / rowsPerPage);

  const handleExportCSV = () => {
    const csvRows = [
      ["STAFF ID", "NAME", "ROLE", "PHONE", "ADDRESS", "STATUS"],
      ...filteredStaff.map((s) => [
        s.id,
        s.name,
        s.role,
        s.phone,
        s.address,
        s.status,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Staff_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateRole = () => {
    if (!roleTitle.trim()) return;
    const newRole = {
      id: `r${roles.length + 1}`,
      title: roleTitle,
      description: roleDesc,
      sop: roleSop,
      policy: rolePolicy,
      supplies: roleSupplies,
      salary: roleSalary ? `${roleSalary} Ks` : "0 Ks",
      days: roleDays ? `${roleDays.toUpperCase()}` : "6 DAYS",
    };
    setRoles([...roles, newRole]);
    setRoleTitle("");
    setRoleDesc("");
    setRoleSop("");
    setRolePolicy("");
    setRoleSupplies("");
    setRoleSalary("");
    setRoleDays("");
    setShowAddRoleModal(false);
  };

  const handleCreateStaff = () => {
    if (!staffName.trim()) return;
    const nextIdNum = staffList.length + 1;
    const newStaff = {
      id: `#USR-00${nextIdNum}`,
      name: staffName,
      role: staffJobRole || "Sale Person",
      phone: staffPhone || "-",
      address: staffAddress || "-",
      status: "Active",
      nrc: staffNrc,
      dob: staffDob,
      gender: staffGender,
      age: staffAge,
      education: staffEdu,
      email: staffEmail,
      password: staffPassword || "TempPass2026!", // Save temporary password
      lastEmployment: staffPrevEmp,
      startDate: staffStart,
      contractType: staffContract.toUpperCase(),
      bonus: "0",
      fines: "0",
      leave: "0",
      offDays: "0",
      remarks: "",
    };
    setStaffList([...staffList, newStaff]);

    // Clear Form inputs
    setStaffName("");
    setStaffNrc("");
    setStaffDob("");
    setStaffGender("");
    setStaffAge("");
    setStaffPhone("");
    setStaffEdu("");
    setStaffEmail("");
    setStaffPassword("");
    setStaffAddress("");
    setStaffPrevEmp("");
    setStaffJobRole("");
    setStaffStart("");
    setShowAddStaffModal(false);
  };

  if (currentView === "DETAILS") {
    return (
      <StaffDetails
        staff={selectedStaff}
        roles={roles}
        onBack={() => setCurrentView("LIST")}
      />
    );
  }

  const executeDeleteStaff = (staff) => {
    setStaffToDelete(staff);
    setSelectedStaffId(staff.id);
    setShowDeleteModal(true);
  };

  return (
    <div className="staff-page-wrapper">
      <header className="sales-top-bar">
        <div className="top-title-area">
          <h1>Staff Management</h1>
          <span className="badge-shop">Burger Shop 1</span>
        </div>
        <div className="top-bar-right-actions-group">
          <div className="user-profile">
            <div className="profile-divider"></div>
            <div className="profile-text">
              <span className="role">Executive Manager</span>
              <span className="name">HEIN MIN AUNG</span>
            </div>
          </div>
        </div>
      </header>

      <div className="staff-body-container">
        {/* Job Roles Header Panel */}
        <div className="section-title-action-row">
          <h2>Job Roles</h2>
          <button
            className="btn-primary-maroon flex-align-center"
            onClick={() => setShowAddRoleModal(true)}
          >
            <AddIcon style={{ fontSize: "1.1rem", marginRight: "4px" }} /> Add
            Role
          </button>
        </div>

        {/* Horizontal Scroll Deck Layout */}
        <div className="roles-horizontal-deck">
          {roles.map((role) => (
            <div
              key={role.id}
              className="role-clickable-card"
              onClick={() => {
                setSelectedRole(role);
                setShowEditRoleModal(true);
              }}
            >
              <span>{role.title}</span>
            </div>
          ))}
        </div>

        <hr className="section-horizontal-divider" />

        {/* Staff Table Section Title Row */}
        <div className="section-title-action-row">
          <h2>Staff List</h2>
          <button
            className="btn-outline-beige flex-align-center"
            onClick={() => setShowAddStaffModal(true)}
          >
            <AddIcon style={{ fontSize: "1.1rem", marginRight: "4px" }} /> Add
            Staff
          </button>
        </div>

        {/* Search, Export Filters Center Control */}
        <div className="table-filter-control-center-box">
          <div className="search-bar-input-wrapper">
            <SearchIcon className="search-box-lead-icon" />
            <input
              type="text"
              placeholder="Search users by ID or name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="btn-primary-maroon flex-align-center text-btn"
            onClick={handleExportCSV}
          >
            <FileDownloadIcon
              style={{ fontSize: "1.2rem", marginRight: "6px" }}
            />{" "}
            Export
          </button>
        </div>

        {/* Master Data Table Container */}
        <div className="table-responsive-wrapper-card">
          <table className="staff-master-data-table">
            <thead>
              <tr>
                <th>STAFF ID</th>
                <th>NAME</th>
                <th>ROLE</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                <th>STATUS</th>
                <th style={{ textAlign: "center" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((staff) => (
                  <tr key={staff.id}>
                    <td className="bold-id-text">{staff.id}</td>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.address}</td>
                    <td>
                      <span
                        className={`status-pill-row ${staff.status.toLowerCase()}`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div className="action-buttons-inline-cell">
                        <button
                          className="action-txt-btn view"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setCurrentView("DETAILS");
                          }}
                        >
                          [View]
                        </button>
                        <button
                          className="action-txt-btn delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            executeDeleteStaff(staff);
                          }}
                        >
                          [Delete]
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      color: "#8c8273",
                      padding: "30px",
                    }}
                  >
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Dynamic Pagination Panel */}
          <div className="table-pagination-footer-panel">
            <span className="entries-count-txt">
              Showing {filteredStaff.length === 0 ? 0 : indexOfFirstRow + 1}-
              {Math.min(indexOfLastRow, filteredStaff.length)} of{" "}
              {filteredStaff.length} user entries
            </span>
            <div className="pagination-pages-list">
              <button
                className="pag-nav-arrow"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    className={`pag-page-num-btn ${currentPage === pageNum ? "active-page" : ""}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ),
              )}
              <button
                className="pag-nav-arrow"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1. ADD ROLE MODAL */}

      {showAddRoleModal && (
        <div className="modal-overlay-backdrop-layer">
          <div className="modal-container-box large-size-width animate-zoom">
            <div className="modal-header-line">
              <h3>Add New Role</h3>
              <button
                className="close-modal-x-btn"
                onClick={() => setShowAddRoleModal(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body-scrollable-content">
              <div className="input-block full-width-field">
                <label>JOB ROLE</label>
                <input
                  type="text"
                  placeholder="Enter Job Role"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                />
              </div>
              <div className="form-grid-two-cols mt-15">
                <div className="input-block">
                  <label>JOB DESCRIPTION</label>
                  <textarea
                    placeholder="e.g., Responsible for managing daily sales operations..."
                    value={roleDesc}
                    onChange={(e) => setRoleDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="input-block">
                  <label>SOP ASSIGNMENT</label>
                  <textarea
                    placeholder="e.g., Follow the standard opening and closing checklist..."
                    value={roleSop}
                    onChange={(e) => setRoleSop(e.target.value)}
                  ></textarea>
                </div>
                <div className="input-block">
                  <label>POLICY BINDING</label>
                  <textarea
                    placeholder="e.g., Strictly adhere to the company's policy."
                    value={rolePolicy}
                    onChange={(e) => setRolePolicy(e.target.value)}
                  ></textarea>
                </div>
                <div className="input-block">
                  <label>ISSUED SUPPLIES</label>
                  <textarea
                    placeholder="e.g., Company Uniform, ID Card..."
                    value={roleSupplies}
                    onChange={(e) => setRoleSupplies(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="form-grid-two-cols mt-15">
                <div className="input-block">
                  <label>BASIC SALARY (MMK)</label>
                  <input
                    type="text"
                    placeholder="Enter Salary"
                    value={roleSalary}
                    onChange={(e) => setRoleSalary(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label>WORKING DAYS</label>
                  <input
                    type="text"
                    placeholder="eg. 6 Days"
                    value={roleDays}
                    onChange={(e) => setRoleDays(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer-action-row">
              <button
                className="btn-secondary-flat"
                onClick={() => setShowAddRoleModal(false)}
              >
                Cancel
              </button>
              <button className="btn-primary-maroon" onClick={handleCreateRole}>
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. EDIT ROLE MODAL */}

      {showEditRoleModal && selectedRole && (
        <div className="modal-overlay-backdrop-layer">
          <div className="modal-container-box large-size-width animate-zoom">
            <div className="modal-header-line">
              <h3>Edit Role</h3>
              <button
                className="close-modal-x-btn"
                onClick={() => setShowEditRoleModal(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body-scrollable-content">
              <div className="input-block full-width-field">
                <label>JOB ROLE</label>
                <input type="text" defaultValue={selectedRole.title} />
              </div>
              <div className="form-grid-two-cols mt-15">
                <div className="input-block">
                  <label>JOB DESCRIPTION</label>
                  <textarea defaultValue={selectedRole.description}></textarea>
                </div>
                <div className="input-block">
                  <label>SOP ASSIGNMENT</label>
                  <textarea defaultValue={selectedRole.sop}></textarea>
                </div>
                <div className="input-block">
                  <label>POLICY BINDING</label>
                  <textarea defaultValue={selectedRole.policy}></textarea>
                </div>
                <div className="input-block">
                  <label>ISSUED SUPPLIES</label>
                  <textarea defaultValue={selectedRole.supplies}></textarea>
                </div>
              </div>
              <div className="form-grid-two-cols mt-15">
                <div className="input-block">
                  <label>BASIC SALARY (MMK)</label>
                  <input type="text" defaultValue={selectedRole.salary} />
                </div>
                <div className="input-block">
                  <label>WORKING DAYS</label>
                  <input type="text" defaultValue={selectedRole.days} />
                </div>
              </div>
            </div>
            <div className="modal-footer-action-row">
              <button
                className="btn-secondary-flat"
                onClick={() => setShowEditRoleModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary-maroon"
                onClick={() => setShowEditRoleModal(false)}
              >
                Update Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FIGMA UPDATED: ADD NEW STAFF MODAL VIEW */}

      {showAddStaffModal && (
        <div className="modal-overlay-backdrop-layer">
          <div className="modal-container-box large-size-width animate-zoom">
            <div className="modal-header-line-custom">
              <div className="modal-header-left-title">
                <AddIcon
                  style={{
                    fontSize: "1.4rem",
                    marginRight: "6px",
                    color: "#8a1e2b",
                  }}
                />
                <h3>Add New Staff</h3>
              </div>
              <button
                className="close-modal-x-btn"
                onClick={() => setShowAddStaffModal(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-body-scrollable-content container-padding-fix">
              {/* Inline Indicator Header */}
              <div className="modal-inline-section-header">
                <span className="section-indicator-bar"></span>
                <span>STANDARD STAFF PERSONAL DETAILS</span>
              </div>

              <div className="form-grid-three-cols mt-15">
                <div className="input-block">
                  <label>FULL NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label>NRC NUMBER</label>
                  <input
                    type="text"
                    placeholder="12/MAMANA(N)123456"
                    value={staffNrc}
                    onChange={(e) => setStaffNrc(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label>DOB</label>
                  <input
                    type="date"
                    value={staffDob}
                    onChange={(e) => setStaffDob(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label>GENDER</label>
                  <select
                    value={staffGender}
                    onChange={(e) => setStaffGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="input-block">
                  <label>AGE</label>
                  <input
                    type="number"
                    placeholder="00"
                    value={staffAge}
                    onChange={(e) => setStaffAge(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label>CONTACT NUMBER</label>
                  <input
                    type="text"
                    placeholder="+95 9..."
                    value={staffPhone}
                    onChange={(e) => setStaffPhone(e.target.value)}
                  />
                </div>
                <div className="input-block">
                  <label>HIGHEST EDUCATION</label>
                  <input
                    type="text"
                    placeholder="Degree / Certification"
                    value={staffEdu}
                    onChange={(e) => setStaffEdu(e.target.value)}
                  />
                </div>
                <div className="input-block full-width-span-two">
                  <label>RESIDENTIAL ADDRESS</label>
                  <input
                    type="text"
                    placeholder="Street, Township, City"
                    value={staffAddress}
                    onChange={(e) => setStaffAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-block full-width-field mt-15">
                <label>LAST EMPLOYMENT DETAILS</label>
                <textarea
                  placeholder="Briefly describe previous experience and reason for leaving..."
                  value={staffPrevEmp}
                  onChange={(e) => setStaffPrevEmp(e.target.value)}
                ></textarea>
              </div>

              <div className="form-grid-three-cols mt-15 flex-align-end">
                <div className="input-block">
                  <label>ASSIGNED JOB ROLE</label>
                  <select
                    value={staffJobRole}
                    onChange={(e) => setStaffJobRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-block">
                  <label>EMPLOYMENT START DATE</label>
                  <input
                    type="date"
                    value={staffStart}
                    onChange={(e) => setStaffStart(e.target.value)}
                  />
                </div>
                <div className="input-block checkbox-toggle-layout-box">
                  <label>CONTRACT TYPE</label>
                  <div className="radio-horizontal-row-container">
                    <label className="radio-label-item">
                      <input
                        type="radio"
                        name="contractType"
                        checked={staffContract === "Permanent"}
                        onChange={() => setStaffContract("Permanent")}
                      />{" "}
                      <span>Permanent</span>
                    </label>
                    <label className="radio-label-item">
                      <input
                        type="radio"
                        name="contractType"
                        checked={staffContract === "Probationary"}
                        onChange={() => setStaffContract("Probationary")}
                      />{" "}
                      <span>Probationary</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* FIGMA ADDED: MOBILE APP LOGIN CREDENTIALS HIGHLIGHT BOX */}
              <div className="modal-credentials-highlight-container mt-25">
                <div className="credentials-box-title-row">
                  <LockIcon
                    style={{
                      fontSize: "1.1rem",
                      color: "#8a1e2b",
                      marginRight: "6px",
                    }}
                  />
                  <span className="lock-box-text-header">
                    MOBILE APP LOGIN CREDENTIALS (CRITICAL ACCESS)
                  </span>
                </div>

                <div className="form-grid-two-cols mt-15">
                  <div className="input-block relative-addon-field">
                    <label>STAFF LOGIN EMAIL</label>
                    <div className="input-with-trailing-addon">
                      <input
                        type="email"
                        placeholder="staff.name@bakery.com"
                        value={staffEmail}
                        onChange={(e) => setStaffEmail(e.target.value)}
                      />
                      <span className="input-addon-symbol">@</span>
                    </div>
                  </div>

                  <div className="input-block relative-addon-field">
                    <label>TEMPORARY APP PASSWORD</label>
                    <div className="input-with-trailing-addon">
                      <input
                        type={showAddStaffPassword ? "text" : "password"}
                        placeholder="TempPass2026!"
                        value={staffPassword}
                        onChange={(e) => setStaffPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="addon-visibility-toggle"
                        onClick={() =>
                          setShowAddStaffPassword(!showAddStaffPassword)
                        }
                      >
                        {showAddStaffPassword ? (
                          <VisibilityOffIcon style={{ fontSize: "1.1rem" }} />
                        ) : (
                          <VisibilityIcon style={{ fontSize: "1.1rem" }} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="credentials-info-footer-line mt-12">
                  <InfoIcon
                    style={{
                      fontSize: "0.95rem",
                      color: "#8a1e2b",
                      marginRight: "6px",
                    }}
                  />
                  <p>
                    Staff will be prompted to change this temporary password
                    upon their first login to the mobile application.
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-footer-action-row border-top-flat">
              <button
                className="btn-secondary-flat-border"
                onClick={() => setShowAddStaffModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary-maroon-fill"
                onClick={handleCreateStaff}
              >
                Save & Onboard Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. DELETE MODAL */}
      {showDeleteModal && staffToDelete && (
        <div className="modal-overlay-backdrop-layer alert-center-backdrop">
          <div className="modal-container-box mini-alert-size-width animate-zoom">
            <div className="alert-content-wrapper-body">
              <div className="alert-warning-icon-circle">
                <ErrorOutlineIcon className="alert-danger-svg" />
              </div>
              <h4>Delete User?</h4>
              <p>Are you sure you want to delete {staffToDelete.name}?</p>
            </div>
            <div className="alert-buttons-footer-row">
              <button
                className="alert-btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="alert-btn-execute"
                onClick={() => {
                  setStaffList(
                    staffList.filter((s) => s.id !== selectedStaffId),
                  );
                  setShowDeleteModal(false);
                }}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
