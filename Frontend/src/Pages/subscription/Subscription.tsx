const Subscription = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center py-5">
        <h1>Logo</h1>
        <h2 className="text-2xl font-bold py-7">We Are Glad You Like it!</h2>
        <h2 className="py-3 text-xl">
          Join the 10,000+ small businesses sending smart invoices in just few
          clicks
        </h2>
        <h3 className="text-xl pt-4 pb-10  text-black font-semibold">
          We always value your feedback
        </h3>
        <div className="flex ">
          <div className="max-w-lg mx-10 bg-white rounded-lg shadow-lg p-6 mb-4 ">
            <div className="flex items-center mb-4">
              <img
                className="w-10 h-10 rounded-full mr-3"
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
                className="w-10 h-10 rounded-full mr-3"
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
        <h3 className="text-xl text-black font-semibold py-5">
          Please Support us by subscribing to one of our packages below
        </h3>
        <h1 className="py-3 text-gray-600 font-semibold">
          No hidden fees,Cancel or change your plan anytime.{" "}
        </h1>
      </div>
    </div>
  );
};

export default Subscription;
