import { Modal } from "antd";
import ExtrasContext from "../../Context/ExtrasContext";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
const CustomModal = ({ children, height, width, icon }: any) => {
  const { ismodalOpen, setisModalOpen } = useContext(ExtrasContext);

  const handleCancel = () => {
    setisModalOpen(false)
  };
  return (
    <Modal
      open={ismodalOpen}
      closable={false}
      bodyStyle={{ height: height }}
      width={width}
      footer={null}
      className="relative"
    >
      {icon && (
        <div onClick={handleCancel} className="absolute top-2 right-3 cursor-pointer">
          <AiOutlineClose color="red" size={20} />
        </div>
      )}
      {children}
    </Modal>
  );
};
export default CustomModal;
