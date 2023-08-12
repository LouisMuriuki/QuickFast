import { AiOutlineClose } from "react-icons/ai";
import {useContext} from "react"
import ExtrasContext from "../../Context/ExtrasContext";
const Notifications = () => {
    const {setNotifications }=useContext(ExtrasContext)
  return (
    <div className="h-8 items-center w-full bg-[#FFA500] px-5 flex justify-between">
      <p className="text-white">some text</p>
      <AiOutlineClose
        className="cursor-pointer"
        color="red"
        fontSize="1.5em"
        onClick={() => {
          setNotifications(false);
        }}
      />
    </div>
  );
};

export default Notifications;
