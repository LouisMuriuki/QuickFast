import SubscriptionTable from "./components/SubscriptionTable";
import { Carousel } from "react-responsive-carousel";
import { useContext, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import CustomModal from "../../components/popup/customModal";
import ExtrasContext from "../../Context/ExtrasContext";
import Lottie from "lottie-react";
import PaymentFailed from "../../../assets/lottie/failed.json";
import PaymentSuccess from "../../../assets/lottie/success.json";
const Subscription = () => {
  const { ismodalOpen, setisModalOpen } = useContext(ExtrasContext);
  const params = new URLSearchParams(location.search);
  const responseparam = params.get("successfulpayment");
  console.log(responseparam);
  useEffect(() => {
    if (responseparam !== null) {
      setisModalOpen(true);
    }
  }, [responseparam]);

  const { auth } = useAuth();
  const axiosprivate = useAxiosPrivate();

  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center py-5">
        <h1>Logo</h1>
        <h2 className="text-2xl font-bold py-7">We Are Glad You Like it!</h2>
        <h2 className="py-3 text-xl">
          Join the 10,000+ small businesses sending smart invoices in just few
          clicks
        </h2>
        <h3 className="underline text-xl pt-4 pb-10  text-black font-semibold">
          We always value your feedback
        </h3>
        <Carousel
          autoPlay={true}
          showStatus={false}
          autoFocus={true}
          showArrows={false}
          infiniteLoop={false}
          centerMode={false}
          showThumbs={false}
        >
          <div className="flex justify-around items-center">
            <div className="max-w-lg mx-10 bg-white rounded-lg shadow-lg p-6 mb-4 ">
              <div className="flex items-center  mb-4">
                <img
                  className="max-w-[40px] h-10 rounded-full mr-3"
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                  alt="User"
                />
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-gray-600">Company Name</p>
                </div>
              </div>
              <p className="text-gray-800">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempus facilisis blandit. Nulla fringilla nisi quis condimentum
                dignissim. Mauris volutpat enim id iaculis semper. Curabitur
                sollicitudin ligula non sapien posuere, sed auctor justo
                condimentum."
              </p>
            </div>
            <div className="max-w-lg mx-10 bg-white rounded-lg shadow-lg p-6 mb-4">
              <div className="flex items-center mb-4">
                <img
                  className="max-w-[40px] h-10 rounded-full mr-3"
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                  alt="User"
                />
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-gray-600">Company Name</p>
                </div>
              </div>
              <p className="text-gray-800">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempus facilisis blandit. Nulla fringilla nisi quis condimentum
                dignissim. Mauris volutpat enim id iaculis semper. Curabitur
                sollicitudin ligula non sapien posuere, sed auctor justo
                condimentum."
              </p>
            </div>
            <div className="max-w-lg mx-10 bg-white rounded-lg shadow-lg p-6 mb-4">
              <div className="flex items-center mb-4">
                <img
                  className="max-w-[40px] h-10 rounded-full mr-3"
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                  alt="User"
                />
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-gray-600">Company Name</p>
                </div>
              </div>
              <p className="text-gray-800">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempus facilisis blandit. Nulla fringilla nisi quis condimentum
                dignissim. Mauris volutpat enim id iaculis semper. Curabitur
                sollicitudin ligula non sapien posuere, sed auctor justo
                condimentum."
              </p>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="max-w-lg mx-10 bg-white rounded-lg shadow-lg p-6 mb-4">
              <div className="flex items-center mb-4">
                <img
                  className="max-w-[40px] h-10 rounded-full mr-3"
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                  alt="User"
                />
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-gray-600">Company Name</p>
                </div>
              </div>
              <p className="text-gray-800">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempus facilisis blandit. Nulla fringilla nisi quis condimentum
                dignissim. Mauris volutpat enim id iaculis semper. Curabitur
                sollicitudin ligula non sapien posuere, sed auctor justo
                condimentum."
              </p>
            </div>
            <div className="max-w-lg mx-10 bg-white rounded-lg shadow-lg p-6 mb-4">
              <div className="flex items-center mb-4">
                <img
                  className="max-w-[40px] h-10 rounded-full mr-3"
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                  alt="User"
                />
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-gray-600">Company Name</p>
                </div>
              </div>
              <p className="text-gray-800">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempus facilisis blandit. Nulla fringilla nisi quis condimentum
                dignissim. Mauris volutpat enim id iaculis semper. Curabitur
                sollicitudin ligula non sapien posuere, sed auctor justo
                condimentum."
              </p>
            </div>
          </div>
        </Carousel>
        <SubscriptionTable />
        <CustomModal height={600} width={900} icon={true}>
          <h5
            className={`font-semibold text-lg flex items-center justify-center ${
              responseparam === "true" ? "text-green-600" : "text-red-600"
            }`}
          >
            {responseparam === "true"
              ? `Payment Successful`
              : "Payment Unsuccessful"}
          </h5>
          {responseparam === "true" ? (
            <Lottie
              className="scale-50 md:scale-110 mb-16"
              animationData={PaymentSuccess}
              loop={true}
            />
          ) : (
            <Lottie
              className="scale-50 md:scale-110 mb-16"
              animationData={PaymentFailed}
              loop={true}
            />
          )}
          <h4 className="font-semibold text-lg flex items-center justify-center">
            {responseparam === "true"
              ? `Welcome Aboard ${auth.username}`
              : "Something unexpected happened, Please try Again"}
          </h4>
        </CustomModal>
      </div>
    </div>
  );
};

export default Subscription;
