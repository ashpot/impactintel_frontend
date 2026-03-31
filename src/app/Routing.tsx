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
import { AdminLayout, AuthLayout, PublicLayout, SettingsLayout, UserDashboardLayout } from "./layouts";
import ScreenGuard from "@/shared/components/ScreenGuard";
import PageTransition from "@/shared/components/PageTransition";
import { AdminOverview } from "@/features/AdminDashboard/overview";
import { RequestDetails, RequestPage } from "@/features/AdminDashboard/requests";
import { OrganizationDetails, OrganizationPage } from "@/features/AdminDashboard/organizations";
import { UserDetails, UsersPage } from "@/features/AdminDashboard/users";
import { ApprovalPage } from "@/features/AdminDashboard/approvals";
import { AdminReportPage } from "@/features/AdminDashboard/reports";
import { AuditLogsPage } from "@/features/AdminDashboard/auditLogs";
import { AdminSettingsPage } from "@/features/AdminDashboard/settings";

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

        {/* Auth routes protected by screen guard only giving access the screen users of <768 */}
        <Route element={
          <ScreenGuard>
            <AuthLayout/>
          </ScreenGuard>
          }>
            <Route path="/login" element={<PageTransition><LoginPage/></PageTransition>}/>
        </Route>

        {/* dashboard routes */}
        <Route path="/dashboard" element={
          <ScreenGuard>
            <UserDashboardLayout/>
          </ScreenGuard>
        }>
          <Route index element={<Overview />} />


          <Route path="projects">
            <Route index element={<ProjectsPage />} />          
            <Route path=":slug" element={<ProjectDetailsPage />}>
              <Route index element={<ProjectOverview />} />
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

        {/* admin dashboard routes */}
       <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="demo-requests">
            <Route index element={<RequestPage />} />          
            <Route path=":slug" element={<RequestDetails />} />
          </Route>
          <Route path="organizations">
            <Route index element={<OrganizationPage />} />          
            <Route path=":slug" element={<OrganizationDetails />} />
          </Route>
          <Route path="users" >
            <Route index element={<UsersPage />} />
            <Route path=":slug" element={<UserDetails />} />
          </Route>
          <Route path="approvals" element={<ApprovalPage />} />
          <Route path="reports" element={<AdminReportPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
    </AnimatePresence>
  )
}
export default AppRouter