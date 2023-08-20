import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../sub.css";
import { useEffect, useState } from "react";
import { message } from "antd";
import Loader from "../../../components/Loader/Loader";
export interface IProps {
  ownerId: string;
  packageId: string;
  packagename: string;
}
const SubscriptionTable = () => {
  const [clickedPackageId, setClickedPackageId] = useState<string | null>(null);
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const axiosprivate = useAxiosPrivate();
  const { auth } = useAuth();
  const getPackages = async () => {
    const res = await axiosprivate.get(`/packages/getpackages?all=${true}`, {});
    return res.data;
  };
  const subscribePackage = async ({
    ownerId,
    packageId,
    packagename,
  }: IProps) => {
    const res = await axiosprivate.post(
      "/subscription/payment",
      JSON.stringify({
        ownerId,
        packageId,
        packagename,
      })
    );
    console.log(res, auth.package);
    return res.data;
  };
  const GetPackagesQuery = useQuery({
    queryKey: ["packages"],
    queryFn: () => getPackages(),
  });
  console.log(GetPackagesQuery.data);

  const subscriptionMutation = useMutation({
    mutationFn: subscribePackage,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        window.location.href = data.url;
      } else {
        messageApi.open({
          type: "error",
          content: data.response.data.error,
        });
      }
    },
    onError(error: { message: string }) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: error.message,
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
  const handleClick = (
    ownerId: string,
    packageId: string,
    packagename: string
  ) => {
    subscriptionMutation.mutate({ ownerId, packageId, packagename });
  };

  return (
    <div className="container mx-10">
      {contextHolder}
      <h1 className="pt-5 text-2xl font-bold mb-2 text-center">
        Subscription Packages
      </h1>
      <h1 className="py-1 mb-6 text-gray-600 font-semibold text-center">
        No hidden fees,Cancel or change your plan anytime.{" "}
      </h1>
      <div className="grid md:grid-cols-3 gap-6 mx-5">
        {data.map(
          (
            packageinfo: {
              _id: string;
              price: number;
              packageName: string;
              features: [];
            },
            i
          ) => {
            const isCurrentPackageLoading =
              subscriptionMutation.isLoading &&
              clickedPackageId === packageinfo._id;
            console.log(i);
            let btngradient;
            let containergradient;
            switch (i) {
              case 0:
                containergradient = "from-purple-400 via-pink-500 to-red-500";
                btngradient = "text-purple-500 hover:bg-purple-500";
                break;
              case 1:
                containergradient = "from-blue-400 via-green-500 to-yellow-500";
                btngradient = "text-blue-500 hover:bg-blue-500";
                break;
              case 2:
                containergradient = "from-teal-400 via-blue-500 to-indigo-500";
                btngradient = "text-teal-500 hover:bg-teal-500";
                break;
              default:
                break;
            }
            const tierLevels = {
              Basic: 1,
              Premium: 2,
              Executive: 3,
            };
            // Calculate whether the button should be hidden or not
            const hideButton = // @ts-expect-error
              tierLevels[auth.package] > tierLevels[packageinfo.packageName];
            return (
              <div
                key={packageinfo._id}
                className={`rounded-lg overflow-hidden shadow-lg p-8 bg-gradient-to-r ${containergradient} `}
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {packageinfo.packageName}
                </h2>
                <p className="text-black font-bold text-lg mb-6">
                  Price: ${packageinfo.price} per month
                </p>
                <ul className="text-white text-[14px]">
                  {packageinfo.features.map((feature, i) => {
                    return (
                      <li
                        key={i}
                        className={i === 1 || 3 || 5 || 7 ? "text-[14px]" : ""}
                      >
                        &#10003; {feature}
                      </li>
                    );
                  })}
                </ul>
                {auth.days > 0 && packageinfo.packageName === auth.package ? (
                  ""
                ) : (
                  <button
                    className={`mt-8 flex items-center ${btngradient} justify-center bg-white hover:text-white py-2 px-4 rounded-full text-lg font-bold transition duration-300`}
                    onClick={() => {
                      setClickedPackageId(packageinfo._id);
                      handleClick(
                        auth.userId,
                        packageinfo._id,
                        packageinfo.packageName
                      );
                    }}
                    style={{ display: hideButton ? "none" : "block" }}
                  >
                    {isCurrentPackageLoading && <Loader />}
                    Upgrade Now
                  </button>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default SubscriptionTable;
