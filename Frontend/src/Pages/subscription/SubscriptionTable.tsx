
import "./sub.css"
const SubscriptionTable = () => {
  return (
    <div className="container mx-10">
      <h1 className="pt-5 text-2xl font-bold mb-2 text-center">
        Subscription Packages
      </h1>
      <h1 className="py-1 mb-6 text-gray-600 font-semibold text-center">
        No hidden fees,Cancel or change your plan anytime.{" "}
      </h1>
      <div className="grid grid-cols-3 gap-6 mx-5">
        <div className="rounded-lg overflow-hidden shadow-lg p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <h2 className="text-2xl font-bold text-white mb-4">Basic</h2>
          <p className="text-black font-bold text-lg mb-6">Price: $2 per month</p>
          <ul className="text-white text-[14px] ">
            <li>&#10003; <b>Up to 5 invoics</b></li>
            <li>&#10003; <b>Up to 20 estimates</b></li>
            <li>&#10003; Any device support</li>
            <li>&#10003; Auto-save and fill clients details</li>
            <li>&#10003; View previous estimates and invoices</li>
            <li>&#10003; Email & chat support</li>
            <li>&#10003; Add Logo</li>
          </ul>
          <button className="mt-8 bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-2 px-4 rounded-full text-lg font-bold transition duration-300">
            Upgrade Now
          </button>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg p-8 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500">
          <h2 className="text-2xl font-bold text-white mb-4">Premium</h2>
          <p className="text-black font-bold text-lg mb-6">Price: $5 per month</p>
          <ul className="text-white">
            <li>&#10003; Up to <b>15 invoices</b></li>
            <li>&#10003; <b>Unlimited estimates</b></li>
            <li>&#10003; Any device support</li>
            <li>&#10003; Data visualization and dashboard</li>
            <li>&#10003; Auto-save and fill clients details</li>
            <li>&#10003; View previous estimates and invoices</li>
            <li>&#10003; Edit previous estimates</li>
            <li>&#10003; Email & chat support</li>
            <li>&#10003; Add Logo</li>
            <li>&#10003; Due date reminders</li>
            <li>&#10003; Ratings & reviews</li>
            <li>&#10003; Priority queue</li>
            <li>&#10003; Watermarks</li>
            <li>&#10003; Send invoices and estimates via email</li>
          </ul>
          <button className="mt-8 bg-white text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full text-lg font-bold transition duration-300">
            Upgrade Now
          </button>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg p-8 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500">
          <h2 className="text-2xl font-bold text-white mb-4">Enterprise</h2>
          <p className="text-lg mb-6 text-black font-bold">Price: $10 per month</p>
          <ul className="text-white">
            <li>&#10003; <b>Unlimited invoices</b></li>
            <li>&#10003; <b>Unlimited estimates</b></li>
            <li>&#10003; Any device support</li>
            <li>&#10003; Data visualization and dashboard</li>
            <li>&#10003; Auto-save and fill clients details</li>
            <li>&#10003; View previous estimates and invoices</li>
            <li>&#10003; Edit previous estimates</li>
            <li>&#10003; Email & chat support</li>
            <li>&#10003; Add Logo</li>
            <li>&#10003; Due date reminders</li>
            <li>&#10003; Ratings & reviews</li>
            <li>&#10003; Priority queue</li>
            <li>&#10003; Watermarks</li>
            <li>&#10003; Send invoices and estimates via email</li>
          </ul>
          <button className="mt-8 bg-white text-teal-500 hover:bg-teal-500 hover:text-white py-2 px-4 rounded-full text-lg font-bold transition duration-300">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTable;
