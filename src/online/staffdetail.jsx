import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import "./staffdetail.css";

const StaffDetails = () => {
  const navigate = useNavigate();
  const { staffId } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Aung Kyaw Thu",
    nrc: "12/YAKANA(N)002345",
    dob: "15 May 1994",
    gender: "Male",
    age: "32",
    phone: "09 967 426 675",
    hometown: "B.A, Myanmar",
    permanentAddress:
      "No. 45, Golden Valley Street, Near Township, Yangon, Myanmar",
    experience:
      "Senior Kitchen Staff at Prime Cafe (2019 - 2023) - Managed inventory and grill station operations.",
    role: "Kitchen Supervisor",
    employmentStart: "01 Jan 2024",
    employmentType: "Permanent Full-time",
    basicSalary: "450,000 Ks",
    workingHours: "6 Days / Week (Mon - Sat)",
    branch: "U-Front Mall, Kitchen Bar (3rd F), B Htwe",
    status: "Active",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="staff-details-page">
      <div className="staff-details-topbar">
        <div className="staff-details-title-area">
          <button
            className="staff-details-back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </button>

          <h1>Staff Details</h1>
        </div>

        <button
          className="staff-details-edit-button"
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
          Edit Profile
        </button>
      </div>

      <div className="staff-details-content">
        <div className="staff-details-card">
          <div className="staff-details-section-title">
            <PersonIcon />
            <h2>STAFF PERSONAL DETAILS</h2>
          </div>

          <div className="staff-details-grid">
            <div className="staff-details-field">
              <label>FULL NAME</label>
              <input
                value={formData.fullName}
                readOnly={!isEditing}
                onChange={(event) =>
                  handleChange("fullName", event.target.value)
                }
              />
            </div>

            <div className="staff-details-field">
              <label>NRC / ID NUMBER</label>
              <input
                value={formData.nrc}
                readOnly={!isEditing}
                onChange={(event) => handleChange("nrc", event.target.value)}
              />
            </div>

            <div className="staff-details-field">
              <label>DOB</label>

              <div className="staff-details-input-icon">
                <input
                  value={formData.dob}
                  readOnly={!isEditing}
                  onChange={(event) => handleChange("dob", event.target.value)}
                />
                <CalendarMonthIcon />
              </div>
            </div>

            <div className="staff-details-field">
              <label>GENDER</label>

              <select
                value={formData.gender}
                disabled={!isEditing}
                onChange={(event) => handleChange("gender", event.target.value)}
              >
                <option value="Male">MALE</option>
                <option value="Female">FEMALE</option>
                <option value="Other">OTHER</option>
              </select>
            </div>

            <div className="staff-details-field">
              <label>AGE</label>

              <input
                value={formData.age}
                readOnly={!isEditing}
                onChange={(event) => handleChange("age", event.target.value)}
              />
            </div>

            <div className="staff-details-field">
              <label>MOBILE NUMBER</label>

              <input
                value={formData.phone}
                readOnly={!isEditing}
                onChange={(event) => handleChange("phone", event.target.value)}
              />
            </div>

            <div className="staff-details-field">
              <label>HOMETOWN / BIRTHPLACE</label>

              <input
                value={formData.hometown}
                readOnly={!isEditing}
                onChange={(event) =>
                  handleChange("hometown", event.target.value)
                }
              />
            </div>

            <div className="staff-details-field staff-details-wide-field">
              <label>PERMANENT ADDRESS</label>

              <input
                value={formData.permanentAddress}
                readOnly={!isEditing}
                onChange={(event) =>
                  handleChange("permanentAddress", event.target.value)
                }
              />
            </div>
          </div>

          <div className="staff-details-experience-field">
            <label>LAST EMPLOYMENT DETAILS</label>

            <textarea
              value={formData.experience}
              readOnly={!isEditing}
              onChange={(event) =>
                handleChange("experience", event.target.value)
              }
            />
          </div>
        </div>

        <div className="staff-details-card">
          <div className="staff-details-section-title">
            <WorkIcon />
            <h2>ROLE & CONFIGURATION</h2>
          </div>

          <div className="staff-details-grid">
            <div className="staff-details-field">
              <label>ASSIGNED ROLE</label>

              <select
                value={formData.role}
                disabled={!isEditing}
                onChange={(event) => handleChange("role", event.target.value)}
              >
                <option value="Kitchen Supervisor">KITCHEN SUPERVISOR</option>
                <option value="Sale Person">SALE PERSON</option>
                <option value="Delivery Rider">DELIVERY RIDER</option>
                <option value="Customer Service">CUSTOMER SERVICE</option>
              </select>
            </div>

            <div className="staff-details-field">
              <label>EMPLOYMENT START DATE</label>

              <div className="staff-details-input-icon">
                {" "}
                <input
                  value={formData.employmentStart}
                  readOnly={!isEditing}
                  onChange={(event) =>
                    handleChange("employmentStart", event.target.value)
                  }
                />
                <CalendarMonthIcon />
              </div>
            </div>

            <div className="staff-details-field">
              <label>EMPLOYMENT TYPE</label>

              <select
                value={formData.employmentType}
                disabled={!isEditing}
                onChange={(event) =>
                  handleChange("employmentType", event.target.value)
                }
              >
                <option value="Permanent Full-time">PERMANENT FULL-TIME</option>

                <option value="Permanent Part-time">PERMANENT PART-TIME</option>

                <option value="Contract">CONTRACT</option>

                <option value="Temporary">TEMPORARY</option>
              </select>
            </div>

            <div className="staff-details-field">
              <label>BASIC SALARY (MMK)</label>

              <input
                value={formData.basicSalary}
                readOnly={!isEditing}
                onChange={(event) =>
                  handleChange("basicSalary", event.target.value)
                }
              />
            </div>

            <div className="staff-details-field">
              <label>WORKING DAYS</label>

              <input
                value={formData.workingHours}
                readOnly={!isEditing}
                onChange={(event) =>
                  handleChange("workingHours", event.target.value)
                }
              />
            </div>

            <div className="staff-details-field">
              <label>BRANCH / LOCATION</label>

              <textarea
                value={formData.branch}
                readOnly={!isEditing}
                onChange={(event) => handleChange("branch", event.target.value)}
              />
            </div>
          </div>

          <div className="staff-details-status-row">
            <div className="staff-details-status-field">
              <label>STATUS</label>

              <select
                className={`staff-details-status-select status-${formData.status.toLowerCase()}`}
                value={formData.status}
                disabled={!isEditing}
                onChange={(event) => handleChange("status", event.target.value)}
              >
                <option value="Active">ACTIVE</option>
                <option value="Warning">WARNING</option>
                <option value="Leave">LEAVE</option>
              </select>
            </div>
          </div>

          {isEditing && (
            <div className="staff-details-edit-actions">
              <button
                className="staff-details-cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                className="staff-details-save-button"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
