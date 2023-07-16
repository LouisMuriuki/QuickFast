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
}

const ExtrasContext = createContext<ExtrasContextProps>({
  clientdatamode: "",
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
});
export const ExtrasContextProvider = ({ children }: any) => {
  const [clientmodalisopen, setClientmodalIsOpen] = useState(false);
  const [profilemodalisopen, setProfileModalisOpen] = useState(false);
  const [clientdata, setClientData] = useState(initialClientData);
  const [clientdatamode, setClientDataMode] = useState("");
  const [emailerrors, setEmailErrors] = useState(initialEmailErrors);
  const [phoneerrors, setPhoneErrors] = useState(initialPhoneErrors);
  return (
    <ExtrasContext.Provider
      value={{
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
      }}
    >
      {children}
    </ExtrasContext.Provider>
  );
};

export default ExtrasContext;
