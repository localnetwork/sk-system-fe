import LogoWhiteSmall from "../icons/LogoWhiteSmall";
import persistentStore from "@/lib/store/persistentStore";
import UserSquare from "../icons/UserSquare";
import Link from "next/link";
import { useState } from "react";
import AUTHAPI from "@/lib/api/auth/request";
import { toast } from "react-toastify";
import StatusBar from "./StatusBar";
import Notifications from "../notifications/Notifications";
export default function Header() {
  const profile = persistentStore((state) => state.profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const logout = () => {
    toast.dismiss();
    toast.success("Logout successful");
    AUTHAPI.logout();
  };

  return (
    <header className="bg-primary relative z-[201] py-[15px] text-white">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="inline-block relative">
            <Link href="/">
              <LogoWhiteSmall />
            </Link>
          </div>
          <div>
            <div className="flex items-center gap-[15px]">
              <span className="relative select-none ">
                {profile?.unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF0000] text-white text-[10px] rounded-full px-[5px]">
                    {profile?.unreadNotificationsCount}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsNotifOpen(!isNotifOpen);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>

                {isNotifOpen && <Notifications />}
              </span>
              {profile?.first_name} #{profile?.id}
              <div className="relative">
                <span
                  className="inline-block hover:opacity-50 cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    setIsNotifOpen(false);
                  }}
                >
                  <UserSquare />
                </span>
                {isMenuOpen && (
                  <div className="select-none absolute text-[#333] text-left top-[40px] right-0 bg-white rounded-[10px] shadow-[1px_0px_11px_3px_#a3a3a3] p-3 min-w-[150px]">
                    <div className="border-b-[1px] pb-[15px] mb-[50px]">
                      Howdy, {profile?.first_name} {profile?.last_name}
                    </div>

                    <div>
                      <div
                        className="py-[5px] cursor-pointer block"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {profile?.role !== 1 && <StatusBar />}
    </header>
  );
}
