import React, { ReactNode, useState } from 'react';
import { Button, Modal } from 'antd';
interface MainModalProps{
  children:ReactNode,
  isOpen:boolean,
  setIsOpen:(value:boolean)=>void
  title:string
}
const MainModal = ({children, isOpen,setIsOpen,title}:MainModalProps) => {


  const showModal = () => {
    setIsOpen(true);
  };

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