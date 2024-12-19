import persistentStore from "@/lib/store/persistentStore";
import menuNavOptions from "@/static-data/navOptions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NavigationOptions() {
  const profile = persistentStore((state) => state.profile);
  const router = useRouter();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const filteredNavOptions = menuNavOptions.filter((item) => {
    return item?.roles.includes(profile?.role);
  });

  return (
    <div className="container">
      {/* Welcome Section */}
      <div className="my-[20px] border-b-[1px] border-[#ddd] py-[20px]">
        <p className="text-[25px] text-secondary">
          Welcome back{", "}
          <span className="text-primary font-bold">
            {" "}
            {profile?.first_name}.
          </span>
        </p>
      </div>

      {/* Desktop Navigation */}
      <div
        className={`hidden md:flex gap-[70px] border-b-[1px] pb-[20px] mb-[20px] ${
          profile?.role == 2 ? "pl-[50px]" : "justify-center"
        }`}
      >
        {filteredNavOptions.map((item, index) => (
          <div key={index} className="">
            <Link
              href={item?.link}
              className={`flex text-center hover:opacity-80 flex-col ${
                router.asPath.includes(item?.link) ? "!opacity-50" : ""
              }`}
            >
              {item?.icon}
              <p className="mt-[15px] text-primary font-[500]">{item?.name}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="md:hidden mb-[15px]">
        {/* Mobile Toggle Button */}
        <button
          className="text-primary flex items-center gap-2 font-bold p-[10px] rounded"
          onClick={() => setPopupVisible(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[30px] h-[30px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          View Menu
        </button>
      </div>

      {/* Mobile Popup */}
      {isPopupVisible && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[9000]"
            onClick={() => setPopupVisible(false)}
          ></div>

          {/* Popup Content */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="bg-white w-[90%] max-w-[400px] rounded-lg shadow-lg p-5">
              {/* Close Button */}
              <button
                className="text-red-500 font-bold float-right"
                onClick={() => setPopupVisible(false)}
              >
                Close
              </button>

              {/* Navigation Links */}
              <div className="mt-[20px] w-full max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {filteredNavOptions.map((item, index) => (
                  <Link
                    key={index}
                    href={item?.link}
                    className={`flex flex-col justify-center items-center text-center py-2 hover:bg-gray-100 rounded ${
                      router.asPath.includes(item?.link)
                        ? "bg-gray-200 text-gray-500"
                        : "text-primary"
                    }`}
                    onClick={() => setPopupVisible(false)}
                  >
                    {item?.icon}
                    <p className="mt-[5px]">{item?.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
