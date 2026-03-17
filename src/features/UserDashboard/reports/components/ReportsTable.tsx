import { useState, useMemo, memo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type PaginationState,
} from "@tanstack/react-table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Eye, Download, Share2 } from "lucide-react";
import Button from "@/shared/ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Report {
  id: string;
  name: string;
  type: "SDG Report" | "Financial" | "Custom" | "Impact Scorecard";
  dateGenerated: string;
  generatedBy: {
    name: string;
    avatar: string;
  };
}

interface ReportsResponse {
  rows: Report[];
  totalCount: number;
  pageCount: number;
}

// ─── API — swap with your real endpoint ──────────────────────────────────────

const MOCK_REPORTS: Report[] = [
  { id: "1",  name: "Q3 SDG Impact Summary",    type: "SDG Report",       dateGenerated: "Nov 1, 2025",  generatedBy: { name: "Sarah Johnson", avatar: "/src/assets/images/testimonial_avatar_03.png"  } },
  { id: "2",  name: "October Budget Analysis",   type: "Financial",        dateGenerated: "Oct 28, 2025", generatedBy: { name: "David Ibe",      avatar: "/src/assets/images/testimonial_avatar_02.png"  } },
  { id: "3",  name: "Annual Impact Report 2024", type: "Custom",           dateGenerated: "Oct 15, 2025", generatedBy: { name: "Lisa Anderson",  avatar: "/src/assets/images/testimonial_avatar_01.png"   } },
  { id: "4",  name: "Q2 Performance Review",     type: "Impact Scorecard", dateGenerated: "Oct 5, 2025",  generatedBy: { name: "Emily Davis",    avatar: "/src/assets/images/testimonial_avatar_02.png"  } },
  { id: "5",  name: "ESG Compliance Report",     type: "SDG Report",       dateGenerated: "Sep 20, 2025", generatedBy: { name: "Marcus Chen",    avatar: "/src/assets/images/testimonial_avatar_03.png" } },
  { id: "1",  name: "Q3 SDG Impact Summary",    type: "SDG Report",       dateGenerated: "Nov 1, 2025",  generatedBy: { name: "Sarah Johnson", avatar: "/src/assets/images/testimonial_avatar_03.png"  } },
  { id: "2",  name: "October Budget Analysis",   type: "Financial",        dateGenerated: "Oct 28, 2025", generatedBy: { name: "David Ibe",      avatar: "/src/assets/images/testimonial_avatar_02.png"  } },
  { id: "3",  name: "Annual Impact Report 2024", type: "Custom",           dateGenerated: "Oct 15, 2025", generatedBy: { name: "Lisa Anderson",  avatar: "/src/assets/images/testimonial_avatar_01.png"   } },
  { id: "4",  name: "Q2 Performance Review",     type: "Impact Scorecard", dateGenerated: "Oct 5, 2025",  generatedBy: { name: "Emily Davis",    avatar: "/src/assets/images/testimonial_avatar_02.png"  } },
  { id: "5",  name: "ESG Compliance Report",     type: "SDG Report",       dateGenerated: "Sep 20, 2025", generatedBy: { name: "Marcus Chen",    avatar: "/src/assets/images/testimonial_avatar_03.png" } },
];

// async/await — swap the body with your real fetch:
// const res  = await fetch(`/api/reports?page=${pageIndex}&size=${pageSize}`)
// const json = await res.json()
// return json
const fetchReports = async (
  pageIndex: number,
  pageSize: number
): Promise<ReportsResponse> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 350));

  const totalCount = MOCK_REPORTS.length;
  const pageCount  = Math.max(1, Math.ceil(totalCount / pageSize));
  const start      = pageIndex * pageSize;

  return {
    rows:       MOCK_REPORTS.slice(start, start + pageSize),
    totalCount,
    pageCount,
  };
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const TypeBadge = memo(({ type }: { type: Report["type"] }) => (
  <span className="bg-nav-active inline-flex px-3 py-1.5 rounded-lg border border-brand-primary text-sm font-medium text-brand-primary whitespace-nowrap">
    {type}
  </span>
));

const GeneratedBy = memo(({ name, avatar }: { name: string; avatar: string }) => (
  <div className="flex items-center gap-2.5">
    <img
      src={avatar}
      alt={name}
      className="w-8 h-8 rounded-full object-cover bg-yellow-50 shrink-0"
    />
    <span className="text-sm font-medium text-text-primary01">{name}</span>
  </div>
));

const RowActions = memo(({
  id,
  onView,
  onDownload,
  onShare,
}: {
  id: string;
  onView:     (id: string) => void;
  onDownload: (id: string) => void;
  onShare:    (id: string) => void;
}) => (
  <div className="flex items-center">
    <Button
      variant="ghost"
      size="sm"
      leftIcon={<Eye className="w-3.5 h-3.5" />}
      onClick={() => onView(id)}
      className="text-brand-primary"
    >
      View
    </Button>

    <span className="text-line select-none">|</span>

    <Button
      variant="ghost"
      size="sm"
      leftIcon={<Download className="w-3.5 h-3.5" />}
      onClick={() => onDownload(id)}
      className="text-brand-primary"
    >
      Download
    </Button>

    <span className="text-line select-none">|</span>

    <Button
      variant="ghost"
      size="sm"
      leftIcon={<Share2 className="w-3.5 h-3.5" />}
      onClick={() => onShare(id)}
      className="text-brand-primary"
    >
      Share
    </Button>
  </div>
));

