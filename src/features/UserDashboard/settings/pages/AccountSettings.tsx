import { useSettingsForm } from "../actions";

const AccountSettings = () => {
  const { register, handleSubmit, formState: { errors } } = useSettingsForm();

  const onUpdatePassword = (data: any) => console.log("Updating Password...", data);
  const onSaveSettings = (data: any) => console.log("Saving Preferences...", data);

  return (
    <div className="space-y-8 font-jakarta max-w-5xl mx-auto">
      {/* 1. Change Password Section */}
      <section className="bg-white p-6 rounded-xl card-shadow">
        <h3 className="text-sm font-bold text-text-primary mb-4">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <input {...register("currentPassword")} placeholder="Current Password" type="password" className="input-style" />
            {errors.currentPassword && <span className="text-[10px] text-error">{errors.currentPassword.message}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <input {...register("newPassword")} placeholder="New Password" type="password" className="input-style" />
          </div>
          <div className="flex flex-col gap-1">
            <input {...register("confirmPassword")} placeholder="Confirm New Password" type="password" className="input-style" />
            {errors.confirmPassword && <span className="text-[10px] text-error">{errors.confirmPassword.message}</span>}
          </div>
        </div>
        <button onClick={handleSubmit(onUpdatePassword)} className="bg-brand-primary text-text-primary01 px-4 py-2 rounded-lg font-bold text-xs shadow-sm hover:opacity-90">
          Update Password
        </button>
      </section>

      {/* 2. Notification Preferences */}
      <section className="bg-white p-6 rounded-xl card-shadow">
        <h3 className="text-sm font-bold text-text-primary mb-4 border-b border-line pb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { id: "emailNewProjects", label: "Email notifications for new projects" },
            { id: "weeklyCSR", label: "Weekly CSR summary reports" },
            { id: "impactAlerts", label: "Impact milestone alerts" },
            { id: "budgetWarnings", label: "Budget utilization warnings" },
            { id: "documentNotifications", label: "Document upload notifications" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-bg-main rounded-lg border border-border-secondary">
              <span className="text-sm text-text-body font-medium">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register(item.id as any)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Regional Settings */}
      <section className="bg-white p-6 rounded-xl card-shadow">
        <h3 className="text-sm font-bold text-text-primary mb-4">Regional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-body">Time Zone</label>
            <select {...register("timeZone")} className="input-style appearance-none bg-no-repeat bg-[right_1rem_center] bg-[url('data:image/svg+xml;...')]">
              <option>Lagos, Nigeria (GMT +01:00)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-body">Currency</label>
            <select {...register("currency")} className="input-style appearance-none">
              <option>Nigerian Naira (₦ NGN)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Final Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t border-line">
          <button type="button" className="px-8 py-2.5 rounded-lg border border-border-secondary text-text-title font-medium hover:bg-bg-soft">Cancel</button>
          <button onClick={handleSubmit(onSaveSettings)} className="px-8 py-2.5 rounded-lg bg-brand-primary text-text-primary01 font-semibold hover:opacity-90 shadow-sm">
            Save Changes
          </button>
      </div>
    </div>
  );
};

// Simple utility for reusable input styles
// const inputStyle = "px-4 py-3 rounded-lg border border-border-secondary focus:outline-none focus:border-brand-primary text-sm text-text-body w-full transition-all";

export default AccountSettings;