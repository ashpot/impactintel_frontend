import { useState, useMemo, memo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  budgetSpent: number;
  budgetTotal: number;
  status: "Active" | "On Hold" | "Completed" | "Planned";
  beneficiaries: number;
  startDate: string;
  endDate: string;
  impactScore: number | null;
}

interface ProjectsResponse {
  rows: Project[];
  totalCount: number;
  pageCount: number;
}

// ─── Mock API — swap body with real fetch when backend is ready ───────────────

const MOCK: Project[] = [
  { id: "1",  name: "Clean Water Initiative",      budgetSpent: 1.9, budgetTotal: 2.5,  status: "Active",    beneficiaries: 1450, startDate: "02-09-2025", endDate: "25-12-2025", impactScore: 98 },
  { id: "2",  name: "Rural Education Programme",   budgetSpent: 3.2, budgetTotal: 5.0,  status: "Active",    beneficiaries: 1850, startDate: "02-01-2024", endDate: "30-11-2024", impactScore: 90 },
  { id: "3",  name: "Solar Energy Installation",   budgetSpent: 6.5, budgetTotal: 10.0, status: "On Hold",   beneficiaries: 3200, startDate: "01-03-2024", endDate: "31-12-2025", impactScore: 72 },
  { id: "4",  name: "Healthcare Access Project",   budgetSpent: 3.5, budgetTotal: 3.5,  status: "Completed", beneficiaries: 2320, startDate: "01-06-2023", endDate: "30-05-2024", impactScore: 93 },
  { id: "5",  name: "Digital Literacy Training",   budgetSpent: 0.0, budgetTotal: 4.0,  status: "Planned",   beneficiaries: 0,    startDate: "20-01-2026", endDate: "31-06-2026", impactScore: null },
  { id: "6",  name: "Women Empowerment Initiative",budgetSpent: 2.8, budgetTotal: 6.0,  status: "Active",    beneficiaries: 1560, startDate: "01-04-2024", endDate: "31-03-2025", impactScore: 88 },
  { id: "7",  name: "Waste Management System",     budgetSpent: 8.2, budgetTotal: 12.0, status: "Active",    beneficiaries: 4100, startDate: "10-09-2025", endDate: "23-12-2025", impactScore: 95 },
  { id: "8",  name: "Youth Sports Development",    budgetSpent: 3.8, budgetTotal: 3.8,  status: "Completed", beneficiaries: 890,  startDate: "01-07-2023", endDate: "30-06-2024", impactScore: 82 },
  { id: "9",  name: "Maternal Health Programme",   budgetSpent: 1.2, budgetTotal: 3.0,  status: "Active",    beneficiaries: 720,  startDate: "15-02-2025", endDate: "14-02-2026", impactScore: 87 },
  { id: "10", name: "Reforestation Drive",         budgetSpent: 0.5, budgetTotal: 2.0,  status: "Active",    beneficiaries: 310,  startDate: "01-04-2025", endDate: "31-03-2026", impactScore: 76 },
  { id: "11", name: "Skills Acquisition Center",   budgetSpent: 4.1, budgetTotal: 4.1,  status: "Completed", beneficiaries: 980,  startDate: "03-03-2023", endDate: "28-02-2024", impactScore: 91 },
  { id: "12", name: "Road Safety Campaign",        budgetSpent: 0.0, budgetTotal: 1.5,  status: "Planned",   beneficiaries: 0,    startDate: "01-06-2026", endDate: "31-12-2026", impactScore: null },
  { id: "13", name: "Micro Finance Initiative",    budgetSpent: 2.0, budgetTotal: 5.5,  status: "Active",    beneficiaries: 2100, startDate: "10-10-2024", endDate: "09-10-2025", impactScore: 84 },
  { id: "14", name: "Clean Cooking Project",       budgetSpent: 1.7, budgetTotal: 3.2,  status: "On Hold",   beneficiaries: 1100, startDate: "05-07-2024", endDate: "04-07-2025", impactScore: 65 },
  { id: "15", name: "Civic Education Outreach",    budgetSpent: 0.9, budgetTotal: 1.8,  status: "Active",    beneficiaries: 4500, startDate: "01-01-2025", endDate: "31-12-2025", impactScore: 79 },
];

