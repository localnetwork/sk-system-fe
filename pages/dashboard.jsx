import { useEffect, useState } from "react";
import persistentStore from "@/lib/store/persistentStore";
import IconSetOrange from "@/components/icons/IconSetOrange";
import IconSetBlue from "@/components/icons/IconSetBlue";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function Dashboard() {
  const profile = persistentStore((state) => state.profile);
  return (
    <>
      <div className="container py-[50px] flex flex-col justify-center items-center text-center">
        {profile?.role === 1 ? <IconSetOrange /> : <IconSetBlue />}
        <div className={`mt-[50px] ${roboto.className}`}>
          <h2 className="mb-[15px] text-secondary text-[25px] font-bold">
            {`It appears you’re all set!`}
          </h2>
          <p className="text-[20px] text-primary">
            Choose on any of the icon above to finish any pending tasks
          </p>
        </div>
      </div>
    </>
  );
}
