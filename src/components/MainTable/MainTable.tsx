import { Segmented } from "antd";
import React from "react";

const MainTable = () => {
  return (
    <div className="flex items-center">
      <div>
        <Segmented
          size={"large"}
          options={segmentedoptions}
          value={selectedoptions}
          defaultValue={segmentedoptions[0]}
          className="bg-blue-400"
          onChange={(e) => {
            setSelectedOptions(e.toString());
          }}
        />
      </div>
    </div>
  );
};

export default MainTable;
