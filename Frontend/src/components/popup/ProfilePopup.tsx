import { useContext } from "react";
import { Button, Modal } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ExtrasContext from "../../Context/ExtrasContext";
import { initialauth } from "../../Context/AuthContext";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProfilePopup = () => {
  const { profilemodalisopen, setProfileModalisOpen } =
    useContext(ExtrasContext);
  const { auth, setAuth } = useAuth();
  //   const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  //   const Logout = async (token: string | number) => {
  //     const res = await axiosPrivate.post(
  //       `/mk_company_admin_user_log_out_information/${token}`,
  //       {
  //         headers: { Authorization: "Bearer " + auth?.accessToken },
  //       }
  //     );
  //     console.log(res);
  //     return res.data;
  //   };

  const handleCancel = () => {
    setProfileModalisOpen(false);
  };

  //   const LogOutMutation = useMutation({
  //     mutationFn: Logout,
  //     onSuccess: (data) => {
  //       if (data.status === 200) {
  //         navigate("/login");
  //         setProfileModalisOpen(false);
  //         sessionStorage.removeItem("mkrshTn");
  //         setAuth({});
  //       } else {
  //         console.log(data);
  //         console.log(data.message);
  //       }
  //     },
  //     onError(error: { message: string }) {
  //       console.log(error.message);
  //     },
  //   });

  //   const handleLogout = () => {
  //     LogOutMutation.mutate(auth?.refreshToken);
  //   };

  const logout = () => {
    setAuth(initialauth);
    localStorage.removeItem("Invoice_AccessToken"),
      localStorage.removeItem("Invoice_RefreshToken");
  };

  return (
    <>
      <Modal
        style={{ position: "absolute", top: 60, right: 20 }}
        open={profilemodalisopen}
        onCancel={handleCancel}
        closable={false}
        bodyStyle={{ height: 200 }}
        width={200}
        footer={null}
        className="flex flex-wrap max-w-[200px]"
      >
        <div className="flex flex-col ">
          <div className="flex flex-col items-center mb-1 p-0">
            <p className="p-0 my-1 text-sm md:text-base">{auth.username}</p>
            <p className="flex flex-wrap p-0 my-1 text-sm md:text-base">
              {auth.email}
            </p>
            <p className="flex flex-wrap p-0 my-1 text-sm md:text-base">
              {auth.email}
            </p>
          </div>
          <div className="my-2 flex flex-col">
            <div className="flex items-center my-1">
              <div className="flex w-1/4 ">
                <UserOutlined className="text-blue-500" />
              </div>
              <div className="flex w-3/4">
                <Button
                  className="flex border-blue-500 bg-blue-500 justify-start text-sm md:text-base"
                  type="primary"
                  block
                  onClick={() => [
                    setProfileModalisOpen(false),
                    navigate("/account"),
                  ]}
                >
                  Upgrade
                </Button>
              </div>
            </div>
            <div className="flex items-center my-1">
              <div className="flex w-1/4">
                <LogoutOutlined className="text-red-500" />
              </div>
              <div className="flex w-3/4">
                <Button
                  className="flex bg-red-500 hover:bg-red-500 justify-start text-sm md:text-base"
                  type="primary"
                  danger
                  block
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePopup;
