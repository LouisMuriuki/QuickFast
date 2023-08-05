import { createContext, useState } from "react";
interface ClientData {
  [key: string]: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipcode: string;
  website: string;
  country: string;
}
export const initialClientData: ClientData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipcode: "",
  website: "",
  country: "",
};

export interface emailerrors {
  fromerror: boolean;
  toerror: boolean;
  emailerror: boolean;
  ccerror: boolean;
}
export interface phoneerrors {
  fromerror: boolean;
  toerror: boolean;
}
const initialPhoneErrors = {
  fromerror: false,
  toerror: false,
};
const initialEmailErrors = {
  fromerror: false,
  toerror: false,
  emailerror: false,
  ccerror: false,
};
interface ExtrasContextProps {
  ismodalOpen: boolean;
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientdatamode: string;
  setClientDataMode: React.Dispatch<React.SetStateAction<string>>;
  clientmodalisopen: boolean;
  setClientmodalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientdata: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
  profilemodalisopen: boolean;
  setProfileModalisOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emailerrors: emailerrors;
  setEmailErrors: React.Dispatch<React.SetStateAction<emailerrors>>;
  phoneerrors: phoneerrors;
  setPhoneErrors: React.Dispatch<React.SetStateAction<phoneerrors>>;
  notifications: boolean;
  setNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExtrasContext = createContext<ExtrasContextProps>({
  clientdatamode: "",
  ismodalOpen:false,
  setisModalOpen:()=>{},
  setClientDataMode: () => {},
  clientmodalisopen: false,
  setClientmodalIsOpen: () => {},
  profilemodalisopen: false,
  setProfileModalisOpen: () => {},
  clientdata: initialClientData,
  setClientData: () => {},
  emailerrors: initialEmailErrors,
  setEmailErrors: () => {},
  phoneerrors: initialPhoneErrors,
  setPhoneErrors: () => {},
  notifications:true,
  setNotifications:() => {},
});
export const ExtrasContextProvider = ({ children }: any) => {
  const [clientmodalisopen, setClientmodalIsOpen] = useState(false);
  const [profilemodalisopen, setProfileModalisOpen] = useState(false);
  const [clientdata, setClientData] = useState(initialClientData);
  const [clientdatamode, setClientDataMode] = useState("");
  const [ismodalOpen, setisModalOpen]=useState(false);
  const [emailerrors, setEmailErrors] = useState(initialEmailErrors);
  const [phoneerrors, setPhoneErrors] = useState(initialPhoneErrors);
  const [notifications,setNotifications]=useState(true)
  return (
    <ExtrasContext.Provider
      value={{
        ismodalOpen,
        setisModalOpen,
        clientdatamode,
        setClientDataMode,
        clientmodalisopen,
        setClientmodalIsOpen,
        clientdata,
        setClientData,
        profilemodalisopen,
        setProfileModalisOpen,
        emailerrors,
        setEmailErrors,
        phoneerrors,
        setPhoneErrors,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ExtrasContext.Provider>
  );
};

export default ExtrasContext;
