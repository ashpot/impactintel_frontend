import Container from "@/shared/components/Container";
import { Toggle } from "../ui/Toggle";

const SecuritySection = ({ register }: any) => (
  <Container title="Security & Access" id="security_access">
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-text-body">Session timeout duration (minutes)</label>
        <input {...register("sessionTimeout")} className="max-w-sm px-4 py-3 rounded-xl border border-border-secondary outline-none focus:border-brand-primary" />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
        <div>
          <p className="font-semibold text-text-primary01">Two-factor authentication</p>
          <p className="text-sm text-text-body">Require 2FA for all Super Admin accounts</p>
        </div>
        <Toggle register={register} name="twoFactorAuth" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-text-body">Allowed login domains (optional)</label>
        <input {...register("allowedDomains")} placeholder="e.g., @impactintel.com" className="px-4 py-3 rounded-xl border border-border-secondary outline-none focus:border-brand-primary placeholder:text-placeholder" />
      </div>
    </div>
  </Container>
);

export default SecuritySection;