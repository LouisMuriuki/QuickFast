import { useContext } from "react";
import MainModal from "../../../components/Reusables/MainModal";
import FormComponent from "../../../components/Reusables/FormComponent";
import { tolabels } from "../../../constants/Constants";
import ExtrasContext from "../../../Context/ExtrasContext";
import { Button, message } from "antd";
import { axiosPrivate } from "../../../axios";
import { useMutation } from "@tanstack/react-query";
import AuthContext from "../../../Context/AuthContext";
const AddClient = () => {
  const { clientdata, clientmodalisopen, clientdatamode,setClientmodalIsOpen } =
    useContext(ExtrasContext);
  const { auth } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const addClient = async () => {
    const res = await axiosPrivate.post(
      "/client/addclient",
      JSON.stringify({
        ...clientdata,
        ownerId: auth.userId,
      }),
      {
        headers:{Authorization:"Bearer "+auth.accessToken}
      }
    );
    return res.data;
  };
console.log(auth.accessToken)
  const addClientMutation = useMutation({
    mutationFn: addClient,
    onSuccess(data) {
      if (data.status === 200) {
        messageApi.open({
          type: "success",
          content: "Client Added successfully",
        });
        setClientmodalIsOpen(false);
      }
    },
    onError(error: { message: string }) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const handleSubmit = () => {
    addClientMutation.mutate();
  };

  return (
    <div>
      {contextHolder}
      <MainModal
        isOpen={clientmodalisopen}
        setIsOpen={setClientmodalIsOpen}
        title={"Add Client"}
      >
        <FormComponent tolabels={tolabels} origin="Add Client" data={clientdata}/>
        {clientdatamode==="Add"?<Button
          onClick={handleSubmit}
          type="primary"
          loading={addClientMutation.isLoading}
          className="flex flex-row-reverse border-blue-500 bg-blue-500 text-white"
        >
          Add
        </Button>:<Button
          // onClick={}
          type="primary"
          // loading={}
          className="flex flex-row-reverse border-blue-500 bg-blue-500 text-white"
        >
          Update
        </Button>}
      </MainModal>
    </div>
  );
};

export default AddClient;
