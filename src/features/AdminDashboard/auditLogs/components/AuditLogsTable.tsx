import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/shared/ui/Button";

// Types

type AuditAction =
  | "Approved"
  | "Rejected"
  | "Created"
  | "Updated"
  | "Deleted"
  | "Flagged"
  | "Suspended";

interface AuditLog {
  id:          string;
  timestamp:   string;
  action:      AuditAction;
  entity:      string;
  actor:       string;
  description: string;
}

// mock data

const MOCK_LOGS: AuditLog[] = [
  { id: "1",  timestamp: "10 Jan 2026, 14:32", action: "Approved",  entity: "Organization Verification",  actor: "Sarah Admin",  description: "Approved verification request for Lagos Youth Foundation (ID: 10)"                              },
  { id: "2",  timestamp: "10 Jan 2026, 11:15", action: "Updated",   entity: "User Profile",               actor: "Sarah Admin",  description: "Updated role for user Tunde Bakare (ID: 45) from Member to Client Admin"                       },
  { id: "3",  timestamp: "9 Jan 2026, 16:48",  action: "Rejected",  entity: "Organization Profile Update",actor: "Sarah Admin",  description: "Rejected profile update request for MTN Foundation (ID: 12) - Insufficient documentation"       },
  { id: "4",  timestamp: "9 Jan 2026, 09:22",  action: "Created",   entity: "Organization",               actor: "System",       description: "New organization registered: TechHub Lagos (ID: 48)"                                           },
  { id: "5",  timestamp: "8 Jan 2026, 13:05",  action: "Flagged",   entity: "Activity Report",            actor: "System",       description: "Flagged CSR report from Chevron Corporation (ID: 2) for compliance review - Duplicate beneficiary data detected" },
  { id: "6",  timestamp: "8 Jan 2026, 10:30",  action: "Suspended", entity: "User Account",               actor: "Sarah Admin",  description: "Suspended user account for John Doe (ID: 89) - Policy violation"                              },
  { id: "7",  timestamp: "7 Jan 2026, 15:12",  action: "Created",   entity: "User Account",               actor: "System",       description: "New user registered: Ada Okonkwo (ID: 156) via MTN Foundation"                                 },
  { id: "8",  timestamp: "7 Jan 2026, 12:45",  action: "Updated",   entity: "Organization Profile",       actor: "Client Admin", description: "Profile updated for Shell Nigeria (ID: 1) - Changed public visibility to Enabled"               },
  { id: "9",  timestamp: "6 Jan 2026, 17:20",  action: "Approved",  entity: "Flagged Activity Review",    actor: "Sarah Admin",  description: "Cleared flag for Future Leaders Academy (ID: 6) - Review completed, no issues found"           },
  { id: "10", timestamp: "6 Jan 2026, 14:18",  action: "Deleted",   entity: "CSR Report",                 actor: "Client Admin", description: "Deleted draft CSR report for Access Bank Foundation (ID: 5)"                                   },
  { id: "11", timestamp: "5 Jan 2026, 11:32",  action: "Created",   entity: "Organization",               actor: "System",       description: "New organization registered: Women in Tech Initiative (ID: 49)"                                },
  { id: "12", timestamp: "5 Jan 2026, 09:15",  action: "Updated",   entity: "User Profile",               actor: "Sarah Admin",  description: "Reset password for user Chioma Nwosu (ID: 67)"                                               },
  { id: "13", timestamp: "4 Jan 2026, 16:40",  action: "Approved",  entity: "Organization Verification",  actor: "Sarah Admin",  description: "Approved verification request for GreenEarth Foundation (ID: 3)"                             },
  { id: "14", timestamp: "4 Jan 2026, 13:25",  action: "Flagged",   entity: "Organization Activity",      actor: "System",       description: "Flagged organization Chevron Corporation (ID: 2) for inconsistent expenditure reporting"        },
  { id: "15", timestamp: "3 Jan 2026, 10:50",  action: "Created",   entity: "User Account",               actor: "System",       description: "New user registered: Ibrahim Musa (ID: 157) via Lagos Youth Foundation"                       },
];

