import { useContext, useEffect } from "react";
import InvoiceTop from "./InvoiceTop";
import InvoiceEdit from "./InvoiceEdit/InvoiceEdit";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import InvoicePreview from "./InvoicePreview/InvoicePreview";
import SideBar from "../../components/Sidebar/SideBar";
import { useLocation } from "react-router";

const InvoiceGen = () => {
  const { state } = useLocation();
  console.log(state);
  const { name } = state;
  const { selectedoptions, setFormInfo } = useContext(InvoiceFormContext);

  useEffect(() => {
    if (name === "estimates") {
      setFormInfo((prev) => ({ ...prev, title: "Estimate" }));
    }else{
      setFormInfo((prev) => ({ ...prev, title: "Invoice" }));
    }
  }, [name]);

  return (
    <div className=" max-w-full  flex container ">
      <div className="flex flex-col md:flex-row w-full">
        <div className=" flex flex-col w-full md:w-3/4">
          <InvoiceTop />
          {selectedoptions === "Edit" ? <InvoiceEdit /> : <InvoicePreview />}
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <SideBar state={name} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceGen;
