import React, { useState, useContext } from "react";
import MainModal from "../Reusables/MainModal";
import { Form, Input, Button } from "antd";
import AuthContext from "../../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { userLogin, userRegister } from "../../api/authCalls";

const Register = () => {
  const { setRegisterOpen, setLoginOpen, registeropen, setAuth } =
    useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const LoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess(data) {
      console.log(data);
      if (data.status === 200) {
        setAuth({
          accessToken: "",
          refreshToken: "",
          userId: data.loggedInUser._id,
        });
        setRegisterOpen(false)
      } else {
      }
    },
    onError(error: { message: string }) {
      console.log(error.message);
    },
  });

  const RegisterMutation = useMutation({
    mutationFn: userRegister,
    onSuccess(data) {
      console.log(data);
      if (data.status === "200") {
        console.log("i tried")
        LoginMutation.mutate({
          email: data?.newUser.email,
          password: data?.newUser.password,
        });
      } else {
      }
    },
    onError(error: { message: string }) {
      console.log(error.message);
    },
  });

  const handleSubmit = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    RegisterMutation.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
    console.log(values);
  };

  const Login = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };
  return (
    <MainModal
      isOpen={registeropen}
      setIsOpen={setRegisterOpen}
      title="Register"
    >
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold mb-5">Sign Up</h3>
        <p className="text-lg font-semibold flex self  mb-5">
          You're a few seconds away from <br /> your Fast Invoice account!
        </p>
        <Form name="register-form" onFinish={handleSubmit} className="w-72">
          <Form.Item
            label="UserName"
            name="username"
            rules={[
              { required: true, message: "Please enter your username" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.trim().length < 2) {
                    return Promise.reject(
                      "username should be more than 2 letters"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("passwords does not match");
                },
              }),
            ]}
          >
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={RegisterMutation.isLoading}
              type="primary"
              htmlType="submit"
              className="w-full border-blue-500 text-blue-500"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div>
          <p>
            Already have an account? <Button onClick={Login}>Login</Button>
          </p>
        </div>
      </div>
    </MainModal>
  );
};

export default Register;
