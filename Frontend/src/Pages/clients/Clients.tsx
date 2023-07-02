import { Button, TablePaginationConfig } from "antd";
import { useContext, useEffect, useState } from "react";
import ExtrasContext from "../../Context/ExtrasContext";
import { FilterValue } from "antd/es/table/interface";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/MainTable/components/table/Table";

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
interface ClientProps {
  id?: string;
  name?: string;
  date?: Date;
  total_paid?: number;
  total_billed?: number;
  email?: string;
  address?: string;
  in_city?: Date;
  in_zipcode?: number;
  in_paid?: string;
  country?: string;
}

const Clients = () => {
  const axiosprivate = useAxiosPrivate();
  const { setClientmodalIsOpen } = useContext(ExtrasContext);
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState<ClientProps[]>([]);
  const [tableInfo, setTableInfo] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const GetClients = async ({ page, limit }: PageProps) => {
    const res = await axiosprivate.get(
      `client/getclients?id=${auth.userId}&page=${page}&limit=${limit}`,
      { headers: { Authorization: "Bearer " + auth.accessToken } }
    );
    console.log(res)
    setTableInfo({
      ...tableInfo,
      pagination: {
        ...tableInfo.pagination,
        total: res?.data?.total,
        current: res?.data?.current,
      },
    });
    return res.data;
  };

  const GetClientsQuery = useQuery({
    queryKey: ["clients", tableInfo?.pagination?.current],
    // enabled: headervalue === "Past",
    queryFn: () =>
      GetClients({
        page: tableInfo?.pagination?.current,
        limit: tableInfo?.pagination?.pageSize,
      }),
  });

  console.log(GetClientsQuery?.data?.data);

  useEffect(()=>{
    setData(GetClientsQuery?.data?.data)
  },[GetClientsQuery.data])

  return (
    <div className="flex flex-col max-w-7xl">
      <div className="flex items-center justify-between px-2 py-4">
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
      <div className="px-2">
        <DataTable
        data={data}
        setTableInfo={setTableInfo}
        tableInfo={tableInfo}
        loading={GetClientsQuery.isFetching}
      />
      </div>
      
    </div>
  );
};

export default Clients;
