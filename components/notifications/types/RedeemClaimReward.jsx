import BaseApi from "@/lib/api/_base.api";
import Image from "next/image";
import { toast } from "react-toastify";
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function RedeemClaimReward({ item, notifMutate }) {
  const additional_info = JSON.parse(item?.additional_info);

  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/profile`,
    fetcher
  );

  const handleUpdateMutate = () => {
    // notifMutate(process.env.NEXT_PUBLIC_API_URL + `/api/profile`);
    mutate(process.env.NEXT_PUBLIC_API_URL + `/api/profile`);
    notifMutate(process.env.NEXT_PUBLIC_API_URL + `/api/notifications`);
  };

  const handleUpdateReady = async () => {
    toast.dismiss();
    try {
      const res = await BaseApi.put(
        process.env.NEXT_PUBLIC_API_URL + `/api/notifications/${item?.id}`,
        {
          id: item?.id,
          status: "ready",
          additional_info: additional_info,
          item: item,
          has_read: 1,
          type: item?.type,
        }
      );
      toast.success("Successfully sent a notification to the user.");
    } catch (error) {
      console.error("Error", error);
      toast.error(error?.data?.message || "An error occurred while updating.");
    }
  };

  const handleUpdateApproved = async () => {
    toast.dismiss();
    try {
      const res = await BaseApi.put(
        process.env.NEXT_PUBLIC_API_URL + `/api/notifications/${item?.id}`,
        {
          id: item?.id,
          status: "approved",
          additional_info: additional_info,
          item: item,
          has_read: 1,
          type: item?.type,
        }
      );
      toast.success(
        `The user successfully received the ${additional_info?.reward?.name}.`
      );
    } catch (error) {
      console.error("Error", error);
      toast.error(error?.data?.message || "An error occurred while updating.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row text-[11px] gap-[15px] items-center">
      <div className="min-w-[50px] max-w-[50px] p-[5px] rounded-[10px] bg-[linear-gradient(0deg,_#DD8023,_#DD8023),_linear-gradient(0deg,_#DD8023,_#DD8023),_linear-gradient(0deg,_#DD8023,_#DD8023),_linear-gradient(0deg,_#DD8023,_#DD8023)]">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + additional_info?.reward?.image}
          className="w-[40px] h-[40px] object-cover rounded-[5px]"
          width={50}
          height={50}
          alt="Hello World"
        />
      </div>
      <div className="md:max-w-[calc(100%-50px] w-full">
        {/* <strong>Menguito, Ralph</strong> has redeemed Tote Bag. */}
        <div
          className="text-center md:text-left"
          dangerouslySetInnerHTML={{ __html: item?.body }}
        />
        <div className="actions mt-[10px] gap-[15px] flex flex-col md:flex-row">
          <button
            onClick={() => {
              if (item?.status === "pending") {
                handleUpdateReady();
                handleUpdateMutate();
              }
            }}
            className={`bg-[#03C400] flex items-center justify-center gap-[5px] py-[8px] min-w-[100px] text-center px-[20px] text-white text-[15px] font-bold rounded-[8px] ${
              item?.status !== "pending"
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            {item?.status === "ready" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
            )}
            {item?.status === "pending" ? "READY" : "NOTIFIED"}
          </button>

          <button
            onClick={() => {
              if (item?.status === "ready") {
                handleUpdateApproved();
                handleUpdateMutate();
              }
            }}
            className={`flex items-center justify-center gap-[5px] bg-[#FF8000] py-[8px] min-w-[100px] text-center px-[20px] text-white text-[15px] font-bold rounded-[8px] ${
              item?.status !== "ready"
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            {item?.status === "approved" && (
              <span className="text-[15px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </span>
            )}
            RECEIVED
          </button>
        </div>
      </div>
    </div>
  );
}
