import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/app/layouts/PublicLayout";
import { LandingPage } from "@/features/public";
const AppRouter = () => {
  return (
    <Routes>
        {/* public */}
        <Route element={<PublicLayout/>}>
            <Route index element={<LandingPage/>}/>
        </Route>
    </Routes>
  )
}
export default AppRouter