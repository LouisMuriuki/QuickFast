import { useContext } from "react";
import Currency from "./components/Currency";
// import Tax from "./components/Tax";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import Download from "./components/Download";
// import Discount from "./components/Discount";
interface props{
state:string
id?:string| number
}
const SideBar = ({state,id}:props) => {
  const { generateinvoicetype } = useContext(InvoiceFormContext);
  return (
    <div className="flex flex-col py-16 px-4">
      <div className="mb-10">
        {generateinvoicetype === "PDF" && <Download state={state } id={id}/>}
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
