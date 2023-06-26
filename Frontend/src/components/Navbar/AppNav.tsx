import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import AuthContext from "../../Context/AuthContext";

const AppNav = () => {
  const { setLoginOpen, setRegisterOpen, auth } = useContext(AuthContext);

  const accessTokenString = localStorage.getItem("Invoice_AccessToken");

  const OpenModal = () => {};
  return (
    <div className="flex">
      <nav>
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-screen ">
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center h-16 ">
              <div className="flex items-center">
                <div className="flex-shrink-0">
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
            <div className="flex items-center ">
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
                      
                      onClick={() => setLoginOpen(true)}
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
                  {
                    <Button
                      type="primary"
                      className="flex items-center justify-center border-blue-500 bg-blue-500 text-white  hover:text-white px-3 py-2 rounded-md transition duration-200"
                    >
                      Upgrade Now
                    </Button>
                  }
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
