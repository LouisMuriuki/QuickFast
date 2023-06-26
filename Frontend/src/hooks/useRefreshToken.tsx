import axiosInstance from "../axios";
import useAuth from "./useAuth";

function UseRefreshToken() {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    try {
      const refreshToken = sessionStorage.getItem("mkrshTn");
      const response = await axiosInstance.post(
        `mk_refresh_token_information/${refreshToken}`,
        {
          headers: { Authorization: "Bearer " + auth?.accessToken },
        }
      );
      if (response.data.status === 200) {
        setAuth(prev=>({
          ...prev,
          accessToken: response?.data?.accessToken,
          refreshToken: response?.data?.refreshToken,
        }));
      }
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
}

export default UseRefreshToken;