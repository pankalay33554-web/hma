import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SaveIcon from "@mui/icons-material/Save";

export default function StoreOperatingHours() {
  // --- Form States ---
  const [openingTime, setOpeningTime] = useState("09:00 AM");
  const [closingTime, setClosingTime] = useState("09:00 PM");
  const [weeklyClosedDays, setWeeklyClosedDays] = useState(
    "None (Open Every Day)",
  );
  const [lastOrderTime, setLastOrderTime] = useState("08:30 PM");
  const [closureNotice, setClosureNotice] = useState(
    "Store is operating as normal. No scheduled maintenance or holiday closures at this time.",
  );

  // Time Options Generator (30 mins interval)
  const timeOptions = [
    "06:00 AM",
    "06:30 AM",
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      openingTime,
      closingTime,
      weeklyClosedDays,
      lastOrderTime,
      closureNotice,
    };
    console.log("Saving Operating Hours Settings:", payload);
    alert("Store Operating Hours updated successfully!");
  };

  return (
    <div className="settings-card-container animate-fade-in">
      {/* Title Header */}
      <div className="settings-card-header">
        <AccessTimeIcon className="header-info-icon" />
        <h2>Store Operating Hours & Schedule</h2>
      </div>

      <form onSubmit={handleSave}>
        {/* Row 1: Opening Time & Closing Time Dropdowns */}
        <div className="form-grid-two-cols">
          <div className="input-block">
            <label>OPENING TIME</label>
            <select
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              className="styled-select-input"
            >
              {timeOptions.map((time) => (
                <option key={`open-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="input-block">
            <label>CLOSING TIME</label>
            <select
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              className="styled-select-input"
            >
              {timeOptions.map((time) => (
                <option key={`close-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Weekly Closed Days Dropdown */}
        <div className="input-block mt-20 relative-icon-field">
          <label>WEEKLY CLOSED DAYS</label>
          <div className="select-with-trailing-icon">
            <select
              value={weeklyClosedDays}
              onChange={(e) => setWeeklyClosedDays(e.target.value)}
              className="styled-select-input"
            >
              <option value="None (Open Every Day)">
                None (Open Every Day)
              </option>
              <option value="Every Monday">Every Monday</option>
              <option value="Every Tuesday">Every Tuesday</option>
              <option value="Every Wednesday">Every Wednesday</option>
              <option value="Every Thursday">Every Thursday</option>
              <option value="Every Friday">Every Friday</option>
              <option value="Every Saturday">Every Saturday</option>
              <option value="Every Sunday">Every Sunday</option>
              <option value="Weekends (Sat & Sun)">Weekends (Sat & Sun)</option>
            </select>
            <CalendarMonthIcon className="trailing-field-icon" />
          </div>
        </div>

        {/* Row 3: Last Order Time & Live Status Alert Badge */}
        <div className="form-grid-two-cols mt-20 align-items-center">
          <div className="input-block relative-icon-field">
            <label>LAST ORDER TIME (KITCHEN CUTOFF)</label>
            <div className="select-with-trailing-icon">
              <select
                value={lastOrderTime}
                onChange={(e) => setLastOrderTime(e.target.value)}
                className="styled-select-input"
              >
                {timeOptions.map((time) => (
                  <option key={`cutoff-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <TimerOutlinedIcon className="trailing-field-icon" />
            </div>
            <span className="input-subtext-note">
              Automatically stops accepting POS orders after this time.
            </span>
          </div>

          {/* Right Live Info Box */}
          <div className="operational-status-live-box">
            <div className="status-info-icon-circle">
              <InfoOutlinedIcon
                style={{ fontSize: "1.2rem", color: "#1976d2" }}
              />
            </div>
            <p>
              Operational status is currently live across all delivery
              platforms.
            </p>
          </div>
        </div>

        {/* Row 4: Temporary Closure Notice Textarea */}
        <div className="input-block mt-25">
          <label>TEMPORARY CLOSURE NOTICE</label>
          <textarea
            rows="4"
            value={closureNotice}
            onChange={(e) => setClosureNotice(e.target.value)}
            placeholder="State any temporary maintenance or holiday closures..."
          ></textarea>
        </div>

        {/* Footer Action Buttons */}
        <div className="settings-form-footer-actions mt-30">
          <button type="button" className="btn-cancel-flat">
            Cancel
          </button>
          <button type="submit" className="btn-save-maroon">
            <SaveIcon style={{ fontSize: "1.1rem", marginRight: "6px" }} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
