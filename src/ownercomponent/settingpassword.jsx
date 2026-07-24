import { Outlet, useNavigate } from "react-router";
import "../ownercss/settingpassword.css";

export default function SettingPassword() {
  const navigate = useNavigate();
  return (
    <div className="settingpassword">
      <div className="settingpasswordcontainer">
        <h2 className="settingpasswordtitle">Password Change</h2>
        <div className="settingpasswordline"></div>
        <div className="settingpasswordbodycontainer">
          <div className="settingpasswordbody">
            <label>Current Password</label>
            <input
              className="settingpasswordinput"
              type="text"
              placeholder="Enter Current Password"
            />
          </div>

          <div className="settingpasswordbody">
            <label>Current Password</label>
            <input
              className="settingpasswordinput"
              type="text"
              placeholder="Enter Current Password"
            />
          </div>

          <div className="settingpasswordbody">
            <label>Current Password</label>
            <input
              className="settingpasswordinput"
              type="text"
              placeholder="Enter Current Password"
            />
          </div>
        </div>

        <div className="settingpasswordbtn">
          <button
            className="settingpasswordcancel"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <Outlet />
          <button className="settingpasswordsave">Save</button>
        </div>
      </div>
    </div>
  );
}
