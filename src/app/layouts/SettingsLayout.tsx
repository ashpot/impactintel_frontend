import PageTitle from "@/shared/components/PageTitle"
// import { cn } from "@/shared/utils/cn"
import type { NavItem } from "@/shared/utils/types"
import { NavLink, Outlet } from "react-router-dom"
import { motion } from "framer-motion"
// import PageTransition from "@/shared/components/PageTransition"

const navItems: Omit<NavItem, 'icon'>[] = [
  { id: 'organization-profile', label: 'organization profile', path: '/dashboard/settings'                  },
  { id: 'account-settings',     label: 'account settings',     path: '/dashboard/settings/account-settings' },
  { id: 'user-management',      label: 'user management',      path: '/dashboard/settings/user-management'  },
  { id: 'integrations',         label: 'integrations',         path: '/dashboard/settings/integrations'     },

]

const SettingsLayout = () => {
  return (
    <div className="font-lato">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <PageTitle
          title="Settings"
          body="Manage yur organizations preferences and account settings"
        />
        <nav className="mt-10 mb-15 bg-white card-shadow">
          <ul className="flex items-center">
            {navItems.map(({id, label, path})=>{
              return (
                <li key={id} className="w-full">
                  <NavLink 
                    to={path}
                    end={path === '/dashboard/settings'}
                    className={({isActive})=> `
                      transition-all duration-150 ease-in-out relative
                      ${isActive ? 'text-brand-primary' : 'text-text-primary01 hover:text-brand-primary'}
                    `}
                  >
                    {({ isActive }) => (
              <>
                <span className="capitalize text-center text-sm font-medium py-6 px-10 block">
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-underline" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
                    transition={{ 
                        type: "spring", 
                        stiffness: 380, 
                        damping: 30 
                    }}
                  />
                )}
              </>
                  )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
        <main>
          <Outlet/>
        </main>
      </motion.div>
    </div>
  )
}
export default SettingsLayout