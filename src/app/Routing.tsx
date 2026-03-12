import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/app/layouts/PublicLayout";
import { LandingPage } from "@/features/public";
import AuthLayout from "./layouts/AuthLayout";
import { LoginPage } from "@/features/auth";
import UserDashboardLayout from "./layouts/UserDashboardLayout";
import { Overview } from "@/features/UserDashboard/overview";
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

        {/* dashboard routes */}
        <Route path="/dashboard" element={<UserDashboardLayout/>}>
          <Route index element={<Overview />} />
          {/* <Route path="projects" element={<ProjectsPage />} /> */}
          {/* <Route path="reports" element={<ReportsPage />} /> */}
          {/* <Route path="uploads" element={<UploadsPage />} /> */}
          {/* <Route path="public-summary" element={<PublicSummaryPage />} /> */}
          {/* <Route path="settings" element={<SettingsPage />} /> */}
      </Route>
    </Routes>
  )
}
export default AppRouter