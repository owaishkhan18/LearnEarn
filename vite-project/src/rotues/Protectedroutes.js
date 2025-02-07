import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthContext/Authcont";

const ProtectedRoute = () => {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
