import { useContext, useState } from "react";
import { Input, Button, message, Typography } from "antd";
import {
  handleEmailBlur,
  validateEmail,
  validatePhone,
} from "../../utils/validator";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import ExtrasContext from "../../Context/ExtrasContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { useInvoiceGenerator } from "../../hooks/useInvoiceGenerator";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const { Text } = Typography;
  const { forminfo, todata, fromdata, description } =
    useContext(InvoiceFormContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [showtext, setShowText] = useState(true);
  const axiosprivate = useAxiosPrivate();
  const { emailerrors, setEmailErrors } = useContext(ExtrasContext);
  const { auth } = useAuth();
  const [ccEmails, setCCEmails] = useState<string[]>([""]); // Initialize with one empty CC field
  const [email, setEmail] = useState<email>({
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
    onError(error: { response: any }) {
      messageApi.open({
        type: "error",
        content: error.response.statusText,
      });
    },
  });

  const validateAndDownload = () => {
    const refreshToken = localStorage.getItem("Invoice_RefreshToken");
    if (auth.userId) {
      if (validateEmail(email.to)) {
        Download().then((pdf) => {
          console.log(pdf);
          sendEmailMutation.mutate({ email, pdf });
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Invalid Email address",
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

  const handleSend = () => {
    if (auth.package === "Basic") {
      messageApi.open({
        type: "info",
        content: "Please upgrade your plan to use the email feature",
      });
      setTimeout(() => {
        navigate("/subscription");
      }, 2000);
    } else {
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
        validateAndDownload();
      }
    }
  };
  return (
    <div className="w-full mx-auto my-10 shadow-md p-5 md:p-10">
      {contextHolder}
      <h1 className="text-2xl font-bold mb-10 flex items-center justify-center">
        Send Invoice Email
      </h1>
      {showtext ? (
        <p className="mb-10 rounded flex items-center gap-2 bg-[#ffc069] w-max text-white p-1">
          Generated invoices/estimates will be attached
          <span className="cursor-pointer">
            <AiOutlineClose
              size={18}
              color={"red"}
              onClick={() => {
                setShowText(false);
              }}
            />
          </span>
        </p>
      ) : (
        ""
      )}
      <div className="flex flex-col space-y-4">
        <Input.Group>
          <Text>Receipient Email:</Text>
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
        <Text>CC:</Text>
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
          <Text>Subject:</Text>
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
          <Text>Body:</Text>
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
