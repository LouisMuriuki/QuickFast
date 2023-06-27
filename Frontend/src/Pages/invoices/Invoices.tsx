import {useContext,useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import MainTable from '../../components/MainTable/MainTable'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import AuthContext from '../../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { InvoiceFormContext } from '../../Context/InvoiceFormContext';

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
const Invoices = () => {
  const axiosprivate=useAxiosPrivate()
  const { auth } = useContext(AuthContext);
  const {selectedoptions,setSelectedOptions,setSegmentedOptions}=useContext(InvoiceFormContext)
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
 console.log(status)
  const [tableInfo, setTableInfo] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const handleStatusChange = (newStatus:string) => {
    setStatus(newStatus);
  };
  const getInvoices=async({ page, limit,status }: PageProps)=>{
    const res=await axiosprivate.get(`/invoice/getinvoices?id=${auth.userId}&page=${page}&limit=${limit}&status=${status}`,{
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
    queryKey: ["invoices", tableInfo?.pagination?.current,status],
    queryFn: () =>
    getInvoices({
        page: tableInfo?.pagination?.current,
        limit: tableInfo?.pagination?.pageSize,
        status:status
      }),
  });

  console.log(GetInvoicesQuery?.data?.data);

  useEffect(()=>{
    setData(GetInvoicesQuery?.data?.data)
  },[GetInvoicesQuery.data])

  useEffect(()=>{
    setSegmentedOptions(["All Invoices","Pending","Completed"])
    setSelectedOptions("All Invoices");
  },[])
  return (
    <div>
        <Link to="new">new Invoice</Link>
        <MainTable
         data={data}
         setTableInfo={setTableInfo}
         onStatusChange={handleStatusChange}
         tableInfo={tableInfo}
         loading={GetInvoicesQuery.isFetching}/>
    </div>
  )
}

export default Invoices