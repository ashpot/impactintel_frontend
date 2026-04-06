import Container from "@/shared/components/Container";
import { Check } from "lucide-react"; 

const RolesPermissions = () => {
  const roles = [
    { title: "Super Admin", status: "Protected", permissions: ["Full platform access", "Manage all organizations", "Manage all users", "Approve/reject requests", "Access audit logs", "Configure settings"] },
    { title: "Client Admin", permissions: ["Manage own organization", "Manage organization users", "Submit verification requests", "View organization reports"] },
    { title: "CSR Officer", permissions: ["Create CSR projects", "Submit CSR reports", "View organization data", "Manage beneficiary records"] },
    { title: "Auditor", permissions: ["View all CSR reports", "Access compliance data", "Generate audit reports", "Read-only access"] },
  ];

  return (
    <Container title="Roles & Permissions" id="roles_permissions">
      <div className="space-y-8">
        {roles.map((role) => (
          <div key={role.title} className="border-b border-line last:border-0 pb-6 last:pb-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-text-primary01">{role.title}</h3>
              {role.status && <span className="text-xs bg-gray-100 text-text-body px-2 py-1 rounded">{role.status}</span>}
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
              {role.permissions.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-text-body">
                  <Check size={14} className="text-text-body" /> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RolesPermissions;