import BaseApi from "@/lib/api/_base.api";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Inter, Plus_Jakarta_Sans, Raleway } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const fetcher = (url) => fetch(url).then((res) => res.json());
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Population() {
  const router = useRouter();

  const [currentPurok, setCurrentPurok] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/purok`,
    fetcher
  );

  const {
    data: dataPurokPopulation,
    error: errorPurokPopulation,
    isLoading: isLoadingPurokPopulation,
    mutate: mutatePurokPopulation,
  } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/purok/${router?.query?.purok || currentPurok}/population`,
    fetcher
  );

  const all = {
    id: "all",
    name: "Total",
  };

  let puroks = [];

  if (data) {
    puroks = [all, ...data?.data];
  }

  useEffect(() => {
    setCurrentPurok(router?.query?.purok || "all");
  }, [router?.query?.purok]);

  return (
    <div className="container">
      <Head>
        <title>Population</title>
      </Head>
      <div className="grid p-[10px] shadow-[0px_0px_10px_0px_#00000080] rounded-[10px] grid-cols-1 md:grid-cols-5">
        {/* Dropdown for small screens */}
        <div className="col-span-1 uppercase flex flex-col justify-center text-center items-center text-[20px] gap-[10px] rounded-[10px] py-[10px] px-[30px] bg-[#DD8022] md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="block w-full text-white text-[18px] cursor-pointer"
          >
            Select Purok
          </button>
          {isDropdownOpen && (
            <div className="mt-2 p-2 bg-white shadow-md rounded-lg">
              {puroks?.map((item, index) => (
                <div
                  key={index}
                  className={`select-none p-2 cursor-pointer ${
                    currentPurok == item?.id
                      ? "bg-[#84361C] text-white"
                      : "text-[#000]"
                  }`}
                  onClick={() => {
                    setCurrentPurok(item?.id);
                    router.push(`/population?purok=${item?.id}`);
                    setIsDropdownOpen(false);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar for larger screens */}
        <div className="col-span-1 uppercase hidden md:flex flex-col justify-center text-center items-center text-[20px] gap-[10px] rounded-l-[10px] p-[30px] bg-[#DD8022]">
          {puroks?.map((item, index) => (
            <div
              key={index}
              className={`select-none ${
                currentPurok == item?.id
                  ? "cursor-not-allowed text-[#84361C]"
                  : "cursor-pointer text-white"
              }`}
              onClick={() => {
                setCurrentPurok(item?.id);
                router.push(`/population?purok=${item?.id}`);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        <div className="col-span-4 p-[30px] bg-[#F2F2F2] rounded-r-[10px]">
          <h1
            className={`text-[#6D2D1A] flex items-start border-b border-[#0000004D] pb-[10px] mb-[30px] text-[30px] md:text-[35px] lg:text-[45px] ${inter.className}`}
          >
            {puroks?.find((item) => item.id == currentPurok)?.name}

            {puroks.find((purok) => purok.id == currentPurok) &&
              currentPurok != "all" && (
                <Link
                  className="text-[16px] mt-2 ml-2"
                  href={`/purok/${currentPurok}`}
                >
                  [Edit]
                </Link>
              )}
          </h1>

          <div
            className={`flex justify-center gap-[15px] sm:gap-[30px] md:gap-[20px] lg:gap-[50px] xl:gap-[100px] flex-wrap ${raleway.className}`}
          >
            {/* YOUTH POPULATION */}
            <div>
              <div className="text-[#6D2D1A] text-[13px] flex flex-col justify-center items-center rounded-[10px] px-[15px] py-[15px] shadow-md bg-[linear-gradient(180deg,_#EAB95F_0%,_#C3601C_100%)] min-w-[170px] min-h-[100px]">
                <p
                  className={`text-white text-[40px] ${plus_jakarta_sans.className}`}
                >
                  <CountUp
                    end={dataPurokPopulation?.total_population || 0}
                    duration={2.5}
                    separator=","
                  />
                </p>
                Youth Population
              </div>
              <div className="flex flex-col py-[15px] text-[20px]">
                <p
                  className={`text-[#84361C] font-[500] ${plus_jakarta_sans.className}`}
                >
                  DEMOGRAPHICS
                </p>

                <p className="text-[18px] text-[#E59F3A]">
                  Male:{" "}
                  <CountUp
                    end={dataPurokPopulation?.male_population || 0}
                    duration={2.5}
                    separator=","
                  />
                </p>
                <p className="text-[18px] text-[#E59F3A]">
                  Female:{" "}
                  <CountUp
                    end={dataPurokPopulation?.female_population || 0}
                    duration={2.5}
                    separator=","
                  />
                </p>
              </div>
            </div>
            {/* END YOUTH POPULATION */}

            {/* REGISTERED USERS */}
            <div>
              <div className="text-[#6D2D1A] text-[13px] flex flex-col justify-center items-center rounded-[10px] px-[15px] py-[15px] shadow-md bg-[linear-gradient(180deg,_#EAB95F_0%,_#C3601C_100%)] min-w-[170px] min-h-[100px]">
                <p
                  className={`text-white text-[40px] ${plus_jakarta_sans.className}`}
                >
                  <CountUp
                    end={dataPurokPopulation?.registered_users || 0}
                    duration={2.5}
                    separator=","
                  />
                </p>
                REGISTERED USERS
              </div>
              <div className="flex flex-col py-[15px] text-[20px]">
                <p
                  className={`text-[#84361C] font-[500] ${plus_jakarta_sans.className}`}
                >
                  DEMOGRAPHICS
                </p>

                <p className="text-[18px] text-[#E59F3A]">
                  Male:{" "}
                  <CountUp
                    end={dataPurokPopulation?.male_registered_users || 0}
                    duration={2.5}
                    separator=","
                  />
                </p>
                <p className="text-[18px] text-[#E59F3A]">
                  Female:{" "}
                  <CountUp
                    end={dataPurokPopulation?.female_registered_users || 0}
                    duration={2.5}
                    separator=","
                  />
                </p>
              </div>
            </div>
            {/* END REGISTERED USERS */}

            {/* ACTIVE USERS */}
            <div>
              <div className="text-[#6D2D1A] text-[13px] flex flex-col justify-center items-center rounded-[10px] px-[15px] py-[15px] shadow-md bg-[linear-gradient(180deg,#EAB75F_0%,#EAB75F_100%)] min-w-[170px] min-h-[100px]">
                <p
                  className={`text-white text-[40px] ${plus_jakarta_sans.className}`}
                >
                  <CountUp
                    end={dataPurokPopulation?.active_users || 0}
                    duration={2.5}
                    separator=","
                  />
                </p>
                ACTIVE USERS
              </div>
            </div>
            {/* END ACTIVE USERS */}
          </div>

          <div className="grow lg:px-[50px] text-[#C3601C] mt-[50px] pt-[15px] border-t border-[#0000004D]">
            <Link href={`/users?purok=${currentPurok}`}>View Users List</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
