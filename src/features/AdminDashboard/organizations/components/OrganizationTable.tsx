import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/shared/ui/Button";
import { Link } from "react-router-dom";
import { getInitials } from "@/shared/hooks/getInitials";

// Types

type OrgStatus = "Active" | "Pending Verification" | "Flagged" | "Suspended";

interface OrganizationRequest {
  id: string;
  orgName: string;
  sector: string;
  status: OrgStatus;
  users: number;
  dateRegistered: string;
}

// Mock data

const MOCK: OrganizationRequest[] = [
  { id: "1", orgName: "Shell Nigeria", sector: "Energy", status: "Active", users: 45, dateRegistered: "Dec 15, 2024" },
  { id: "2", orgName: "Chevron Corporation", sector: "Energy", status: "Active", users: 38, dateRegistered: "Jan 3, 2025" },
  { id: "3", orgName: "GreenEarth Foundation", sector: "Environment", status: "Pending Verification", users: 12, dateRegistered: "Jan 7, 2026" },
  { id: "4", orgName: "African Development Trust", sector: "Education", status: "Pending Verification", users: 8, dateRegistered: "Jan 7, 2026" },
  { id: "5", orgName: "TotalEnergies Foundation", sector: "Energy", status: "Active", users: 52, dateRegistered: "Nov 28, 2024" },
  { id: "6", orgName: "Future Leaders Academy", sector: "Education", status: "Flagged", users: 15, dateRegistered: "Jan 5, 2026" },
  { id: "7", orgName: "HealthCare Partners NGO", sector: "Healthcare", status: "Active", users: 22, dateRegistered: "Dec 20, 2024" },
  { id: "8", orgName: "ExxonMobil Nigeria", sector: "Energy", status: "Active", users: 67, dateRegistered: "Oct 10, 2024" },
  { id: "9", orgName: "Community Impact Network", sector: "Education", status: "Active", users: 19, dateRegistered: "Jan 2, 2026" },
  { id: "10", orgName: "Sustainable Energy Initiative", sector: "Environment", status: "Suspended", users: 5, dateRegistered: "Dec 1, 2024" },
  { id: "11", orgName: "Tech for Good Africa", sector: "Technology", status: "Active", users: 31, dateRegistered: "Nov 15, 2024" },
  { id: "12", orgName: "Youth Empowerment Initiative", sector: "Education", status: "Active", users: 28, dateRegistered: "Jan 5, 2026" },
];

const PAGE_SIZE = 10;

// Status Styles 

const STATUS_CONFIG: Record<OrgStatus, { dot?: string; text: string }> = {
  "Active": { text: "text-success" },
  "Pending Verification": { dot: "bg-brand-primary", text: "text-brand-primary" },
  "Flagged": { dot: "bg-brand-primary", text: "text-brand-primary" },
  "Suspended": { text: "text-error01" },
};

// Main Component

const OrganizationTable = ({ search = "" }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const filtered = useMemo(() => {
    if (!search) return MOCK;
    const q = search.toLowerCase();
    return MOCK.filter(r => r.orgName.toLowerCase().includes(q));
  }, [search]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const start = pageIndex * PAGE_SIZE;
  const pageRows = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="bg-white rounded-3xl border border-line card-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
           <thead>
            <tr className="border-b border-line">
              {["Organization", "Sector", "Status", "Users", "Date Registered", "Action"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-left text-[11px] font-semibold tracking-widest text-text-body uppercase whitespace-nowrap"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {pageRows.map((row) => {
                const slug = row.orgName.replaceAll(" ", "-").toLowerCase()
                return(
                    <tr 
                        key={row.id} 
                        className="border-b border-line last:border-0 transition-colors hover:bg-nav-active/40"
                    >
                {/* Organization */}
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="font-inter w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-text-body text-xs font-bold shrink-0">
                      {getInitials(row.orgName)}
                    </div>
                    <span className="text-sm font-bold text-text-primary01">{row.orgName}</span>
                  </div>
                </td>

                {/* Sector */}
                <td className="px-8 py-4">
                  <span className="text-sm text-text-body">{row.sector}</span>
                </td>

                {/* Status */}
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${STATUS_CONFIG[row.status].dot}`} />
                    <span className={`text-[14px] font-medium ${STATUS_CONFIG[row.status].text}`}>
                      {row.status}
                    </span>
                  </div>
                </td>

                {/* Users */}
                <td className="px-8 py-4">
                  <span className="text-[14px] font-bold text-text-primary01">{row.users}</span>
                </td>

                {/* Date Registered */}
                <td className="px-8 py-4 text-[14px] text-text-body">
                  {row.dateRegistered}
                </td>

                {/* Action */}
                <td className="px-8 py-4">
                   <Link
                        to={`/admin/organizations/${slug}`}
                        className="flex gap-1 items-center py-2 text-sm active:scale-95 transition-all duration-150 hover:text-brand-primary"
                    >
                        View
                    </Link>
                </td>
              </tr>
                )
            })}
          </tbody>
        </table>
      </div>

        {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-line flex-wrap gap-3">
        <p className="text-sm text-text-body">
          Showing{" "}
          <span className="font-medium text-text-primary01">
            {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-text-primary01">{filtered.length}</span>{" "}
          requests
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

          {[...Array(pageCount)].map((_, i) => (
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

export default OrganizationTable;