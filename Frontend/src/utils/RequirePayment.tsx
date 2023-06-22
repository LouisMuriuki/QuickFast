import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useContext } from "react";
import AuthContext from "../Context/AuthContext";
interface Props{
  children:ReactNode
}
const RequirePayment = ({children}:Props) => {
  const location = useLocation();
  const { accountlocked } = useContext(AuthContext);
  return accountlocked ? (
    <Navigate to="/account" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};

export default RequirePayment;