import  { useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import UseRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
function Persistlogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = UseRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const controller = new AbortController();
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    auth?.accessToken ? setIsLoading(false) : verifyRefreshToken();
    return () => controller.abort();
  }, [auth.accessToken, refresh]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Persistlogin;