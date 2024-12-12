import BaseApi from "@/lib/api/_base.api";
import { toast } from "react-toastify";
import modalState from "@/lib/store/modalState";
import { useSWRConfig } from "swr";
import persistentStore from "@/lib/store/persistentStore";
import { Inter } from "next/font/google";
const inter = Inter({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function GenerateCodeConfirmation() {
  const modalInfo = modalState((state) => state.modalInfo);
  const { mutate } = useSWRConfig();
  const profile = persistentStore((state) => state.profile);

  const backToListing = () => {
    modalState.setState({
      modalOpen: true,
      modalInfo: {
        type: "listing",
        title: `<div class="text-[#A2441B]"><span class="font-bold mr-[50px] text-secondary">ID: ${modalInfo.item?.event_joined}</span> ${modalInfo?.item?.event_name}</div>`,
        id: "event-participants",
        item: {
          id: modalInfo?.item?.event_joined,
        },
      },
    });
  };

  const submitHandler = async () => {
    try {
      toast.dismiss();

      const res = await BaseApi.post(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/member-events/${modalInfo?.item?.event_joined}/approval/${modalInfo?.item?.user_id}`
      );
      toast.success("Code generated successfully");
      // Mutate the SWR cache to refetch data
      mutate(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/member-events/${modalInfo?.item?.event_joined}/participants?s=${modalInfo?.searchTerm}`
      );

      modalState.setState({
        modalOpen: true,
        modalInfo: {
          type: "message",
          title: `Generated Code:`,
          id: "gencode-message",
          message: res?.data?.code,
          item: modalInfo?.item,
        },
      });
    } catch (error) {
      toast.error(error?.data?.message);
      console.log("Error", error);
    }
  };

  return (
    <div className={`flex font-[500] flex-col gap-[5px] ${inter.className}`}>
      <button
        className={`w-full uppercase text-white bg-secondary min-h-[36px] flex items-center justify-center font-[500] px-[15px] py-[5px] `}
        onClick={() => {
          submitHandler();
          // backToListing();
        }}
      >
        Yes, I'm in
      </button>
      <button
        className={`w-full uppercase ${
          profile?.role === 1 ? "bg-[#6d381a]" : "bg-[#227FDD]"
        } text-white min-h-[36px] flex items-center justify-center font-[500] px-[15px] py-[5px] `}
        onClick={() => {
          backToListing();
        }}
      >
        No
      </button>
    </div>
  );
}
