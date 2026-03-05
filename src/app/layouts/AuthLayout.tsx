import { Outlet} from "react-router-dom";

const AuthLayout = ()=>{
//   const isLoggedIn = false; // real login logic check latter

//   if (isLoggedIn) {
//     return <Navigate to="/dashboard" replace />;
//   }
  return (
    <div className="min-h-screen">
        <Outlet />
    </div>
  );
}
export default AuthLayout