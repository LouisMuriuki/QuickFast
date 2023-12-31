import { useState, useContext, useEffect, SetStateAction } from "react";
import MainModal from "../Reusables/MainModal";
import { Form, Input, message, Button } from "antd";
import AuthContext from "../../Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userRegister } from "../../api/authCalls";
import axiosInstance from "../../axios";

const Register = () => {
  const { setRegisterOpen, setLoginOpen, registeropen } =
    useContext(AuthContext);
  const query = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [starterpackageID, setStarterPackageID] = useState("");
  const getPackages = async () => {
    const res = await axiosInstance.get(`/packages/getpackages?all=${true}`);
    return res.data;
  };

  const GetPackageQuery = useQuery({
    queryKey: ["packages"],
    queryFn: () => getPackages(),
  });

  useEffect(() => {
    GetPackageQuery?.data?.data.map(
      (pack: { packageName: string; _id: SetStateAction<string> }) => {
        if (pack.packageName === "Free") {
          setStarterPackageID(pack._id);
        }
      }
    );
  }, [GetPackageQuery.data]);

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
        query.invalidateQueries(["invoices", "estimates"]);
      } else {
        messageApi.open({
          type: "error",
          content: data.response.data.error,
        });
      }
    },
    onError(error: { response: { data: { message: string } } }) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: error.response.data.message,
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
      packageId: starterpackageID,
    });
  };

  const Login = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };
  return (
    <MainModal isOpen={registeropen} setIsOpen={setRegisterOpen} title="">
      {contextHolder}
      <div className="flex flex-col  items-center">
        <h3 className="text-2xl font-bold mb-5 text-[#FFA500]">Sign Up</h3>
        <p className="text-lg font-semibold flex self text-center mb-5">
          You're a few seconds away from <br />
          creating your first invoice
        </p>
        <div className="flex md:ml-[-45px]">
          <Form
            name="register-form"
            onFinish={handleSubmit}
            className="w-80"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 30 }}
          >
            <Form.Item
              label="Username"
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
        </div>

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
