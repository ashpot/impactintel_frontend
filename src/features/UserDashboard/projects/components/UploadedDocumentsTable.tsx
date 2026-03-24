import { FileText, FileSpreadsheet, File, Download, Trash2 } from "lucide-react";
import Button from "@/shared/ui/Button";

// ─── Types ────────

interface UploadedDocument {
  id:         string;
  name:       string;
  size:       string;
  uploadDate: string;
}

interface UploadedDocumentsTableProps {
  data?:       UploadedDocument[];
  title?:      string;
  onDownload?: (id: string) => void;
  onDelete?:   (id: string) => void;
}

// ─── Mock data — replace with real data from your page-level API call ─────────

const MOCK_DOCUMENTS: UploadedDocument[] = [
  { id: "1", name: "Project Proposal.pdf",           size: "2.4 MB", uploadDate: "Sep 02, 2025" },
  { id: "2", name: "Budget Breakdown.xlsx",           size: "1.2 MB", uploadDate: "Sep 28, 2025" },
  { id: "3", name: "Impact Assessment Report.pdf",    size: "5.1 MB", uploadDate: "Oct 09, 2025" },
  { id: "4", name: "Beneficiary Survey Results.pdf",  size: "3.2 MB", uploadDate: "Nov 17, 2025" },
  { id: "5", name: "Water Level.img",  size: "3.2 MB", uploadDate: "Nov 23, 2025" },
];

const COLUMNS = [
  { key: "name",       label: "File Name"    },
  { key: "size",       label: "Size"         },
  { key: "uploadDate", label: "Upload Date"  },
  { key: "actions",    label: "Actions"      },
] as const;

// ─── File icon by extension ───────
const FileIcon = ({ name }: { name: string }) => {
  const ext = name.split(".").pop()?.toLowerCase();

  const icon =
    ext === "pdf"  ? <FileText        className="w-5 h-5 text-brand-primary" /> :
    ext === "xlsx" ? <FileSpreadsheet className="w-5 h-5 text-brand-primary" /> :
                    <File             className="w-5 h-5 text-brand-primary" />;

  return (
    <div className="w-9 h-9 rounded-xl bg-nav-active border border-brand-primary/20 flex items-center justify-center shrink-0">
      {icon}
    </div>
  );
};

// ─── Component ────────

const UploadedDocumentsTable = ({
  data       = MOCK_DOCUMENTS,
  title      = "Uploaded Documents",
  onDownload = (id) => console.log("Download", id),
  onDelete   = (id) => console.log("Delete",   id),
}: UploadedDocumentsTableProps) => {
  return (
    <div className="bg-white rounded-2xl card-shadow border border-line font-lato overflow-hidden">

      {/* Title */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-lg font-semibold text-text-primary01">{title}</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* Head */}
          <thead>
            <tr className="border-b border-line">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-[11px] font-semibold tracking-widest text-text-body uppercase whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-6 py-16 text-center text-sm text-text-body"
                >
                  No documents uploaded yet.
                </td>
              </tr>
            ) : (
              data.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-line last:border-0 hover:bg-nav-active/40 transition-colors"
                >
                  {/* File Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileIcon name={doc.name} />
                      <span className="text-sm text-text-primary01">
                        {doc.name}
                      </span>
                    </div>
                  </td>

                  {/* Size */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-body">{doc.size}</span>
                  </td>

                  {/* Upload Date */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-body">{doc.uploadDate}</span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                        onClick={() => onDownload(doc.id)}
                        className="text-brand-primary hover:bg-nav-active"
                      >
                        Download
                      </Button>
                      <span className="text-line select-none">|</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                        onClick={() => onDelete(doc.id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UploadedDocumentsTable;