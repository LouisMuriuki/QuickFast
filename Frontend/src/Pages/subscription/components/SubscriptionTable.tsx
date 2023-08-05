import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../sub.css";
import { useEffect, useState } from "react";
import { message } from "antd";
export interface IProps {
  ownerId: string;
  packageId: string;
}
const SubscriptionTable = () => {
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const axiosprivate = useAxiosPrivate();
  const { auth } = useAuth();
  const getPackages = async () => {
    const res = await axiosprivate.get(`/packages/getpackages?all=${true}`, {
    });
    return res.data;
  };
  const subscribePackage = async ({ ownerId, packageId }: IProps) => {
    const res = await axiosprivate.post(
      "/subscription/payment",
      JSON.stringify({
        ownerId,
        packageId,
      })
    );
    console.log(res);
    return res.data;
  };
  const GetPackagesQuery = useQuery({
    queryKey: ["packages"],
    queryFn: () => getPackages(),
  });

  const subscriptionMutation = useMutation({
    mutationFn: subscribePackage,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
      } else {
        messageApi.open({
          type: "error",
          content: data.response.data.error,
        });
      }
    },
    onError(error: { response: { data: { message: string } } }) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    },
  });

  useEffect(() => {
    if (GetPackagesQuery.data) {
      const filteredArray = GetPackagesQuery?.data?.data.filter(
        (item: { packageName: string }) => item.packageName !== "Free"
      );
      setData(filteredArray);
    }
  }, [GetPackagesQuery.data]);
  const handleClick=(ownerId:string,packageId:string)=>{
     subscriptionMutation.mutate({ownerId,packageId})

  }

  return (
    <div className="container mx-10">
      {contextHolder}
      <h1 className="pt-5 text-2xl font-bold mb-2 text-center">
        Subscription Packages
      </h1>
      <h1 className="py-1 mb-6 text-gray-600 font-semibold text-center">
        No hidden fees,Cancel or change your plan anytime.{" "}
      </h1>
      <div className="grid grid-cols-3 gap-6 mx-5">
        {data.map((packageinfo, i) => {
          return (
            <div
              key={packageinfo._id}
              className="rounded-lg overflow-hidden shadow-lg p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Basic</h2>
              <p className="text-black font-bold text-lg mb-6">
                Price: ${packageinfo.price} per month
              </p>
              <ul className="text-white text-[14px] ">
                <li>
                  &#10003; <b>Up to 5 invoics</b>
                </li>
                {packageinfo.features.map((feature, i) => {
                  return (
                    <li className={i === 1 || 3 || 5 || 7 ? "text-[14px]" : ""}>
                      &#10003; {feature}
                    </li>
                  );
                })}
              </ul>
              <button
                className="mt-8 bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-2 px-4 rounded-full text-lg font-bold transition duration-300"
                onClick={() => handleClick(auth.userId,packageinfo._id)}
              >
                Upgrade Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionTable;
