import React from 'react'
import { Input,Space,Button, } from 'antd'
import type {
    FilterValue,
    SorterResult,
    FilterConfirmProps,
  } from "antd/es/table/interface";
import type {
    ColumnsType,
    ColumnType,
    TablePaginationConfig,
  } from "antd/es/table";

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
  interface DataType{
    in__invoice_number?:string,
    in_client_name?:string,
    in_invoice_date?:Date,
    in_total?:number,
    in_client_email?:string,
    in_client_phone?:string,
    in_invoice_year?:Date,
    in_invoices_count?:number,
    in_paid?:string,
  }
  
const DataTable = () => {
    const invoicescolumns: ColumnType<DataType>[] = [
        {
          title: "Invoice",
          dataIndex: "in_invoice_number",
          ...getColumnSearchProps("in_personell_full_name"),
        },
        {
          title: "Client",
          dataIndex: "in_client_name",
          render: (in_personell_full_name) => `${in_personell_full_name} `,
        },
        {
          title: "Date",
          sorter: true,
          dataIndex: "in_invoice_date",
        },
        {
          title: "Balance Due",
          dataIndex: "in_balance_due",
        }
      ];
    const estimatscolumns: ColumnType<DataType>[] = [
        {
          title: "Estimates",
          dataIndex: "in_invoice_number",
          ...getColumnSearchProps("in_personell_full_name"),
        },
        {
          title: "Client",
          dataIndex: "in_client_name",
          render: (in_personell_full_name) => `${in_personell_full_name} `,
        },
        {
          title: "Date",
          sorter: true,
          dataIndex: "in_invoice_date",
        },
        {
          title: "Total",
          dataIndex: "in_total",
        }
      ];
    const clientsscolumns: ColumnType<DataType>[] = [
        {
          title: "Clients",
          dataIndex: "in_clients_name",
          render: (in_personell_full_name) => `${in_personell_full_name} `,
          ...getColumnSearchProps("in_personell_full_name"),
        },
        {
          title: "Email",
          dataIndex: "in_client_email",
        },
        {
          title: "Phone",
          sorter: true,
          dataIndex: "in_client_phone",
        },
        {
          title: "Total",
          dataIndex: "in_total",
        }
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
        }
      ];

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
        expandable={
          location.pathname === `/staff/${props?.name}`
            ? { expandedRowRender, defaultExpandedRowKeys: ["0"] }
            : undefined
        }
      />
    </div>
  )
}

export default DataTable