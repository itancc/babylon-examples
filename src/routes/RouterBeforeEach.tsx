import { PropsWithChildren, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function RouteBeforeEach({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/") {
      navigate("/babylon");
    }
  }, [pathname, navigate]);
  return <>{children}</>;
}
