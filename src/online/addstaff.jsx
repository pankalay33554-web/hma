import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ErrorIcon from "@mui/icons-material/Error";

import "./addstaff.css";

const AddStaff = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    nrcNumber: "",
    dob: "",
    gender: "",
    age: "",
    contactNumber: "",
    highestEducation: "",
    permanentAddress: "",
    lastEmploymentDetails: "",
    assignedRole: "",
    employmentStartDate: "",
    employmentType: "",
    basicSalary: "",
    workingDays: "",
    issuedSupplies: "",
  });

  const [errors, setErrors] = useState({});
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const calculateAge = (dateValue) => {
    if (!dateValue) return "";

    const birthDate = new Date(dateValue);
    const today = new Date();

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge >= 0 ? calculatedAge : "";
  };

  const handleDobChange = (value) => {
    const calculatedAge = calculateAge(value);

    setFormData((prev) => ({
      ...prev,
      dob: value,
      age: calculatedAge,
    }));

    setErrors((prev) => ({
      ...prev,
      dob: "",
      age: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.nrcNumber.trim()) {
      newErrors.nrcNumber = "NRC number is required.";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender.";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    }

    if (!formData.highestEducation.trim()) {
      newErrors.highestEducation = "Highest education is required.";
    }

    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = "Permanent address is required.";
    }

    if (!formData.assignedRole) {
      newErrors.assignedRole = "Please select an assigned role.";
    }

    if (!formData.employmentStartDate) {
      newErrors.employmentStartDate = "Employment start date is required.";
    }

    if (!formData.employmentType) {
      newErrors.employmentType = "Please select employment type.";
    }

    if (!formData.basicSalary.trim()) {
      newErrors.basicSalary = "Basic salary is required.";
    }

    if (!formData.workingDays) {
      newErrors.workingDays = "Please select working days.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage("Please complete all required fields.");
      setShowErrorPopup(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newStaff = {
      id: `USR-${Date.now()}`,
      ...formData,
      status: "Active",
    };

    console.log("New Staff:", newStaff);

    navigate("/staff-management");
  };

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div className="add-staff-route">
      <div className="add-staff-overlay">
        <div className="add-staff-popup">
          <div className="add-staff-popup-header">
            <div className="add-staff-title">
              <PersonAddAlt1Icon />
              <h2>Add New Staff</h2>
            </div>

            <button className="add-staff-close-button" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          <form className="add-staff-form" onSubmit={handleSubmit}>
            <div className="add-staff-section-title">
              <span></span>
              <h3>STANDARD STAFF PERSONAL DETAILS</h3>
            </div>

            <div className="add-staff-grid">
              <div className="add-staff-field">
                <label>FULL NAME</label>

                <input
                  className={errors.fullName ? "add-staff-input-error" : ""}
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={(event) =>
                    handleChange("fullName", event.target.value)
                  }
                />
              </div>

              <div className="add-staff-field">
                <label>NRC NUMBER</label>

                <input
                  className={errors.nrcNumber ? "add-staff-input-error" : ""}
                  type="text"
                  placeholder="12/TAKANA(N)012345"
                  value={formData.nrcNumber}
                  onChange={(event) =>
                    handleChange("nrcNumber", event.target.value)
                  }
                />
              </div>

              <div className="add-staff-field">
                <label>DOB</label>

                <div
                  className={`add-staff-date-wrapper ${
                    errors.dob ? "add-staff-input-error" : ""
                  }`}
                >
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(event) => handleDobChange(event.target.value)}
                  />

                  <CalendarMonthIcon />
                </div>
              </div>

              <div className="add-staff-field">
                <label>GENDER</label>

                <div className="add-staff-select-wrapper">
                  <select
                    className={errors.gender ? "add-staff-select-error" : ""}
                    value={formData.gender}
                    onChange={(event) =>
                      handleChange("gender", event.target.value)
                    }
                  >
                    <option value="">Select Gender</option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>

                    <option value="Other">Other</option>
                  </select>

                  <KeyboardArrowDownIcon />
                </div>
              </div>

              <div className="add-staff-field">
                <label>AGE</label>
                <input
                  type="text"
                  placeholder="20"
                  value={formData.age}
                  readOnly
                />
              </div>

              <div className="add-staff-field">
                <label>CONTACT NUMBER</label>

                <input
                  className={
                    errors.contactNumber ? "add-staff-input-error" : ""
                  }
                  type="text"
                  placeholder="+95 9..."
                  value={formData.contactNumber}
                  onChange={(event) =>
                    handleChange("contactNumber", event.target.value)
                  }
                />
              </div>

              <div className="add-staff-field">
                <label>HIGHEST EDUCATION</label>

                <input
                  className={
                    errors.highestEducation ? "add-staff-input-error" : ""
                  }
                  type="text"
                  placeholder="Degree / Certification"
                  value={formData.highestEducation}
                  onChange={(event) =>
                    handleChange("highestEducation", event.target.value)
                  }
                />
              </div>

              <div className="add-staff-field add-staff-address-field">
                <label>PERMANENT ADDRESS</label>

                <input
                  className={
                    errors.permanentAddress ? "add-staff-input-error" : ""
                  }
                  type="text"
                  placeholder="Street, Township, City"
                  value={formData.permanentAddress}
                  onChange={(event) =>
                    handleChange("permanentAddress", event.target.value)
                  }
                />
              </div>
            </div>

            <div className="add-staff-field add-staff-experience-field">
              <label>LAST EMPLOYMENT DETAILS</label>

              <textarea
                placeholder="Briefly describe previous experience and reason for leaving..."
                value={formData.lastEmploymentDetails}
                onChange={(event) =>
                  handleChange("lastEmploymentDetails", event.target.value)
                }
              />
            </div>

            <div className="add-staff-section-title add-staff-role-title">
              <span></span>
              <h3>ASSIGNMENT & ROLE</h3>
            </div>

            <div className="add-staff-grid">
              <div className="add-staff-field">
                <label>ASSIGNED JOB ROLE</label>

                <div className="add-staff-select-wrapper">
                  <select
                    className={
                      errors.assignedRole ? "add-staff-select-error" : ""
                    }
                    value={formData.assignedRole}
                    onChange={(event) =>
                      handleChange("assignedRole", event.target.value)
                    }
                  >
                    <option value="">Select Role</option>

                    <option value="Kitchen Supervisor">
                      Kitchen Supervisor
                    </option>

                    <option value="Sale Person">Sale Person</option>

                    <option value="Delivery Rider">Delivery Rider</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>

                  <KeyboardArrowDownIcon />
                </div>
              </div>

              <div className="add-staff-field">
                <label>EMPLOYMENT START DATE</label>

                <div
                  className={`add-staff-date-wrapper ${
                    errors.employmentStartDate ? "add-staff-input-error" : ""
                  }`}
                >
                  <input
                    type="date"
                    value={formData.employmentStartDate}
                    onChange={(event) =>
                      handleChange("employmentStartDate", event.target.value)
                    }
                  />

                  <CalendarMonthIcon />
                </div>
              </div>

              <div className="add-staff-field">
                <label>CONTRACT TYPE</label>

                <div className="add-staff-radio-group">
                  <label className="add-staff-radio-item">
                    <input
                      type="radio"
                      name="employmentType"
                      value="Permanent"
                      checked={formData.employmentType === "Permanent"}
                      onChange={(event) =>
                        handleChange("employmentType", event.target.value)
                      }
                    />
                    <span>Permanent</span>
                  </label>

                  <label className="add-staff-radio-item">
                    <input
                      type="radio"
                      name="employmentType"
                      value="Probationary"
                      checked={formData.employmentType === "Probationary"}
                      onChange={(event) =>
                        handleChange("employmentType", event.target.value)
                      }
                    />
                    <span>Probationary</span>
                  </label>
                </div>

                {errors.employmentType && (
                  <div className="add-staff-inline-error">
                    {errors.employmentType}
                  </div>
                )}
              </div>

              <div className="add-staff-field">
                <label>BASIC SALARY (MMK)</label>

                <input
                  className={errors.basicSalary ? "add-staff-input-error" : ""}
                  type="text"
                  placeholder="e.g. 450,000 Ks"
                  value={formData.basicSalary}
                  onChange={(event) =>
                    handleChange("basicSalary", event.target.value)
                  }
                />
              </div>

              <div className="add-staff-field">
                <label>WORKING DAYS</label>

                <div className="add-staff-select-wrapper">
                  <select
                    className={
                      errors.workingDays ? "add-staff-select-error" : ""
                    }
                    value={formData.workingDays}
                    onChange={(event) =>
                      handleChange("workingDays", event.target.value)
                    }
                  >
                    <option value="">Mon - Sat</option>

                    <option value="Mon - Fri">Mon - Fri</option>

                    <option value="Mon - Sat">Mon - Sat</option>

                    <option value="Everyday">Everyday</option>
                  </select>

                  <KeyboardArrowDownIcon />
                </div>
              </div>

              <div className="add-staff-field">
                <label>ISSUED SUPPLIES</label>

                <textarea
                  placeholder="e.g. Uniform (x3), Knife Set..."
                  value={formData.issuedSupplies}
                  onChange={(event) =>
                    handleChange("issuedSupplies", event.target.value)
                  }
                />
              </div>
            </div>

            <div className="add-staff-bottom-actions">
              <button
                type="button"
                className="add-staff-cancel-button"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button type="submit" className="add-staff-save-button">
                Save & Onboard Staff
              </button>
            </div>
          </form>
        </div>
      </div>

      {showErrorPopup && (
        <div className="add-staff-message-overlay">
          <div className="add-staff-error-popup">
            <div className="add-staff-error-icon">
              <ErrorIcon />
            </div>

            <h3>Validation Error</h3>

            <p>{errorMessage}</p>

            <button
              className="add-staff-error-ok-button"
              onClick={() => setShowErrorPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStaff;
