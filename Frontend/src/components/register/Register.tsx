import { useState, useContext, useEffect } from "react";
import MainModal from "../Reusables/MainModal";
import { Form, Input, message, Button } from "antd";
import AuthContext from "../../Context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userRegister } from "../../api/authCalls";
import axiosInstance from "../../axios";

const Register = () => {
  const { setRegisterOpen, setLoginOpen, registeropen, } =
    useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [starterpackageID,setStarterPackageID]=useState('')
  const getPackages=async()=>{
    const res=await axiosInstance.get(`/packages/getpackages`)
    return res.data;
  }
  const GetPackageQuery = useQuery({
    queryKey: ["packages"],
    queryFn: () =>
    getPackages(),
  });

  useEffect(()=>{
    console.log(GetPackageQuery?.data?.data)
    setStarterPackageID(GetPackageQuery?.data?.data)
  },[GetPackageQuery.data])

  const RegisterMutation = useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        messageApi.open({
          type: "success",
          content: "Account Created, Please Login ",
        });
        setTimeout(() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }, 1000);
      } else {
        messageApi.open({
          type: "error",
          content: "Account Creation failed, Please try again ",
        });
      }
    },
    onError(error: { message: string }) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
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
      {contextHolder}
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
              () => ({
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
