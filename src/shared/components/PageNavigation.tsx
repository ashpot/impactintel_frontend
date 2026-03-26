import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
export interface PageNavigationProps{
    items: {
        id:string,
        label:string,
        path:string
    }[],
    className?: string
    endPath: string
}
const PageNavigation = ({
    items, className, endPath
}:PageNavigationProps) => {
  return (
    <nav className={`mt-10 bg-white card-shadow ${className}`}>
          <ul className="flex items-center">
            {items.map(({id, label, path})=>{
              return (
                <li key={id} className="w-full">
                  <NavLink 
                    to={path}
                    end={path === endPath}
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

  )
}

export default PageNavigation
