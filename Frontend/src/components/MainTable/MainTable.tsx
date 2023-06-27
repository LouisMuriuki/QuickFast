import { Segmented, Button } from "antd";
import { useState, useContext } from "react";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import DataTable from "./components/table/Table";
import { useLocation, useNavigate } from "react-router";
interface TableListProps {
  data?: any;
  tableInfo?: any;
  setTableInfo?: any;
  loading?: boolean;
  name?: string;
  headervalue?: string | number;
}

const MainTable = ({ data, setTableInfo, tableInfo, loading }:TableListProps) => {
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
    console.log("clicked");
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
          onClick={() => {
            navigateTo(text);
          }}
          className="border-blue-500 bg-blue-500 text-white "
        >
          {text}
        </Button>
      </div>
      <DataTable
        data={data}
        setTableInfo={setTableInfo}
        tableInfo={tableInfo}
        loading={loading}
      />
    </div>
  );
};

export default MainTable;
