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

export default function JoinEvent() {
  const modalInfo = modalState((state) => state.modalInfo);
  const { mutate } = useSWRConfig();
  const profile = persistentStore((state) => state.profile);

  const submitHandler = async () => {
    try {
      toast.dismiss();

      const res = await BaseApi.post(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/member-events/${modalInfo?.item?.id}/join`
      );
      modalState.setState({
        modalOpen: false,
        modalInfo: null,
      });
      toast.success("Event joined successfully");
      // Mutate the SWR cache to refetch data
      mutate(
        process.env.NEXT_PUBLIC_API_URL + `/api/member-events?status=upcoming`
      );
    } catch (error) {
      toast.error(error?.data?.message);
      console.log("Error", error);
    }
  };

  return (
    <div className={`flex font-[500] flex-col gap-[5px] ${inter.className}`}>
      <button
        className={`w-full uppercase text-white hover:bg-[#135a94] min-h-[36px] flex items-center justify-center font-[500] px-[15px] py-[5px] bg-[#2991E7]`}
        onClick={submitHandler}
      >
        {`Yes, I'm in`}
      </button>
      <button
        className="w-full uppercase bg-[#227FDD] hover:bg-[#5c97d3] text-white min-h-[36px] flex items-center justify-center font-[500] px-[15px] py-[5px]"
        onClick={() => {
          modalState.setState({
            modalOpen: false,
            modalInfo: null,
          });
        }}
      >
        No
      </button>
    </div>
  );
}
