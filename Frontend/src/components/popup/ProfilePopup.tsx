import { useContext } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ExtrasContext from "../../Context/ExtrasContext";
import { initialauth } from "../../Context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import verified from "../../../assets/images/verified.png";
import goldverified from "../../../assets/images/gold.png";
import useWindowDimensions from "../../hooks/useWindoDimensions";

// import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProfilePopup = () => {
  const { profilemodalisopen, setProfileModalisOpen } =
    useContext(ExtrasContext);
  const { width } = useWindowDimensions();
  const query = useQueryClient();
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
    query.removeQueries();
    setAuth(initialauth);
    localStorage.removeItem("Invoice_AccessToken"),
      localStorage.removeItem("Invoice_RefreshToken");
  };

  return (
    <>
      <Modal
        style={{ position: "absolute", top: 100, right: width < 768 ? 15 : 30 }}
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
            <p className="flex gap-1 p-0 my-1 text-sm md:text-base font-semibold">
              {auth.username}
              {auth.userId && (
                <img
                  src={auth.package === "Free" ? verified : goldverified}
                  style={{}}
                  className="h-5"
                  alt="quickfast invoices"
                />
              )}
            </p>
            <p className="flex flex-wrap p-0 my-1 text-sm md:text-base font-semibold">
              {auth.email}
            </p>
            <p className="flex flex-wrap p-0 my-1 text-sm md:text-base font-semibold">
              {` ${auth.package} Tier`}
            </p>
          </div>
          <div className="my-2 flex flex-col">
            {auth.package === "Executive" ? (
              ""
            ) : (
              <div className="flex items-center my-1">
                <div className="flex w-full">
                  <Button
                    className="flex border-blue-500 bg-blue-500 justify-center text-sm md:text-base"
                    type="primary"
                    block
                    onClick={() => [
                      setProfileModalisOpen(false),
                      navigate("/subscription", {
                        state: { from: location, message: "" },
                      }),
                    ]}
                  >
                    Upgrade
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-center my-1">
              <div className="flex w-full">
                <Button
                  className="flex bg-red-500 hover:bg-red-500 justify-center text-sm md:text-base"
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
