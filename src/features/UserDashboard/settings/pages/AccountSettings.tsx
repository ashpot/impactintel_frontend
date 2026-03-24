import Button from "@/shared/ui/Button";
import { useSettingsForm } from "../actions";
import { ChevronDown } from "lucide-react";

const AccountSettings = () => {
  const { register, handleSubmit, formState: { errors } } = useSettingsForm();
  const inputStyle = "px-4 py-3 rounded-lg border border-border-secondary focus:outline-none focus:border-brand-primary text-sm text-text-primary01 w-full transition-all";
  const sectionBorder = 'border-b border-line pb-7'
  const onUpdatePassword = (data: any) => console.log("Updating Password...", data);
  const onSaveSettings = (data: any) => console.log("Saving Preferences...", data);

  return (
    <div className="space-y-7 font-jakarta mx-auto border border-line bg-white p-6 rounded-xl card-shadow">
      {/* Change Password Section */}
      <section className={sectionBorder}>
        <h3 className="text-base font-semibold text-text-primary01 mb-4">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <input {...register("currentPassword")} placeholder="Current Password" type="password" className={inputStyle} />
            {errors.currentPassword && <span className="text-[10px] text-error">{errors.currentPassword.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <input {...register("newPassword")} placeholder="New Password" type="password" className={inputStyle} />
          </div>
          <div className="flex flex-col gap-1">
            <input {...register("confirmPassword")} placeholder="Confirm New Password" type="password" className={inputStyle} />
            {errors.confirmPassword && <span className="text-[10px] text-error">{errors.confirmPassword.message}</span>}
          </div>
        </div>
        <Button
          onClick={handleSubmit(onUpdatePassword)}
          className='text-base px-8 py-2.5 text-white rounded-lg font-medium hover:opacity-85 disabled:opacity-50 shadow-sm'
        >
          Update Password
        </Button>
      </section>

      {/* Notification Preferences */}
      <section className={sectionBorder}>
        <h3 className="text-base font-semibold text-text-primary01 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { id: "emailNewProjects", label: "Email notifications for new projects" },
            { id: "weeklyCSR", label: "Weekly CSR summary reports" },
            { id: "impactAlerts", label: "Impact milestone alerts" },
            { id: "budgetWarnings", label: "Budget utilization warnings" },
            { id: "documentNotifications", label: "Document upload notifications" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-bg-main rounded-lg border border-border-secondary">
              <span className="text-sm text-text-primary01 font-medium">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register(item.id as any)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Settings */}
      <section className={sectionBorder}>
        <h3 className="text-base font-semibold text-text-primary01 mb-4">Regional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 relative">
            <ChevronDown className="absolute top-10 right-2 text-text-body"/>
            <label className="text-sm font-semibold text-text-primary01">Time Zone</label>
            <select {...register("timeZone")} className={`${inputStyle} appearance-none `}>
              <option>Lagos, Nigeria (GMT +01:00)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 relative">
            <ChevronDown className="absolute top-10 right-2 text-text-body"/>
            <label className="text-sm font-semibold text-text-primary01">Currency</label>
            <select {...register("currency")} className={`${inputStyle} appearance-none`}>
              <option>Nigerian Naira (₦ NGN)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Final Actions */}
      <div className="flex justify-end gap-4">
          <Button
            variant='outline'
            type='button'
            className='text-base px-8 py-2.5 rounded-lg border border-border-secondary text-text-title font-medium hover:bg-bg-soft'
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSaveSettings)}
            className='text-base px-8 py-2.5 rounded-lg text-white font-medium hover:opacity-85 disabled:opacity-50 shadow-sm'
          >
            Save Changes
          </Button>
      </div>
    </div>
  );
};

export default AccountSettings;