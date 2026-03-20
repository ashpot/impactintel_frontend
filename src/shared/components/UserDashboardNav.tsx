import sampleLogo from "@/assets/logo/sampleLogo.svg"
import { NavLink } from "react-router-dom";
import type { NavItem } from "../utils/types";
import { DashboardIcon, ProjectsIcon, PublicSummaryIcon, ReportsIcon, SettingsIcon, SignOutIcon, UploadsIcon } from "../ui/SvgLib";

const navItems: NavItem[] = [
  { id: "dashboard",      label: "Dashboard",      path: "/dashboard",                icon: DashboardIcon     },
  { id: "projects",       label: "Projects",       path: "/dashboard/projects",       icon: ProjectsIcon      },
  { id: "reports",        label: "Reports",        path: "/dashboard/reports",        icon: ReportsIcon       },
  { id: "uploads",        label: "Uploads",        path: "/dashboard/uploads",        icon: UploadsIcon       },
  { id: "public-summary", label: "Public Summary", path: "/dashboard/public-summary", icon: PublicSummaryIcon },
  { id: "settings",       label: "Settings",       path: "/dashboard/settings",       icon: SettingsIcon      },
];

const UserDashboardNav = () => {
  return (
    <aside className="flex flex-col h-screen w-70 bg-white border-r border-line shadow-sm select-none">

      {/* Organization branding */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 shrink-0">
            <img src={sampleLogo} alt="organization logo" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-body leading-tight tracking-tight font-inter">
              Shell NG
            </h1>
            <p className="text-[10px] text-text-body font-medium font-lato italic mt-0.5">
              Powered by Impact Intel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-3.5">
          {navItems.map(({ id, label, path, icon: Icon }) => (
            <li key={id}>
              <NavLink
                to={path}
                end={path === "/dashboard"}
                className={({ isActive }) => `
                  w-full flex items-center gap-2 px-3.5 py-3 rounded-lg text-base
                  font-medium transition-all duration-150 ease-in-out group font-lato
                  border-l-[3px]
                  ${isActive
                    ? "bg-nav-active text-brand-primary border-brand-primary"
                    : "text-text-body hover:bg-nav-active hover:text-gray-800 border-transparent"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-6 h-6 shrink-0 transition-colors duration-150
                        ${isActive ? "text-brand-primary" : "text-gray-400 group-hover:text-gray-600"}
                      `}
                    />
                    <span className="leading-none">{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="mt-auto px-3">
        <button
          className="w-full flex items-center gap-2 px-3.5 py-3 rounded-lg text-base font-medium
            text-red-500 hover:bg-red-50 hover:text-red-600 border-l-[3px] border-transparent
            transition-all duration-150 ease-in-out group"
        >
          <SignOutIcon className="w-4.5 h-4.5 shrink-0" />
          <span className="leading-none">Sign Out</span>
        </button>
      </div>

      <hr className="border-line my-5" />

      {/* Footer */}
      <div className="px-4 py-3 mx-3 mb-4 rounded-lg bg-nav-active space-y-3 font-lato text-sm">
        <p className="text-text-body">© 2025 Impact Intel</p>
        <p className="text-[11px] font-semibold text-text-title mt-0.5">v2.1.0</p>
      </div>

    </aside>
  );
};

export default UserDashboardNav;