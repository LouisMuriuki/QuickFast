import React, { useState, useContext } from "react";
import FormComponent from "../../../components/Reusables/FormComponent";
import { fromlabels } from "../../../components/constants/Constants";
import { Upload, message } from "antd";
import axios from "axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { SettingsContext } from "../../../Context/SettingsContext";

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const BusinessInfo = () => {
  const { bizinfo, setBizInfo } = useContext(SettingsContext);
  const [loading, setLoading] = useState(false);
  const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  const cloudinary_name = import.meta.env.VITE_CLOUDINARY_NAME;

  const handleChange = async (options: any) => {
    const { onSuccess, onError, file } = options;
    if (!file) {
      console.error("No file selected");
      return;
    }
    setLoading(true);
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`,
        formData
      )
      .then((res) => {
        console.log(res);
        onSuccess(res?.data);
        setBizInfo((prev) => ({ ...prev, logo: res?.data?.url }));
      })
      .catch((error) => {
        // Handle error case
        onError(error);
        console.error("Upload failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Add Logo</div>
    </div>
  );

  return (
    <div className="w-full flex flex-col">
      <h1 className="flex items-center justify-center mb-6">
        BUSINESS DETAILS
      </h1>
      <div className="flex justify-around ml-14 p-2">
        <div className="flex items-center">
          <p>Logo:</p>
        </div>
        <div className="">
          <Upload
            name="avatar"
            listType="picture-card"
            className=""
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            customRequest={handleChange}
            beforeUpload={beforeUpload}
          >
            {bizinfo.logo ? (
              <img src={bizinfo.logo} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
      <FormComponent fromlabels={fromlabels} />
    </div>
  );
};

export default BusinessInfo;
