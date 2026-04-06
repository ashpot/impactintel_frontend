import { Search, ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SelectFilter {
  label?:    string;
  options:   string[];
  value?:    string;
  onChange?: (val: string) => void;
}

interface TableFilterProps {
  searchPlaceholder?:  string;
  searchLabel?:        string;
  searchValue?:        string;
  onSearchChange?:     (val: string) => void;
  actorFilter?:        SelectFilter;
  entityFilter?:       SelectFilter;
  actionFilter?:       SelectFilter;
  statusFilter?:       SelectFilter;
  sectorFilter?:       SelectFilter;
  organizationFilter?: SelectFilter;
  roleFilter?:         SelectFilter;
  dateRangeFilter?:    SelectFilter;
  historyFilter?:      SelectFilter;
  showLabels?:         boolean;
}

// ─── Select field ─────────────────────────────────────────────────────────────

const SelectField = ({
  filter,
  showLabel,
}: {
  filter:    SelectFilter;
  showLabel: boolean;
}) => (
  <div className="flex flex-col gap-1">
    {showLabel && filter.label && (
      <span className="text-xs text-text-body">{filter.label}</span>
    )}
    <div className="relative border border-line rounded-lg bg-white">
      <select
        value={filter.value}
        onChange={(e) => filter.onChange?.(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2 text-sm text-text-body bg-transparent border-none focus:outline-none cursor-pointer whitespace-nowrap"
      >
        {filter.options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-body pointer-events-none" />
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const TableFilter = ({
  searchPlaceholder  = "Search...",
  searchLabel,
  searchValue,
  onSearchChange,
  actorFilter,
  entityFilter,
  actionFilter,
  statusFilter,
  sectorFilter,
  organizationFilter,
  roleFilter,
  dateRangeFilter,
  historyFilter,
  showLabels         = false,
}: TableFilterProps) => {

  const filters = [
    actorFilter,
    entityFilter,
    actionFilter,
    statusFilter,
    sectorFilter,
    organizationFilter,
    roleFilter,
    dateRangeFilter,
    historyFilter,
  ].filter(Boolean) as SelectFilter[];

  return (
    <div className="p-5 bg-white rounded-2xl border border-line font-lato">
      {/*
        Single flex-wrap row — everything sits inline.
        Each item has a fixed min-width so it never stretches.
        Items wrap to next line naturally when they run out of space.
      */}
      <div className="flex flex-wrap items-end gap-3">

        {/* Search — takes more space than filters */}
        <div className="flex flex-col gap-1 min-w-[200px] flex-1">
          {showLabels && searchLabel && (
            <span className="text-xs text-text-body">{searchLabel}</span>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-placeholder pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm text-text-primary bg-white rounded-lg border border-line placeholder:text-placeholder focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
        </div>

        {/* All filters inline — fixed width, wraps naturally */}
        {filters.map((filter, i) => (
          <div key={i} className="min-w-37.5">
            <SelectField filter={filter} showLabel={showLabels} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default TableFilter;