import "../ownercss/setting.css";

import SettingsIcon from "@mui/icons-material/Settings";

import { Outlet, NavLink } from "react-router-dom";

const Settings = () => {
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
            <NavLink to="" end className="sidebarBtn activeBtn">
              General Setting
            </NavLink>

            <NavLink to="settingpassword" className="sidebarBtn">
              Password
            </NavLink>

            <NavLink to="settingbackup" className="sidebarBtn">
              Backup & Restore
            </NavLink>
          </div>
          <Outlet />

          <div className="settingcontentes"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
