import "../ownercss/chart.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const data = [
  { shop: "Shop 1", revenue: 900000, color: "#7C5CFC" },
  { shop: "Shop 2", revenue: 1500000, color: "#F7B5C4" },
  { shop: "Shop 3", revenue: 2800000, color: "#45D6F4" },
  { shop: "Shop 4", revenue: 1800000, color: "#FF8A9B" },
  { shop: "Shop 5", revenue: 2000000, color: "#FF8A9B" },
];

export default function RevenueStatus() {
  return (
    <div className="revenue-card">
      <div className="revenue-header">
        <h3 claassName="chart-header">Revenue Status</h3>

        <button className="filter-btn">
          <CalendarMonthOutlinedIcon fontSize="small" />
          This Week
          <KeyboardArrowDownIcon fontSize="small" />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#ECECEC" vertical={false} />

          <XAxis dataKey="shop" axisLine={false} tickLine={false} />

          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000]}
          />

          <Tooltip />

          <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={26}>
            {data.map((item, index) => (
              <Cell key={index} fill={item.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
