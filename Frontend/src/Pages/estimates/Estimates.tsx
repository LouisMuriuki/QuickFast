import { useContext, useEffect, useState } from "react";
import MainTable from "../../components/MainTable/MainTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthContext";
import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";

interface PageProps {
  page: number | undefined;
  limit: undefined | Number;
  status:string
}
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
const Estimates = () => {
  const axiosprivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const {selectedoptions,setSelectedOptions,setSegmentedOptions}=useContext(InvoiceFormContext)
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("All Estimates");
  const [tableInfo, setTableInfo] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const handleStatusChange = (newStatus:string) => {
    setStatus(newStatus);
  }
  const getEstimates = async ({ page, limit,status }: PageProps) => {
    const res = await axiosprivate.get(
      `/estimate/getestimates?id=${auth.userId}&page=${page}&limit=${limit}&status=${status}`,
      {
        headers: { Authorization: "Bearer " + auth?.accessToken },
      }
    );
    console.log(res);
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

  const GetEstimatesQuery = useQuery({
    queryKey: ["estimates", tableInfo?.pagination?.current,status],
    // enabled: headervalue === "Past",
    queryFn: () =>
      getEstimates({
        page: tableInfo?.pagination?.current,
        limit: tableInfo?.pagination?.pageSize,
        status:status
      }),
  });

  console.log(GetEstimatesQuery?.data?.data);

  useEffect(() => {
    setData(GetEstimatesQuery?.data?.data);
  }, [GetEstimatesQuery.data]);

  useEffect(()=>{
    setSegmentedOptions(["All","Open","Closed"])
    setSelectedOptions("All");
  },[])
  return (
    <div>
      <MainTable
       data={data}
       setTableInfo={setTableInfo}
       onStatusChange={handleStatusChange}
       tableInfo={tableInfo}
       loading={GetEstimatesQuery.isFetching} />
    </div>
  );
};

export default Estimates;
