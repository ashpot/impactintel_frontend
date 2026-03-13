import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Environmental", value: 45, color: "hsla(44, 100%, 52%, 1)" },
  { name: "Social",         value: 35, color: "hsla(147, 45%, 48%, 1)" },
  { name: "Governance",     value: 20, color: "hsla(0, 94%, 48%, 1)" },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { color: string } }[];
}) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-line rounded-xl shadow-md px-4 py-2">
        <p className="text-xs text-text-body mb-0.5">{payload[0].name}</p>
        <p className="text-base font-bold text-text-primary01">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const BudgetAllocationChart = () => {
  return (
    <div className="bg-white rounded-3xl border border-line w-[55%] p-6 font-lato">
      {/* Header */}
      <h2 className="text-lg font-semibold text-text-primary01">
        Budget Allocation
      </h2>
      <p className="text-sm text-text-body mb-4">Distribution by category</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={75}   
            outerRadius={115}
            startAngle={90}   
            endAngle={-270}    
            paddingAngle={2}  
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="none"   
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-col gap-3 mt-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between ">
            <div className="flex items-center gap-2.5">
              {/* Colored dot */}
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-body">{entry.name}</span>
            </div>
            <span className="text-sm font-semibold text-text-primary01">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetAllocationChart;