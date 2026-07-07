import "../ownercss/bar.css";

export default function ProgressBar({ title, value, color }) {
  return (
    <div className="progress-item">
      <div className="progress-header">
        <span>{title}</span>
        <span>{value}%</span>
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${value}%`,
            background: color,
          }}
        ></div>
      </div>
    </div>
  );
}
