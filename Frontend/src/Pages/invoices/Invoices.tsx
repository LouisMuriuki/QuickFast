import {useContext,useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import MainTable from '../../components/MainTable/MainTable'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import AuthContext from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

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
const Invoices = () => {
  const axiosprivate=useAxiosPrivate()
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [tableInfo, setTableInfo] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getInvoices=async({ page, limit }: PageProps)=>{
    const res=await axiosprivate.get(`/invoice/getinvoices?id=${auth.userId}&page=${page}&limit=${limit}`,{
      headers:{Authorization:"Bearer "+auth?.accessToken}
    })
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
  }
  const GetInvoicesQuery = useQuery({
    queryKey: ["clients", tableInfo?.pagination?.current],
    // enabled: headervalue === "Past",
    queryFn: () =>
    getInvoices({
        page: tableInfo?.pagination?.current,
        limit: tableInfo?.pagination?.pageSize,
      }),
  });

  console.log(GetInvoicesQuery?.data?.data);

  useEffect(()=>{
    setData(GetInvoicesQuery?.data?.data)
  },[GetInvoicesQuery.data])
  return (
    <div>
        <Link to="new">new Invoice</Link>
        <MainTable
         data={data}
         setTableInfo={setTableInfo}
         tableInfo={tableInfo}
         loading={GetInvoicesQuery.isLoading}/>
    </div>
  )
}

export default Invoices