import { useState, useMemo, memo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type PaginationState,
} from "@tanstack/react-table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Image,
  FileSpreadsheet,
  File,
} from "lucide-react";
import Button from "@/shared/ui/Button";
import avatar01 from '/src/assets/images/testimonial_avatar_01.png'
import avatar02 from '/src/assets/images/testimonial_avatar_02.png'
import avatar03 from '/src/assets/images/testimonial_avatar_03.png'

// ─── Types ────────────────────────────────────────────────────────────────────

type FileType   = "PDF" | "Image" | "Excel" | "Word" | string;
type StatusType = "Approved" | "Pending" | "Rejected";

export interface UploadedReport {
  id:           string;
  name:         string;
  fileType:     FileType;
  uploadedBy: {
    name:   string;
    avatar: string;
  };
  date:   string;
  status: StatusType;
}

interface UploadedReportsResponse {
  rows:       UploadedReport[];
  totalCount: number;
  pageCount:  number;
}

// ─── Mock data — replace fetchUploadedReports body with real fetch ────────────

const MOCK: UploadedReport[] = [
  { id: "1",  name: "Water Project Report Q2",  fileType: "PDF",   uploadedBy: { name: "Sarah Johnson",  avatar: avatar01   }, date: "Jul 09, 2025", status: "Approved" },
  { id: "2",  name: "Beneficiary Photos",        fileType: "Image", uploadedBy: { name: "Tobias Monty",   avatar: avatar02  }, date: "Jun 26, 2025", status: "Approved" },
  { id: "3",  name: "Impact Assessment",         fileType: "Excel", uploadedBy: { name: "Sarah Johnson",  avatar: avatar03  }, date: "Jun 17, 2025", status: "Pending"  },
  { id: "4",  name: "Training Attendance",       fileType: "PDF",   uploadedBy: { name: "Ben Sunnak",     avatar: avatar01  }, date: "Jun 10, 2025", status: "Approved" },
  { id: "5",  name: "Site Visit Images",         fileType: "Image", uploadedBy: { name: "Jessy Liu",      avatar: avatar02 }, date: "Jun 06, 2025", status: "Pending"  },
  { id: "6",  name: "Water Project Report Q2",  fileType: "PDF",   uploadedBy: { name: "Sarah Johnson",  avatar: avatar03   }, date: "Jul 09, 2025", status: "Approved" },
  { id: "7",  name: "Beneficiary Photos",        fileType: "Image", uploadedBy: { name: "Tobias Monty",   avatar: avatar01  }, date: "Jun 26, 2025", status: "Approved" },
  { id: "8",  name: "Impact Assessment",         fileType: "Excel", uploadedBy: { name: "Sarah Johnson",  avatar: avatar02  }, date: "Jun 17, 2025", status: "Pending"  },
  { id: "9",  name: "Training Attendance",       fileType: "PDF",   uploadedBy: { name: "Ben Sunnak",     avatar: avatar03  }, date: "Jun 10, 2025", status: "Approved" },
  { id: "10", name: "Site Visit Images",         fileType: "Image", uploadedBy: { name: "Jessy Liu",      avatar: avatar01  }, date: "Jun 06, 2025", status: "Pending"  },

  ];

const fetchUploadedReports = async (
  pageIndex: number,
  pageSize:  number
): Promise<UploadedReportsResponse> => {
  // swap these two lines with your real API call:
  // const res  = await fetch(`/api/uploaded-reports?page=${pageIndex}&size=${pageSize}`);
  // return res.json();
  await new Promise<void>((resolve) => setTimeout(resolve, 350));

  const totalCount = MOCK.length;
  const pageCount  = Math.max(1, Math.ceil(totalCount / pageSize));
  const start      = pageIndex * pageSize;

  return { rows: MOCK.slice(start, start + pageSize), totalCount, pageCount };
};

// Helpers 

// Icon per file type — all lucide, no SVG
const FileIcon = memo(({ fileType }: { fileType: FileType }) => {
  const icons: Record<string, React.ReactNode> = {
    PDF:   <FileText       className="w-5 h-5 text-brand-primary" />,
    Image: <Image          className="w-5 h-5 text-brand-primary" />,
    Excel: <FileSpreadsheet className="w-5 h-5 text-brand-primary" />,
    Word:  <File           className="w-5 h-5 text-brand-primary" />,
  };
  return (
    <div className="w-9 h-9 rounded-xl bg-nav-active flex items-center justify-center shrink-0">
      {icons[fileType] ?? <File className="w-5 h-5 text-brand-primary" />}
    </div>
  );
});

const StatusBadge = memo(({ status }: { status: StatusType }) => {
  const styles: Record<StatusType, string> = {
    Approved: "bg-green-50  text-green-600",
    Pending:  "bg-yellow-50 text-yellow-500",
    Rejected: "bg-red-50    text-red-400",
  };
  return (
    <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
});

const UploadedBy = memo(({ name, avatar }: { name: string; avatar: string }) => (
  <div className="flex items-center gap-2.5">
    <img
      src={avatar}
      alt={name}
      className="w-8 h-8 rounded-full object-cover bg-yellow-50 shrink-0"
    />
    <span className="text-sm font-medium text-text-primary01">{name}</span>
  </div>
));

const SkeletonRow = memo(({ cols }: { cols: number }) => (
  <tr className="border-b border-line">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-6 py-5">
        <div
          className="h-3.5 bg-gray-100 rounded-full animate-pulse"
          style={{ width: `${[55, 20, 40, 30, 25][i] ?? 35}%` }}
        />
      </td>
    ))}
  </tr>
));

//Column Definitions 

const columnHelper = createColumnHelper<UploadedReport>();

const COLUMNS = [
  columnHelper.accessor("name", {
    header: "Report Name",
    cell: (i) => (
      <div className="flex items-center gap-3">
        <FileIcon fileType={i.row.original.fileType} />
        <span className="text-sm font-medium text-text-primary01">
          {i.getValue()}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("fileType", {
    header: "Type",
    cell: (i) => (
      <span className="text-sm text-text-body">{i.getValue()}</span>
    ),
  }),
  columnHelper.accessor("uploadedBy", {
    header: "Uploaded By",
    cell: (i) => {
      const { name, avatar } = i.getValue();
      return <UploadedBy name={name} avatar={avatar} />;
    },
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (i) => (
      <span className="text-sm text-text-body">{i.getValue()}</span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (i) => <StatusBadge status={i.getValue()} />,
  }),
];

//Main Component

const UploadTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize:  6,
  });

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey:        ["uploaded-reports", pagination.pageIndex, pagination.pageSize],
    queryFn:         async () => fetchUploadedReports(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
    staleTime:       30_000,
  });

  const tableData = useMemo(() => data?.rows ?? [], [data?.rows]);

  const table = useReactTable({
    data:               tableData,
    columns:            COLUMNS,
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
    <div className="bg-white rounded-2xl border border-line font-lato overflow-hidden">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-line">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-[11px] font-semibold tracking-widest text-text-body uppercase whitespace-nowrap"
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
                <SkeletonRow key={i} cols={COLUMNS.length} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-6 py-16 text-center text-sm text-text-body"
                >
                  No uploaded reports found.
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
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
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

export default memo(UploadTable);