const PAGE_SIZE = 10;

// Action badge

const ACTION_STYLES: Record<AuditAction, string> = {
  Approved:  "text-green-600  font-semibold",
  Rejected:  "text-red-500    font-semibold",
  Created:   "text-blue-500   font-semibold",
  Updated:   "text-yellow-600 font-semibold",
  Deleted:   "text-red-400    font-semibold",
  Flagged:   "text-orange-500 font-semibold",
  Suspended: "text-red-600    font-semibold",
};

interface AuditLogsTableProps {
  data?:          AuditLog[];
  search?:        string;
  actionFilter?:  string;
}

const AuditLogsTable = ({
  data         = MOCK_LOGS,
  search       = "",
  actionFilter = "All Actions",
}: AuditLogsTableProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const filtered = useMemo(() => {
    let rows = [...data];

    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.entity.toLowerCase().includes(q)      ||
          r.actor.toLowerCase().includes(q)        ||
          r.description.toLowerCase().includes(q)
      );
    }
    if (actionFilter !== "All Actions") {
      rows = rows.filter((r) => r.action === actionFilter);
    }

    return rows;
  }, [data, search, actionFilter]);

  // reset page on filter change
  useMemo(() => setPageIndex(0), [search, actionFilter]);

  const totalCount = filtered.length;
  const pageCount  = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const start      = pageIndex * PAGE_SIZE;
  const pageRows   = filtered.slice(start, start + PAGE_SIZE);

  const pageButtons = useMemo(() => {
    const max = 5;
    let   s   = Math.max(0, pageIndex - Math.floor(max / 2));
    const end = Math.min(pageCount, s + max);
    if (end - s < max) s = Math.max(0, end - max);
    return Array.from({ length: end - s }, (_, i) => s + i);
  }, [pageIndex, pageCount]);

  return (
    <div className="bg-white rounded-3xl border border-line font-lato overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* Head */}
          <thead>
            <tr className="border-b border-line">
              {["Timestamp", "Action", "Entity", "Actor", "Description"].map((col) => (
                <th
                  key={col}
                  className="px-5 py-4 text-left text-[11px] font-semibold tracking-widest text-text-body uppercase whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center text-sm text-text-body">
                  No audit logs found.
                </td>
              </tr>
            ) : (
              pageRows.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-line last:border-0 hover:bg-nav-active/40 transition-colors"
                >
                  {/* Timestamp */}
                  <td className="px-5 py-4 whitespace-nowrap align-top">
                    <span className="text-xs text-text-body leading-relaxed">
                      {log.timestamp}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 whitespace-nowrap align-top">
                    <span className={`text-xs ${ACTION_STYLES[log.action]}`}>
                      {log.action}
                    </span>
                  </td>

                  {/* Entity */}
                  <td className="px-5 py-4 align-top max-w-35">
                    <span className="text-xs font-semibold text-text-primary01 leading-relaxed">
                      {log.entity}
                    </span>
                  </td>

                  {/* Actor */}
                  <td className="px-5 py-4 whitespace-nowrap align-top">
                    <span className="text-xs text-text-body">{log.actor}</span>
                  </td>

                  {/* Description */}
                  <td className="px-5 py-4 align-top max-w-xs">
                    <span className="text-xs text-text-body leading-relaxed">
                      {log.description}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-line flex-wrap gap-3">
        <p className="text-sm text-text-body">
          Showing{" "}
          <span className="font-medium text-text-primary01">
            {totalCount === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, totalCount)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-text-primary01">{totalCount}</span>{" "}
          logs
        </p>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ChevronLeft className="w-4 h-4" />}
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
          >
            {""}
          </Button>

          {pageButtons.map((i) => (
            <button
              key={i}
              onClick={() => setPageIndex(i)}
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
            onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
            disabled={pageIndex >= pageCount - 1}
          >
            {""}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsTable;