// --- Types ---
type TimelineStatus = "completed" | "in-progress" | "pending";

interface TimelineItem {
  id: string;
  label: string;
  date: string;
  status: TimelineStatus;
}

// --- Icons ---
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const HourglassIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 2h14" />
    <path d="M5 22h14" />
    <path d="M5 2c0 4.5 7 6 7 10S5 19.5 5 22" />
    <path d="M19 2c0 4.5-7 6-7 10s7 7.5 7 10" />
  </svg>
);

// --- Status dot ---
const StatusDot = ({ status }: { status: TimelineStatus }) => {
  if (status === "completed") {
    return (
      <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center shrink-0 shadow-sm">
        <CheckIcon className="w-6 h-6 text-white" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shrink-0 shadow-sm">
      <HourglassIcon className="w-6 h-6 text-white" />
    </div>
  );
};

// --- Connector line between items ---
const Connector = ({ status }: { status: TimelineStatus }) => (
  <div className="flex justify-center w-10 shrink-0">
    <div
      className={`w-0.5 h-6 ${
        status === "completed" ? "bg-success" : "bg-brand-primary"
      }`}
    />
  </div>
);

// --- Data ---
const timelineItems: TimelineItem[] = [
  { id: "1", label: "Project Planning",    date: "SEPT 2025", status: "completed"  },
  { id: "2", label: "Site Assessment",     date: "OCT 2025",  status: "completed"  },
  { id: "3", label: "Infrastructure Setup",date: "NOV 2025",  status: "in-progress"},
  { id: "4", label: "Training & Handover", date: "DEC 2025",  status: "in-progress"},
];

// --- Main Component ---
const ProjectTimeline = () => {
  return (
    <div className="bg-white rounded-2xl border border-line card-shadow p-6 w-full">
      <h2 className="text-lg font-bold text-text-title font-lato mb-5">
        Project Timeline
      </h2>

      <div className="flex flex-col">
        {timelineItems.map((item, index) => {
          const isLast = index === timelineItems.length - 1;
        //   const nextItem = timelineItems[index + 1];

          return (
            <div key={item.id}>
              {/* Row */}
              <div className="flex items-center gap-4">
                <StatusDot status={item.status} />
                <div>
                  <p className="text-sm font-semibold text-text-title font-lato leading-tight">
                    {item.label}
                  </p>
                  <p className="text-xs text-text-body font-lato mt-0.5 tracking-wide">
                    {item.date}
                  </p>
                </div>
              </div>

              {/* Connector to next item */}
              {!isLast && (
                <Connector status={item.status} />
               )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTimeline;