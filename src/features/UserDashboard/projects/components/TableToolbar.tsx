import { cn } from "@/shared/utils/cn";
import { Search, ChevronDown, Download } from "lucide-react";

interface TableToolbarProps {
  // search: string;
  // onSearchChange: (val: string) => void;
  // status: string;
  // onStatusChange: (val: string) => void;
  // sdg: string;
  // onSdgChange: (val: string) => void;
  // onExport: () => void;
  statusOptions?: string[];
  sdgOptions?: string[];
}

const TableToolbar = ({
  // search,
  // onSearchChange,
  // status,
  // onStatusChange,
  // sdg,
  // onSdgChange,
  // onExport,
  statusOptions = ["All Status", "Active", "Completed", "At Risk"],
  sdgOptions = ["All SDGs", "SDG 1", "SDG 2", "SDG 3", "SDG 4", "SDG 7", "SDG 13"],
}: TableToolbarProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-line font-lato flex-wrap">

      {/* Search */}
      <div className="relative flex-1 min-w-52">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-placeholder pointer-events-none" />
        <input
          type="text"
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, reports"
          className={cn("w-full pl-10 pr-4 py-2 rounded-lg border border-line bg-dashboard-bg text-sm text-text-body", 
              "placeholder:font-lato placeholder-text-body/50 focus:outline-none focus:ring-2 focus:ring-dashboard-bg focus:border-brand-primary transition-all")}
        />
      </div>

      {/* Divider */}
      <div className="h-7 w-px bg-line" />

      {/* Status Dropdown */}
      <div className="relative">
        <select
          // value={status}
          // onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none border border-line rounded-lg pl-3 pr-8 py-2 text-sm text-text-primary bg-transparent focus:outline-none cursor-pointer"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-text-body pointer-events-none" />
      </div>

      {/* Divider */}
      <div className="h-7 w-px bg-line hidden sm:block" />

      {/* SDG Dropdown */}
      <div className="relative">
        <select
          // value={sdg}
          // onChange={(e) => onSdgChange(e.target.value)}
          className="appearance-none border border-line rounded-lg pl-3 pr-8 py-2 text-sm text-text-primary bg-transparent focus:outline-none cursor-pointer"
        >
          {sdgOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-text-body pointer-events-none" />
      </div>

      {/* Divider */}
      <div className="h-7 w-px bg-line hidden sm:block" />

      {/* Export CSV */}
      <button
        // onClick={onExport}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-brand-primary border border-brand-primary rounded-lg hover:bg-brand-primary/5 active:scale-95 transition-all"
      >
        <Download className="w-4 h-4" />
        Export CSV
      </button>

    </div>
  );
};

export default TableToolbar;