import { createContext, useState } from "react";
interface authProps {
  accessToken: string;
  refreshToken: string;
  userId: string;
  username:string
}
const initialauth: authProps = {
  accessToken: "",
  refreshToken: "",
  userId: "",
  username:""
};
interface contextProps {
  accountlocked: boolean;
  loginopen: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  registeropen: boolean;
  setRegisterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAccountLocked: React.Dispatch<React.SetStateAction<boolean>>;
  auth: authProps;
  setAuth: React.Dispatch<React.SetStateAction<authProps>>;
}
const AuthContext = createContext<contextProps>({
  accountlocked: true,
  setAccountLocked: () => {},
  loginopen: true,
  setLoginOpen: () => {},
  registeropen: true,
  setRegisterOpen: () => {},
  auth: initialauth,
  setAuth: () => {},
});
export const AuthContextprovider = ({ children }: any) => {
  const [accountlocked, setAccountLocked] = useState(false);
  const [loginopen, setLoginOpen] = useState(false);
  const [registeropen, setRegisterOpen] = useState(false);
  const [auth, setAuth] = useState({
    accessToken: "",
    refreshToken: "",
    userId: "",
    username:""
  });
  return (
    <AuthContext.Provider
      value={{
        setAccountLocked,
        setAuth,
        auth,
        accountlocked,
        loginopen,
        setLoginOpen,
        registeropen,
        setRegisterOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
