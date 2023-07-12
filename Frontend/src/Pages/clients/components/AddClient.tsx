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
  const refreshToken = localStorage.getItem("Invoice_RefreshToken");
  const {
    clientdata,
    clientmodalisopen,
    clientdatamode,
    setClientmodalIsOpen,
  } = useContext(ExtrasContext);
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
        headers: { Authorization: "Bearer " + auth.accessToken },
      }
    );
    return res.data;
  };
  const updateClient = async () => {
    const { __v, _id, ...newclient } = clientdata;
    const res = await axiosPrivate.patch(
      `/client/updateclient/${_id}`,
      JSON.stringify({
        ...newclient,
        ownerId: auth.userId,
      }),
      {
        headers: { Authorization: "Bearer " + auth.accessToken },
      }
    );
    return res.data;
  };

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
  const updateClientMutation = useMutation({
    mutationFn: updateClient,
    onSuccess(data) {
      if (data.status === 200) {
        messageApi.open({
          type: "success",
          content: "Client updated successfully",
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
    if (auth.userId) {
      if (clientdata.name === "" || clientdata.phone === "") {
        messageApi.open({
          type: "error",
          content: "please fill in all the required details",
        });
        return;
      } else {
        {
          clientdatamode === "Add"
            ? addClientMutation.mutate()
            : updateClientMutation.mutate();
        }
      }
    } else if (!refreshToken) {
      messageApi.open({
        type: "error",
        content:
          "Seems we dont recognise you, please signup to use fast-invoice",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Please login to finish up your invoice",
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <MainModal
        isOpen={clientmodalisopen}
        setIsOpen={setClientmodalIsOpen}
        title={"Add Client"}
      >
        <FormComponent
          tolabels={tolabels}
          origin="Add Client"
          data={clientdata}
        />
        <Button
          onClick={handleSubmit}
          type="primary"
          loading={
            addClientMutation.isLoading || updateClientMutation.isLoading
          }
          className="flex flex-row-reverse border-blue-500 bg-blue-500 text-white"
        >
          {clientdatamode === "Add" ? "Add" : "Update"}
        </Button>
      </MainModal>
    </div>
  );
};

export default AddClient;
