import React, { useState } from "react";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RestoreIcon from "@mui/icons-material/Restore";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CloseIcon from "@mui/icons-material/Close";

export default function BackupRestore() {
  const [backupHistory, setBackupHistory] = useState([
    {
      id: "1",
      fileName: "backup_2026_07_20_113000.sql",
      dateTime: "Jul 20, 2026 - 11:30 PM",
      fileSize: "14.2 MB",
    },
    {
      id: "2",
      fileName: "backup_2026_07_10_085823.sql",
      dateTime: "Jul 10, 2026 - 08:58 AM",
      fileSize: "10.5 KB",
    },
  ]);

  const [isBackingUp, setIsBackingUp] = useState(false);

  // 🎯 Custom Modal State
  const [selectedFileForRestore, setSelectedFileForRestore] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);

  // Trigger Backup Function
  const handleBackupNow = () => {
    setIsBackingUp(true);

    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "_");
      const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "");
      const newFileName = `backup_${dateStr}_${timeStr}.sql`;

      const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = now.toLocaleDateString("en-US", options);

      const newRecord = {
        id: Date.now().toString(),
        fileName: newFileName,
        dateTime: formattedDate,
        fileSize: `${(Math.random() * (15 - 5) + 5).toFixed(1)} MB`,
      };

      setBackupHistory([newRecord, ...backupHistory]);
      setIsBackingUp(false);
    }, 1200);
  };

  // 🎯 Open Restore Confirmation Modal
  const openRestoreModal = (fileName) => {
    setSelectedFileForRestore(fileName);
  };

  // 🎯 Confirm and Execute Restore Action
  const confirmRestoreAction = () => {
    setIsRestoring(true);

    // Simulate API Call delay
    setTimeout(() => {
      setIsRestoring(false);
      const restoredFile = selectedFileForRestore;
      setSelectedFileForRestore(null); // Close modal
      //alert(`Database restored successfully from: ${restoredFile}`);
    }, 1500);
  };

  return (
    <div className="settings-card-container animate-fade-in relative-container">
      {/* Top Title & Backup Now Button Header */}
      <div className="backup-header-top-row">
        <div className="backup-title-group">
          <h2>Backup & Restore</h2>
          <p className="backup-subtitle">
            Back up your databases directly on the local server
          </p>
        </div>

        <button
          type="button"
          className="btn-backup-now"
          onClick={handleBackupNow}
          disabled={isBackingUp}
        >
          <CloudUploadIcon style={{ fontSize: "1.2rem", marginRight: "8px" }} />
          {isBackingUp ? "Creating Backup..." : "Backup Now"}
        </button>
      </div>

      <div className="backup-divider-line"></div>

      {/* Backup History Log Table */}
      <div className="backup-log-section mt-20">
        <div className="log-section-header">
          <h3>Backup History Log</h3>
          <span className="latest-records-pill">
            LATEST {backupHistory.length} RECORDS
          </span>
        </div>

        <div className="backup-table-wrapper mt-15">
          <table className="backup-custom-table">
            <thead>
              <tr>
                <th>BACKUP FILE NAME</th>
                <th>DATE & TIME</th>
                <th>FILE SIZE</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((item) => (
                <tr key={item.id}>
                  <td className="file-name-cell">
                    <StorageIcon className="sql-db-icon" />
                    <span>{item.fileName}</span>
                  </td>
                  <td className="date-time-cell">{item.dateTime}</td>
                  <td className="file-size-cell">{item.fileSize}</td>
                  <td className="text-center action-cell">
                    <button
                      type="button"
                      className="btn-restore-outline"
                      onClick={() => openRestoreModal(item.fileName)}
                    >
                      <RestoreIcon
                        style={{ fontSize: "1rem", marginRight: "4px" }}
                      />
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🎯 CUSTOM RESTORE CONFIRMATION MODAL CARD */}
      {selectedFileForRestore && (
        <div className="modal-overlay-backdrop animate-fade-in">
          <div className="restore-modal-card">
            <button
              className="modal-close-btn"
              onClick={() => setSelectedFileForRestore(null)}
              disabled={isRestoring}
            >
              <CloseIcon style={{ fontSize: "1.2rem" }} />
            </button>

            <div className="modal-warning-icon-wrapper">
              <WarningAmberRoundedIcon
                style={{ fontSize: "2.2rem", color: "#d32f2f" }}
              />
            </div>

            <p className="modal-description">
              Are you sure you want to restore the database using <br />
              <strong className="file-highlight">
                {selectedFileForRestore}
              </strong>
              ?
            </p>

            <div className="modal-warning-box">
              <span>
                ⚠️ Warning: Current live sales and inventory data will be
                overwritten with this backup version.
              </span>
            </div>

            <div className="modal-action-buttons">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setSelectedFileForRestore(null)}
                disabled={isRestoring}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-modal-confirm-danger"
                onClick={confirmRestoreAction}
                disabled={isRestoring}
              >
                <RestoreIcon
                  style={{ fontSize: "1.1rem", marginRight: "6px" }}
                />
                {isRestoring ? "Restoring..." : "Confirm Restore"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
