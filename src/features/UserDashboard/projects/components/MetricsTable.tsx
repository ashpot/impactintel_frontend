export interface Metric {
  id:       string;
  name:     string;
  baseline: string;
  target:   string;
  achieved: string;
  variance: string; 
}

interface MetricsTableProps {
  data:  Metric[];
  title: string;
}

const COLUMNS = [
  { key: "name",     label: "Metric Name" },
  { key: "baseline", label: "Baseline"    },
  { key: "target",   label: "Target"      },
  { key: "achieved", label: "Achieved"    },
  { key: "variance", label: "Variance"    },
] as const;

const MetricsTable = ({
  data,
  title,
}: MetricsTableProps) => {
  return (
    <div className="bg-white rounded-2xl border border-line font-lato overflow-hidden card-shadow">

      {/* Title */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-lg font-semibold text-text-primary01">{title}</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* Head */}
          <thead>
            <tr className="border-b border-line">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-[11px] font-semibold tracking-widest text-text-body uppercase whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-6 py-16 text-center text-sm text-text-body"
                >
                  No metrics available.
                </td>
              </tr>
            ) : (
              data.map((metric) => {
                const isPositive = metric.variance.startsWith("+");
                const isNegative = metric.variance.startsWith("-");

                return (
                  <tr
                    key={metric.id}
                    className="border-b border-line last:border-0 hover:bg-nav-active/40 transition-colors"
                  >
                    {/* Metric Name */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-text-primary01">
                        {metric.name}
                      </span>
                    </td>

                    {/* Baseline */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-text-body">
                        {metric.baseline}
                      </span>
                    </td>

                    {/* Target */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-text-body">
                        {metric.target}
                      </span>
                    </td>

                    {/* Achieved */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-text-body">
                        {metric.achieved}
                      </span>
                    </td>

                    {/* Variance — green for positive, red for negative */}
                    <td className="px-6 py-5">
                      <span
                        className={`text-sm font-semibold ${
                          isPositive
                            ? "text-green-600"
                            : isNegative
                            ? "text-red-500"
                            : "text-text-body"
                        }`}
                      >
                        {metric.variance}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MetricsTable;