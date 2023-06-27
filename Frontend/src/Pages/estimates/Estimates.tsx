import { useContext, useEffect, useState } from "react";
import MainTable from "../../components/MainTable/MainTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthContext";
import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";

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
const Estimates = () => {
  const axiosprivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [tableInfo, setTableInfo] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getEstimates = async ({ page, limit }: PageProps) => {
    const res = await axiosprivate.get(
      `/estimate/getestimates?id=${auth.userId}&page=${page}&limit=${limit}`,
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
    queryKey: ["clients", tableInfo?.pagination?.current],
    // enabled: headervalue === "Past",
    queryFn: () =>
      getEstimates({
        page: tableInfo?.pagination?.current,
        limit: tableInfo?.pagination?.pageSize,
      }),
  });

  console.log(GetEstimatesQuery?.data?.data);

  useEffect(() => {
    setData(GetEstimatesQuery?.data?.data);
  }, [GetEstimatesQuery.data]);
  return (
    <div>
      <MainTable
       data={data}
       setTableInfo={setTableInfo}
       tableInfo={tableInfo}
       loading={GetEstimatesQuery.isFetching} />
    </div>
  );
};

export default Estimates;
