import { Modal } from "antd";
import ExtrasContext from "../../Context/ExtrasContext";
import { useContext } from "react";
const CustomModal = ({children}) => {
    const {ismodalOpen,setisModalOpen}=useContext(ExtrasContext)

    const handleCancel=()=>{

    }
  return (
    <Modal
      open={ismodalOpen}
      onCancel={handleCancel}
      closable={false}
      bodyStyle={{ height: 200 }}
      width={200}
      footer={null}
      className="flex flex-wrap max-w-[200px]"
    >{children}</Modal>
  );
};
export default CustomModal
