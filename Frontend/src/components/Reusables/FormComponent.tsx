import { useContext, useEffect } from "react";
import { Form, Input } from "antd";
import { InvoiceFormContext } from "../../Context/InvoiceFormContext";
import { SettingsContext } from "../../Context/SettingsContext";
import ExtrasContext from "../../Context/ExtrasContext";
import { handleEmailBlur, handlePhoneBlur } from "../../utils/validator";
interface fromlabels {
  name: string;
  label: string;
  required: boolean;
  message: string;
  placeholder: string;
  visible: boolean;
}
interface tolabels {
  name: string;
  label: string;
  required: boolean;
  message: string;
  placeholder: string;
  visible: boolean;
}
interface FormProps {
  fromlabels?: fromlabels[];
  tolabels?: tolabels[];
  origin: string;
  data: any;
}
const FormComponent = ({ fromlabels, tolabels, origin, data }: FormProps) => {
  const { todata, fromdata, setFromdata, setTodata } =
    useContext(InvoiceFormContext);

  const { setBizInfo } = useContext(SettingsContext);
  const {
    setClientData,
    emailerrors,
    setEmailErrors,
    phoneerrors,
    setPhoneErrors,
  } = useContext(ExtrasContext);
  const FromChange = (name: any, value: any) => {
    origin === "settings"
      ? setBizInfo((prev) => ({ ...prev, [name]: value }))
      : setFromdata((prev) => ({ ...prev, [name]: value }));
  };
  const ToChange = (name: any, value: any) => {
    origin === "Add Client"
      ? setClientData((prev) => ({ ...prev, [name]: value }))
      : setTodata((prev) => ({ ...prev, [name]: value }));
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        zipcode: data.zipcode,
        website: data.website,
        country: data.country,
      });
    }
  }, [data, form]);

  return (
    <div className="flex flex-col w-full">
      <Form
        form={form}
        name={fromlabels ? "From" : "To"}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        {fromlabels &&
          fromlabels.map((labels, i) => {
            return (
              <div key={i}>
                <Form.Item
                  label={labels.label}
                  name={labels.name}
                  rules={[
                    { required: labels.required, message: labels.message },
                  ]}
                >
                  <Input
                    placeholder={labels.placeholder}
                    className="flex w-full"
                    defaultValue={fromdata && fromdata[labels?.name]}
                    onChange={(e) => {
                      FromChange(labels.name, e.target.value);
                    }}
                    style={
                      labels.name === "email"
                        ? {
                            borderColor: emailerrors.fromerror ? "red" : "",
                          }
                        : labels.name === "phone"
                        ? {
                            borderColor: phoneerrors.fromerror ? "red" : "",
                          }
                        : undefined
                    }
                    onBlur={(e) =>
                      labels.name === "email"
                        ? handleEmailBlur(
                            e.target.value,
                            "from",
                            setEmailErrors
                          )
                        : labels.name === "phone"
                        ? handlePhoneBlur(
                            e.target.value,
                            "from",
                            setPhoneErrors
                          )
                        : null
                    }
                  />
                </Form.Item>
              </div>
            );
          })}
        {tolabels &&
          tolabels.map((labels, i) => {
            return (
              <div key={i}>
                <Form.Item
                  label={labels.label}
                  name={labels.name}
                  rules={[
                    { required: labels.required, message: labels.message },
                  ]}
                >
                  <Input
                    placeholder={labels.placeholder}
                    className="flex w-full"
                    style={
                      labels.name === "email"
                        ? {
                            borderColor: emailerrors.toerror ? "red" : "",
                          }
                        : labels.name === "phone"
                        ? {
                            borderColor: phoneerrors.toerror ? "red" : "",
                          }
                        : undefined
                    }
                    defaultValue={todata && todata[labels?.name]}
                    onChange={(e) => {
                      ToChange(labels.name, e.target.value);
                    }}
                    onBlur={(e) =>
                      labels.name === "email"
                        ? handleEmailBlur(e.target.value, "to", setEmailErrors)
                        : labels.name === "phone"
                        ? handlePhoneBlur(e.target.value, "to", setPhoneErrors)
                        : null
                    }
                  />
                </Form.Item>
              </div>
            );
          })}
      </Form>
    </div>
  );
};

export default FormComponent;
