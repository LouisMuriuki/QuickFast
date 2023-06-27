import { useRef, useState, useContext } from "react";
import { Input, Space, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { DownloadOutlined } from "@ant-design/icons";

import type {
  FilterValue,
  SorterResult,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { InputRef, Dropdown } from "antd";
import type {
  ColumnsType,
  ColumnType,
  TablePaginationConfig,
} from "antd/es/table";
import ExtrasContext from "../../../../Context/ExtrasContext";
import {
  Description,
  FormInfo,
  FromData,
  ToData,
} from "../../../../Context/InvoiceFormContext";

interface invoiceprops {
  fromdata: FromData;
  description: Description;
  todata: ToData;
  forminfo: FormInfo;
}
interface DataType {
  _id?: string;
  name?: string;
  date?: Date;
  total_paid?: number;
  total_billed?: number;
  email?: string;
  address?: string;
  city?: Date;
  zipcode?: number;
  paid?: string;
  country?: string;
  invoice?: [invoiceprops];
  estimate?: [invoiceprops];
  createdAt: Date;
}
type DataIndex = keyof DataType;

interface TableListProps {
  data?: any;
  tableInfo?: any;
  setTableInfo?: any;
  loading?: boolean;
  name?: string;
  headervalue?: string | number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const DataTable = (props: TableListProps) => {
  const { setClientData, setClientmodalIsOpen } = useContext(ExtrasContext);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const showClient = (data: any) => {
    setClientData(data);
    setClientmodalIsOpen(true);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const stringValue = String(record[dataIndex]);
      const lowercaseValue = stringValue.toLowerCase();
      const lowercaseFilterValue = String(value).toLowerCase();
      return lowercaseValue.includes(lowercaseFilterValue);
    },

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const invoicescolumns: ColumnType<DataType>[] = [
    {
      title: "Invoice Number",
      dataIndex: "number",
      render: (_, record) => {
        const invoices = record.invoice;
        const invoicenumber = invoices?.map((invoice, i) => {
          return <span key={i}>{invoice.forminfo.number}</span>;
        });
        return <div>{invoicenumber}</div>;
      },
      // ...getColumnSearchProps("number"),
    },
    {
      title: "Client",
      dataIndex: "name",
      render: (_, record) => {
        const invoices = record.invoice;
        const invoicedate = invoices?.map((invoice, i) => {
          return <span key={i}>{invoice.todata.name}</span>;
        });
        return <div>{invoicedate}</div>;
      },
    },
    {
      title: "Date",
      render: (_, record) => {
        const invoices = record.invoice;
        const invoicedate = invoices?.map((invoice, i) => {
          return <span key={i}>{invoice.forminfo.date}</span>;
        });
        return <div>{invoicedate}</div>;
      },
      sorter: true,
      dataIndex: "date",
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (_, record) => {
        const invoices = record.invoice;
        const invoicetotal = invoices?.map((invoice, i) => {
          return (
            <div key={i}>
              <span>{invoice.forminfo.currency}</span>
              <span>{invoice.forminfo.total}</span>
            </div>
          );
        });
        return <div>{invoicetotal}</div>;
      },
    },
  ];
  const estimatescolumns: ColumnType<DataType>[] = [
    {
      title: "Estimate Number",
      dataIndex: "number",
      render: (_, record) => {
        const estimates = record.estimate;
        const estimatenumber = estimates?.map((estimate, i) => {
          return <span key={i}>{estimate.forminfo.number}</span>;
        });
        return <div>{estimatenumber}</div>;
      },
      // ...getColumnSearchProps("number"),
    },
    {
      title: "Client",
      dataIndex: "name",
      render: (_, record) => {
        const estimates = record.estimate;
        const estimatedate = estimates?.map((estimate, i) => {
          return <span key={i}>{estimate.todata.name}</span>;
        });
        return <div>{estimatedate}</div>;
      },
    },
    {
      title: "Date",
      render: (_, record) => {
        const estimates = record.estimate;
        const estimatedate = estimates?.map((estimate, i) => {
          return <span key={i}>{estimate.forminfo.date}</span>;
        });
        return <div>{estimatedate}</div>;
      },
      sorter: true,
      dataIndex: "date",
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (_, record) => {
        const estimates = record.estimate;
        const estimatetotal = estimates?.map((estimate, i) => {
          return (
            <div key={i}>
              <span>{estimate.forminfo.currency}</span>
              <span>{estimate.forminfo.total}</span>
            </div>
          );
        });
        return <div>{estimatetotal}</div>;
      },
    },
  ];
  const clientsscolumns: ColumnType<DataType>[] = [
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      sorter: true,
      dataIndex: "phone",
    },
    {
      title: "Total",
      dataIndex: "total_billed",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" style={{ backgroundColor: "white" }}>
          <Button
            onClick={() => {
              showClient(record);
            }}
            type="primary"
            className="border-blue-500 bg-blue-500 text-white "
          >
            Details
          </Button>

          {/* <DeleteOutlined style={{ fontSize: "22px",color: 'red' }} onClick={() => setAsyncConfirmOpen(true)} /> */}
        </Space>
      ),
    },
  ];
  const reportsscolumns: ColumnType<DataType>[] = [
    {
      title: "Year",
      dataIndex: "in_invoice_year",
    },
    {
      title: "Invoices",
      sorter: true,
      dataIndex: "in_invoices_count",
    },
    {
      title: "paid",
      dataIndex: "in_paid",
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    console.log(pagination);
    if (props.setTableInfo !== undefined && props.setTableInfo !== null) {
      props?.setTableInfo({
        pagination: {
          ...props.tableInfo.pagination,
          ...pagination, // Update current page, pageSize, and other pagination options
        },
        filters: filters as Record<string, FilterValue>, // Cast filters as Record<string, FilterValue>
        ...sorter,
      });
    }

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== (props?.tableInfo?.pagination?.pageSize ?? 0)) {
      props.data = [];
    }
  };
  console.log(props.data);

  let MainColumn: ColumnType<DataType>[] | undefined;

  // if (props.headervalue &&
  //   props?.headervalue==="Pending"&&location.pathname === "/visitors/") {
  //   MainColumn = Pendingvisitorcolumns;
  // }else if(props.headervalue &&
  //   props?.headervalue==="Approved"&&location.pathname === "/visitors/"){
  //     MainColumn =Approvedvisitorcolumns;
  //   }
  //  else if (location.pathname === "/meetings/") {
  //   MainColumn = meetingscolumns;
  // } else if (
  //   props.name &&
  //   props?.name &&
  //   location.pathname === `/staff/${props?.name}`
  // ) {
  //   MainColumn = staffmeetingscolumns;
  // } else {
  //   MainColumn = columns;
  // }
  // console.log(props);

  console.log(location.pathname);

  if (location.pathname === "/clients") {
    MainColumn = clientsscolumns;
  } else if (location.pathname === "/invoices") {
    MainColumn = invoicescolumns;
  } else if (location.pathname === "/estimates") {
    MainColumn = estimatescolumns;
  } else {
    MainColumn = reportsscolumns;
  }

  return (
    <div>
      <Table
        className="w-full overflow-x-auto bg-white"
        columns={MainColumn}
        rowKey={(record) => `${record._id}`}
        dataSource={props?.data}
        pagination={props?.tableInfo?.pagination}
        loading={props?.loading}
        onChange={handleTableChange}
        // expandable={
        //   location.pathname === `/staff/${props?.name}`
        //     ? { expandedRowRender, defaultExpandedRowKeys: ["0"] }
        //     : undefined
        // }
      />
    </div>
  );
};

export default DataTable;
