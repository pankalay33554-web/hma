import "../ownercss/settingbackup.css";

export default function SettingBackup() {
  return (
    <div className="settingbackup">
      <div className="settingbackupcontainer">
        <h3 className="settingbackuptitle">Backup & Restore</h3>

        <div className="settingbackupline"></div>

        <div className="settingbackupcontainerbody">
          <span className="settingbackuptext">
            Backup your database directly on the local server
          </span>
          <button className="settingbackupbutton">Backup Now</button>
        </div>

        <div className="settingbackupfooter">
          <span className="settingbackupfootertext">Backup File Name</span>
          <span className="settingbackupfootertext">Date & Time</span>
          <span className="settingbackupfootertext"> File Size</span>
          <span className="settingbackupfootertext">Action</span>
        </div>

        <div className="settingbackupline"></div>

        <div className="settingbackupfooter">
          <span className="settingbackupfootertexts">
            2026.06.02<span>08523.sql</span>
          </span>
          <span className="settingbackupfootertexts">june-20-2026</span>
          <span className="settingbackupfootertexts">10.5kb</span>
          <button className="settingbackupfooterbutton">Restore</button>
        </div>
      </div>
    </div>
  );
}
