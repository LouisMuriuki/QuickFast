import { useContext, useEffect } from "react";
import InvoiceTop from "./InvoiceTop";
import InvoiceEdit from "./InvoiceEdit/InvoiceEdit";
import {
  InvoiceFormContext,
  initialFormInfo,
  initialFromData,
  initialToData,
  initialdescription,
} from "../../Context/InvoiceFormContext";
import InvoicePreview from "./InvoicePreview/InvoicePreview";
import SideBar from "../../components/Sidebar/SideBar";
import { useLocation } from "react-router";

const InvoiceGen = () => {
  const { state } = useLocation();
  const { name, data } = state;
  console.log(data)
  const {
    selectedoptions,
    setFormInfo,
    setSelectedOptions,
    setSegmentedOptions,
    setDescription,
    setFromdata,
    setTodata,
  } = useContext(InvoiceFormContext);
  useEffect(() => {
    if (!data) {
      if (name === "estimates") {
        setFormInfo((prev) => ({ ...prev, title: "Estimate" }));
      } else {
        setFormInfo((prev) => ({ ...prev, title: "Invoice" }));
      }
    }
  }, [name]);

  useEffect(() => {
    if (data&&data) {
      if (name === "invoices") {
        setFormInfo(data?.invoice[0]?.forminfo);
        setDescription(data?.invoice[0]?.description);
        setFromdata(data?.invoice[0]?.fromdata);
        setTodata(data?.invoice[0]?.todata);
      } else {
        setFormInfo(data?.estimate[0]?.forminfo);
        setDescription(data?.estimate[0]?.description);
        setFromdata(data?.estimate[0]?.fromdata);
        setTodata(data?.estimate[0]?.todata);
      }
    }
    return () => {
      setFormInfo(initialFormInfo);
      setDescription([initialdescription]);
      setFromdata(initialFromData);
      setTodata(initialToData);
    };
  }, [data]);

  useEffect(() => {
    if (!data) {
      setSegmentedOptions(["Edit", "Preview"]);
      setSelectedOptions("Edit");
    } else {
      setSegmentedOptions(["Preview"]);
      setSelectedOptions("Preview");
    }
  }, [data]);

  return (
    <div className=" max-w-full  flex container ">
      <div className="flex flex-col md:flex-row w-full">
        <div className=" flex flex-col w-full md:w-3/4">
          <InvoiceTop />
          {selectedoptions === "Edit" ? (
            <InvoiceEdit data={data?.invoice[0]} />
          ) : (
            <InvoicePreview />
          )}
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <SideBar state={name} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceGen;
