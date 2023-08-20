import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
interface Props {
  children: ReactNode;
}
const RequirePayment = ({ children }: Props) => {
  const location = useLocation();
  const { auth } = useAuth();
  const remainigdays = auth.days;
  return auth.userId && remainigdays === 0 ? (
    <Navigate to="/subscription" state={{ from: location, message:"Payment_Required" }} replace />
  ) : (
    <>{children}</>
  );
};

export default RequirePayment;
