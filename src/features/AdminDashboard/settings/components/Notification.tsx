import Container from "@/shared/components/Container";

// Reusable Toggle specifically for the notification settings
const Toggle = ({ register, name }: { register: any; name: string }) => (
  <label className="relative inline-flex items-center cursor-pointer shrink-0">
    <input type="checkbox" {...register(name)} className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-brand-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
  </label>
);

const NotificationSection = ({ register }: { register: any }) => {
  const notificationItems = [
    {
      id: "newApprovals",
      label: "Email alerts for new approvals",
      sub: "Notify Super Admins when new approval requests are submitted",
    },
    {
      id: "flaggedActivity",
      label: "Email alerts for flagged activity",
      sub: "Notify Super Admins when suspicious activity is detected",
    },
    {
      id: "suspensionAlert",
      label: "Email alerts for suspensions",
      sub: "Notify Super Admins when user accounts are suspended",
    },
  ];

  return (
    <Container title="Notifications" id="notifications">
      <div className="space-y-6">
        {notificationItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`flex items-center justify-between gap-4 ${
              index !== 0 ? "pt-6 border-t border-line" : ""
            }`}
          >
            <div>
              <p className="font-semibold text-text-primary01">{item.label}</p>
              <p className="text-sm text-text-body">{item.sub}</p>
            </div>
            <Toggle register={register} name={item.id} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default NotificationSection;