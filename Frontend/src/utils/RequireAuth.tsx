import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useLocation, Outlet, Navigate } from "react-router-dom"

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  return auth?.accessToken && auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
