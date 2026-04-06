type TimelineStatus = "submitted" | "reviewed" | "converted" | "pending" | "declined";

interface TimelineItem {
  id: string;
  label: string;
  date?: string;
  subLabel?: string
  status: TimelineStatus;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);


const StatusDot = ({ status }: { status: TimelineStatus }) => {
  if (status === "converted") {
    return (
      <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center shrink-0 shadow-sm">
        <CheckIcon className="w-6 h-6 text-bg-main" />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className="w-10 h-10 rounded-full bg-line flex items-center justify-center shrink-0 shadow-sm">
        
      </div>
    );
  }
  if (status === 'declined') {
    return (
      <div className="w-10 h-10 rounded-full bg-error01 flex items-center justify-center shrink-0 shadow-sm">
        <CheckIcon className="w-6 h-6 text-bg-main" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shrink-0 shadow-sm">
      <CheckIcon className="w-6 h-6 text-text-primary01" />
    </div>
  );
};

// --- Connector line between items ---
const Connector = () => (
  <div className="flex justify-center w-10 shrink-0">
    <div
      className={`w-1 h-15 bg-line`}
    />
  </div>
);

// --- Data ---
const timelineItems: TimelineItem[] = [
  { id: "1", label: "Submitted",    date: "10 Jan 2026, 14:30", status: "submitted"  },
  { id: "2", label: "Reviewed",     status: "pending"  },
  { id: "3", label: "Converted",   status: "pending"},
];

// --- Main Component ---
const RequestStatus = () => {
  return (

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
                    {item.date ? item.date : item.subLabel}
                  </p>
                </div>
              </div>

              {/* Connector to next item */}
              {!isLast && (
                <Connector />
               )}
            </div>
          );
        })}
      </div>
  );
};

export default RequestStatus;