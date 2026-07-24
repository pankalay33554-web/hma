import "../ownercss/setting.css";
import Favicon from "../../public/favicon.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate, Outlet } from "react-router";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="settings">
      <div className="settingsCard">
        <div className="settingsHeader">
          <SettingsIcon className="settingsHeaderIcon" />
          <span className="settingsTitle">Settings</span>
        </div>

        <div className="settingsBody">
          {/* Sidebar */}
          <div className="settingsSidebar">
            <button className="sidebarBtn activeBtn">General Setting</button>

            <button
              className="sidebarBtn"
              onClick={() => navigate("settingpassword")}
            >
              Password
            </button>
            <Outlet />

            <button className="sidebarBtn">Backup & Restore</button>
          </div>

          {/* Content */}
          <div className="settingsContent">
            <div className="profileArea">
              <img src={Favicon} className="profileCircle" />
              <button className="editBtn">
                <EditIcon />
              </button>
            </div>

            <div className="divider"></div>

            <div className="formGroup">
              <label className="inputLabel">Shop Name</label>

              <input type="text" className="formInput" />
            </div>

            <div className="formGroup">
              <label className="inputLabel">Address</label>

              <input type="text" className="formInput" />
            </div>

            <div className="formGroup">
              <label className="inputLabel">Contact Info</label>

              <input type="text" className="formInput" />
            </div>

            <div className="formGroup">
              <label className="inputLabel">Social Link</label>

              <input type="text" className="formInput" />
            </div>

            <div className="buttonGroup">
              <button className="cancelBtn">Cancel</button>

              <button className="saveBtn">Save Change</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
