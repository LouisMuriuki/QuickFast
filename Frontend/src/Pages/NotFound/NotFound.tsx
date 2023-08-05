import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Error from "../../../assets/lottie/404.json";
import {AiOutlineSwapLeft} from "react-icons/ai"
const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 shadow-md h-60">
        <Lottie className="scale-50 md:scale-150 mb-16" animationData={Error} loop={true} />;
        <Link className="flex gap-3 items-center text-blue-500 text-lg" to="/invoices">
         <AiOutlineSwapLeft size={30}/> Back to your Invoices
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
