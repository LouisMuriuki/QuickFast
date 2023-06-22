import React, { useState, useContext } from "react";
import MainModal from "../Reusables/MainModal";
import { Form, Input, Button } from "antd";
import AuthContext from "../../Context/AuthContext";

const Login = () => {
  const { setLoginOpen, loginopen } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };
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
        </div>
      </MainModal>
    </div>
  );
};

export default Login;
