import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 shadow-md h-60">
        <h2 className="text-2xl md:text-4xl mb-5 font-bold">404 Page not found</h2>
        <Link className="text-blue-500 text-lg" to="/invoices">Back to your Invoices</Link>
      </div>
    </div>
  );
};

export default NotFound;
