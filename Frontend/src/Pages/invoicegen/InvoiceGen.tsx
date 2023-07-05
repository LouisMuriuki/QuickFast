import { useContext, useEffect, useState } from "react";
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
import { SettingsContext } from "../../Context/SettingsContext";

const InvoiceGen = () => {
  const { state } = useLocation();
  const { name, data } = state;
  const {
    selectedoptions,
    setFormInfo,
    setSelectedOptions,
    setSegmentedOptions,
    setDescription,
    setFromdata,
    setTodata,
  } = useContext(InvoiceFormContext);
  const { bizinfo, customizeinfo } = useContext(SettingsContext);
  const { logo, ...restofobject } = bizinfo;
  const [partofforminfo, setPartOfFormInfo] = useState({});

  useEffect(() => {
    if (name === "estimates") {
      setPartOfFormInfo({
        title: customizeinfo?.estimatetitle,
        logo: logo,
        currency: customizeinfo?.currency,
        notes: customizeinfo?.estimatenotes,
      });
    } else {
      setPartOfFormInfo({
        title: customizeinfo?.invoicetitle,
        logo: logo,
        currency: customizeinfo?.currency,
        notes: customizeinfo?.invoicenotes,
      });
    }
  }, []);

  const result = { ...partofforminfo, ...initialFormInfo };

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
    if (data && data) {
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
      setFormInfo(result);
      setDescription([initialdescription]);
      setFromdata(restofobject);
      setTodata(initialToData);
    };
  }, [data]);

  useEffect(() => {
    if (!data) {
      setSegmentedOptions(["Edit", "Preview"]);
      setSelectedOptions("Edit");
    } else if (data && name === "estimates") {
      setSegmentedOptions(["Edit", "Preview"]);
      setSelectedOptions("Preview");
    } else {
      setSegmentedOptions(["Preview"]);
      setSelectedOptions("Preview");
    }
    return () => {
      setSelectedOptions("Edit");
    };
  }, [data]);

  console.log(data)

  return (
    <div className=" max-w-full  flex container ">
      <div className="flex flex-col md:flex-row w-full">
        <div className=" flex flex-col w-full md:w-3/4">
          <InvoiceTop  />
          {selectedoptions === "Edit" ? (
            <InvoiceEdit
              data={
                name === "estimates" ? data?.estimate[0] : data?.invoice[0]
              }
              
            />
          ) : (
            <InvoicePreview />
          )}
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <SideBar state={name} id={data?data._id:""} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceGen;
