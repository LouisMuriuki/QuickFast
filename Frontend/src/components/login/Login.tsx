import { useState, useContext } from "react";
import MainModal from "../Reusables/MainModal";
import { Form, Input, message, Button } from "antd";
import AuthContext from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "../../api/authCalls";

const Login = () => {
  const { setLoginOpen, setRegisterOpen, loginopen, setAuth } =
    useContext(AuthContext);
  const query = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const LoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess(data) {
      console.log(data);
      if (data.status === 200) {
        setAuth((prev) => ({
          ...prev,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userId: data.data._id,
          username: data.data.username,
          days: data.data.days,
        }));
        localStorage.setItem("Invoice_AccessToken", data.accessToken);
        localStorage.setItem("Invoice_RefreshToken", data.refreshToken);
        setLoginOpen(false);
        query.invalidateQueries(["invoices", "estimates"]);
        query.refetchQueries(["invoices", "estimates"]);
      } else {
        messageApi.open({
          type: "error",
          content: "Login failed, Please try again ",
        });
      }
    },
    onError(error: { response: any }) {
      messageApi.open({
        type: "error",
        content: error.response.data.data,
      });
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    LoginMutation.mutate({
      email: values.email,
      password: values.password,
    });
    console.log("Form submitted:", values);
  };

  const SignUp = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };
  return (
    <div>
      {contextHolder}
      <MainModal isOpen={loginopen} setIsOpen={setLoginOpen} title="">
        <div className="flex-col justify-center flex items-center">
          <div className="w-full flex items-center justify-center ">
            <h3 className="text-2xl text-[#FFA500] font-bold mb-5">
              Login to your Account
            </h3>
          </div>

          <p className="text-lg text-[#001529] font-bold flex mb-5">
            Welcome Back.
          </p>

          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            className="w-72"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 30 }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email address" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                rootClassName="border-blue-500 text-blue-500"
                htmlType="submit"
                className="w-full"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              Don't have an account? <Button onClick={SignUp}>Sign up</Button>
            </p>
          </div>
        </div>
      </MainModal>
    </div>
  );
};

export default Login;
