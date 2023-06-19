import React from "react";
import {Link} from "react-router-dom";

const AppNav = () => {
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
                    Invoices
                  </Link>
                  <Link
                    to="/#"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200"
                  >
                    Estimates
                  </Link>
                  <Link
                    to="/#"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition duration-200"
                  >
                    Clients
                  </Link>
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
