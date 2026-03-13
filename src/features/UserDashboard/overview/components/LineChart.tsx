// import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// mock data inplace of backend data
const hardcodedData = [
  { month: "Jan", score: 64 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 69 },
  { month: "May", score: 75 },
  { month: "Jun", score: 78 },
  { month: "Jul", score: 82 },
  { month: "Aug", score: 86 },
];

interface DataPoint {
  month: string;
  score: number;
}

interface CSRProgressChartProps {
  title?: string;
  subtitle?: string;
  data?: DataPoint[];
  color?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-2">
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-lg font-bold text-gray-900">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};
const lineChartStyle = {
    axisLine: {
        stroke: "#EFEFEF",   
        strokeWidth: 1,  
    },
    tickStyle: {
        fill: "#8A8B8E", fontSize: 12
    },
    tickLineStyle: {
        stroke: "#8A8B8E", strokeWidth: 1, length: 6
    }
}

const CSRProgressChart = ({
  title = "CSR Progress Over Time",
  subtitle = "Monthly performance tracking",
  data = hardcodedData,
  color = "hsl(45, 100%, 51%)",
}: CSRProgressChartProps) => {
    // const [animated, setAnimated] = useState(true)
  return (
    <div className="w-full bg-white rounded-3xl border border-line p-6 font-lato">
      {/* Header */}
      <h2 className="text-lg font-semibold text-text-primary01">{title}</h2>
      <p className="text-sm text-text-body mb-6">{subtitle}</p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          {/* dashed grid lines only */}
          <CartesianGrid
            vertical={false}
            stroke="#e5e7eb"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="month"
            axisLine={lineChartStyle.axisLine}
            tickLine={lineChartStyle.tickLineStyle}
            tick={lineChartStyle.tickStyle}
            dy={10}
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            axisLine={lineChartStyle.axisLine}
            tickLine={lineChartStyle.tickLineStyle}
            tick={lineChartStyle.tickStyle}
            dx={-10}
          />

          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Line
            type="monotone"
            dataKey="score"
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 5, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 7, fill: color, strokeWidth: 0 }}
            // isAnimationActive={animated}
            // onAnimationEnd={() => setAnimated(false)}
            animationDuration={1200}
            animationEasing="ease-out"
             
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CSRProgressChart;