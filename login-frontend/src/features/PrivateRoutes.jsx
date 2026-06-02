import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { authed } = useAuth();
  const location = useLocation();

  return authed ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
};

export default PrivateRoutes;
