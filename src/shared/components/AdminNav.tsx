import sampleLogo from "@/assets/brand/brand_logo.png"
import { NavLink } from "react-router-dom";
import type { NavItem } from "../utils/types";
import { Approval, Audit, DashboardIcon, Organization, ProfileUsers, Report01, ReportsIcon, SettingsIcon} from "../ui/SvgLib";
import userAvatar from "/src/assets/images/testimonial_avatar_03.png"
import { ChevronLeft, ChevronRight } from "lucide-react";

const navItems: NavItem[] = [
  { id: "overview",        label: "Overview",          path: "/admin",                 icon: DashboardIcon     },
  { id: "demo-request",     label: "Demo Requests",     path: "/admin/demo-requests",   icon: ReportsIcon       },
  { id: "organizations",    label: "Organizations",     path: "/admin/organizations",   icon: Organization      },
  { id: "users",            label: "Users",             path: "/admin/users",           icon: ProfileUsers      },
  { id: "approvals",        label: "Approvals",         path: "/admin/approvals",       icon: Approval          },
  { id: "reports",          label: "Reports",           path: "/admin/reports",         icon: Report01          },
  { id: "audit-logs",       label: "Audit Logs",        path: "/admin/audit-logs",      icon: Audit             },
  { id: "settings",         label: "Settings",          path: "/admin/settings",        icon: SettingsIcon      },
];


const user = {
  name: "Stella Wiley",
  role: "Admin",
  avatar: userAvatar,
};

const AdminNav = () => {
  return (
    <aside className="flex flex-col h-screen w-70 bg-nav-bg border-r border-line shadow-sm select-none">

      {/* Organization branding */}
      <div className="px-5 border-b border-nav-hover">
          <div className="w-52.5 py-5">
            <img src={sampleLogo} alt="organization logo" />
          </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-3.5">
          {navItems.map(({ id, label, path, icon: Icon }) => (
            <li key={id}>
              <NavLink
              key={id}
                to={path}
                end={path === "/admin"}
                className={({ isActive }) => `
                  w-full flex items-center gap-2 px-3.5 py-3 rounded-lg text-base
                  font-medium transition-all duration-150 ease-in-out group font-lato
                  ${isActive
                    ? "bg-nav-hover text-brand-primary"
                    : "text-nav-link hover:bg-nav-hover hover:text-brand-primary/75"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-6 h-6 shrink-0 transition-colors duration-150
                        ${isActive ? "text-brand-primary" : "text-nav-link group-hover:text-brand-primary/75"}
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

      <hr className="border-nav-hover my-5" />

      {/* Footer */}
      <div className="pb-4">
        <button className="w-full flex justify-center hover:bg-nav-hover px-2 py-3 transition-colors">
            <div className="flex items-center gap-3 mx-auto rounded-lg">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left font-lato">
                    <p className="text-sm text-bg-main leading-tight">
                    {user.name}
                    </p>
                    <p className="text-xs text-text-body">{user.role}</p>
                </div>
                <ChevronRight className="text-text-body"/>
            </div>
            
        </button>
      </div>
      

    </aside>
  );
};
export default AdminNav;