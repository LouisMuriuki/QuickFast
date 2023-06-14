import { createContext, useState } from "react";
interface BizInfo {
  logo: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipcode: string;
  website: string;
  country: string;
}
interface Customizeinfo {
  [x: string]: any;
  invoicetitle: string;
  estimatetitle: string;
  currency: string;
  invoicenotes: string;
  estimatenotes: string;
  emailmessage: string;
  copytoemail: Boolean;
}
const initialBizInfo: BizInfo = {
  logo: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipcode: "",
  website: "",
  country: "",
};
const initialCustomizeInfo: Customizeinfo = {
  invoicetitle: "",
  estimatetitle: "",
  currency: "",
  invoicenotes: "",
  estimatenotes: "",
  emailmessage: "",
  copytoemail: true,
};

interface SettingsContextType {
  bizinfo: BizInfo;
  setBizInfo: React.Dispatch<React.SetStateAction<BizInfo>>;
  customizeinfo: Customizeinfo;
  setCustomizeInfo: React.Dispatch<React.SetStateAction<Customizeinfo>>;
}

export const SettingsContext = createContext<SettingsContextType>({
  bizinfo: initialBizInfo,
  setBizInfo: () => {},
  customizeinfo: initialCustomizeInfo,
  setCustomizeInfo: () => {},
});
const SettingsContextProvider = ({ children }: any) => {
  const [bizinfo, setBizInfo] = useState(initialBizInfo);
  const [customizeinfo, setCustomizeInfo] = useState(initialCustomizeInfo);
  return (
    <SettingsContext.Provider
      value={{ bizinfo, setBizInfo, customizeinfo, setCustomizeInfo }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
export default SettingsContextProvider;
