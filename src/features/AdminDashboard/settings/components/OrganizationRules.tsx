import Container from "@/shared/components/Container";
import { Toggle } from "../ui/Toggle";

const OrganizationRules = ({ register, errors }: any) => (
  <Container title="Organization Rules" id="organization_rules">
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-text-primary01">Require organization verification</p>
          <p className="text-sm text-text-body">Organizations must submit verification documents before full access</p>
        </div>
        <Toggle register={register} name="requireOrgVerification" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-text-primary01">Allow public organization profiles</p>
          <p className="text-sm text-text-body">Organizations can make their profile visible to non-authenticated users</p>
        </div>
        <Toggle register={register} name="publicOrgProfiles" />
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t border-line">
        <label className="text-sm font-semibold text-text-body">Maximum users per organization</label>
        <input {...register("maxOrgUsers")} className={`max-w-sm px-4 py-3 rounded-xl border outline-none ${errors.maxOrgUsers ? "border-error" : "border-border-secondary focus:border-brand-primary"}`} />
      </div>
    </div>
  </Container>
);

export default OrganizationRules;