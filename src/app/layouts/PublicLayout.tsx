import Navbar from "@/shared/components/Navbar";
import SideNav from "@/shared/components/Sidenav";
import { Outlet } from "react-router-dom";
import MobileNav from "@/shared/components/MobileNav";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <SideNav />
      <MobileNav />
      <main className="min-h-screen">
          <Outlet/>
      </main>
    </>
  );
};
export default PublicLayout;