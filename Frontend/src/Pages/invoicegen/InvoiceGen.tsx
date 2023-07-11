import { useContext, useEffect, useState } from "react";
import InvoiceTop from "./InvoiceTop";
import InvoiceEdit from "./InvoiceEdit/InvoiceEdit";
import {
  InvoiceFormContext,
  initialFormInfo,
  initialToData,
  initialdescription,
} from "../../Context/InvoiceFormContext";
import InvoicePreview from "./InvoicePreview/InvoicePreview";
import SideBar from "../../components/Sidebar/SideBar";
import { useLocation } from "react-router";
import { SettingsContext } from "../../Context/SettingsContext";

const InvoiceGen = () => {
  const { state } = useLocation();
  const { name, data, root } = state;
  console.log(data);
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
  }, [logo, customizeinfo, name]);

  const result = { ...partofforminfo, ...initialFormInfo };

  useEffect(() => {
    if (!data) {
      if (name === "estimates") {
        setFormInfo((prev) => ({ ...prev, title: "Estimate" }));
      } else {
        setFormInfo((prev) => ({ ...prev, title: "Invoice" }));
      }
    }
  }, [name, data]);

  useEffect(() => {
    if (data) {
      if (root === "client") {
        setTodata(data);
        setFormInfo((prev) => ({
          ...prev,
          title: name === "estimates" ? "Estimate" : "Invoice",
        }));
      } else if (name === "invoices") {
        const invoiceData = data?.invoice[0];
        setFormInfo(invoiceData?.forminfo);
        setDescription(invoiceData?.description);
        setFromdata(invoiceData?.fromdata);
        setTodata(invoiceData?.todata);
      } else {
        const estimateData = data?.estimate[0];
        setFormInfo(estimateData?.forminfo);
        setDescription(estimateData?.description);
        setFromdata(estimateData?.fromdata);
        setTodata(estimateData?.todata);
      }
    }

    return () => {
      if (root === "client") {
      } else {
        setFormInfo(result);
        setDescription([initialdescription]);
        setFromdata(restofobject);
        setTodata(initialToData);
      }
    };
  }, [data]);

  useEffect(() => {
    if (!data) {
      setSegmentedOptions(["Edit", "Preview"]);
      setSelectedOptions("Edit");
    } else if (data && root === "client") {
      setSegmentedOptions(["Edit", "Preview"]);
      setSelectedOptions("Edit");
    } else if (data && name === "estimates" && root === "estimate") {
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

  console.log(data);

  return (
    <div className=" max-w-full  flex container ">
      <div className="flex flex-col md:flex-row w-full">
        <div className=" flex flex-col w-full md:w-3/4">
          <InvoiceTop />
          {selectedoptions === "Edit" ? (
            <InvoiceEdit
              data={
                //if root equals to client then set data else set data as estimate or invoice
                root === "client"
                  ? data
                  : name === "estimates"
                  ? data?.estimate[0]
                  : data?.invoice[0]
              }
            />
          ) : (
            <InvoicePreview />
          )}
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <SideBar state={name} id={data ? data._id : ""} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceGen;
