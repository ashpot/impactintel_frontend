import { Search, ChevronDown } from "lucide-react";

interface TableFilterProps {
//   search:          string;
//   onSearchChange:  (val: string) => void;
//   status:          string;
//   onStatusChange:  (val: string) => void;
//   sector:          string;
//   onSectorChange:  (val: string) => void;
  statusOptions?:  string[];
  sectorOptions?:  string[];
}

const TableFilter = ({
//   search,
//   onSearchChange,
//   status,
//   onStatusChange,
//   sector,
//   onSectorChange,
  statusOptions = ["All Statuses", "New", "In Progress", "Converted", "Declined"],
  sectorOptions = ["All Sectors", "Banking & Finance", "Technology", "Telecommunications", "Philanthropy", "Manufacturing", "Energy & Oil"],
}: TableFilterProps) => {
  return (
    <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-line font-lato">

      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-placeholder pointer-events-none" />
        <input
          type="text"
        //   value={search}
        //   onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by organization or email"
          className="w-full pl-9 pr-4 py-2 text-sm text-text-primary bg-transparent rounded-lg border border-line placeholder:text-placeholder focus:outline-none focus:border-brand-primary transition-colors"
        />
      </div>

      {/* Status Dropdown */}
      <div className="relative w-full border border-line rounded-lg">
        <select
        //   value={status}
        //   onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 text-sm text-text-body bg-transparent border-none focus:outline-none cursor-pointer"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-text-body pointer-events-none" />
      </div>


      {/* Sector Dropdown */}
      <div className="relative w-full border border-line rounded-lg">
        <select
        //   value={sector}
        //   onChange={(e) => onSectorChange(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 text-sm text-text-body bg-transparent border-none focus:outline-none cursor-pointer"
        >
          {sectorOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-text-body pointer-events-none" />
      </div>
    </div>
  );
};

export default TableFilter;