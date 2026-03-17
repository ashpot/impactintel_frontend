import { useState } from "react";
import chevron from "@/assets/icons/chevron.svg"
import search from "@/assets/icons/search.svg"
import bell from '@/assets/icons/notification.svg'
import { cn } from "../utils/cn";

const user = {
  name: "Sarah Johnson",
  role: "Admin",
  avatar: "/src/assets/images/testimonial_avatar_03.png",
};
const SearchNavbar = ()=>{
  const [query, setQuery] = useState("");
  const [hasNotif, setHasNotif] = useState(true);

  return (
    <div className="w-full border-b border-line bg-white">

      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-xl">
          <img 
            src={search} 
            alt="search icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" 
        />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, reports"
            className={cn("w-full pl-10 pr-4 py-2 rounded-lg border border-line bg-dashboard-bg text-sm text-text-body", 
                "placeholder:font-lato placeholder-text-body/50 focus:outline-none focus:ring-2 focus:ring-dashboard-bg focus:border-brand-primary transition-all")}
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4 ml-6">
          <button
            onClick={() => setHasNotif(false)}
            className="relative p-2 border border-line rounded-lg hover:bg-gray-100 transition-colors"
          >
            <img 
                src={bell} 
                alt="notification"
                className="w-5 h-5 text-gray-500" 
            />
            {hasNotif && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="text-left font-lato">
              <p className="text-sm text-text-primary leading-tight">
                {user.name}
              </p>
              <p className="text-xs text-text-body">{user.role}</p>
            </div>
            <img 
                src={chevron} 
                alt="arrow down"
                className="w-4 h-4 text-gray-400" 
            />
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchNavbar;