import SearchNavbar from "@/shared/components/SearchNavbar"
import UserDashboardNav from "@/shared/components/UserDashboardNav"
import { Outlet } from "react-router-dom"

const UserDashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-dashboard-bg">
      <UserDashboardNav />
      <main className="flex-1 overflow-y-auto bg-dashboard-bg">
        <SearchNavbar/>
        <div className="dashboard-p font-lato my-10">
          <Outlet />
        </div>
        
      </main>
    </div>
  )
}

export default UserDashboardLayout