import Navbar from "@/shared/components/Navbar";
import SideNav from "@/shared/components/Sidenav";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <SideNav />
      <main className="min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
    </>
  );
};
export default PublicLayout;