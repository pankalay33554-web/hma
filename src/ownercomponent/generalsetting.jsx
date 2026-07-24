import Favicon from "../../public/favicon.svg";
import EditIcon from "@mui/icons-material/Edit";
import "../ownercss/setting.css";
export default function GeneralSetting() {
  return (
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
  );
}
