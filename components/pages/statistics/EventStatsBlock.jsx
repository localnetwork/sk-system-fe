import BaseApi from "@/lib/api/_base.api";
import { Plus_Jakarta_Sans, Raleway } from "next/font/google";
import { useEffect, useState } from "react";
const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});
const raleway = Raleway({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});
const fetcher = (url) => fetch(url).then((res) => res.json());

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function EventStatsBlock() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    data: eventsData,
    error: eventsError,
    eventsLoading,
    eventsMutate,
  } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/member-events`,
    fetcher
  );

  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/member-events/${
        selectedEvent?.id || eventsData?.[0]?.id
      }/statistics`,
    fetcher
  );

  const getPartialParticipantsPercentage =
    data?.eventInfo?.total_participants === 0 ||
    data?.eventInfo?.partial_participants === 0
      ? 0
      : (data?.eventInfo?.partial_participants /
          data?.eventInfo?.total_participants) *
        100;
  const getFinalParticipantsPercentage =
    data?.eventInfo?.total_participants === 0 ||
    data?.eventInfo?.final_participants === 0
      ? 0
      : (data?.eventInfo?.final_participants /
          data?.eventInfo?.total_participants) *
        100;

  const getTotalParticipantsPercentage =
    data?.userCount?.total === 0 || data?.eventInfo?.total_participants === 0
      ? 0
      : (data?.eventInfo?.total_participants / data?.userCount?.total) * 100;

  const getMaleParticipants =
    data?.eventInfo?.total_participants === 0 ||
    data?.eventInfo?.male_participants === 0
      ? 0
      : (data?.eventInfo?.male_participants /
          data?.eventInfo?.total_participants) *
        100;

  const getFemaleParticipants =
    data?.eventInfo?.total_participants === 0 ||
    data?.eventInfo?.female_participants === 0
      ? 0
      : (data?.eventInfo?.female_participants /
          data?.eventInfo?.total_participants) *
        100;

  const chartData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [getMaleParticipants, getFemaleParticipants],
        backgroundColor: ["#C90000", "#C3601C"], // Custom colors for segments
        hoverBackgroundColor: ["#4BC0C0", "#FF9F40"], // Hover colors
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`,
        },
      },
      datalabels: {
        display: true, // Enable datalabels
        color: "#fff", // Text color
        font: {
          weight: "bold", // Font weight
        },
        formatter: (value) =>
          value === 0
            ? ""
            : `${
                parseFloat(value) % 1 === 0
                  ? parseInt(value)
                  : parseFloat(value).toFixed(2)
              }%`,
      },
    },
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`grow h-full shadow-[0px_0px_6px_0px_#00000080] px-[20px] py-[10px] rounded-[15px] ${raleway.className}`}
    >
      <h2
        className={`text-secondary text-[25px] font-[600] mb-[15px] uppercase ${plus_jakarta_sans.className}`}
      >
        Event ID:
      </h2>

      <div className="filters mb-[50px] z-[1000] relative">
        <div className="relative pr-[50px] max-w-[150px] select-none text-[#ccc] w-full p-[10px] rounded-[5px] shadow-[inset_0px_4px_4px_0px_#00000080]">
          <div className="text-ellipsis line-clamp-1">
            {selectedEvent?.id || eventsData?.[0]?.id
              ? selectedEvent?.id || eventsData?.[0]?.id
              : "ID"}
          </div>
          <div
            className="absolute cursor-pointer right-[15px] top-[50%] translate-y-[-50%]"
            onClick={() => {
              toggleDropdown();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          {dropdownOpen && (
            <div className="absolute text-[#333] left-[calc(100%+10px)] p-[10px] bg-white shadow-[0px_0px_10px_0px_#00000080] rounded-[10px] top-0 w-full">
              {eventsData?.map((event, index) => (
                <div
                  key={index}
                  className="p-[10px] hover:bg-[#f2f2f2] cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    setDropdownOpen(false);
                  }}
                >
                  {event.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <div className="text-secondary flex gap-x-[15px] text-[22px]">
          <span className="text-[#A2441B]">
            Total Participants:{" "}
            <span className="text-[#6D2E1A]">
              {data?.eventInfo?.total_participants?.toLocaleString()}
            </span>
          </span>{" "}
          <span className="text-primary">
            {parseFloat(getTotalParticipantsPercentage) % 1 === 0
              ? parseInt(getTotalParticipantsPercentage)
              : parseFloat(getTotalParticipantsPercentage).toFixed(2)}
            % of Registered Users
          </span>
        </div>
        <div className="text-secondary flex gap-x-[15px] text-[22px]">
          <span className="text-[#A2441B]">
            Partial Participants:{" "}
            <span className="text-[#6D2E1A]">
              {data?.eventInfo?.partial_participants?.toLocaleString()}
            </span>
          </span>{" "}
          <span className="text-primary">
            {parseFloat(getPartialParticipantsPercentage) % 1 === 0
              ? parseInt(getPartialParticipantsPercentage)
              : parseFloat(getPartialParticipantsPercentage).toFixed(2)}
            % of Total Participants
          </span>
        </div>
        <div className="text-secondary flex gap-x-[15px] text-[22px]">
          <span className="text-[#A2441B]">
            Final Participants:{" "}
            <span className="text-[#6D2E1A]">
              {data?.eventInfo?.final_participants?.toLocaleString()}
            </span>
          </span>{" "}
          <span className="text-primary">
            {parseFloat(getFinalParticipantsPercentage) % 1 === 0
              ? parseInt(getFinalParticipantsPercentage)
              : parseFloat(getFinalParticipantsPercentage).toFixed(2)}
            % of Total Participants
          </span>
        </div>

        <div className="border-t flex gap-[30px] items-center border-[#ccc] mt-[20px] pt-[20px]">
          <div className="max-w-[50%] w-full">
            {data?.eventInfo?.male_participants === 0 &&
            data?.eventInfo?.female_participants === 0 ? (
              <div className="min-h-[320px] text-[20px] max-h-[413px] max-w-[413px] rounded-full w-fit-content bg-[#ddd] text-[#a7a7a7] flex items-center justify-center">
                No data to show
              </div>
            ) : (
              <Pie data={chartData} options={options} />
            )}
          </div>
          <div className="labels text-[22px]">
            <p className="text-[#C90000]">
              Male Participants:{" "}
              {data?.eventInfo?.male_participants?.toLocaleString()}
            </p>
            <p className="text-[#6D2D1A]">
              Female Participants:{" "}
              {data?.eventInfo?.female_participants?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
