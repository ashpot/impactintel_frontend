import { useState, useMemo, memo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type PaginationState,
} from "@tanstack/react-table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/shared/ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

type UserRole   = "Admin" | "Officer" | "Viewer";
type UserStatus = "Active" | "Deactivated";

export interface TeamMember {
  id:        string;
  name:      string;
  email:     string;
  avatar:    string;
  role:      UserRole;
  status:    UserStatus;
  lastLogin: string;
}

interface TeamMembersResponse {
  rows:       TeamMember[];
  totalCount: number;
  pageCount:  number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK: TeamMember[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@shell.com",   avatar: "/src/assets/images/testimonial_avatar_03.png",   role: "Admin",   status: "Active",      lastLogin: "2 hours ago"  },
  { id: "2", name: "Michael Femi",  email: "michael.f@shell.com", avatar: "/src/assets/images/testimonial_avatar_01.png", role: "Officer", status: "Active",      lastLogin: "5 hours ago"  },
  { id: "3", name: "Emily Davis",   email: "emily.d@shell.com",   avatar: "/src/assets/images/testimonial_avatar_02.png",   role: "Officer", status: "Deactivated", lastLogin: "1 day ago"    },
  { id: "4", name: "David Ibe",     email: "david.i@shell.com",   avatar: "/src/assets/images/testimonial_avatar_01.png",   role: "Viewer",  status: "Active",      lastLogin: "3 days ago"   },
  { id: "5", name: "Tobias Monty",  email: "tobias.m@shell.com",  avatar: "/src/assets/images/testimonial_avatar_01.png",  role: "Officer", status: "Active",      lastLogin: "3 days ago"   },
  { id: "6", name: "Amara Osei",    email: "amara.o@shell.com",   avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Amara",   role: "Viewer",  status: "Active",      lastLogin: "5 days ago"   },
  { id: "7", name: "Lena Weber",    email: "lena.w@shell.com",    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lena",    role: "Officer", status: "Deactivated", lastLogin: "1 week ago"   },
  { id: "8", name: "Carlos Ruiz",   email: "carlos.r@shell.com",  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos",  role: "Viewer",  status: "Active",      lastLogin: "2 weeks ago"  },
];

const fetchTeamMembers = async (
  pageIndex: number,
  pageSize:  number,
  search:    string
): Promise<TeamMembersResponse> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 300));

  let rows = [...MOCK];

  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q)
    );
  }

  const totalCount = rows.length;
  const pageCount  = Math.max(1, Math.ceil(totalCount / pageSize));
  const start      = pageIndex * pageSize;

  return { rows: rows.slice(start, start + pageSize), totalCount, pageCount };
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const UserCell = memo(({ name, email, avatar }: { name: string; email: string; avatar: string }) => (
  <div className="flex items-center gap-3">
    <img
      src={avatar}
      alt={name}
      className="w-10 h-10 rounded-full object-cover bg-yellow-50 shrink-0"
    />
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-text-primary01">{name}</span>
      <span className="text-xs text-text-body">{email}</span>
    </div>
  </div>
));

const StatusBadge = memo(({ status }: { status: UserStatus }) => {
  const styles: Record<UserStatus, string> = {
    Active:      "bg-green-50 text-green-600",
    Deactivated: "bg-red-50   text-red-400",
  };
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
});

const RowActions = memo(({
  id,
  onEdit,
  onDeactivate,
}: {
  id:           string;
  onEdit:       (id: string) => void;
  onDeactivate: (id: string) => void;
}) => (
  <div className="flex items-center">
    <Button variant="ghost" size="sm" onClick={() => onEdit(id)}
      className="text-green-600 hover:text-green-700 hover:bg-green-50"
    >
      Edit
    </Button>
    <span className="text-line select-none">|</span>
    <Button variant="ghost" size="sm" onClick={() => onDeactivate(id)}
      className="text-red-500 hover:text-red-600 hover:bg-red-50"
    >
      Deactivate
    </Button>
  </div>
));

const SkeletonRow = memo(({ cols }: { cols: number }) => (
  <tr className="border-b border-line">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-6 py-5">
        <div
          className="h-3.5 bg-gray-100 rounded-full animate-pulse"
          style={{ width: `${[55, 20, 25, 30, 30][i] ?? 35}%` }}
        />
      </td>
    ))}
  </tr>
));

// ─── Column Definitions ───────────────────────────────────────────────────────

const columnHelper = createColumnHelper<TeamMember>();

const buildColumns = (
  onEdit:       (id: string) => void,
  onDeactivate: (id: string) => void,
) => [
  columnHelper.accessor("name", {
    header: "User",
    cell: (i) => (
      <UserCell
        name={i.row.original.name}
        email={i.row.original.email}
        avatar={i.row.original.avatar}
      />
    ),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (i) => (
      <span className="text-sm text-text-primary01">{i.getValue()}</span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (i) => <StatusBadge status={i.getValue()} />,
  }),
  columnHelper.accessor("lastLogin", {
    header: "Last Login",
    cell: (i) => (
      <span className="text-sm text-text-body">{i.getValue()}</span>
    ),
  }),
  columnHelper.display({
    id:     "actions",
    header: "Actions",
    cell:   (i) => (
      <RowActions
        id={i.row.original.id}
        onEdit={onEdit}
        onDeactivate={onDeactivate}
      />
    ),
  }),
];

// ─── Main Component ───────────────────────────────────────────────────────────

const TeamMembersTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize:  5,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce search input
  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    clearTimeout((handleSearch as { timer?: ReturnType<typeof setTimeout> }).timer);
    (handleSearch as { timer?: ReturnType<typeof setTimeout> }).timer = setTimeout(() => {
      setDebouncedSearch(val);
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    }, 250);
  }, []);

  const handleEdit       = useCallback((id: string) => console.log("Edit",       id), []);
  const handleDeactivate = useCallback((id: string) => console.log("Deactivate", id), []);
  const handleInvite     = useCallback(() => console.log("Invite user"), []);

  const columns = useMemo(
    () => buildColumns(handleEdit, handleDeactivate),
    [handleEdit, handleDeactivate]
  );

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey:        ["team-members", pagination.pageIndex, pagination.pageSize, debouncedSearch],
    queryFn:         async () => fetchTeamMembers(pagination.pageIndex, pagination.pageSize, debouncedSearch),
    placeholderData: keepPreviousData,
    staleTime:       30_000,
  });

  const tableData = useMemo(() => data?.rows ?? [], [data?.rows]);

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

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 gap-4 flex-wrap">
        <h2 className="text-lg font-semibold text-text-primary01">
          Team Members
        </h2>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-placeholder pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search members..."
            className="w-full pl-9 pr-4 py-2 text-sm text-text-primary bg-transparent rounded-xl border border-line placeholder:text-placeholder focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        {/* Invite button */}
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleInvite}
        >
          Invite User
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-line border-t border-t-line">
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
                <SkeletonRow key={i} cols={columns.length} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center text-sm text-text-body"
                >
                  No members found.
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
          members
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

export default memo(TeamMembersTable);