import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
export interface dataType{
    name: string
    value: number
    color:string
}
interface donutChartProps{
    items: dataType[]
    header: string
    subHead?: string
}

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

export const DonutChart = ({items, header, subHead}:donutChartProps) => {
  return (
    <div className="bg-white rounded-3xl border border-line w-full p-6 font-lato card-shadow">
      {/* Header */}
      <h2 className={`text-lg font-semibold text-text-primary01 ${!subHead && 'mb-4'}`}>
        {header}
      </h2>
      {subHead && <p className="text-sm text-text-body mb-4">{subHead}</p>}
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={items}
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
            {items.map((entry, index) => (
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
        {items.map((entry) => (
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