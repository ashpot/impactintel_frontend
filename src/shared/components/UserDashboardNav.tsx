import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
};

// Icons
const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ProjectsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const ReportsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const UploadsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const PublicSummaryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SignOutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "projects", label: "Projects", icon: ProjectsIcon },
  { id: "reports", label: "Reports", icon: ReportsIcon },
  { id: "uploads", label: "Uploads", icon: UploadsIcon },
  { id: "public-summary", label: "Public Summary", icon: PublicSummaryIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const UserDashboardNav = ()=>{
  const [activeItem, setActiveItem] = useState<string>("dashboard");

  return (
    <aside className="flex flex-col h-screen w-70 bg-white border-r border-gray-100 shadow-sm select-none">
      {/* organization branding */}
      <div className="px-5 pt-6 pb-5 border border-black">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 flex-shrink-0">
            {/* todo: add company logo here */}
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-gray-900 leading-tight tracking-tight">Shell NG</h1>
            <p className="text-[10px] text-gray-400 font-medium italic mt-0.5">Powered by Impact Intel</p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-150 ease-in-out group
                    ${isActive
                      ? "bg-yellow-50 text-yellow-700 border-l-[3px] border-yellow-400"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 border-l-[3px] border-transparent"
                    }
                  `}
                >
                  <Icon
                    className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-150
                      ${isActive ? "text-yellow-500" : "text-gray-400 group-hover:text-gray-600"}
                    `}
                  />
                  <span className="leading-none">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-3 pb-2">
        <button
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium
            text-red-500 hover:bg-red-50 hover:text-red-600 border-l-[3px] border-transparent
            transition-all duration-150 ease-in-out group"
        >
          <SignOutIcon className="w-[18px] h-[18px] flex-shrink-0" />
          <span className="leading-none">Sign Out</span>
        </button>
      </div>

      <div className="px-4 py-3 mx-3 mb-4 rounded-lg bg-yellow-50 border border-yellow-100">
        <p className="text-[10.5px] text-gray-400">© 2025 Impact Intel</p>
        <p className="text-[11px] font-semibold text-gray-500 mt-0.5">v2.1.0</p>
      </div>
    </aside>
  );
}
export default UserDashboardNav