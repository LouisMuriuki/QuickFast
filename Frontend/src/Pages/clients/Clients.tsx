import { Button, TablePaginationConfig } from "antd";
import { useContext } from "react";
import ExtrasContext from "../../Context/ExtrasContext";
import { FilterValue } from "antd/es/table/interface";

interface PageProps {
  page: number | undefined;
  limit: undefined | Number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
interface ClientProps{
  id?:string,
  name?:string,
  date?:Date,
  total_paid?:number,
  total_billed?:number,
  email?:string,
  address?:string,
  in_city?:Date,
  in_zipcode?:number,
  in_paid?:string,
  country?:string,
}

const Clients = () => {
  const { setClientmodalIsOpen } = useContext(ExtrasContext);

  const GetClients=async({page,limit}:TableParams)=>{
    const res=await ax

  }


  return (
    <div className="flex">
      <div className="flex items-center justify-between w-full m-10">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setClientmodalIsOpen(true);
          }}
          className="border-blue-500 bg-blue-500 text-white "
        >
          Add Client
        </Button>
      </div>
    </div>
  );
};

export default Clients;
