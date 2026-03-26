import SearchNavbar from "@/shared/components/SearchNavbar"
import UserDashboardNav from "@/shared/components/UserDashboardNav"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const UserDashboardLayout = () => {
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-dashboard-bg">

      {/* Desktop Sidebar (NO animation) */}
      {isDesktop && (
        <div className="h-full">
          <UserDashboardNav />
        </div>
      )}

      {/* Mobile Sidebar (WITH animation) */}
      {!isDesktop && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed z-40 h-full"
            >
              <UserDashboardNav />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Overlay (mobile only) */}
      {!isDesktop && open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 z-30"
        />
      )}

      {/* Main */}
      <main className="flex-1 overflow-y-auto bg-dashboard-bg">
        <SearchNavbar onMenuClick={() => setOpen(prev => !prev)} />

        <div className="dashboard-p font-lato my-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
export default UserDashboardLayout