// Simulate server-side pagination + sorting
async function fetchProjects(
  pageIndex: number,
  pageSize: number,
  sorting: SortingState,
  search: string,
  status: string
): Promise<ProjectsResponse> {
  await new Promise((r) => setTimeout(r, 380)); // simulate latency

  let rows = [...MOCK];

  // filter
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter((r) => r.name.toLowerCase().includes(q));
  }
  if (status && status !== "All Status") {
    rows = rows.filter((r) => r.status === status);
  }

  // sort
  if (sorting.length > 0) {
    const { id, desc } = sorting[0];
    rows.sort((a, b) => {
      const av = a[id as keyof Project] ?? "";
      const bv = b[id as keyof Project] ?? "";
      if (av < bv) return desc ? 1 : -1;
      if (av > bv) return desc ? -1 : 1;
      return 0;
    });
  }

  const totalCount = rows.length;
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const start = pageIndex * pageSize;

  return { rows: rows.slice(start, start + pageSize), totalCount, pageCount };
}

// ─── Sub-components (memoized) ────────────────────────────────────────────────

const StatusBadge = memo(({ status }: { status: Project["status"] }) => {
  const styles: Record<Project["status"], string> = {
    Active:    "bg-green-50 text-green-700",
    "On Hold": "bg-red-50 text-red-400",
    Completed: "bg-yellow-50 text-yellow-600",
    Planned:   "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
});

const ImpactScore = memo(({ score }: { score: number | null }) => {
  const dotColor =
    score === null ? "bg-gray-300"
    : score >= 85  ? "bg-green-500"
    : score >= 70  ? "bg-yellow-400"
    : "bg-red-500";

  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
      <span className="text-sm text-text-primary">
        {score !== null ? `${score}%` : "0"}
      </span>
    </div>
  );
});

const SkeletonRow = memo(({ cols }: { cols: number }) => (
  <tr className="border-b border-line">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-5 py-4">
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse" style={{ width: `${[55, 45, 35, 30, 35, 35, 30][i] ?? 40}%` }} />
      </td>
    ))}
  </tr>
));

// ─── Column Definitions (outside component — stable reference) ────────────────

const columnHelper = createColumnHelper<Project>();

