import { Divider, Button, message } from "antd";
import easyinvoice from "easyinvoice";
import { useState, useContext, useEffect } from "react";
import { InvoiceFormContext } from "../../../Context/InvoiceFormContext";
import dayjs from "dayjs";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
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

  console.log(auth);

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
      const phoneNumberRegex = /^(?:\+254|0)(?:1|7)\d{8}$/;
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (
        fromdata.name === "" ||
        todata.name === "" ||
        (fromdata.email.length > 0 && !emailRegex.test(fromdata.email)) ||
        (todata.email.length > 0 && !emailRegex.test(todata.email)) ||
        !phoneNumberRegex.test(todata.phone) ||
        !phoneNumberRegex.test(fromdata.phone) ||
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

  let number = [0];
  const [loading, setLoading] = useState(false);

  number =
    forminfo?.terms === "none"
      ? [0]
      : (forminfo?.terms?.match(/\d+/g) || []).map(Number);
  console.log(number);
  const formattedDate = dayjs(forminfo?.date).format("DD/M/YYYY");
  const formattedDueDate = dayjs(forminfo?.date)
    .add(+number[0], "day")
    .format("DD/M/YYYY");
  const Download = () => {
    setLoading(true);
    var data = {
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        // The logo on top of your invoice
        logo: forminfo.logo,
        // The invoice background
        background: "",
      },
      // Your own data
      sender: {
        company: fromdata.name,
        address: fromdata.address,
        zip: fromdata.zipcode,
        city: fromdata.city,
        country: fromdata.country,
        custom1: fromdata.phone,
        custom2: fromdata.email,
        custom3: `<a href=${fromdata.website}>${fromdata.website}</a>`,
      },
      // Your recipient
      client: {
        company: todata.name,
        address: todata.address,
        zip: todata.zipcode,
        city: todata.city,
        country: todata.country,
        custom1: todata.phone,
        custom2: todata.email,
        custom3: `<a href=${todata.website}>${todata.website}</a>`,
      },
      information: {
        // Invoice number
        number: forminfo.number,
        // Invoice data
        date: formattedDate,
        // Invoice due date
        "due-date": formattedDueDate,
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: description.map((desc) => ({
        quantity: desc.qty,
        description: `<p style="margin-bottom: 0px;">${desc.description}</p>
        ${
          desc.additional
            ? `<p style="margin-top: 0px; margin-bottom: 20px;">${desc.additional}</p>`
            : ""
        }`,
        "tax-rate": desc.taxrate,
        price: desc.rate,
      })),
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": `
      <p style="text-align: left; margin-bottom: 80px;">
      ${forminfo.notes}
      </p>
      <p style="text-align: center; font-weight: bold;">
        Kindly pay your invoice ${
          forminfo.terms === "none" ? "today" : `within ${forminfo.terms}`
        }
      </p> 
      <p style="text-align: center;">
      Thank You!
      </p>
      ${
        forminfo.title === "Estimate"
          ? `<p style="text-align: center; font-style: italic; margin-top: 80px;">**This is an estimate, once agreed upon please request for the invoice**</p>`
          : ""
      }
    `,
      // Settings to customize your invoice
      settings: {
        currency: forminfo.currency, // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // locale: forminfo.locale, // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      translate: {
        invoice: forminfo.title === "Estimate" ? "Estimate" : "Invoice", // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        products: "Description", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal", // Defaults to 'Total'
        // "vat": "btw" // Defaults to 'vat'
      },
    };

    try {
      //@ts-ignore
      easyinvoice.createInvoice(data).then((result) => {
        easyinvoice.download("Invoice.pdf", result.pdf);
        setLoading(false);
      });
    } catch (error) {
      console.log("error");
    } finally {
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
