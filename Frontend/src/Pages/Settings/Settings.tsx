import { useContext} from "react";
import BusinessInfo from "./bussinessinfo/BusinessInfo";
import Customize from "./customize/Customize";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { SettingsContext } from "../../Context/SettingsContext";
import { Button, message } from "antd";

const Settings = () => {
  const axiosprivate = useAxiosPrivate();
  const { bizinfo, customizeinfo,_id} =
    useContext(SettingsContext);
    
  const { auth } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
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
      `settings/updatedefaultsettings?id=${_id}`,
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
  

  const saveSettingsMutation = useMutation({
    mutationFn: saveSettings,
    onSuccess(data) {
      console.log(data);
      if (data.status === 200) {
        messageApi.open({
          type: "success",
          content: "settings added successfully",
        });
      }
    },
    onError(error: { message: string }) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
      console.log(error.message);
    },
  });
  const updateSettingsMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess(data) {
      console.log(data);
      if (data.status === 200) {
        messageApi.open({
          type: "success",
          content: "settings updated successfully",
        });
      }
    },
    onError(error: { message: string }) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const handleClick = () => {
    bizinfo.name&&bizinfo.phone
      ? updateSettingsMutation.mutate()
      : saveSettingsMutation.mutate();
  };

  return (
    <div className="flex flex-col md:flex-col p-5">
      {contextHolder}
      <div className="flex justify-center w-full md:w-1/2">
        <BusinessInfo data={bizinfo} />
      </div>
      <div className="flex justify-center w-full md:w-1/2">
        <Customize
          data={customizeinfo}
        />
      </div>
      <div>
        <Button
          type="primary"
          className="border-blue-500 bg-blue-500 text-white"
          onClick={handleClick}
        >
          {bizinfo ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
