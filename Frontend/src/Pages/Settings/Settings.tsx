import { useContext, useEffect } from "react";
import BusinessInfo from "./bussinessinfo/BusinessInfo";
import Customize from "./customize/Customize";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SettingsContext } from "../../Context/SettingsContext";

const Settings = () => {
  const axiosprivate = useAxiosPrivate();
  const { bizinfo, customizeinfo, setBizInfo, setCustomizeInfo } =
    useContext(SettingsContext);
  const { auth } = useAuth();
  const saveSettings = async () => {
    const res = await axiosprivate.post(
      `settings/setdefaultsettings?id=${auth.userId}`,
      JSON.stringify({
        ownerId: auth.userId,
        settings: { bizinfo, customizeinfo },
      }),
      {
        headers: { Authorization: "bearer " + auth.accessToken },
      }
    );
    console.log(res);
    return res.data;
  };

  const updateSettings = async () => {
    const res = await axiosprivate.patch(
      `settings/updatedefaultsettings?id=${auth.userId}`,
      JSON.stringify({
        ownerId: auth.userId,
        settings: { bizinfo, customizeinfo },
      }),
      {
        headers: { Authorization: "bearer " + auth.accessToken },
      }
    );
    console.log(res);
    return res.data;
  };
  const getSettings = async () => {
    const res = await axiosprivate.get(
      `settings/getdefaultsettings?id=${auth.userId}`,
      {
        headers: { Authorization: "bearer " + auth.accessToken },
      }
    );
    console.log(res);
    return res.data;
  };

  const getSettingsQuery = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  // useEffect(() => {
  //   setBizInfo(getSettingsQuery?.data?.data.settings.bizinfo);
  //   setCustomizeInfo(getSettingsQuery?.data?.data.settings.customizeinfo);
  // }, [getSettingsQuery?.data]);

  const saveSettingsMutation = useMutation({
    mutationFn: saveSettings,
    onSuccess(data) {
      console.log(data);
      if (data.status === 200) {
      }
    },
    onError(error: { message: string }) {
      console.log(error.message);
    },
  });
  const updateSettingsMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess(data) {
      console.log(data);
      if (data.status === 200) {
      }
    },
    onError(error: { message: string }) {
      console.log(error.message);
    },
  });

  return (
    <div className="flex flex-col md:flex-col p-5">
      <div className="flex justify-center w-full md:w-1/2">
        <BusinessInfo />
      </div>
      <div className="flex justify-center w-full md:w-1/2">
        <Customize />
      </div>
    </div>
  );
};

export default Settings;
