import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button } from "antd";
import AuthContext from "../../Context/AuthContext";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ExtrasContext from "../../Context/ExtrasContext";
import { IoSettingsOutline } from "react-icons/io5";
import { TbReceipt, TbReceipt2 } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import goldverified from "../../../assets/images/gold.png"
import verified from "../../../assets/images/verified.png"
import quickfast from "../../../assets/images/quick_fast.png"
const AppNav = () => {
  const { setLoginOpen, setRegisterOpen, auth } = useContext(AuthContext);
  const { setProfileModalisOpen } = useContext(ExtrasContext);
  const navigate = useNavigate();
  // const query = useQueryClient();
  const [nav, setNav] = useState(false);
  const [alias, setAlias] = useState<string>("");
  const handlenav = () => {
    setNav((prev) => !prev);
  };

  // const logout = () => {
  //   query.removeQueries()
  //   setAuth(initialauth);
  //   localStorage.removeItem("Invoice_AccessToken"),
  //   localStorage.removeItem("Invoice_RefreshToken");
  // };
  return (
    <IconContext.Provider value={{ color: "white", size: "18px" }}>
      <div className="flex">
        <nav className="">
          <div className="flex md:max-full md:mx-auto px-4 sm:px-0 lg:px-8 w-screen ">
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center h-20 ">
                <div className="flex items-center">
                  <div className="flex items-center justify-center">
                    <div
                      className="md:hidden font-bold mr-5 "
                      onClick={handlenav}
                    >
                      <AiOutlineMenu color="white" size={25} />
                    </div>
                    <NavLink
                      to="/"
                      className="text-white text-xl font-semibold"
                    >
                      <img
                        src={quickfast}
                        className="h-14 mb-2"
                        alt="quickfast invoices"
                      />
                    </NavLink>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {[
                        {
                          to: "invoices",
                          icon: TbReceipt2,
                          text: "Invoices",
                        },
                        {
                          to: "estimates",
                          icon: TbReceipt,
                          text: "Estimates",
                        },
                        {
                          to: "clients",
                          icon: BsPeopleFill,
                          text: "Clients",
                        },
                        //{ to: "reports", text: "Reports" },
                        {
                          to: "/settings",
                          icon: IoSettingsOutline,
                          text: "Settings",
                        },
                      ].map((link, index) => (
                        <NavLink
                          onClick={() => setAlias(link.text)}
                          key={index}
                          to={link.to}
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#FFA500] hover:text-[#FFA500] h-10 px-3 py-1 rounded-md transition duration-200 flex items-center justify-center gap-1"
                              : "text-gray-300 hover:text-[#FFA500] px-3 py-2 h-10 rounded-md transition duration-200 flex items-center justify-center gap-1"
                          }
                        >
                          <link.icon
                            color={alias === link.text ? "#FFA500" : "#fffff0"}
                          />
                          {link.text}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center z-50 ">
                <div className="md:hidden cursor-pointer">
                  {auth.userId ? (
                    <Avatar
                      size={40}
                      onClick={() => {
                        setProfileModalisOpen(true);
                      }}
                      src={
                        "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                      }
                    />
                  ) : (
                    <div className="flex gap-1">
                      <Button
                        type="primary"
                        onClick={() => setLoginOpen(true)}
                        className="flex items-center text-white justify-center text border-white hover:border-blue-500 px-3 py-2 rounded-md transition duration-200"
                      >
                        Login
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setRegisterOpen(true)}
                        className="flex items-center justify-center border-blue-500 bg-blue-500 text-white  hover:text-white px-3 py-2 rounded-md transition duration-200"
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavLink
                      to="/#"
                      className="text-gray-300 hover:text-white px- py-2 rounded-md transition duration-200"
                    >
                      <div className="flex items-center justify-center gap-1">
                        {auth.username}
                        {auth.userId && (
                          <img
                            src={
                              auth.package === "Free" ? verified : goldverified
                            }
                            style={{}}
                            className="h-5"
                            alt="quickfast invoices"
                          />
                        )}
                      </div>
                    </NavLink>
                    {auth.accessToken && (
                      <Avatar
                        size={32}
                        className="cursor-pointer flex self-center"
                        onClick={() => {
                          setProfileModalisOpen(true);
                        }}
                        src={
                          "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
                        }
                      />
                    )}
                    {auth.accessToken ? (
                      ""
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => setLoginOpen(true)}
                        className="flex items-center text-white justify-center text border-white hover:border-blue-500 px-3 py-2 rounded-md transition duration-200"
                      >
                        Login
                      </Button>
                    )}
                    {!auth.userId && (
                      <Button
                        type="primary"
                        onClick={() => setRegisterOpen(true)}
                        className="flex items-center justify-center border-blue-500 bg-blue-500 text-white  hover:text-white px-3 py-2 rounded-md transition duration-200"
                      >
                        Sign up
                      </Button>
                    )}
                    {auth.userId && (
                      <Button
                        type="primary"
                        className="flex items-center justify-center border-blue-500 bg-blue-500 text-white  hover:text-white px-3 py-2 rounded-md transition duration-200"
                        onClick={() => navigate("/subscription")}
                      >
                        Upgrade Now
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  className={
                    nav
                      ? "md:hidden fixed left-0 top-0 w-full h-screen bg-[#001529]"
                      : ""
                  }
                >
                  <div
                    className={
                      nav
                        ? "fixed left-0 top-0 w-full h-sceen bg-[#001529] p-10 ease-in duration-500"
                        : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
                    }
                  >
                    <div className=" h-screen">
                      <div className="flex w-full items-center justify-between">
                        <NavLink to="/">
                          <img
                            src={quickfast}
                            style={{}}
                            className="h-14 mb-3"
                            alt="quickfast invoices"
                          />
                        </NavLink>
                        <div
                          onClick={handlenav}
                          className="rounded-full shadow-sm  p-3 cursor-pointer"
                        >
                          <AiOutlineClose color={"#FFA500"} />
                        </div>
                      </div>
                      <div className="py-4 flex-col">
                        <ul className="uppercase font-kalam font-bold">
                          {[
                            { to: "invoices", text: "Invoices" },
                            { to: "estimates", text: "Estimates" },
                            { to: "clients", text: "Clients" },
                            // { to: "reports", text: "Reports" },
                            { to: "/settings", text: "Settings" },
                          ].map((link, index) => (
                            <NavLink key={index} to={link.to}>
                              <li
                                onClick={() => {
                                  setNav(false);
                                }}
                                className="py-4 text-sm text-[#FFA500]"
                              >
                                {link.text}
                              </li>
                            </NavLink>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </IconContext.Provider>
  );
};
export default AppNav;
