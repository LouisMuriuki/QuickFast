import React from "react";
import BusinessInfo from "./bussinessinfo/BusinessInfo";
import Customize from "./customize/Customize";

const Settings = () => {
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
