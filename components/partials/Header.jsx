import LogoWhiteSmall from "../icons/LogoWhiteSmall";
import persistentStore from "@/lib/store/persistentStore";
import UserSquare from "../icons/UserSquare";
import Link from "next/link";
import { useState } from "react";
import AUTHAPI from "@/lib/api/auth/request";
import { toast } from "react-toastify";
export default function Header() {
  const profile = persistentStore((state) => state.profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    toast.dismiss();
    toast.success("Logout successful");
    AUTHAPI.logout();
  };
  return (
    <header className="bg-primary py-[15px] text-white">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="inline-block relative">
            <Link href="/">
              <LogoWhiteSmall />
            </Link>
          </div>
          <div>
            <div className="flex items-center gap-[15px]">
              {profile?.first_name} #{profile?.id}
              <div className="relative">
                <span
                  className="inline-block hover:opacity-50 cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
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
    </header>
  );
}
