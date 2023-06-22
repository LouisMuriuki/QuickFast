import axiosInstance from "../axios";

interface LoginProps {
  email: string;
  password: string;
}
interface RegisterProps {
  username: string;
  email: string;
  password: string;
}

export const userLogin = async ({ email, password }: LoginProps) => {
  const res = await axiosInstance.post(
    "/auth/login",
    JSON.stringify({
      email,
      password,
    })
  );
  console.log(res);
  return res.data;
};

export const userRegister = async ({
  username,
  email,
  password,
}: RegisterProps) => {
  const res = await axiosInstance.post(
    "/auth/register",
    JSON.stringify({
      username,
      email,
      password,
    })
  );
  console.log(res);
  return res.data;
};
