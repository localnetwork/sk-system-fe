import BaseApi from "@/lib/api/_base.api";
import modalState from "@/lib/store/modalState";

import { Raleway } from "next/font/google";
import { toast } from "react-toastify";
const raleway = Raleway({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function RewardClaim() {
  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/reward/claimable`,
    fetcher
  );

  const modalInfo = modalState((state) => state.modalInfo);

  const handleSubmit = async (item) => {
    toast.dismiss();
    const { threshold_level, productId } = item;

    try {
      const res = await BaseApi.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/rewards/claim",
        {
          threshold: threshold_level,
          productId,
        }
      );
      mutate(process.env.NEXT_PUBLIC_API_URL + `/api/reward/claimable`);
      toast.success(
        "Reward claimed successfully. We have notified the admins about your reward."
      );
    } catch (error) {
      toast.error(
        error?.data?.message || "An error occurred while claiming reward."
      );
    }
  };

  return (
    <div
      className={`fixed flex items-center py-[50px] top-0 left-0 w-full h-full ${raleway.className}`}
    >
      <span
        className="overlay bg-[#000] bg-opacity-70 absolute top-0 left-0 w-full h-full"
        onClick={() => {
          modalState.setState({
            modalOpen: false,
            modalInfo: null,
          });
        }}
      />
      <div className="container relative !max-w-[500px]">
        <div className="p-[30px] text-white bg-[linear-gradient(180deg,_#227FDD_0%,_#2163AC_100%)] relative rounded-[10px] overflow-hidden shadow-md">
          <h2 className="text-[18px] font-[500] mb-[30px]">
            Available Rewards:
          </h2>

          <div className="claimable-items flex flex-col pr-[5px] gap-[20px] max-h-[calc(80vh-100px)] [&::-webkit-scrollbar]:[width:8px] [&::-webkit-scrollbar]:[background:#ccc] [&::-webkit-scrollbar]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:bg-[#3FADF2] overflow-y-auto">
            {data?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-[#95DDFB] text-[20px] "
              >
                <div>
                  <span className="font-bold">{item?.name} </span> -{" "}
                  {item?.threshold_level} points
                </div>
                {!item?.claim_status && (
                  <button
                    className="text-[15px] text-white bg-[#2991E7] font-normal shadow-[0px_4px_4px_0px_#00000040] uppercase px-[15px] py-[10px]"
                    onClick={() => {
                      handleSubmit(item);
                    }}
                  >
                    Claim
                  </button>
                )}

                {item?.claim_status === "pending" && (
                  <div className="opacity-50 flex cursor-not-allowed select-none items-center gap-x-[10px] text-[15px] text-white bg-[#2991E7] font-normal shadow-[0px_4px_4px_0px_#00000040] uppercase px-[15px] py-[10px]">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Notified
                  </div>
                )}
                {item?.claim_status === "approved" ||
                  (item?.claim_status === "completed" && (
                    <div className="opacity-50 flex cursor-not-allowed select-none items-center gap-x-[10px] text-[15px] text-white bg-[#2991E7] font-normal shadow-[0px_4px_4px_0px_#00000040] uppercase px-[15px] py-[10px]">
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
                      Claimed
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
