import React, { useState } from "react";
import { cn } from "@/shared/utils/cn";
import Button from "@/shared/ui/Button";

type MetricId =
  | "totalBeneficiaries"
  | "budgetUtilization"
  | "csrScore"
  | "projectCount"
  | "sdgAlignment";

type VisualizationType = "barChart" | "lineChart" | "pieChart" | "dataTable";

const METRICS: { id: MetricId; label: string }[] = [
  { id: "totalBeneficiaries", label: "Total Beneficiaries" },
  { id: "budgetUtilization",  label: "Budget Utilization"  },
  { id: "csrScore",           label: "CSR Score"           },
  { id: "projectCount",       label: "Project Count"       },
  { id: "sdgAlignment",       label: "SDG Alignment"       },
];

const VISUALIZATION_TYPES: { id: VisualizationType; label: string }[] = [
  { id: "barChart",   label: "Bar Chart"   },
  { id: "lineChart",  label: "Line Chart"  },
  { id: "pieChart",   label: "Pie Chart"   },
  { id: "dataTable",  label: "Data Table"  },
];


interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ id, label, checked, onChange }) => (
  <label
    htmlFor={id}
    className="flex items-center gap-3 cursor-pointer group"
  >
    <div className="relative flex items-center justify-center shrink-0">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => onChange(id)}
        className="sr-only peer"
      />
      {/* custom checkbox box */}
      <div
        className={cn(
          "w-4.5 h-4.5 rounded-sm border transition-all duration-150",
          "flex items-center justify-center",
          checked
            ? "bg-brand-primary border-brand-primary"
            : "bg-white border-border-secondary group-hover:border-brand-primary/60"
        )}
      >
        {checked && (
          <svg
            viewBox="0 0 10 8"
            fill="none"
            className="w-2.5 h-2 text-text-primary"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 4l2.5 2.5L9 1" />
          </svg>
        )}
      </div>
    </div>
    <span
      className={cn(
        "text-sm transition-colors duration-150",
        checked ? "text-text-primary font-medium" : "text-text-body"
      )}
    >
      {label}
    </span>
  </label>
);

interface RadioItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
  name: string;
}

const RadioItem: React.FC<RadioItemProps> = ({ id, label, checked, onChange, name }) => (
  <label
    htmlFor={id}
    className="flex items-center gap-3 cursor-pointer group"
  >
    <div className="relative flex items-center justify-center shrink-0">
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={() => onChange(id)}
        className="sr-only peer"
      />
      {/* custom radio circle */}
      <div
        className={cn(
          "w-4.5 h-4.5 rounded-full border-2 transition-all duration-150",
          "flex items-center justify-center",
          checked
            ? "border-brand-primary"
            : "border-border-secondary group-hover:border-brand-primary/60"
        )}
      >
        {checked && (
          <div className="w-2 h-2 rounded-full bg-brand-primary" />
        )}
      </div>
    </div>
    <span
      className={cn(
        "text-sm transition-colors duration-150",
        checked ? "text-text-primary font-medium" : "text-text-body"
      )}
    >
      {label}
    </span>
  </label>
);

const PreviewEmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-3 h-full">
    {/* document icon */}
    <svg
      viewBox="0 0 56 56"
      fill="none"
      className="w-14 h-14 text-placeholder"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 6H34L46 18V50C46 51.1046 45.1046 52 44 52H12C10.8954 52 10 51.1046 10 50V8C10 6.89543 10.8954 6 12 6H14Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 6V18H46"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 32H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 38H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    <p className="text-sm text-placeholder">Preview will appear here</p>
  </div>
);

const BuildCustomReport = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<Set<MetricId>>(new Set());
  const [selectedViz, setSelectedViz] = useState<VisualizationType | null>(null);

  const toggleMetric = (id: string) => {
    const currMetricId = id as MetricId
    setSelectedMetrics((prev) => {
      const next = new Set(prev);
      if (next.has(currMetricId)) {
        next.delete(currMetricId);
      } else {
        next.add(currMetricId);
      }
      return next;
    });
  };

  const handleVizChange = (id: string) => {
    setSelectedViz(id as VisualizationType);
  };

  return (
    <div className="bg-white rounded-2xl border border-border-secondary p-6 w-full">
      <div className="flex gap-6">
        {/* ── Left panel ── */}
        <div className="flex flex-col gap-6 w-65 shrink-0">
          <h2 className="text-xl font-semibold text-text-primary font-jakarta">
            Build Custom Report
          </h2>

          {/* Select Metrics */}
          <section className="flex flex-col gap-3">
            <p className="text-sm font-medium text-text-primary">Select Metrics</p>
            <div className="flex flex-col gap-3">
              {METRICS.map((metric) => (
                <CheckboxItem
                  key={metric.id}
                  id={metric.id}
                  label={metric.label}
                  checked={selectedMetrics.has(metric.id)}
                  onChange={toggleMetric}
                />
              ))}
            </div>
          </section>

          {/* Visualization Type */}
          <section className="flex flex-col gap-3">
            <p className="text-sm font-medium text-text-primary">Visualization Type</p>
            <div className="flex flex-col gap-3">
              {VISUALIZATION_TYPES.map((viz) => (
                <RadioItem
                  key={viz.id}
                  id={viz.id}
                  label={viz.label}
                  checked={selectedViz === viz.id}
                  onChange={handleVizChange}
                  name="visualizationType"
                />
              ))}
            </div>
          </section>

          {/* Generate Report Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full font-semibold"
          >
            Generate Report
          </Button>
        </div>

        {/* ── Right panel (preview) ── */}
        <div className="flex-1 rounded-xl bg-dashboard-bg border border-border-secondary min-h-100">
          <PreviewEmptyState />
        </div>
      </div>
    </div>
  );
};

export default BuildCustomReport;