import UserDashboardNav from "@/shared/components/UserDashboardNav"
import { Outlet } from "react-router-dom"

const UserDashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <UserDashboardNav />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default UserDashboardLayout