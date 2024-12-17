import BaseApi from "@/lib/api/_base.api";
import { Plus_Jakarta_Sans, Raleway } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});
const raleway = Raleway({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PopulationBlock() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/population`,
    fetcher
  );

  const getSettings = async () => {
    const res = await BaseApi.get(
      process.env.NEXT_PUBLIC_API_URL + `/api/settings`
    );
    setTotalPopulation(res?.data?.population?.total_population);
  };

  const {
    data: purokData,
    purokError,
    purokIsLoading,
    purokMutate,
  } = BaseApi.swr(process.env.NEXT_PUBLIC_API_URL + `/api/purok`, fetcher);

  const registeredUsersPercentage =
    (data?.registered_users / totalPopulation) * 100;

  const activeUsersPercentage = (data?.active_users / totalPopulation) * 100;

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <>
      <h2
        className={`mt-[5px] text-secondary text-[25px] font-[600] mb-[15px] uppercase ${plus_jakarta_sans.className}`}
      >
        Population
      </h2>

      <div
        className={`max-w-[350px] flex flex-col w-full gap-[15px] ${raleway.className}`}
      >
        <div className="flex z-[200] items-center gap-[15px] relative">
          <div className="select-none text-[#ccc] w-full p-[10px] rounded-[5px] shadow-[inset_0px_4px_4px_0px_#00000080]">
            Population
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M26.9833 3.33333H13.0166C6.94992 3.33333 3.33325 6.95 3.33325 13.0167V26.9667C3.33325 33.05 6.94992 36.6667 13.0166 36.6667H26.9666C33.0333 36.6667 36.6499 33.05 36.6499 26.9833V13.0167C36.6666 6.95 33.0499 3.33333 26.9833 3.33333ZM26.7666 18.6167L20.8833 24.5C20.6333 24.75 20.3166 24.8667 19.9999 24.8667C19.6833 24.8667 19.3666 24.75 19.1166 24.5L13.2333 18.6167C12.7499 18.1333 12.7499 17.3333 13.2333 16.85C13.7166 16.3667 14.5166 16.3667 14.9999 16.85L19.9999 21.85L24.9999 16.85C25.4833 16.3667 26.2833 16.3667 26.7666 16.85C27.2499 17.3333 27.2499 18.1167 26.7666 18.6167Z"
                fill="#A2441B"
              />
            </svg>
          </div>

          {dropdownOpen && (
            <div className="absolute text-[#333] max-h-[200px] overflow-y-auto [&::-webkit-scrollbar-thumb]:[cursor:col-resize] [&::-webkit-scrollbar]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:[borderRadius:8px] [&::-webkit-scrollbar-thumb]:bg-[#3FADF2] top-[100%] left-0 p-[10px] bg-white shadow-[0px_0px_10px_0px_#00000080] rounded-[10px] w-full max-w-[calc(100%-44px])">
              {purokData?.data?.map((item, index) => (
                <div key={index}>
                  <Link
                    href={`/population?purok=${item?.id}`}
                    className="hover:bg-gray-100 block px-[15px] text-center py-[5px]"
                  >
                    {item?.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="stat-info flex flex-col gap-[15px] mt-[30px]">
          <div className="text-primary text-[22px]">
            Male:{" "}
            <span className="text-secondary font-[600]">
              <CountUp
                end={data?.male_users || 0}
                duration={2.5}
                separator=","
              />
            </span>
          </div>
          <div className="text-primary text-[22px]">
            Female:{" "}
            <span className="text-secondary font-[600]">
              <CountUp
                end={data?.female_users || 0}
                duration={2.5}
                separator=","
              />
            </span>
          </div>
          <div className="text-primary text-[22px]">
            % of registered users:{" "}
            <span className="text-secondary font-[600]">
              <CountUp
                end={registeredUsersPercentage || 0}
                duration={2.5}
                decimals={2}
                suffix="%"
              />
            </span>
          </div>
          <div className="text-primary text-[22px]">
            % of active users:{" "}
            <span className="text-secondary font-[600]">
              <CountUp
                end={activeUsersPercentage || 0}
                duration={2.5}
                decimals={2}
                suffix="%"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
