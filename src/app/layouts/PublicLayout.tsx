import Navbar from "@/shared/components/Navbar";
import SideNav from "@/shared/components/Sidenav";
import { Outlet } from "react-router-dom";
import MobileNav from "@/shared/components/MobileNav";
import PageTransition from "@/shared/components/PageTransition";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <SideNav />
      <MobileNav />
      <main className="min-h-screen">
        <PageTransition>
          <Outlet/>
        </PageTransition>
      </main>
    </>
  );
};
export default PublicLayout;