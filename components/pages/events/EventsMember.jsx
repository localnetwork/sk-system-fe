import { useEffect, useState } from "react";
import Image from "next/image";
import Stamp from "../../icons/Stamp";
import BaseApi from "@/lib/api/_base.api";

import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());
import modalState from "@/lib/store/modalState";

export default function EventsMember({ refetchEvents }) {
  const [currentStatus, setCurrentStatus] = useState("upcoming");
  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/member-events?status=${currentStatus}`,
    fetcher
  );

  const statuses = [
    {
      name: "Upcoming",
      id: "upcoming",
    },
    {
      name: "Ongoing",
      id: "ongoing",
    },
    {
      name: "Finished",
      id: "finished",
    },
  ];

  const formatDate = (datetime) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(datetime).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (error) console.log("An error has occurred.");
    if (isLoading) console.log("Loading...");
    if (data) console.log("data", data);
  }, [data, error, isLoading]);

  useEffect(() => {
    if (refetchEvents) {
      refetchEvents.current = mutate;
    }
  }, [mutate, refetchEvents]);

  return (
    <>
      <div className="shadow-md border p-[30px] md:p-[50px] rounded-[15px]">
        <div className="flex   mb-[15px] justify-between items-center">
          {statuses.map((item, index) => (
            <div
              className={`cursor-pointer text-primary ${
                item?.id === currentStatus ? "font-bold" : ""
              }`}
              key={index}
              onClick={() => setCurrentStatus(item?.id)}
            >
              {item?.name}
            </div>
          ))}
        </div>

        {data?.length === 0 && (
          <div className="min-h-[150px] flex justify-center items-center">
            {currentStatus === "upcoming" &&
              "There isn’t any upcoming events as of now..."}
            {currentStatus === "ongoing" &&
              "There isn’t any ongoing events as of now..."}

            {currentStatus === "finished" &&
              "You haven’t finished any event yet..."}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {data?.map((item, index) => (
            <div key={index} className="text-primary mb-[30px] w-full">
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + item?.image}
                width={300}
                height={200}
                alt="Hello World"
                className="h-[150px] w-full rounded-[10px] object-cover"
              />

              <h2 className="font-bold my-[15px] uppercase text-[20px] text-secondary">
                {item?.name}
              </h2>
              <div className="flex text-[#227FDD] flex-col gap-[5px]">
                <div className="flex items-center gap-x-1">
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
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  {item?.event_location}
                </div>
                <div className="flex items-center gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[50px] h-[50px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                    />
                  </svg>
                  {formatDate(item?.event_start_datetime)} -{" "}
                  {formatDate(item?.event_end_datetime)}
                </div>
                <div className="flex justify-between mt-[15px]">
                  <div className="flex items-center gap-x-1 text-[#DD8022]">
                    <Stamp /> +{item?.allocated_stamps} stamp
                  </div>

                  {item?.joined === 1 ? (
                    <div>
                      <button className="border border-primary cursor-not-allowed text-primary uppercase inline-flex justify-center gap-[15px] font-bold text-white px-[15px] py-[5px] rounded-[10px] min-w-[100px]">
                        Joined
                      </button>
                    </div>
                  ) : (
                    <>
                      {item?.status === "upcoming" && (
                        <div>
                          <button
                            onClick={() => {
                              modalState.setState({
                                modalOpen: true,
                                modalInfo: {
                                  type: "confirmation",
                                  title: `Are you sure you want to join <strong>${item?.name}</strong>?`,
                                  id: "join-event",
                                  item: item,
                                },
                              });
                            }}
                            className="bg-gradient2 uppercase shadow-[0_4px_6px_rgba(0,0,0,0.35)] inline-flex justify-center gap-[15px] font-bold text-white px-[15px] py-[5px] rounded-[10px] min-w-[100px]"
                          >
                            Join
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
