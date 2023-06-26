import { useContext } from "react";
import InvoiceTop from "./InvoiceTop";
import InvoiceEdit from "./InvoiceEdit/InvoiceEdit";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import InvoicePreview from "./InvoicePreview/InvoicePreview";
import SideBar from "../../components/Sidebar/SideBar";

const InvoiceGen = () => {
  const { selectedoptions } = useContext(InvoiceFormContext);

  return (
    <div className=" max-w-full  flex container ">
      <div className="flex flex-col md:flex-row w-full">
        <div className=" flex flex-col w-full md:w-3/4">
          <InvoiceTop />
          {selectedoptions === "Edit" ? <InvoiceEdit /> : <InvoicePreview />}
        </div>
        <div className="flex flex-col w-full md:w-1/4">
         <SideBar/>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGen;
