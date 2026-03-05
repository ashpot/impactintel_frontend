import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/app/layouts/PublicLayout";
import { LandingPage } from "@/features/public";
import AuthLayout from "./layouts/AuthLayout";
import { LoginPage } from "@/features/auth";
const AppRouter = () => {
  return (
    <Routes>
        {/* public */}
        <Route element={<PublicLayout/>}>
            <Route index element={<LandingPage/>}/>
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout/>}>
            <Route path="/login" element={<LoginPage/>}/>
        </Route>

        {/* <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
      </Route> */}
    </Routes>
  )
}
export default AppRouter