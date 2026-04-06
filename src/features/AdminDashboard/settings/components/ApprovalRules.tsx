import Container from "@/shared/components/Container";
import { Toggle } from "../ui/Toggle";

const ApprovalRules = ({ register }: any) => (
  <Container title="Approval Rules" id="approval_rules">
    <div className="space-y-6">
      {[
        { id: "manualApproval", label: "Manual approval for organization registration", sub: "New organizations require Super Admin approval" },
        { id: "profileUpdates", label: "Manual approval for profile updates", sub: "Profile changes require Super Admin approval" },
        { id: "publicVisibilityChanges", label: "Manual approval for visibility changes", sub: "Requests to enable public visibility require approval" }
      ].map((rule) => (
        <div key={rule.id} className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-text-primary01">{rule.label}</p>
            <p className="text-sm text-text-body">{rule.sub}</p>
          </div>
          <Toggle register={register} name={rule.id} />
        </div>
      ))}
    </div>
  </Container>
);

export default ApprovalRules;