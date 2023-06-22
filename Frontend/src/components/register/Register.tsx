import React,{useState,useContext} from "react";
import MainModal from "../Reusables/MainModal";
import { Form, Input, Button } from 'antd';
import AuthContext from "../../Context/AuthContext";

const Register = () => {
    const {setRegisterOpen,registeropen}=useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (values: any) => {
        console.log('Form submitted:', values);
      };
  return (
      <MainModal isOpen={registeropen} setIsOpen={setRegisterOpen} title="Register">
      <div className="flex justify-center items-center">
      <Form
        name="register-form"
        onFinish={handleSubmit}
        className="w-72"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email address' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('passwords does not match');
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
          <Button type="primary" htmlType="submit" className="w-full border-blue-500 text-blue-500">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
      </MainModal>
 
  );
};

export default Register;
