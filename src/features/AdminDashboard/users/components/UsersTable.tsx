import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/shared/ui/Button";
import { Link } from "react-router-dom";

// Types

type PartnerStatus = "Active" | "Inactive" | "Suspended";

interface PartnershipRequest {
  id:            string;
  orgName:       string;
  contactName:   string;
  contactEmail:  string;
  dateSubmitted: string;
  role:          "Client Admin" | "CSR Officer" | "Auditor";
  status:        PartnerStatus;
}

//Mock data 

const MOCK: PartnershipRequest[] = [
  { id: "1",  orgName: "First Bank Nigeria",     contactName: "Chidi Okonkwo",   contactEmail: "chidi.okonkwo@firstbank.com", role: 'Client Admin',    dateSubmitted: "Today", status: "Active"         },
  { id: "2",  orgName: "Access Holdings",        contactName: "Amara Nwankwo",   contactEmail: "amara.nwankwo@accessholdings.com", role: 'CSR Officer', dateSubmitted: "2 hours ago", status: "Active"         },
  { id: "3",  orgName: "Zenith Tech Solutions",  contactName: "Olumide Adeleke", contactEmail: "olumide@zenithtech.ng",    role: 'Auditor',        dateSubmitted: "2 days ago", status: "Suspended" },
  { id: "4",  orgName: "MTN Nigeria",            contactName: "Fatima Bello",    contactEmail: "fatima.bello@mtn.ng",      role: 'Auditor',       dateSubmitted: "3 weeks ago", status: "Inactive" },
  { id: "5",  orgName: "Dangote Foundation",     contactName: "Ibrahim Yusuf",   contactEmail: "ibrahim.yusuf@dangote.com",     role: 'Client Admin',   dateSubmitted: "1 day ago", status: "Active"   },
  { id: "6",  orgName: "Nigerian Breweries",     contactName: "Blessing Okoro",  contactEmail: "blessing.okoro@nbreweries.com",  role: 'CSR Officer',  dateSubmitted: "4 hours ago", status: "Active"   },
  { id: "7",  orgName: "Oando Energy",           contactName: "Tunde Fashola",   contactEmail: "tunde.fashola@oando.com",     role: 'CSR Officer',     dateSubmitted: "2 hours ago", status: "Active"    },
  { id: "8",  orgName: "Sterling Bank",          contactName: "Ngozi Eze",       contactEmail: "ngozi.eze@sterlingbank.ng",   role: 'CSR Officer',     dateSubmitted: "1 hour ago", status: "Active"         },
  { id: "9",  orgName: "Flutterwave",            contactName: "Kemi Adeyemi",    contactEmail: "kemi.a@flutterwave.com",      role: 'Client Admin',     dateSubmitted: "2 months ago", status: "Inactive" },
  { id: "10", orgName: "Nestlé Nigeria",         contactName: "Victor Eze",      contactEmail: "victor.e@nestle.com.ng",       role: 'Auditor',    dateSubmitted: "28 Dec 2025", status: "Suspended"         },
  { id: "11", orgName: "UBA Group",              contactName: "Chioma Obi",      contactEmail: "chioma.obi@ubagroup.com",     role: 'Client Admin',     dateSubmitted: "Today", status: "Active"   },
  { id: "12", orgName: "Airtel Nigeria",         contactName: "Emeka Nwosu",     contactEmail: "emeka.n@airtel.ng",        role: 'Client Admin',        dateSubmitted: "4 months ago", status: "Inactive"    },
];

const PAGE_SIZE = 8;

//Status Badge

const STATUS_STYLES: Record<PartnerStatus, string> = {
  "Active":         "text-success",
  "Inactive": "text-text-body ",
  "Suspended":   "text-brand-primary",
};

// Main Component

interface UsersTableProps {
  search?:       string;
  statusFilter?: string;
  sectorFilter?: string;
}

const UsersTable = ({
  search       = "",
  statusFilter = "All Statuses",
  sectorFilter = "All Sectors",
}: UsersTableProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  // ── Filter ──
  const filtered = useMemo(() => {
    let rows = [...MOCK];

    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.orgName.toLowerCase().includes(q) ||
          r.contactEmail.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All Statuses") {
      rows = rows.filter((r) => r.status === statusFilter);
    }

    return rows;
  }, [search, statusFilter, sectorFilter]);

  // reset to page 0 when filters change
  useMemo(() => setPageIndex(0), [search, statusFilter, sectorFilter]);

  // ── Paginate ──
  const pageCount  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start      = pageIndex * PAGE_SIZE;
  const pageRows   = filtered.slice(start, start + PAGE_SIZE);
  const totalCount = filtered.length;

  const pageButtons = useMemo(() => {
    const max   = 5;
    let   s     = Math.max(0, pageIndex - Math.floor(max / 2));
    const end   = Math.min(pageCount, s + max);
    if (end - s < max) s = Math.max(0, end - max);
    return Array.from({ length: end - s }, (_, i) => s + i);
  }, [pageIndex, pageCount]);

  return (
    <div className="bg-white rounded-3xl border border-line font-lato overflow-hidden">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            <tr className="border-b border-line">
              {["user", "organization", "role", "status", "last active", "Action"].map(
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

          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-sm text-text-body">
                  No partnership requests found.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const slug = row.contactName.toLowerCase().replaceAll(" ", "-")
                return(
                <tr
                  key={row.id}
                  className="border-b border-line last:border-0 transition-colors hover:bg-nav-active/40"
                >
                    {/* Contact */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-primary01">
                        {row.contactName}
                      </span>
                      <span className="text-xs text-text-body">{row.contactEmail}</span>
                    </div>
                  </td>

                  {/* Org */}
                  <td className="px-6 py-5">
                      <span className="inline-block text-sm font-semibold text-text-primary01">
                        {row.orgName}
                      </span>
                  </td>
                    
                    {/* role */}
                  <td className="px-6 py-5">
                    <span className="text-sm text-text-body">{row.role}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${STATUS_STYLES[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* last active*/}
                  <td className="px-6 py-5">
                    <span className="text-sm text-text-body">{row.dateSubmitted}</span>
                  </td>

                  

                  {/* Action */}
                  <td className="px-6 py-5">
                        <Link
                            to={`/admin/users/${slug}`}
                            className="flex gap-1 items-center py-2 text-sm active:scale-95 transition-all duration-150 hover:text-brand-primary"
                        >
                          View
                        </Link>
                  </td>
                </tr>
              )})
            )}
          </tbody>
        </table>
      </div>

                  {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-line flex-wrap gap-3">
        <p className="text-sm text-text-body">
          Showing{" "}
          <span className="font-medium text-text-primary01">
            {totalCount === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, totalCount)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-text-primary01">{totalCount}</span>{" "}
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

export default UsersTable;