const COLUMNS = [
  columnHelper.accessor("name", {
  header: "Project Name",
  cell: (i) => {
    const row = i.row.original;
    // slugify name for a friendly url
    const projectSlug = row.name.toLowerCase().replace(/ /g, "-"); 
    
    return (
      <Link 
        to={`/dashboard/projects/${projectSlug}`} 
        className="text-sm font-medium text-text-primary01 hover:text-brand-primary hover:underline"
      >
        {i.getValue()}
      </Link>
    );
  },
}),
  columnHelper.accessor("budgetSpent", {
    header: "Budget",
    cell: (i) => {
      const row = i.row.original;
      return (
        <span className="text-sm font-semibold text-text-primary01">
          ₦{row.budgetSpent.toFixed(1)}M{" "}
          <span className="font-normal text-text-body">/ ₦{row.budgetTotal.toFixed(1)}M</span>
        </span>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (i) => <StatusBadge status={i.getValue()} />,
  }),
  columnHelper.accessor("beneficiaries", {
    header: "Beneficiaries",
    cell: (i) => (
      <span className="text-sm text-text-primary01">
        {i.getValue().toLocaleString()}
      </span>
    ),
  }),
  columnHelper.accessor("startDate", {
    header: "Start Date",
    cell: (i) => <span className="text-sm text-text-body">{i.getValue()}</span>,
  }),
  columnHelper.accessor("endDate", {
    header: "End Date",
    cell: (i) => <span className="text-sm text-text-body">{i.getValue()}</span>,
  }),
  columnHelper.accessor("impactScore", {
    header: "Impact Score",
    cell: (i) => <ImpactScore score={i.getValue()} />,
  }),
];

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProjectsTableProps {
  search?: string;
  statusFilter?: string;
}

const ProjectsTable = ({ search = "", statusFilter = "All Status" }: ProjectsTableProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  // Reset to page 0 when filters change
  const stablePagination = useMemo(
    () => ({ ...pagination, pageIndex: 0 }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, statusFilter]
  );

  const queryPagination = search || statusFilter !== "All Status"
    ? stablePagination
    : pagination;

  // ── TanStack Query ──
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["projects", queryPagination.pageIndex, queryPagination.pageSize, sorting, search, statusFilter],
    queryFn: () =>
      fetchProjects(queryPagination.pageIndex, queryPagination.pageSize, sorting, search, statusFilter),
    placeholderData: keepPreviousData, // keeps old rows visible during page transitions
    staleTime: 30_000,                 // don't refetch if data is < 30s old
  });

  // ── Memoized table data ──
  const tableData = useMemo(() => data?.rows ?? [], [data?.rows]);

  // ── TanStack Table ──
  const table = useReactTable({
    data: tableData,
    columns: COLUMNS,
    rowCount: data?.totalCount ?? 0,
    state: { pagination: queryPagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // ── Stable pagination handlers ──
  const handlePrev = useCallback(() => table.previousPage(), [table]);
  const handleNext = useCallback(() => table.nextPage(), [table]);
  const goToPage  = useCallback((i: number) => setPagination((p) => ({ ...p, pageIndex: i })), []);

  const { pageIndex, pageSize } = queryPagination;
  const totalCount = data?.totalCount ?? 0;
  const pageCount  = data?.pageCount  ?? 0;

  // page number buttons — show at most 5
  const pageButtons = useMemo(() => {
    const max = 5;
    let start = Math.max(0, pageIndex - Math.floor(max / 2));
    const end = Math.min(pageCount, start + max);
    if (end - start < max) start = Math.max(0, end - max);
    return Array.from({ length: end - start }, (_, i) => start + i);
  }, [pageIndex, pageCount]);

  return (
    <div className="bg-white rounded-xl border border-line font-lato overflow-hidden">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* Head */}
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-line">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`
                      px-5 py-4 text-left text-[11px] font-semibold tracking-widest
                      text-text-body uppercase whitespace-nowrap select-none
                      ${header.column.getCanSort() ? "cursor-pointer hover:text-text-primary transition-colors" : ""}
                    `}
                  >
                    <span className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-[10px] opacity-40">
                          {header.column.getIsSorted() === "asc"  ? "↑"
                          : header.column.getIsSorted() === "desc" ? "↓"
                          : "↕"}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <SkeletonRow key={i} cols={COLUMNS.length} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-5 py-16 text-center text-sm text-text-body"
                >
                  No projects found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`
                    border-b border-line last:border-0 transition-colors
                    hover:bg-nav-active/40
                    ${isPlaceholderData ? "opacity-50" : "opacity-100"}
                  `}
                >
                    {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer — Pagination */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-line flex-wrap gap-3">

        {/* Count */}
        <p className="text-sm text-text-body">
          Showing{" "}
          <span className="font-medium text-text-primary01">
            {totalCount === 0 ? 0 : pageIndex * pageSize + 1}–
            {Math.min((pageIndex + 1) * pageSize, totalCount)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-text-primary01">{totalCount}</span>{" "}
          projects
        </p>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {/* Prev */}
          <button
            onClick={handlePrev}
            disabled={!table.getCanPreviousPage()}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-line text-text-body hover:bg-nav-active disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {pageButtons.map((i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`
                w-8 h-8 rounded-xl text-sm font-medium transition-colors
                ${pageIndex === i
                  ? "bg-brand-primary text-white shadow-sm"
                  : "border border-line text-text-body hover:bg-nav-active"
                }
              `}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={!table.getCanNextPage()}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-line text-text-body hover:bg-nav-active disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default memo(ProjectsTable);