import { useState } from "react";
import {
  Person,
  Email,
  CalendarMonth,
  Close,
  KeyboardArrowDown,
  LocationOn,
  Phone,
  Badge,
  Payments,
  Save,
  CheckCircle,
  Error,
} from "@mui/icons-material";
import "./offlinenewstaff.css";
import { useNavigate, Outlet } from "react-router";

const initialForm = {
  fullName: "",
  email: "",
  dob: "",
  gender: "",
  age: "",
  department: "",
  address: "",
  joiningDate: "",
  salary: "",
  role: "",
  phone: "",
};

export default function OfflineAddNewStaff() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
  });

  const [isClosing, setIsClosing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const showPopup = (type, title, message) => {
    setPopup({
      open: true,
      type,
      title,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      open: false,
      type: "",
      title: "",
      message: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!form.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!form.age) {
      newErrors.age = "Age is required";
    } else if (Number(form.age) < 18 || Number(form.age) > 100) {
      newErrors.age = "Age must be between 18 and 100";
    }

    if (!form.department) {
      newErrors.department = "Department is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }

    if (!form.salary) {
      newErrors.salary = "Salary is required";
    } else if (Number(form.salary) <= 0) {
      newErrors.salary = "Salary must be greater than 0";
    }

    if (!form.role) {
      newErrors.role = "Role is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) {
      showPopup(
        "error",
        "Validation Error",
        "Please check the highlighted fields and complete all required information.",
      );

      return;
    }

    const staffData = {
      id: Date.now(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      dob: form.dob,
      gender: form.gender,
      age: Number(form.age),
      department: form.department,
      address: form.address.trim(),
      joiningDate: form.joiningDate,
      salary: Number(form.salary),
      role: form.role,
      phone: form.phone.trim(),
      createdAt: new Date().toISOString(),
    };

    console.log("Created Staff:", staffData);

    showPopup(
      "success",
      "Staff Created Successfully",
      `${form.fullName} has been added successfully.`,
    );
  };

  const handlePopupClose = () => {
    if (popup.type === "success") {
      setForm(initialForm);
      setErrors({});
    }

    closePopup();
  };

  const handleCancel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setForm(initialForm);
      setErrors({});
      setIsClosing(false);
    }, 300);
  };

  const getInputClass = (fieldName) => {
    return `staff-input ${errors[fieldName] ? "staff-input-error" : ""}`;
  };

  return (
    <div className="staff-page">
      <div className={`staff-modal ${isClosing ? "staff-modal-close" : ""}`}>
        <div className="staff-header">
          <div className="staff-title-area">
            <div className="staff-title-icon">
              <Person />
            </div>

            <h2 className="staff-title">Add New Staff</h2>
          </div>

          <button
            type="button"
            className="staff-close-button"
            onClick={() => navigate(-1)}
          >
            <Close />
          </button>
          <Outlet />
        </div>

        <div className="staff-divider" />

        <form className="staff-form" onSubmit={handleCreate}>
          <div className="staff-info">
            <span className="staff-info-icon">
              <Badge />
            </span>

            <span className="staff-info-text">
              Fill in the staff information below to add a new staff member.
            </span>
          </div>

          <div className="staff-grid">
            <div className="staff-field">
              <label className="staff-label">
                Full Name <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <Person className="staff-input-icon" />

                <input
                  className={getInputClass("fullName")}
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              {errors.fullName && (
                <span className="staff-error">{errors.fullName}</span>
              )}
            </div>

            <div className="staff-field">
              <label className="staff-label">
                Email Address <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <Email className="staff-input-icon" />

                <input
                  className={getInputClass("email")}
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {errors.email && (
                <span className="staff-error">{errors.email}</span>
              )}
            </div>

            <div className="staff-field">
              <label className="staff-label">
                Date of Birth <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <CalendarMonth className="staff-input-icon" />

                <input
                  className={getInputClass("dob")}
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                />
              </div>

              {errors.dob && <span className="staff-error">{errors.dob}</span>}
            </div>

            <div className="staff-field">
              <label className="staff-label">
                Gender <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <Person className="staff-input-icon" />
                <select
                  className={getInputClass("gender")}
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <KeyboardArrowDown className="staff-select-icon" />
              </div>

              {errors.gender && (
                <span className="staff-error">{errors.gender}</span>
              )}
            </div>

            <div className="staff-field">
              <label className="staff-label">
                Age <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <input
                  className={getInputClass("age")}
                  type="number"
                  name="age"
                  min="18"
                  max="100"
                  placeholder="Enter age"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>

              {errors.age && <span className="staff-error">{errors.age}</span>}
            </div>

            <div className="staff-field">
              <label className="staff-label">
                Department <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <Badge className="staff-input-icon" />

                <select
                  className={getInputClass("department")}
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                >
                  <option value="">Select department</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="IT">IT</option>
                  <option value="Management">Management</option>
                </select>

                <KeyboardArrowDown className="staff-select-icon" />
              </div>

              {errors.department && (
                <span className="staff-error">{errors.department}</span>
              )}
            </div>
          </div>

          <div className="staff-field staff-full-field">
            <label className="staff-label">
              Address <span className="staff-required">*</span>
            </label>

            <div className="staff-textarea-wrapper">
              <LocationOn className="staff-textarea-icon" />

              <textarea
                className={`staff-textarea ${
                  errors.address ? "staff-textarea-error" : ""
                }`}
                name="address"
                placeholder="Enter complete address"
                value={form.address}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {errors.address && (
              <span className="staff-error">{errors.address}</span>
            )}
          </div>

          <div className="staff-grid staff-bottom-grid">
            <div className="staff-field">
              <label className="staff-label">
                Joining Date <span className="staff-required">*</span>
              </label>
              <div className="staff-input-wrapper">
                <CalendarMonth className="staff-input-icon" />

                <input
                  className={getInputClass("joiningDate")}
                  type="date"
                  name="joiningDate"
                  value={form.joiningDate}
                  onChange={handleChange}
                />
              </div>

              {errors.joiningDate && (
                <span className="staff-error">{errors.joiningDate}</span>
              )}
            </div>

            <div className="staff-field">
              <label className="staff-label">
                Salary <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <Payments className="staff-input-icon" />

                <input
                  className={getInputClass("salary")}
                  type="number"
                  name="salary"
                  min="1"
                  placeholder="Enter salary"
                  value={form.salary}
                  onChange={handleChange}
                />
              </div>

              {errors.salary && (
                <span className="staff-error">{errors.salary}</span>
              )}
            </div>

            {/* Role */}
            <div className="staff-field">
              <label className="staff-label">
                Role <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <Badge className="staff-input-icon" />

                <select
                  className={getInputClass("role")}
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="Manager">Manager</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Staff">Staff</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Accountant">Accountant</option>
                </select>

                <KeyboardArrowDown className="staff-select-icon" />
              </div>

              {errors.role && (
                <span className="staff-error">{errors.role}</span>
              )}
            </div>

            <div className="staff-field">
              <label className="staff-label">
                Phone Number <span className="staff-required">*</span>
              </label>

              <div className="staff-input-wrapper">
                <Phone className="staff-input-icon" />

                <input
                  className={getInputClass("phone")}
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {errors.phone && (
                <span className="staff-error">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="staff-footer">
            <button
              type="button"
              className="staff-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="staff-create-button">
              <Save className="staff-button-icon" />
              <span>Create Staff</span>
            </button>
          </div>
        </form>

        {popup.open && (
          <div className="staff-popup-overlay">
            <div
              className={`staff-popup ${
                popup.type === "success"
                  ? "staff-popup-success"
                  : "staff-popup-error"
              }`}
            >
              <div className="staff-popup-icon">
                {popup.type === "success" ? <CheckCircle /> : <Error />}
              </div>

              <div className="staff-popup-title">{popup.title}</div>

              <div className="staff-popup-message">{popup.message}</div>

              <button
                type="button"
                className="staff-popup-button"
                onClick={handlePopupClose}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
