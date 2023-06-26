import { Segmented, Button } from "antd";
import { useState, useContext } from "react";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import DataTable from "./components/table/Table";

const MainTable = () => {
  const { segmentedoptions, selectedoptions, setSelectedOptions } =
    useContext(InvoiceFormContext);
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
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
        <Button
          size="large"
          type="primary"
          onClick={() => {}}
          className="border-blue-500 bg-blue-500 text-white "
        >
          Add Invoice
        </Button>
      </div>
      <DataTable/>
    </div>
  );
};

export default MainTable;
