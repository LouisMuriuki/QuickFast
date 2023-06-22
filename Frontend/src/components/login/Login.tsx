import React, { useState, useContext } from "react";
import MainModal from "../Reusables/MainModal";
import { Form, Input, Button } from "antd";
import AuthContext from "../../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../api/authCalls";

const Login = () => {
  const { setLoginOpen,setRegisterOpen, loginopen } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const { openNotificationWithIcon, contextHolder } =useContext(NotificationContext);
   const LoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess(data) {
      console.log(data);
      if (data.statis === 200) {
      } else {
      }
    },
    onError(error: { message: string }) {
      console.log(error.message);
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    LoginMutation.mutate({
      email: values.email,
      password: values.password,
    });
    console.log("Form submitted:", values);
  };

  const SignUp=()=>{
    setLoginOpen(false)
    setRegisterOpen(true)
  }
  return (
    <div>
      <MainModal isOpen={loginopen} setIsOpen={setLoginOpen} title="Login">
        <div className="flex-col justify-center  flex items-center">
          <h3 className="text-2xl font-bold mb-5">Login to your Account</h3>
          <p className="text-lg font-semibold flex self  mb-5">
            Welcome Back, we hope you're <br /> having a great day.
          </p>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            className="w-72"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
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
