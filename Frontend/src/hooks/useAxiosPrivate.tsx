import { axiosPrivate } from "../axios";
import UseRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

interface DecodedToken {
    exp: number;
    // Other properties of the decoded token
  }

const useAxiosPrivate = () => {
  const refresh = UseRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      async (config) => {
        let currentDate = new Date();
        if (auth?.accessToken) {
          const decodedToken = jwtDecode(auth?.accessToken) as DecodedToken;;
          if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await refresh();
            config.headers["Authorization"] = "Bearer " + data.accessToken;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => axiosPrivate.interceptors.request.eject(requestInterceptor);
  }, [refresh, auth?.accessToken]);
  return axiosPrivate;
};
export default useAxiosPrivate;