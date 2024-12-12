import modalState from "@/lib/store/modalState";
import { toast } from "react-toastify";
export default function GencodeMessage() {
  const modalInfo = modalState((state) => state.modalInfo);

  const copyClipboard = () => {
    toast.dismiss();
    navigator.clipboard.writeText(modalInfo?.message);
    toast.success("Successfully copied to clipboard");
  };
  const backPrevious = () => {
    modalState.setState({
      modalOpen: true,
      modalInfo: {
        type: "listing",
        title: `<div class="text-[#A2441B]"><span class="font-bold mr-[50px] text-secondary">ID: ${modalInfo?.item?.event_joined}</span> ${modalInfo?.item?.event_name}</div>`,
        id: "event-participants",
        item: {
          id: modalInfo?.item?.event_joined,
        },
      },
    });
  };
  return (
    <div className="relative">
      <span
        className="absolute top-[-50px] cursor-pointer right-[15px]"
        onClick={() => {
          backPrevious();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M24.25 36.1166C31.4 34.2333 36.6667 27.7333 36.6667 20C36.6667 10.8 29.2667 3.33331 20 3.33331C8.88333 3.33331 3.33333 12.6 3.33333 12.6M3.33333 12.6V4.99998M3.33333 12.6H6.68333H10.7333"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M3.33333 20C3.33333 29.2 10.8 36.6667 20 36.6667"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-dasharray="3 3"
          />
        </svg>
      </span>
      <div className="px-[30px] text-secondary pb-[10px] text-center font-bold text-[20px]">
        {modalInfo?.message}
      </div>

      <div
        onClick={() => {
          copyClipboard();
        }}
        className="flex select-none items-center px-[30px] text-center justify-center text-white opacity-50 pb-[30px] cursor-pointer"
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
            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
          />
        </svg>
        Copy to clipboard
      </div>
    </div>
  );
}
