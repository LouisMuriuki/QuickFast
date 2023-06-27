import { Segmented, Button } from "antd";
import { useState, useContext } from "react";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import DataTable from "./components/table/Table";
import { useLocation, useNavigate } from "react-router";

const MainTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let text = "";
  if (location.pathname === "/invoices") {
    text = "Add Invoice";
  } else if (location.pathname === "/estimates") {
    text = "Add Estimates";
  }
  const { segmentedoptions, selectedoptions, setSelectedOptions } =
    useContext(InvoiceFormContext);

  const navigateTo = (text: string) => {
    console.log("clicked")
    text === "Add Invoice"
      ? navigate("new", { state: { name: "invoice" } })
      : navigate("new", { state: { name: "estimates" } });
  };
  return (
    <div className="flex flex-col max-w-7xl">
      <div className="flex items-center justify-between ">
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
          onClick={() => {navigateTo(text);
          }}
          className="border-blue-500 bg-blue-500 text-white "
        >
          {text}
        </Button>
      </div>
      <DataTable />
    </div>
  );
};

export default MainTable;
