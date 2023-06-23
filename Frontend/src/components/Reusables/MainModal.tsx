import { ReactNode} from 'react';
import { Modal } from 'antd';
interface MainModalProps{
  children:ReactNode,
  isOpen:boolean,
  setIsOpen:(value:boolean)=>void
  title:string
}
const MainModal = ({children, isOpen,setIsOpen,title}:MainModalProps) => {
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
       {children}
      </Modal>
    </>
  );
};

export default MainModal;