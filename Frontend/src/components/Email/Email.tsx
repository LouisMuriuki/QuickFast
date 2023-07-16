import { useContext, useState } from "react";
import { Input, Button } from "antd";
import { handleEmailBlur } from "../../utils/validator";
import useAuth from "../../hooks/useAuth";
import ExtrasContext from "../../Context/ExtrasContext";

const Email = () => {
  const { emailerrors, setEmailErrors } = useContext(ExtrasContext);
  const { auth } = useAuth();
  const [ccEmails, setCCEmails] = useState<string[]>([""]); // Initialize with one empty CC field
  const [email, setEmail] = useState({
    from: auth.email,
    cc: ccEmails,
    to: "",
    subject: "",
    body: "",
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

  const handleSend = () => {
    // Implement the send email logic here
  };
  return (
    <div className="w-2/3 mx-auto my-10 shadow-md p-5 md:p-10">
      <h1 className="text-2xl font-bold mb-4">Compose Email</h1>
      <div className="flex flex-col space-y-4">
        <Input.Group>
          <Input
            value={email.to}
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
