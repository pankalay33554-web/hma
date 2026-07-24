export default function ProgressBar() {
  const bar = [
    {
      title: "Sugar",
      value: 80,
      color: "green",
    },
  ];
  return (
    <div className="progress-item">
      <div className="progress-header">
        <span>{bar.title}</span>
        <span>{bar.value}</span>
      </div>
    </div>
  );
}
