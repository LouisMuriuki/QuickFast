import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import AuthContext from "../../Context/AuthContext";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const AppNav = () => {
  const { setLoginOpen, setRegisterOpen, auth, setAuth } =
    useContext(AuthContext);

  const [nav, setNav] = useState(false);
  const handlenav = () => {
    setNav((prev) => !prev);
  };

  const logout = () => {
    setAuth({
      accessToken: "",
      refreshToken: "",
      userId: "",
      username: "",
    });
    localStorage.removeItem("Invoice_AccessToken"),
      localStorage.removeItem("Invoice_RefreshToken");
  };
  return (
    <div className="flex">
      <nav className="">
        <div className="flex md:max-w-7xl md:mx-auto px-4 sm:px-0 lg:px-8 w-screen ">
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center h-16 ">
              <div className="flex items-center">
                <div className="">
                  <Link to="/" className="text-white text-xl font-semibold">
                    Logo
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="invoices"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200"
                    >
                      Invoices
                    </Link>
                    <Link
                      to="estimates"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200"
                    >
                      Estimates
                    </Link>
                    <Link
                      to="clients"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200"
                    >
                      Clients
                    </Link>
                    <Link
                      to="reports"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200"
                    >
                      Reports
                    </Link>
                    <Link
                      to="/settings"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200"
                    >
                      Settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center z-50 ">
              <div className="md:hidden font-bold" onClick={handlenav}>
                <AiOutlineMenu color="white" size={25} />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/#"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200"
                  >
                    {auth.username}
                  </Link>
                  {auth.accessToken ? (
                    <Button
                      onClick={() => logout()}
                      className="flex items-center justify-center text border-red-500 bg-red-500 hover:bg-red-500 text-white 0 hover:text-white px-3 py-2 rounded-md transition duration-200"
                    >
                      LogOut
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => setLoginOpen(true)}
                      className="flex items-center justify-center text border-blue-500 bg-blue-500 text-white 0 hover:text-white px-3 py-2 rounded-md transition duration-200"
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
                      <Link to="/">
                        <h3 className="flex items-center justify-center text-xl font-bold">
                          Logo
                        </h3>
                      </Link>
                      <div
                        onClick={handlenav}
                        className="rounded-full shadow-sm  p-3 cursor-pointer"
                      >
                        <AiOutlineClose />
                      </div>
                    </div>
                    <div className="py-4 flex-col">
                      <ul className="uppercase font-kalam font-bold">
                        <Link to="/#">
                          <li
                            onClick={() => {
                              setNav(false);
                            }}
                            className="py-4 text-sm"
                          >
                            Events
                          </li>
                        </Link>
                        <Link to="/#">
                          <li
                            onClick={() => {
                              setNav(false);
                            }}
                            className="py-4 text-sm"
                          >
                            About us
                          </li>
                        </Link>
                        <Link to="/#">
                          <li
                            onClick={() => {
                              setNav(false);
                            }}
                            className="py-4 text-sm"
                          >
                            Help
                          </li>
                        </Link>
                        <Link to="/#">
                          <li
                            onClick={() => {
                              setNav(false);
                            }}
                            className="py-4 text-sm"
                          >
                            Sign in
                          </li>
                        </Link>
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
  );
};
export default AppNav;
