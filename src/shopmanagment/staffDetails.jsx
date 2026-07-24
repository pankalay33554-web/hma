import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../shopmanagmentcss/staffDetails.css";

export default function StaffDetails({ staff, roles, onBack }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCredentialsUnlocked, setIsCredentialsUnlocked] = useState(false);

  // --- Modals & Security States ---
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [managerPassword, setManagerPassword] = useState("");
  const [showManagerPassword, setShowManagerPassword] = useState(false);
  const [showAppPassword, setShowAppPassword] = useState(false);

  // --- Dynamic Form States derived from Selected Staff ---
  const [formData, setFormData] = useState({
    name: staff?.name || "KO Kyaw",
    nrc: staff?.nrc || "12/LATHANA(N)123456",
    dob: staff?.dob || "2002-03-21",
    gender: staff?.gender || "Male",
    age: staff?.age || "24",
    phone: staff?.phone || "09 967 402 673",
    education: staff?.education || "B.A, Myanmar",
    email: staff?.email || "kokyaw@email.com",
    password: staff?.password || "12345678",
    address: staff?.address || "Yangon , Myanmar",
    lastEmployment:
      staff?.lastEmployment ||
      "Senior Kitchen Staff at Prime Grill (2019-2023) - Managed inventory and grill station operations.",
    role: staff?.role || "KITCHEN SUPERVISOR",
    startDate: staff?.startDate || "2024-01-01",
    contractType: staff?.contractType || "PERMANENT FULL-TIME",

    jobDescription:
      "Overseeing daily kitchen prep, managing staff shifts, quality control of burger assembly, and maintaining hygiene standards.",
    sopAssignment:
      "Standard Operating Procedures: [K-01] Burger Grilling, [K-05] Cleaning Schedule, [I-02] Inventory Logging",
    policyBinding:
      "HR-2024-V2, Confidentiality Agreement (NDA-001), Safety Compliance Protocol",
    salary: staff?.salary || "450,000 Ks",
    workingDays: "6 DAYS / WEEK (MON - SAT)",
    issuedSupplies: "Uniform (x3), Knife Set (S-01), ID Badge",

    bonus: staff?.bonus || "+50,000",
    fines: staff?.fines || "0",
    leave: staff?.leave || "3",
    offDays: staff?.offDays || "4",
    status: staff?.status || "ACTIVE",
    remarks: staff?.remarks || "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      // Edit mode ကို ပိတ်လိုက်ရင် Security status ပါ တစ်ခါတည်း ပြန် Lock ချမယ်
      setIsCredentialsUnlocked(false);
    }
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
    setIsCredentialsUnlocked(false);
    alert("Changes saved locally inside UI state!");
    if (onBack) {
      onBack();
    }
  };

  // Security Verification handler
  const handleVerifyUnlock = () => {
    if (managerPassword.trim() !== "") {
      setIsCredentialsUnlocked(true);
      setShowSecurityModal(false);
      setManagerPassword("");
    } else {
      alert("Please enter a valid password.");
    }
  };

  return (
    <div className="staff-details-page-viewport">
      {/* Top Header Row Group */}
      <header className="details-header-action-bar">
        <div className="header-left-nav-zone">
          <button
            className="figma-maroon-back-btn"
            onClick={onBack}
            title="Go Back"
          >
            <ArrowBackIosNewIcon className="back-arrow-svg" />
          </button>
          <h1 className="details-main-title">Staff Details</h1>
        </div>
        <button
          className={`figma-edit-profile-action-btn ${isEditMode ? "editing" : ""}`}
          onClick={toggleEditMode}
        >
          <EditIcon style={{ fontSize: "0.95rem" }} />{" "}
          {isEditMode ? "CANCEL EDIT" : "EDIT"}
        </button>
      </header>

      <div className="details-scrollable-content-area">
        <div className="figma-details-white-card">
          {/* SECTION 1: STAFF PERSONAL DETAILS */}
          <div className="form-section-block-wrapper">
            <div className="section-inline-heading-title">
              <PersonOutlineIcon className="section-head-icon icon-maroon" />
              <span>STAFF PERSONAL DETAILS</span>
            </div>

            {/* Row 1: Full Name, NRC, DOB */}
            <div className="fields-row-layout-three-cols">
              <div className="form-field-unit">
                <label>FULL NAME</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-field-unit">
                <label>NRC NUMBER</label>
                <input
                  type="text"
                  value={formData.nrc}
                  onChange={(e) => handleInputChange("nrc", e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-field-unit relative-icon-field">
                <label>DOB</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  disabled={!isEditMode}
                />
                <CalendarMonthIcon className="field-embedded-trailing-icon" />
              </div>
            </div>

            {/* Row 2: Gender, Age, Mobile Number */}
            <div className="fields-row-layout-three-cols mt-14">
              <div className="form-field-unit">
                <label>GENDER</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  disabled={!isEditMode}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-field-unit">
                <label>AGE</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-field-unit">
                <label>MOBILE NUMBER</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
            </div>

            {/* Credentials Box Row (Email & Password Logic Fix) */}
            <div className="credentials-highlight-wrapperbox mt-14">
              <div className="form-field-unit">
                <label>STAFF LOGIN EMAIL</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditMode || !isCredentialsUnlocked}
                />
              </div>
              <div className="form-field-unit app-password-field-container">
                <label>APP LOGIN PASSWORD</label>
                <div className="password-input-action-wrapper">
                  <input
                    type={showAppPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    disabled={!isEditMode || !isCredentialsUnlocked}
                  />
                  <div className="password-action-icons-group">
                    <button
                      type="button"
                      className="inline-icon-btn"
                      onClick={() => setShowAppPassword(!showAppPassword)}
                    >
                      {showAppPassword ? (
                        <VisibilityOffIcon style={{ fontSize: "1.1rem" }} />
                      ) : (
                        <VisibilityIcon style={{ fontSize: "1.1rem" }} />
                      )}
                    </button>

                    {/* EDIT Mode ဝင်ထားပြီး Unlock မလုပ်ရသေးမှသာ Button ပြမည် */}
                    {isEditMode && !isCredentialsUnlocked && (
                      <button
                        type="button"
                        className="unlock-action-text-link"
                        onClick={() => setShowSecurityModal(true)}
                      >
                        <LockIcon
                          style={{ fontSize: "0.85rem", marginRight: "3px" }}
                        />
                        UNLOCK TO EDIT
                      </button>
                    )}

                    {/* Unlock ဖြစ်သွားရင် အစိမ်းရောင် Unlocked စာသားလေးပြပေးမည် */}
                    {isEditMode && isCredentialsUnlocked && (
                      <span className="unlocked-status-text">Unlocked</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Highest Education & Residential Address */}
            <div className="fields-row-layout-two-cols mt-14">
              <div className="form-field-unit">
                <label>HIGHEST EDUCATION</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-field-unit">
                <label>RESIDENTIAL ADDRESS</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
            </div>

            <div className="form-field-unit full-width-block-row mt-14">
              <label>LAST EMPLOYMENT DETAILS</label>
              <textarea
                value={formData.lastEmployment}
                onChange={(e) =>
                  handleInputChange("lastEmployment", e.target.value)
                }
                disabled={!isEditMode}
              ></textarea>
            </div>
          </div>

          {/* SECTION 2: ROLE & CONFIGURATION */}
          <div className="form-section-block-wrapper mt-30">
            <div className="section-inline-heading-title">
              <CardMembershipIcon className="section-head-icon icon-maroon" />
              <span>ROLE & CONFIGURATION</span>
            </div>

            <div className="fields-row-layout-three-cols">
              <div className="form-field-unit">
                <label>ASSIGNED JOB ROLE</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  disabled={!isEditMode}
                >
                  <option value="KITCHEN SUPERVISOR">KITCHEN SUPERVISOR</option>
                  <option value="SALE PERSON">SALE PERSON</option>
                  <option value="DELIVERY RIDER">DELIVERY RIDER</option>
                  <option value="CUSTOMER SERVICE">CUSTOMER SERVICE</option>
                </select>
              </div>
              <div className="form-field-unit relative-icon-field">
                <label>EMPLOYMENT START DATE</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  disabled={!isEditMode}
                />
                <CalendarMonthIcon className="field-embedded-trailing-icon" />
              </div>
              <div className="form-field-unit">
                <label>CONTRACT TYPE</label>
                <select
                  value={formData.contractType}
                  onChange={(e) =>
                    handleInputChange("contractType", e.target.value)
                  }
                  disabled={!isEditMode}
                >
                  <option value="PERMANENT FULL-TIME">
                    PERMANENT FULL-TIME
                  </option>
                  <option value="PROBATIONARY">PROBATIONARY</option>
                </select>
              </div>
            </div>

            <div className="form-field-unit full-width-block-row mt-14">
              <label>JOB DESCRIPTION</label>
              <textarea
                value={formData.jobDescription}
                onChange={(e) =>
                  handleInputChange("jobDescription", e.target.value)
                }
                disabled={!isEditMode}
              ></textarea>
            </div>

            <div className="form-field-unit full-width-block-row mt-14">
              <label>SOP ASSIGNMENT</label>
              <input
                type="text"
                value={formData.sopAssignment}
                onChange={(e) =>
                  handleInputChange("sopAssignment", e.target.value)
                }
                disabled={!isEditMode}
              />
            </div>

            <div className="form-field-unit full-width-block-row mt-14">
              <label>POLICY BINDING</label>
              <input
                type="text"
                value={formData.policyBinding}
                onChange={(e) =>
                  handleInputChange("policyBinding", e.target.value)
                }
                disabled={!isEditMode}
              />
            </div>

            <div className="fields-row-layout-three-cols mt-14">
              <div className="form-field-unit">
                <label>BASIC SALARY (MMK)</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-field-unit">
                <label>WORKING DAYS</label>
                <input
                  type="text"
                  value={formData.workingDays}
                  onChange={(e) =>
                    handleInputChange("workingDays", e.target.value)
                  }
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-field-unit">
                <label>ISSUED SUPPLIES</label>
                <input
                  type="text"
                  value={formData.issuedSupplies}
                  onChange={(e) =>
                    handleInputChange("issuedSupplies", e.target.value)
                  }
                  disabled={!isEditMode}
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: OPERATIONAL HISTORICAL METRICS */}
          <div className="form-section-block-wrapper mt-30 line-indicator-heading">
            <div className="section-inline-heading-title bold-border-title">
              <span>OPERATIONAL HISTORICAL METRICS</span>
            </div>

            <div className="fields-row-layout-four-cols">
              <div className="form-field-unit metric-box green-tint">
                <label>BONUS ACCRUED</label>
                <div className="metric-input-currency-row">
                  <input
                    type="text"
                    value={formData.bonus}
                    onChange={(e) => handleInputChange("bonus", e.target.value)}
                    disabled={!isEditMode}
                  />
                  <span className="currency-label-tag">Ks</span>
                </div>
              </div>
              <div className="form-field-unit metric-box red-tint">
                <label>FINES / DEDUCTIONS</label>
                <div className="metric-input-currency-row">
                  <input
                    type="text"
                    value={formData.fines}
                    onChange={(e) => handleInputChange("fines", e.target.value)}
                    disabled={!isEditMode}
                  />
                  <span className="currency-label-tag">Ks</span>
                </div>
              </div>
              <div className="form-field-unit">
                <label>LEAVE TAKEN</label>
                <input
                  type="number"
                  value={formData.leave}
                  onChange={(e) => handleInputChange("leave", e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-field-unit">
                <label>OFF-DAYS TAKEN</label>
                <input
                  type="number"
                  value={formData.offDays}
                  onChange={(e) => handleInputChange("offDays", e.target.value)}
                  disabled={!isEditMode}
                />
              </div>
            </div>

            <div className="fields-row-layout-split-status-log mt-14">
              <div className="form-field-unit fixed-status-width">
                <label>STATUS</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  disabled={!isEditMode}
                  className="status-dropdown-input"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="WARNING">WARNING</option>
                  <option value="LEAVE">ON LEAVE</option>
                </select>
              </div>
              <div className="form-field-unit flex-fill-remarks">
                <label>MANAGER'S LOG REMARKS</label>
                <textarea
                  placeholder="Enter disciplinary notes, performance review summaries, or promotion recommendations here..."
                  value={formData.remarks}
                  onChange={(e) => handleInputChange("remarks", e.target.value)}
                  disabled={!isEditMode}
                ></textarea>
              </div>
            </div>
          </div>

          {/* FORM BUTTONS FOOTER LINE */}
          <div className="figma-form-actions-footer-row">
            <button className="figma-btn-cancel-flat" onClick={onBack}>
              Cancel
            </button>
            <button
              className="figma-btn-save-maroon"
              onClick={handleSaveChanges}
              disabled={!isEditMode}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* SECURITY VERIFICATION MODAL BOX */}
      {showSecurityModal && (
        <div className="modal-overlay-backdrop-layer security-center-backdrop">
          <div className="modal-container-box security-alert-size animate-zoom">
            <div className="modal-header-line no-border">
              <div className="security-header-title">
                <LockIcon
                  style={{
                    color: "#333",
                    marginRight: "8px",
                    fontSize: "1.3rem",
                  }}
                />
                <h3>Security Verification</h3>
              </div>
              <button
                className="close-modal-x-btn"
                onClick={() => setShowSecurityModal(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-body-scrollable-content security-body-padding">
              <p className="security-description-text">
                Please enter your manager password to unlock and edit app login
                credentials.
              </p>

              <div className="input-block full-width-field mt-15">
                <label className="security-input-label">MANAGER PASSWORD</label>
                <div className="security-password-wrapper">
                  <input
                    type={showManagerPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={managerPassword}
                    onChange={(e) => setManagerPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="security-visibility-toggle"
                    onClick={() => setShowManagerPassword(!showManagerPassword)}
                  >
                    {showManagerPassword ? (
                      <VisibilityOffIcon style={{ fontSize: "1.1rem" }} />
                    ) : (
                      <VisibilityIcon style={{ fontSize: "1.1rem" }} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer-action-row security-footer-layout">
              <button
                className="security-btn-cancel"
                onClick={() => setShowSecurityModal(false)}
              >
                Cancel
              </button>
              <button
                className="security-btn-verify"
                onClick={handleVerifyUnlock}
              >
                Verify & Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
