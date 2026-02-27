import Navbar from "@/shared/components/Navbar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
    <Navbar />
      <main className="min-h-screen">
        <Outlet/>
      </main>
    <footer />
    </>
  )
}
export default PublicLayout