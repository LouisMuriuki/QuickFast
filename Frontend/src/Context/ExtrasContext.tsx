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
const initialClientData: ClientData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipcode: "",
  website: "",
  country: "",
};
interface ExtrasContextProps {
  clientdatamode: string;
  setClientDataMode: React.Dispatch<React.SetStateAction<string>>;
  clientmodalisopen: boolean;
  setClientmodalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientdata: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
}

const ExtrasContext = createContext<ExtrasContextProps>({
  clientdatamode: "",
  setClientDataMode: () => {},
  clientmodalisopen: false,
  setClientmodalIsOpen: () => {},
  clientdata: initialClientData,
  setClientData: () => {},
});
export const ExtrasContextProvider = ({ children }: any) => {
  const [clientmodalisopen, setClientmodalIsOpen] = useState(false);
  const [clientdata, setClientData] = useState(initialClientData);
  const [clientdatamode, setClientDataMode] = useState("");
  return (
    <ExtrasContext.Provider
      value={{
        clientdatamode,
        setClientDataMode,
        clientmodalisopen,
        setClientmodalIsOpen,
        clientdata,
        setClientData,
      }}
    >
      {children}
    </ExtrasContext.Provider>
  );
};

export default ExtrasContext;
