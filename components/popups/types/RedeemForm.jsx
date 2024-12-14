import GencodeMessage from "@/components/forms/events/GencodeMessage";
import GenerateCodeConfirmation from "@/components/forms/events/GenerateCodeConfirmation";
import JoinEvent from "@/components/forms/events/JoinEvent";
import RedeemCode from "@/components/forms/rewards/RedeemCode";
import modalState from "@/lib/store/modalState";
import persistentStore from "@/lib/store/persistentStore";

import { Raleway } from "next/font/google";
const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RedeemForm() {
  const modalInfo = modalState((state) => state.modalInfo);
  const profile = persistentStore((state) => state.profile);
  let form;

  // return <div>Hello World</div>;
  switch (modalInfo.id) {
    case "redeem-code":
      form = <RedeemCode />;
      break;
    default:
      // return;
      break;
  }
  return (
    <div className="fixed z-[1000] flex items-center py-[50px] top-0 left-0 w-full h-full">
      <span
        className="overlay bg-[#000] bg-opacity-70 absolute top-0 left-0 w-full h-full"
        onClick={() => {
          modalState.setState({
            modalOpen: false,
            modalInfo: null,
          });
        }}
      />
      <div className="container relative !max-w-[500px]">
        <div
          className={`p-[30px] text-white bg-[linear-gradient(180deg,_#227FDD_0%,_#2163AC_100%)] relative rounded-[10px] overflow-hidden shadow-md`}
        >
          <div className="modal-content">{form && <>{form}</>}</div>
        </div>
      </div>
    </div>
  );
}