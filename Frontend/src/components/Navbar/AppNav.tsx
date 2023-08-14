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
const AppNav = () => {
  const { setLoginOpen, setRegisterOpen, auth } = useContext(AuthContext);
  const { setProfileModalisOpen } = useContext(ExtrasContext);
  const navigate=useNavigate()
  // const query = useQueryClient();
  const [nav, setNav] = useState(false);
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
                      Logo
                    </NavLink>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to="invoices"
                        className={({ isActive }) =>
                          isActive
                            ? "text-white bg-[#FFA500] h-10 hover:text-white px-3 py-1 rounded-md transition duration-200 flex items-center justify-center gap-1"
                            : "text-gray-300 hover:text-[#FFA500] px-3 py-2 h-10 rounded-md transition duration-200 flex items-center justify-center gap-1"
                        }
                      >
                        <TbReceipt2 />
                        Invoices
                      </NavLink>
                      <NavLink
                        to="estimates"
                        className={({ isActive }) =>
                          isActive
                            ? "text-white bg-[#FFA500] h-10 hover:text-white px-3 py-1 rounded-md transition duration-200 flex items-center justify-center gap-1"
                            : "text-gray-300  hover:text-[#FFA500] px-3 py-2 h-10 rounded-md transition duration-200 flex items-center justify-center gap-1"
                        }
                      >
                        <TbReceipt />
                        Estimates
                      </NavLink>
                      <NavLink
                        to="clients"
                        className={({ isActive }) =>
                          isActive
                            ? "text-white bg-[#FFA500] h-10 hover:text-white px-3 py-1 rounded-md transition duration-200 flex items-center justify-center gap-1"
                            : "text-gray-300  hover:text-[#FFA500] px-3 py-2 h-10 rounded-md transition duration-200 flex items-center justify-center gap-1"
                        }
                      >
                        <BsPeopleFill />
                        Clients
                      </NavLink>
                      {/* <NavLink
                        to="reports"
                        className={({ isActive }) =>
                          isActive
                            ? "text-white bg-[#FFA500] h-10 hover:text-white px-3 py-1 rounded-md transition duration-200 flex items-center justify-center gap-1"
                            : "text-gray-300  hover:text-[#FFA500] px-3 py-2 h-10 rounded-md transition duration-200 flex items-center justify-center gap-1"
                        }
                      >
                        Reports
                      </NavLink> */}
                      <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                          isActive
                            ? "text-white bg-[#FFA500] h-10 hover:text-white px-3 py-1 rounded-md transition duration-200 flex items-center justify-center gap-1"
                            : "text-gray-300  hover:text-[#FFA500] px-3 py-2 h-10 rounded-md transition duration-200 flex items-center justify-center gap-1"
                        }
                      >
                        <IoSettingsOutline /> Settings
                      </NavLink>
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
                    <Button
                      type="primary"
                      onClick={() => setRegisterOpen(true)}
                      className="flex items-center justify-center border-blue-500 bg-blue-500 text-white  hover:text-white px-3 py-2 rounded-md transition duration-200"
                    >
                      Sign up
                    </Button>
                  )}
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavLink
                      to="/#"
                      className="text-gray-300 hover:text-white px- py-2 rounded-md transition duration-200"
                    >
                      {auth.username}
                    </NavLink>
                    {auth.accessToken && (
                      <Avatar
                        size={40}
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
                        onClick={()=>navigate("/subscription")}
                      >
                        Upgrade Now
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  className={
                    nav
                      ? "md:hidden fixed left-0 top-0 w-full h-screen bg-white"
                      : ""
                  }
                >
                  <div
                    className={
                      nav
                        ? "fixed left-0 top-0 w-full h-sceen bg-[#fff] p-10 ease-in duration-500"
                        : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
                    }
                  >
                    <div className=" h-screen">
                      <div className="flex w-full items-center justify-between">
                        <NavLink to="/">
                          <h3 className="flex items-center justify-center text-xl font-bold">
                            Logo
                          </h3>
                        </NavLink>
                        <div
                          onClick={handlenav}
                          className="rounded-full shadow-sm  p-3 cursor-pointer"
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                      <div className="py-4 flex-col">
                        <ul className="uppercase font-kalam font-bold">
                          <NavLink to="invoices">
                            <li
                              onClick={() => {
                                setNav(false);
                              }}
                              className="py-4 text-sm"
                            >
                              Invoices
                            </li>
                          </NavLink>
                          <NavLink to="estimates">
                            <li
                              onClick={() => {
                                setNav(false);
                              }}
                              className="py-4 text-sm"
                            >
                              Estimates
                            </li>
                          </NavLink>
                          <NavLink to="clients">
                            <li
                              onClick={() => {
                                setNav(false);
                              }}
                              className="py-4 text-sm"
                            >
                              Clients
                            </li>
                          </NavLink>
                          <NavLink to="reports">
                            <li
                              onClick={() => {
                                setNav(false);
                              }}
                              className="py-4 text-sm"
                            >
                              Reports
                            </li>
                          </NavLink>
                          <NavLink to="/settings">
                            <li
                              onClick={() => {
                                setNav(false);
                              }}
                              className="py-4 text-sm"
                            >
                              Settings
                            </li>
                          </NavLink>
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
