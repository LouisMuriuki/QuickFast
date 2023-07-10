import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <h2 className="text-lg">404 Page not found</h2>
        <Link className="text-blue-500 text-lg" to="/invoices">Back to your Invoices</Link>
      </div>
    </div>
  );
};

export default NotFound;