const SkeletonRow = memo(({ cols }: { cols: number }) => (
  <tr className="border-b border-line">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-6 py-5">
        <div
          className="h-3.5 bg-gray-100 rounded-full animate-pulse"
          style={{ width: `${[60, 28, 35, 45, 42][i] ?? 40}%` }}
        />
      </td>
    ))}
  </tr>
));

// ─── Column Definitions (outside component — stable reference) ────────────────

const columnHelper = createColumnHelper<Report>();

const buildColumns = (
  onView:     (id: string) => void,
  onDownload: (id: string) => void,
  onShare:    (id: string) => void,
) => [
  columnHelper.accessor("name", {
    header: "Report Name",
    cell:   (i) => <span className="text-sm text-text-primary01">{i.getValue()}</span>,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell:   (i) => <TypeBadge type={i.getValue()} />,
  }),
  columnHelper.accessor("dateGenerated", {
    header: "Date Generated",
    cell:   (i) => <span className="text-sm text-text-body">{i.getValue()}</span>,
  }),
  columnHelper.accessor("generatedBy", {
    header: "Generated By",
    cell:   (i) => {
      const { name, avatar } = i.getValue();
      return <GeneratedBy name={name} avatar={avatar} />;
    },
  }),
  columnHelper.display({
    id:     "actions",
    header: "Actions",
    cell:   (i) => (
      <RowActions
        id={i.row.original.id}
        onView={onView}
        onDownload={onDownload}
        onShare={onShare}
      />
    ),
  }),
];

// ─── Main Component ────

const ReportsTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize:  4,
  });

  // Wire these to your real logic when backend is ready
  const handleView     = useCallback((id: string) => console.log("View",     id), []);
  const handleDownload = useCallback((id: string) => console.log("Download", id), []);
  const handleShare    = useCallback((id: string) => console.log("Share",    id), []);

  const columns = useMemo(
    () => buildColumns(handleView, handleDownload, handleShare),
    [handleView, handleDownload, handleShare]
  );

  // ── TanStack Query ──
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey:        ["reports", pagination.pageIndex, pagination.pageSize],
    queryFn:         async () => fetchReports(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
    staleTime:       30_000,
  });

  const tableData = useMemo(() => data?.rows ?? [], [data?.rows]);

  // ── TanStack Table ──
  const table = useReactTable({
    data:               tableData,
    columns,
    rowCount:           data?.totalCount ?? 0,
    state:              { pagination },
    onPaginationChange: setPagination,
    manualPagination:   true,
    getCoreRowModel:    getCoreRowModel(),
  });

  const handlePrev = useCallback(() => table.previousPage(), [table]);
  const handleNext = useCallback(() => table.nextPage(),     [table]);
  const goToPage   = useCallback(
    (i: number) => setPagination((p) => ({ ...p, pageIndex: i })),
    []
  );

  const { pageIndex, pageSize } = pagination;
  const totalCount = data?.totalCount ?? 0;
  const pageCount  = data?.pageCount  ?? 0;

  const pageButtons = useMemo(() => {
    const max   = 5;
    let   start = Math.max(0, pageIndex - Math.floor(max / 2));
    const end   = Math.min(pageCount, start + max);
    if (end - start < max) start = Math.max(0, end - max);
    return Array.from({ length: end - start }, (_, i) => start + i);
  }, [pageIndex, pageCount]);

  return (
    <div className="bg-white rounded-3xl border border-line font-lato overflow-hidden">

      {/* Title */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-lg font-semibold text-text-primary01">
          Previously Generated Reports
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-line">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-[12px] tracking-widest text-text-body uppercase whitespace-nowrap"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <SkeletonRow key={i} cols={columns.length} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center text-sm text-text-body"
                >
                  No reports found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`
                    border-b border-line last:border-0 transition-colors hover:bg-nav-active/40
                    ${isPlaceholderData ? "opacity-50" : "opacity-100"}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-5  whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-line flex-wrap gap-3">
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

        <div className="flex items-center gap-1.5">

          <Button
            variant="outline"
            size="sm"
            leftIcon={<ChevronLeft className="w-4 h-4" />}
            onClick={handlePrev}
            disabled={!table.getCanPreviousPage()}
          >
            {""}
          </Button>

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

          <Button
            variant="outline"
            size="sm"
            leftIcon={<ChevronRight className="w-4 h-4" />}
            onClick={handleNext}
            disabled={!table.getCanNextPage()}
          >
            {""}
          </Button>

        </div>
      </div>

    </div>
  );
};

export default memo(ReportsTable);