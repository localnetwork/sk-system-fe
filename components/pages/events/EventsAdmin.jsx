import { useState } from "react";
import EventsAdminCreate from "./EventsAdminCreate";
import EventsAdminList from "./EventsAdminList";
import Rewards from "@/components/forms/rewards/AddReward";
import AddReward from "@/components/forms/rewards/AddReward";
import Reward from "@/components/forms/rewards/Rewards";
import MilestonePage from "@/components/forms/milestones/MilestonePage";

export default function EventsAdmin() {
  const [selectedOption, setSelectedOption] = useState();
  const [selectionToggle, setSelectionToggle] = useState(false);
  const navOptions = [
    {
      name: "Create Event",
      id: "add-event",
    },
    {
      name: "Check Existing Events",
      id: "view-events",
    },
    {
      name: "Manage Rewards",
      id: "manage-rewards",
    },
    {
      name: "Manage Milestones",
      id: "manage-milestones",
    },
  ];

  return (
    <div>
      <div className="select-none relative pl-[70px]">
        <div
          className={`absolute left-0 inline-block transition border p-[5px] text-[#292D32] border-[#292D32] rounded-[5px] cursor-pointer ${
            selectionToggle ? "rotate-[-45deg]" : ""
          }`}
          onClick={() => {
            setSelectionToggle(!selectionToggle);
            setSelectedOption("");
          }}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        {!selectionToggle && (
          <div className="pt-[10px] text-[#e59f3a]">
            Click the + button to choose what to do next.
          </div>
        )}
        <div
          className={`options flex flex-col transition ${
            selectionToggle ? "opacity-100" : "opacity-0"
          }`}
        >
          {navOptions?.map((item, index) => {
            const isOdd = index % 2;
            return (
              <div key={index}>
                <span
                  className={`cursor-pointer inline-block ${
                    !isOdd ? "text-secondary" : "text-primary"
                  }`}
                  key={index}
                  onClick={() => setSelectedOption(item?.id)}
                >
                  {item?.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        {!selectedOption && <div></div>}
        {selectedOption === "add-event" && <EventsAdminCreate />}
        {selectedOption === "view-events" && <EventsAdminList />}
        {selectedOption === "manage-rewards" && <Reward />}
        {selectedOption === "manage-milestones" && <MilestonePage />}
      </div>
    </div>
  );
}
