import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children, token }) {
  const location = useLocation();
  const pathname = location.pathname;
  
  if(!token) {
    return <Navigate to="/login" state={{ from: pathname }}  replace />;
  }
  
  return children;
}