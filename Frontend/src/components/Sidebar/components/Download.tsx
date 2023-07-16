import { Divider, Button, message } from "antd";
import { useState, useContext, useEffect } from "react";
import { InvoiceFormContext } from "../../../Context/InvoiceFormContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { validateEmail, validatePhone } from "../../../utils/validator";
import { useInvoiceGenerator } from "../../../hooks/useInvoiceGenerator";
import easyinvoice from "easyinvoice";
interface stateprops {
  state: string;
  id?: string | number;
}

interface dataProps {
  ownerId: string;
  invoice?: any;
  estimate?: any;
}
const Download = ({ state, id }: stateprops) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { auth } = useAuth();
  const [data, setData] = useState<dataProps>({
    ownerId: auth?.accessToken,
    invoice: [],
  });
  const { forminfo, todata, fromdata, description } =
    useContext(InvoiceFormContext);

  const axiosprivate = useAxiosPrivate();
  useEffect(() => {
    state === "invoice"
      ? setData({
          ownerId: auth?.userId,
          invoice: [
            {
              fromdata,
              todata: { ...todata, ownerId: auth?.userId },
              forminfo,
              description,
            },
          ],
        })
      : setData({
          ownerId: auth?.userId,
          estimate: [
            {
              fromdata,
              todata: { ...todata, ownerId: auth?.userId },
              forminfo,
              description,
            },
          ],
        });
  }, [state, fromdata, todata, forminfo, description, auth]);

  const uploadInvoice = async () => {
    const res = await axiosprivate.post(
      "/invoice/createinvoice",
      JSON.stringify(data),
      {
        headers: { Authorization: "Bearer " + auth.accessToken },
      }
    );
    console.log(res);
    return res.data;
  };

  const uploadEstimates = async () => {
    const res = await axiosprivate.post(
      "/estimate/createestimate",
      JSON.stringify(data),
      {
        headers: { Authorization: "Bearer " + auth.accessToken },
      }
    );
    console.log(res);
    return res.data;
  };
  const updateInvoice = async () => {
    const res = await axiosprivate.patch(
      `/invoice/updateinvoice/${id}`,
      JSON.stringify(data),
      {
        headers: { Authorization: "Bearer " + auth.accessToken },
      }
    );
    console.log(res);
    return res.data;
  };

  const updateEstimates = async () => {
    const res = await axiosprivate.patch(
      `/estimate/updateestimate/${id}`,
      JSON.stringify(data),
      {
        headers: { Authorization: "Bearer " + auth.accessToken },
      }
    );
    console.log(res);
    return res.data;
  };

  const uploadMutation = useMutation({
    mutationFn:
      state === "invoice"
        ? id
          ? updateInvoice
          : uploadInvoice
        : id
        ? updateEstimates
        : uploadEstimates,
    onSuccess(data) {
      console.log(data);
      if (data.status === 200) {
        state === "invoice"
          ? id
            ? messageApi.open({
                type: "success",
                content: "Invoice updated successfully",
              })
            : messageApi.open({
                type: "success",
                content: "Invoice created successfully",
              })
          : id
          ? messageApi.open({
              type: "success",
              content: "Estimate updated successfully",
            })
          : messageApi.open({
              type: "success",
              content: "Estimate created successfully",
            });
      }
    },
    onError(error: { message: string }) {
      console.log(error.message);
    },
  });

  const invoiceHandler = () => {
    const refreshToken = localStorage.getItem("Invoice_RefreshToken");
    if (auth.userId) {
      if (
        fromdata.name === "" ||
        todata.name === "" ||
        (fromdata.email.length > 0 && !validateEmail(fromdata.email)) ||
        (todata.email.length > 0 && !validateEmail(todata.email)) ||
        !validatePhone(todata.phone) ||
        !validatePhone(fromdata.phone) ||
        forminfo.date === "" ||
        forminfo.number === "" ||
        description[0].description === "" ||
        !(typeof description[0].qty === "number") ||
        !(typeof description[0].amount === "number")
      ) {
        console.log(forminfo);
        messageApi.open({
          type: "error",
          content: "Please ensure the fields are filled correctly",
        });
        return;
      } else {
        uploadMutation.mutate();
        Download();
      }
    } else if (!refreshToken) {
      messageApi.open({
        type: "error",
        content:
          "Seems we dont recognise you, please signup to use fast-invoice",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Please login to finish up your invoice",
      });
    }
  };

  const [loading, setLoading] = useState(false);

  const Download = async () => {
    const result = useInvoiceGenerator(forminfo, todata, fromdata, description);
    console.log(result)
    try {
      setLoading(true);
      const data = result();
      console.log(data);
      //@ts-expect-error
      easyinvoice.download("Invoice.pdf", data.pdf);
    } catch (error:any) {
      message.error(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {contextHolder}
      <p className="flex font-semibold">DOWNLOAD PDF</p>
      <Divider className="border border-black mt-1" />
      <p>Download PDF document</p>
      <div className="flex items-center justify-center pt-4 w-full ">
        <Button
          type="primary"
          loading={loading || uploadMutation.isLoading}
          onClick={() => {
            invoiceHandler();
          }}
          className="flex items-center w-full justify-center bg-blue-500 text-white"
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default Download;
