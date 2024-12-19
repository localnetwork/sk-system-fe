import { Raleway } from "next/font/google";
import ReadyClaimReward from "./types/ReadyClaimReward";
import RedeemClaimReward from "./types/RedeemClaimReward";
import BaseApi from "@/lib/api/_base.api";
import RewardCompleted from "./types/RewardCompleted";

const raleway = Raleway({
  display: "swap",
  weights: [400, 500, 600, 700],
  subsets: ["latin"],
});
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Notifications() {
  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/notifications`,
    fetcher
  );

  return (
    <div
      className={`fixed lg:absolute text-black lg:rounded-[10px] right-0 top-[78px] lg:top-[calc(100%+30px)] pt-[10px] pb-[30px] px-[15px] lg:border min-w-full lg:min-w-[340px] bg-white lg:shadow-[0px_0px_5px_0px_#00000066] ${raleway.className}`}
    >
      <h2 className=" font-bold text-[20px] mb-[10px]">Notifications</h2>
      {data?.data?.length == 0 && (
        <div className="text-[#333] py-[50px] text-center flex flex-col items-center justify-center gap-[10px]">
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
              d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
            />
          </svg>

          <p className="text-[14px]">No notifications to show.</p>
        </div>
      )}

      <div className="[&::-webkit-scrollbar]:[width:8px] [&::-webkit-scrollbar]:[background:#ccc] scrollbar [&::-webkit-scrollbar-thumb]:[cursor:col-resize] [&::-webkit-scrollbar]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:bg-[#3FADF2] max-h-[calc(100vh-130px)] lg:max-h-[calc(100vh-170px)] overflow-y-auto flex text-black gap-[15px] flex-col">
        {data?.data?.map((item, index) => (
          <div className="p-[10px] bg-[#D9D9D980] rounded-[5px]" key={index}>
            {item?.type === "reward-claim" && (
              <RedeemClaimReward item={item} notifMutate={mutate} />
            )}
            {item?.type === "reward-message" && (
              <ReadyClaimReward item={item} notifMutate={mutate} />
            )}
            {item?.type === "reward-completed" && (
              <RewardCompleted item={item} notifMutate={mutate} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
