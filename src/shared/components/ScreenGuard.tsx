import { useEffect, useState } from "react";
import MobileBlockedScreen from "./MobileBlockedScreen";

const ScreenGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsAllowed(window.innerWidth >= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isAllowed) {
    return <MobileBlockedScreen />;
  }

  return <>{children}</>;
};

export default ScreenGuard;