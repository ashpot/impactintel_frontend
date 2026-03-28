import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/shared/ui/Button";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

type PartnerStatus = "New" | "In Progress" | "Converted" | "Declined";

interface PartnershipRequest {
  id:            string;
  orgName:       string;
  sector:        string;
  contactName:   string;
  contactEmail:  string;
  dateSubmitted: string;
  status:        PartnerStatus;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK: PartnershipRequest[] = [
  { id: "1",  orgName: "First Bank Nigeria",    sector: "Banking & Finance",  contactName: "Chidi Okonkwo",   contactEmail: "chidi.okonkwo@firstbank.com",     dateSubmitted: "10 Jan 2026", status: "New"         },
  { id: "2",  orgName: "Access Holdings",       sector: "Banking & Finance",  contactName: "Amara Nwankwo",   contactEmail: "amara.nwankwo@accessholdings.com", dateSubmitted: "09 Jan 2026", status: "New"         },
  { id: "3",  orgName: "Zenith Tech Solutions", sector: "Technology",         contactName: "Olumide Adeleke", contactEmail: "olumide@zenithtech.ng",            dateSubmitted: "08 Jan 2026", status: "In Progress" },
  { id: "4",  orgName: "MTN Nigeria",           sector: "Telecommunications", contactName: "Fatima Bello",    contactEmail: "fatima.bello@mtn.ng",             dateSubmitted: "07 Jan 2026", status: "In Progress" },
  { id: "5",  orgName: "Dangote Foundation",    sector: "Philanthropy",       contactName: "Ibrahim Yusuf",   contactEmail: "ibrahim.yusuf@dangote.com",        dateSubmitted: "05 Jan 2026", status: "Converted"   },
  { id: "6",  orgName: "Nigerian Breweries",    sector: "Manufacturing",      contactName: "Blessing Okoro",  contactEmail: "blessing.okoro@nbreweries.com",    dateSubmitted: "04 Jan 2026", status: "Converted"   },
  { id: "7",  orgName: "Oando Energy",          sector: "Energy & Oil",       contactName: "Tunde Fashola",   contactEmail: "tunde.fashola@oando.com",          dateSubmitted: "03 Jan 2026", status: "Declined"    },
  { id: "8",  orgName: "Sterling Bank",         sector: "Banking & Finance",  contactName: "Ngozi Eze",       contactEmail: "ngozi.eze@sterlingbank.ng",        dateSubmitted: "02 Jan 2026", status: "New"         },
  { id: "9",  orgName: "Flutterwave",           sector: "Technology",         contactName: "Kemi Adeyemi",    contactEmail: "kemi.a@flutterwave.com",           dateSubmitted: "01 Jan 2026", status: "In Progress" },
  { id: "10", orgName: "Nestlé Nigeria",        sector: "Manufacturing",      contactName: "Victor Eze",      contactEmail: "victor.e@nestle.com.ng",           dateSubmitted: "28 Dec 2025", status: "New"         },
  { id: "11", orgName: "UBA Group",             sector: "Banking & Finance",  contactName: "Chioma Obi",      contactEmail: "chioma.obi@ubagroup.com",          dateSubmitted: "26 Dec 2025", status: "Converted"   },
  { id: "12", orgName: "Airtel Nigeria",        sector: "Telecommunications", contactName: "Emeka Nwosu",     contactEmail: "emeka.n@airtel.ng",                dateSubmitted: "24 Dec 2025", status: "Declined"    },
];

const PAGE_SIZE = 8;

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<PartnerStatus, string> = {
  "New":         "bg-nav-active text-brand-primary",
  "In Progress": "bg-gray-100  text-gray-500 ",
  "Converted":   "bg-green-50  text-success ",
  "Declined":    "text-red-500",
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface RequestTableProps {
  search?:       string;
  statusFilter?: string;
  sectorFilter?: string;
  onView?:       (id: string) => void;
}

const RequestTable = ({
  search       = "",
  statusFilter = "All Statuses",
  sectorFilter = "All Sectors",
  onView       = (id) => console.log("View", id),
}: RequestTableProps) => {
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
    if (sectorFilter !== "All Sectors") {
      rows = rows.filter((r) => r.sector === sectorFilter);
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
              {["Organization Name", "Contact Person", "Date Submitted", "Status", "Action"].map(
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
                <td colSpan={5} className="px-6 py-16 text-center text-sm text-text-body">
                  No partnership requests found.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const slug = row.orgName.toLowerCase().replaceAll(" ", "-")
                return(
                <tr
                  key={row.id}
                  className="border-b border-line last:border-0 transition-colors hover:bg-nav-active/40"
                >
                  {/* Org */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-text-primary01">
                        {row.orgName}
                      </span>
                      <span className="text-xs text-text-body">{row.sector}</span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-primary01">
                        {row.contactName}
                      </span>
                      <span className="text-xs text-text-body">{row.contactEmail}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5">
                    <span className="text-sm text-text-body">{row.dateSubmitted}</span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${STATUS_STYLES[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5">
                    <Button
                        rightIcon={<ChevronRight className="w-4 h-4" />}
                        variant="ghost"
                        // onClick={() => onView(row.id)}
                        className="flex items-center gap-1 font-semibold text-text-primary01 hover:text-brand-primary transition-colors"
                    >
                        <Link
                            to={`/admin/demo-requests/${slug}`}
                        >
                            View
                        </Link>
                    </Button>
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

export default RequestTable;