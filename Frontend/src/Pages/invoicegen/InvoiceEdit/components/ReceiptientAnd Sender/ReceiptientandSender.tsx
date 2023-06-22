import FormComponent from "../../../../../components/Reusables/FormComponent";
import { fromlabels, tolabels } from "../../../../../constants/Constants";

const ReceiptientandSender = () => {
  
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="flex items-start flex-col w-full md:w-1/2 px-4">
        <h2 className="text-lg font-semibold text-gray-700 pb-3">From</h2>
        <FormComponent fromlabels={fromlabels} origin="edit" />
      </div>
      <div className="flex items-start flex-col w-full md:w-1/2 px-4">
        <h2 className="text-lg font-semibold text-gray-700 pb-3">To</h2>
        <FormComponent tolabels={tolabels} origin="edit"/>
      </div> 
    </div>
  );
};

export default ReceiptientandSender;
