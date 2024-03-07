import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

/** 导航滚动到顶部 */
const NavigationScroll = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return <>{children}</>;
};

export default NavigationScroll;
