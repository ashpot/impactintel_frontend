import brandLogo from "@/assets/brand/brandLogo_login.png";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const MobileBlockedScreen = () => {
    const navigate = useNavigate()
  return (
    <div className="h-screen w-full flex items-center justify-center bg-dashboard-bg px-6">
      <div className="w-full text-center">

        <div className="flex justify-center mb-6 shrink-0 ">
          <img src={brandLogo} alt="logo" className="w-full" />
        </div>

        <h1 className="text-2xl font-bold text-text-title font-inter mb-3">
          Desktop or Tablet Required
        </h1>

        <p className="text-text-body font-lato text-sm leading-relaxed mb-6">
          This dashboard is optimized for larger screens.  
          Please access it using a tablet or desktop device for the best experience.
        </p>

        <div className="bg-nav-active border border-line rounded-xl p-4 text-sm text-text-body font-lato">
          Minimum supported width: <span className="font-semibold text-text-title">768px</span>
        </div>
        
        <Button
          onClick={() => navigate("/")}
          className="w-full rounded-lg font-medium mt-5">
          Go back to Home
        </Button>
      </div>
    </div>
  );
};

export default MobileBlockedScreen;