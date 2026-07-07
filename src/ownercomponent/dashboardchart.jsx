import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import "../ownercss/chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export default function RevenueChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],

    datasets: [
      {
        label: "Revenue",
        data: [400, 700, 500, 900, 1200, 1100, 1500],

        borderColor: "#1976d2",

        backgroundColor: "rgba(25,118,210,.2)",

        borderWidth: 3,

        fill: true,

        tension: 0.4,

        pointRadius: 4,

        pointBackgroundColor: "#1976d2",
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="revenue-card">
      <h2>Revenue Overview</h2>

      <Line data={data} options={options} />
    </div>
  );
}
