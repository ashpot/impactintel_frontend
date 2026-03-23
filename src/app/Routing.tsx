import { Routes, Route, useLocation } from "react-router-dom";
import { LandingPage } from "@/features/public";
import { LoginPage } from "@/features/auth";
import { Overview } from "@/features/UserDashboard/overview";
import {ProjectDetailsPage, ProjectDocuments, ProjectMetrics, ProjectOverview, ProjectsPage} from "@/features/UserDashboard/projects";
import { AnimatePresence } from "framer-motion";
import { ReportsPage } from "@/features/UserDashboard/reports";
import { UploadsPage } from "@/features/UserDashboard/uploads";
import { PublicSummaryPage } from "@/features/UserDashboard/publicSummary";
import { AccountSettings, Integrations, OrganizationProfile, UserManagement } from "@/features/UserDashboard/settings";
import { AuthLayout, PublicLayout, SettingsLayout, UserDashboardLayout } from "./layouts";

const AppRouter = () => {
  const location = useLocation();
  const getSubRouteKey = () => {
    if (location.pathname.startsWith('/dashboard/settings')) {
      return '/dashboard/settings'; 
    }
    return location.pathname;
  };
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={getSubRouteKey()}>
        {/* public */}
        <Route element={<PublicLayout />}>
            <Route index element={<LandingPage/>}/>
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout/>}>
            <Route path="/login" element={<LoginPage/>}/>
        </Route>

        {/* dashboard routes */}
        <Route path="/dashboard" element={<UserDashboardLayout/>}>
          <Route index element={<Overview />} />


          <Route path="projects">
            <Route index element={<ProjectsPage />} />          
            <Route path=":slug" element={<ProjectDetailsPage />}>
              <Route index element={<ProjectOverview />} />
              <Route path="overview"   element={<ProjectOverview />} />
              <Route path="metrics"    element={<ProjectMetrics />} />
              <Route path="documents"  element={<ProjectDocuments />} />
            </Route>
          </Route>


          <Route path="reports" element={<ReportsPage />} />
          <Route path="uploads" element={<UploadsPage />} />
          <Route path="public-summary" element={<PublicSummaryPage />} />

          <Route path="settings" element={<SettingsLayout />} >
            <Route index element={<OrganizationProfile />} />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="user-management" element={<UserManagement />} />
          </Route>
      </Route>
    </Routes>
    </AnimatePresence>
  )
}
export default AppRouter