import { Segmented, Button } from "antd";
import { useState, useContext } from "react";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import DataTable from "./components/table/Table";
import { useLocation, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
interface TableListProps {
  data?: any;
  tableInfo?: any;
  setTableInfo?: any;
  loading?: boolean;
  onStatusChange?: any;
  name?: string;
  headervalue?: string | number;
}

const MainTable = ({
  data,
  setTableInfo,
  tableInfo,
  loading,
  onStatusChange,
}: TableListProps) => {
  const location = useLocation();
  const queryClient = useQueryClient();
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

  const Refetch = () => {
    if (location.pathname === "/invoices") {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    } else if (location.pathname === "/estimates") {
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
    }
  };
  return (
    <div className="flex flex-col max-w-7xl">
      <div className="flex items-center justify-between px-2 py-4">
        <Segmented
          size={"large"}
          options={segmentedoptions}
          value={selectedoptions}
          defaultValue={selectedoptions}
          className="bg-blue-400 text-white"
          onChange={(e) => {
            setSelectedOptions(e.toString());
            onStatusChange(e.toString());
            Refetch();
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
      <div className="px-2">
        <DataTable
          data={data}
          setTableInfo={setTableInfo}
          tableInfo={tableInfo}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MainTable;
