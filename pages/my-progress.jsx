import BaseApi from "@/lib/api/_base.api";
import modalState from "@/lib/store/modalState";
import persistentStore from "@/lib/store/persistentStore";
import Image from "next/image";
import { useEffect, useState } from "react";
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Myprogress() {
  const profile = persistentStore((state) => state.profile);
  const modalInfo = modalState((state) => state.modalInfo);
  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/milestones/thresholds`,
    fetcher
  );
  const [itemsCount, setItemsCount] = useState(0);

  const getTaskPercentage = (profile?.stamps / data?.length) * 100;

  const getWithPercentage = (data?.length / itemsCount) * 100;

  useEffect(() => {
    // Define the event handler
    const resizeMiletones = () => {
      console.log("window", window.innerWidth);
      const breakpoints = {
        575: 2,
        767: 4,
        991: 5,
        default: 7,
      };

      setItemsCount(
        window.innerWidth <= 575
          ? breakpoints[575]
          : window.innerWidth <= 767
          ? breakpoints[767]
          : window.innerWidth <= 991
          ? breakpoints[991]
          : breakpoints.default
      );
    };

    resizeMiletones();
    // Add event listeners
    window.addEventListener("resize", resizeMiletones);
    window.addEventListener("load", resizeMiletones);
    document.addEventListener("DOMContentLoaded", resizeMiletones);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeMiletones);
      window.removeEventListener("load", resizeMiletones);
      document.removeEventListener("DOMContentLoaded", resizeMiletones);
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  return (
    <div className="container">
      <div className="p-[30px] md:p-[50px] shadow-[0px_0px_10px_0px_#00000080] rounded-[10px]">
        <p className="text-secondary text-[20px]">
          You have attended{" "}
          <span className="text-[#227FDD] text-[30px]">
            {profile?.attendedEventsCount}
          </span>{" "}
          event so far! Keep on participating to earn more stamps and redeem
          rewards.
        </p>

        <div
          className={`${
            data?.length > itemsCount ? "overflow-x-auto" : "overflow-x-hidden"
          } rewards relative [transition:all_ease_.3s] pt-[150px] pb-[10px] mb-[50px] w-full [&::-webkit-scrollbar]:[width:8px] [&::-webkit-scrollbar]:[background:#ccc] scrollbar [&::-webkit-scrollbar-thumb]:[cursor:col-resize] [&::-webkit-scrollbar]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:bg-[#3FADF2]`}
        >
          {!data?.[0]?.productImage && (
            <div
              className={`bottom-[100px] text-[20px] absolute  text-[#3FADF2]`}
            >
              {profile?.stamps || 0}
              <span className="text-[#205388]">/{data?.length}</span>
            </div>
          )}

          <div className="flex grow" style={{ width: `${getWithPercentage}%` }}>
            {data?.map((item, index) => (
              <div
                className="text-center w-full max-w-[20%] relative"
                key={index}
              >
                {item?.productImage && (
                  <div
                    className={`absolute top-[-80px] left-[50%] translate-x-[-50%] rounded-[20px] overflow-hidden p-[5px] ${
                      item?.threshold_level <= profile?.stamps
                        ? "bg-[linear-gradient(0deg,_#63C8F7,_#63C8F7),_linear-gradient(0deg,_#63C8F7,_#63C8F7),_linear-gradient(0deg,_#63C8F7,_#63C8F7),_linear-gradient(0deg,_#63C8F7,_#63C8F7)]"
                        : "bg-[linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD)] "
                    }`}
                  >
                    <Image
                      src={process.env.NEXT_PUBLIC_API_URL + item?.productImage}
                      width={100}
                      height={100}
                      alt="Hello World"
                      className="min-w-[85px] h-[77px] rounded-[20px] object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className="w-0 shadow-md bg-[#227FDD] p-[30px] flex items-center rounded-[50px] h-[41px] [transition:all_ease_.3s]"
            style={{ width: `${getWithPercentage}%` }}
          >
            <div
              className="w-0 flex items-center [transition:all_ease_.3s] px-[10px] p-[5px] rounded-[50px] bg-[#63C8F7] h-[20px]"
              style={{ width: `${getTaskPercentage}%` }}
            >
              <div className="bg-white [transition:all_ease_.3s] w-full h-[5px] rounded-[50px]" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-col md:flex-row justify-between gap-[15px] mt-[50px]">
          <button
            onClick={() => {
              modalState.setState({
                modalOpen: true,
                modalInfo: {
                  type: "redeem-code-form",
                  id: "redeem-code",
                  title: "Redeem Code",
                },
              });
            }}
            className="bg-[#3FADF2] text-white px-[20px] py-[15px] rounded-[10px] min-h-[61px] min-w-[152px] text-center"
          >
            Redeem Code
          </button>

          <button
            className="bg-[#227FDD] text-white px-[20px] py-[15px] rounded-[10px] min-h-[61px] min-w-[152px] text-center"
            onClick={() => {
              modalState.setState({
                modalOpen: true,
                modalInfo: {
                  type: "reward-claim",
                  id: "reward-claim",
                },
              });
            }}
          >
            Claim Reward
          </button>
        </div>
      </div>
    </div>
  );
}
