import Container from "@/shared/components/Container";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { AdminSettingFormValues } from "../schema/settingsSchema";

const GeneralSection = ({ register, errors }: { register: UseFormRegister<AdminSettingFormValues>; errors: FieldErrors<AdminSettingFormValues> }) => (
  <Container title="General" id="general">
    <div className="grid grid-cols-1 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-text-body">Platform Name</label>
        <input {...register("platformName")} className={`px-4 py-3 rounded-xl border outline-none ${errors.platformName ? "border-error" : "border-border-secondary focus:border-brand-primary"}`} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-text-body">Support Email</label>
        <input type="email" {...register("supportEmail")} className={`px-4 py-3 rounded-xl border outline-none ${errors.supportEmail ? "border-error" : "border-border-secondary focus:border-brand-primary"}`} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-text-body">Default Timezone</label>
        <select {...register("defaultTimeZone")} className="px-4 py-3 rounded-xl border border-border-secondary bg-white outline-none focus:border-brand-primary appearance-none">
          <option value="Africa/Lagos (WAT)">Africa/Lagos (WAT)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-body">Default Language</label>
          <select {...register("defaultLanguage")} className="px-4 py-3 rounded-xl border border-border-secondary bg-white outline-none focus:border-brand-primary">
            <option value="English">English</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text-body">Date & Time Format</label>
          <select {...register("time")} className="px-4 py-3 rounded-xl border border-border-secondary bg-white outline-none focus:border-brand-primary">
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          </select>
        </div>
      </div>
    </div>
  </Container>
);

export default GeneralSection;