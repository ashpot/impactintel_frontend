import { useState } from "react";
import sampleLogo from "@/assets/logo/sampleLogo.svg"
import { Link } from "react-router-dom";

type NavItem = {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
};

// Icons
const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10.9V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V10.9C13.5 12.4 14.14 13 15.73 13H19.77C21.36 13 22 12.4 22 10.9Z" />
    <path d="M22 19.9V18.1C22 16.6 21.36 16 19.77 16H15.73C14.14 16 13.5 16.6 13.5 18.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z"/>
    <path d="M10.5 13.1V19.9C10.5 21.4 9.86 22 8.27 22H4.23C2.64 22 2 21.4 2 19.9V13.1C2 11.6 2.64 11 4.23 11H8.27C9.86 11 10.5 11.6 10.5 13.1Z"/>
    <path d="M10.5 4.1V5.9C10.5 7.4 9.86 8 8.27 8H4.23C2.64 8 2 7.4 2 5.9V4.1C2 2.6 2.64 2 4.23 2H8.27C9.86 2 10.5 2.6 10.5 4.1Z"/>
</svg>

);

const ProjectsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.67 14.3L21.27 19.3C21.12 20.83 21 22 18.29 22H5.71001C3.00001 22 2.88001 20.83 2.73001 19.3L2.33001 14.3C2.25001 13.47 2.51001 12.7 2.98001 12.11C2.99001 12.1 2.99001 12.1 3.00001 12.09C3.55001 11.42 4.38001 11 5.31001 11H18.69C19.62 11 20.44 11.42 20.98 12.07C20.99 12.08 21 12.09 21 12.1C21.49 12.69 21.76 13.46 21.67 14.3Z"/>
    <path d="M3.5 11.43V6.28003C3.5 2.88003 4.35 2.03003 7.75 2.03003H9.02C10.29 2.03003 10.58 2.41003 11.06 3.05003L12.33 4.75003C12.65 5.17003 12.84 5.43003 13.69 5.43003H16.24C19.64 5.43003 20.49 6.28003 20.49 9.68003V11.47" />
    <path d="M9.43005 17H14.5701" />
  </svg>

);

const ReportsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
    stroke="currentColor" stroke-miterlimit="10" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12.2H15"/>
    <path d="M8 16.2H12.38"/>
    <path d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"/>
    <path d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002" />
  </svg>

);

const UploadsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
    stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.25 12.7972C20.4363 12.7972 20.6152 12.8706 20.7471 13.0023C20.8789 13.1342 20.9531 13.3139 20.9531 13.5004V19.5004C20.953 19.6867 20.8788 19.8657 20.7471 19.9974C20.6152 20.1292 20.4364 20.2035 20.25 20.2035H3.75C3.56361 20.2035 3.38477 20.1292 3.25293 19.9974C3.12116 19.8657 3.04698 19.6867 3.04688 19.5004V13.5004L3.06055 13.3617C3.08762 13.2267 3.15415 13.1011 3.25293 13.0023C3.38476 12.8706 3.56366 12.7972 3.75 12.7972C3.93634 12.7972 4.11524 12.8706 4.24707 13.0023C4.37893 13.1342 4.45312 13.3139 4.45312 13.5004V18.7972H19.5469V13.5004C19.5469 13.3139 19.6211 13.1342 19.7529 13.0023C19.8848 12.8706 20.0637 12.7972 20.25 12.7972ZM12 2.29626C12.0924 2.29626 12.1842 2.31459 12.2695 2.34998C12.3547 2.38531 12.4319 2.43715 12.4971 2.50232L16.2471 6.25232C16.379 6.38426 16.4531 6.56377 16.4531 6.75037C16.453 6.93682 16.3789 7.11559 16.2471 7.24744C16.1151 7.37926 15.9365 7.45349 15.75 7.45349C15.5635 7.45349 15.3849 7.37926 15.2529 7.24744L12.7832 4.77673L12.7031 4.69666V13.5004C12.703 13.6867 12.6288 13.8657 12.4971 13.9974C12.3652 14.1292 12.1864 14.2035 12 14.2035C11.8136 14.2035 11.6348 14.1292 11.5029 13.9974C11.3712 13.8657 11.297 13.6867 11.2969 13.5004V4.69666L11.2168 4.77673L8.74707 7.24744C8.61515 7.37926 8.4365 7.45349 8.25 7.45349C8.0635 7.45349 7.88485 7.37926 7.75293 7.24744C7.62108 7.11559 7.54698 6.93682 7.54688 6.75037C7.54687 6.56378 7.62099 6.38426 7.75293 6.25232L11.5029 2.50232C11.5681 2.43715 11.6453 2.38531 11.7305 2.34998C11.8158 2.31459 11.9076 2.29626 12 2.29626Z" 
      fill="currentColor" stroke="currentColor" stroke-width="0.09375"/>
  </svg>
);

const PublicSummaryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.29688C14.5725 2.29985 17.0384 3.32353 18.8574 5.14258C20.6765 6.96162 21.7001 9.42749 21.7031 12C21.7031 13.9191 21.1336 15.795 20.0674 17.3906C19.0012 18.9862 17.4859 20.2305 15.7129 20.9648C13.9401 21.6991 11.9894 21.8909 10.1074 21.5166C8.2252 21.1422 6.49568 20.2183 5.13867 18.8613C3.78167 17.5043 2.8578 15.7748 2.4834 13.8926C2.10913 12.0106 2.30094 10.0599 3.03516 8.28711C3.76954 6.51414 5.01376 4.99881 6.60938 3.93262C8.10528 2.93308 9.84743 2.37016 11.6406 2.30371L12 2.29688ZM3.73828 12.7539C3.89874 14.4823 4.59588 16.1176 5.73242 17.4297C6.86888 18.7416 8.38748 19.6649 10.0752 20.0703L10.2031 20.1016L10.124 19.9971C9.04744 18.5713 7.73654 16.1593 7.56641 12.748L7.56445 12.7031H3.7334L3.73828 12.7539ZM16.4297 12.748C16.2596 16.1593 14.9487 18.5713 13.8721 19.9971L13.8154 20.0723H13.9131V20.0732L13.9248 20.0703C15.6118 19.6642 17.1299 18.7406 18.2656 17.4287C19.4014 16.1167 20.0976 14.4818 20.2578 12.7539L20.2627 12.7031H16.4316L16.4297 12.748ZM8.97461 12.7529C9.19204 16.6668 11.0653 19.0674 11.9658 20.001L12 20.0361L12.0342 20.001C12.9337 19.0683 14.808 16.6678 15.0254 12.7529L15.0283 12.7031H8.97168L8.97461 12.7529ZM10.0752 3.92969C8.38748 4.33507 6.86888 5.25837 5.73242 6.57031C4.59588 7.88237 3.89874 9.51766 3.73828 11.2461L3.7334 11.2969H7.56445L7.56641 11.252C7.73373 7.84077 9.04741 5.42876 10.124 4.00293L10.2031 3.89844L10.0752 3.92969ZM11.9658 3.99902C11.0663 4.93168 9.19204 7.33221 8.97461 11.2471L8.97168 11.2969H15.0283L15.0254 11.2471C14.808 7.33587 12.9346 4.93535 12.0342 3.99902L12 3.96387L11.9658 3.99902ZM13.876 4.00293C14.9526 5.42876 16.2663 7.84077 16.4336 11.252L16.4355 11.2969H20.2666L20.2617 11.2461C20.1013 9.51766 19.4041 7.88237 18.2676 6.57031C17.1311 5.25836 15.6125 4.33507 13.9248 3.92969L13.7969 3.89844L13.876 4.00293Z" 
      fill="currentColor" stroke="currentColor" stroke-width="0.09375"
    />
  </svg>

);

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" stroke-miterlimit="10">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/>
    <path d="M2 12.8801V11.1201C2 10.0801 2.85 9.22006 3.9 9.22006C5.71 9.22006 6.45 7.94006 5.54 6.37006C5.02 5.47006 5.33 4.30006 6.24 3.78006L7.97 2.79006C8.76 2.32006 9.78 2.60006 10.25 3.39006L10.36 3.58006C11.26 5.15006 12.74 5.15006 13.65 3.58006L13.76 3.39006C14.23 2.60006 15.25 2.32006 16.04 2.79006L17.77 3.78006C18.68 4.30006 18.99 5.47006 18.47 6.37006C17.56 7.94006 18.3 9.22006 20.11 9.22006C21.15 9.22006 22.01 10.0701 22.01 11.1201V12.8801C22.01 13.9201 21.16 14.7801 20.11 14.7801C18.3 14.7801 17.56 16.0601 18.47 17.6301C18.99 18.5401 18.68 19.7001 17.77 20.2201L16.04 21.2101C15.25 21.6801 14.23 21.4001 13.76 20.6101L13.65 20.4201C12.75 18.8501 11.27 18.8501 10.36 20.4201L10.25 20.6101C9.78 21.4001 8.76 21.6801 7.97 21.2101L6.24 20.2201C5.33 19.7001 5.02 18.5301 5.54 17.6301C6.45 16.0601 5.71 14.7801 3.9 14.7801C2.85 14.7801 2 13.9201 2 12.8801Z"/>
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
    <aside className="flex flex-col h-screen w-70 bg-white border-r border-line shadow-sm select-none">
      {/* organization branding */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">

          <div className="w-10 h-10 shrink-0">
            <img 
              src={sampleLogo} 
              alt="organization logo" 
            />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-body leading-tight tracking-tight font-inter">
              Shell NG
            </h1>
            <p className="text-[10px] text-text-body font-medium font-lato italic mt-0.5">Powered by Impact Intel</p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-3.5">
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link to={item.id === 'dashboard' ? '/dashboard' : `/dashboard/${item.id}`}>
                  <button
                  onClick={() => setActiveItem(item.id)}
                  className={`
                    w-full flex items-center gap-2 px-3.5 py-3 rounded-lg text-base font-medium
                    transition-all duration-150 ease-in-out group font-lato
                    ${isActive
                      ? "bg-nav-active text-brand-primary border-l-[3px] border-brand-primary"
                      : "text-text-body hover:bg-dashboard-bg hover:text-gray-800 border-l-[3px] border-transparent"
                    }
                  `}
                >
                  <Icon
                    className={`w-6 h-6 shrink-0 transition-colors duration-150
                      ${isActive ? "text-brand-primary" : "text-gray-400 group-hover:text-gray-600"}
                    `}
                  />
                  <span className="leading-none">{item.label}</span>
                </button>

                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
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
        <hr className="border-line my-5"/>
      <div className="px-4 py-3 mx-3 mb-4 rounded-lg bg-nav-active space-y-3 font-lato text-sm">
        <p className=" text-text-body">© 2025 Impact Intel</p>
        <p className="text-[11px] font-semibold text-text-title mt-0.5">v2.1.0</p>
      </div>
    </aside>
  );
}
export default UserDashboardNav