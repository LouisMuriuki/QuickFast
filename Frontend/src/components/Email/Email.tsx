import { useContext, useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import {
  handleEmailBlur,
  validateEmail,
  validatePhone,
} from "../../utils/validator";
import useAuth from "../../hooks/useAuth";
import ExtrasContext from "../../Context/ExtrasContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { useInvoiceGenerator } from "../../hooks/useInvoiceGenerator";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
interface attachment {
  filename: string;
  content: string;
  encoding: any;
}
interface email {
  ownerId: string;
  from: string;
  cc: string[];
  to: string;
  subject: string;
  body: string;
  attachment: attachment;
}
const Email = () => {
  const { forminfo, todata, fromdata, description } =
    useContext(InvoiceFormContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const axiosprivate = useAxiosPrivate();
  const { emailerrors, setEmailErrors } = useContext(ExtrasContext);
  const { auth } = useAuth();
  const [ccEmails, setCCEmails] = useState<string[]>([""]); // Initialize with one empty CC field
  const [email, setEmail] = useState({
    ownerId: auth.userId,
    from: auth.email,
    cc: ccEmails,
    to: "",
    subject: "",
    body: "",
    attachment: {
      filename: "",
      content: "",
      encoding: "",
    },
  });

  const handleAddMoreCC = () => {
    setCCEmails([...ccEmails, ""]); // Add an empty CC field to the list
  };

  const handleRemoveCC = (index: number) => {
    const updatedCCEmails = ccEmails.filter((_, i) => i !== index);
    setCCEmails(updatedCCEmails);
  };

  const handleCCEmailChange = (index: number, value: string) => {
    //validate email here
    const updatedCCEmails = [...ccEmails];
    updatedCCEmails[index] = value;
    setCCEmails(updatedCCEmails);
  };
  const Download = async () => {
    const result = useInvoiceGenerator(forminfo, todata, fromdata, description);
    console.log(result);
    let data;
    try {
      setLoading(true);
      data = await result();
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
    return data && data.pdf;
  };

  const sendEmail = async ({ email, pdf }: any) => {
    console.log(pdf);
    const attachment = {
      filename: `${fromdata.name} ${forminfo.number}.pdf`,
      content: pdf,
      encoding: "base64",
    };

    const emailSend = {
      ...email,
      attachment,
    };
    console.log(emailSend);
    const res = await axiosprivate.post(
      `/emails/sendEmail/`,
      JSON.stringify({
        emailSend,
      }),
      {
        headers: { Authorization: "Bearer " + auth?.accessToken },
      }
    );
    return res.data;
  };
  const sendEmailMutation = useMutation({
    mutationFn: sendEmail,
    onSuccess(data) {
      if (data.status === 200) {
        messageApi.open({
          type: "success",
          content: "Email sent successfully",
        });
        setEmail((prev) => ({ ...prev, subject: "", body: "", to: "" }));
        setCCEmails([""]);
      }
    },
    onError(error: { message: string }) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const handleSend = () => {
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
        Download().then((pdf) => {
          console.log(pdf);
          sendEmailMutation.mutate({ email, pdf });
        });
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
  return (
    <div className="w-2/3 mx-auto my-10 shadow-md p-5 md:p-10">
      {contextHolder}
      <h1 className="text-2xl font-bold mb-10 flex items-center justify-center">
        Send Invoice Email
      </h1>
      <p className="mb-10 rounded bg-[#ffc069] w-max text-white p-1">
        {" "}
        Generated invoices/estimates will be attached{" "}
      </p>
      <div className="flex flex-col space-y-4">
        <Input.Group>
          <Input
            value={email.to}
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            style={{
              marginBottom: 8,
              borderColor: emailerrors.emailerror ? "red" : "",
            }}
            onChange={(e) => {
              setEmail((prev) => ({ ...prev, to: e.target.value }));
            }}
            onBlur={(e) =>
              handleEmailBlur(e.target.value, "email", setEmailErrors)
            }
          />
        </Input.Group>
        {ccEmails.map((ccEmail, index) => (
          <Input.Group key={index}>
            <div className="flex gap-1 md:gap-2">
              <Input
                type="email"
                name="email"
                placeholder={`CC ${index + 1}`}
                value={ccEmail}
                onChange={(e) => handleCCEmailChange(index, e.target.value)}
                style={{
                  marginBottom: 8,
                  borderColor: emailerrors.ccerror ? "red" : "",
                }}
                onBlur={(e) =>
                  handleEmailBlur(e.target.value, "cc", setEmailErrors)
                }
              />
              <Button
                type="dashed"
                onClick={handleAddMoreCC}
                style={{ marginBottom: 8 }}
              >
                Add
              </Button>
            </div>

            {index > 0 && (
              <Button
                type="dashed"
                danger
                onClick={() => handleRemoveCC(index)}
              >
                Remove
              </Button>
            )}
          </Input.Group>
        ))}

        <Input.Group>
          <Input
            placeholder="Subject"
            value={email.subject}
            onChange={(e) => {
              setEmail((prev) => ({ ...prev, subject: e.target.value }));
            }}
            style={{ marginBottom: 8 }}
          />
        </Input.Group>
        <Input.Group>
          <Input.TextArea
            onChange={(e) => {
              setEmail((prev) => ({ ...prev, body: e.target.value }));
            }}
            value={email.body}
            placeholder="Body"
            rows={4}
            style={{ marginBottom: 8 }}
          />
        </Input.Group>
        <Button
          type="primary"
          loading={loading || sendEmailMutation.isLoading}
          className="flex items-center w-full justify-center bg-blue-500 text-white"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Email;
