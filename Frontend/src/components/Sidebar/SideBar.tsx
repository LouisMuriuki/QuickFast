import { useContext } from "react";
import Currency from "./components/Currency";
// import Tax from "./components/Tax";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import Download from "./components/Download";
import { Button, Divider } from "antd";
import { MailOutlined } from "@ant-design/icons";
// import Discount from "./components/Discount";
interface props {
  state: string;
  id?: string | number;
}
const SideBar = ({ state, id }: props) => {
  const { setgenerateInvoiceType } = useContext(InvoiceFormContext);
  return (
    <div className="flex flex-col py-16 px-4">
      <div className="mb-10">{<Download state={state} id={id} />}</div>
      <div className="mb-10">
        <div className="flex flex-col">
          <p className="flex font-semibold">EMAIL PDF</p>
          <Divider className="border border-black mt-1" />
          <p>Email PDF document</p>
          <div className="flex items-center justify-center pt-4 w-full ">
            <Button
              type="primary"
              icon={<MailOutlined />}
              onClick={() => {
                setgenerateInvoiceType("Email");
              }}
              className="flex items-center w-full justify-center bg-blue-500 text-white"
            >
              Email
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="mb-10">
        <Tax />
      </div>
      <div className="mb-10">
        <Discount />
      </div> */}
      <div className="mb-10">
        <Currency />
      </div>
    </div>
  );
};

export default SideBar;
