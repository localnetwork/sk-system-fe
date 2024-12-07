import { useState } from "react";
import EventsAdminCreate from "./EventsAdminCreate";
import EventsAdminList from "./EventsAdminList";

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

        <div
          className={`options transition ${
            selectionToggle ? "opacity-100" : "opacity-0"
          }`}
        >
          {navOptions?.map((item, index) => {
            const isOdd = index % 2;
            return (
              <div
                className={`cursor-pointer ${
                  !isOdd ? "text-secondary" : "text-primary"
                }`}
                key={index}
                onClick={() => setSelectedOption(item?.id)}
              >
                {item?.name}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        {!selectedOption && <div></div>}
        {selectedOption === "add-event" && <EventsAdminCreate />}
        {selectedOption === "view-events" && <EventsAdminList />}
      </div>
    </div>
  );
}
