import axiosInstance from "../axios";
import useAuth from "./useAuth";

function UseRefreshToken() {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem("Invoice_RefreshToken");
      const response = await axiosInstance.post(
        `/token/refreshToken?refreshToken=${refreshToken}`,
        {
          headers: { Authorization: "Bearer " + auth?.accessToken },
        }
      );
      console.log(response.data);
      if (response.data.status === 200) {
        setAuth((prev) => ({
          ...prev,
          accessToken: response?.data?.accessToken,
          refreshToken: response?.data?.refreshToken,
          userId: response.data.userId,
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
