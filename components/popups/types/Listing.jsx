import JoinEvent from "@/components/forms/events/JoinEvent";
import ParticipantsList from "@/components/forms/events/ParticipantsList";
import modalState from "@/lib/store/modalState";
import persistentStore from "@/lib/store/persistentStore";

import { Raleway } from "next/font/google";
const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Listing() {
  const modalInfo = modalState((state) => state.modalInfo);
  const profile = persistentStore((state) => state.profile);
  let form;

  switch (modalInfo.id) {
    case "event-participants":
      form = <ParticipantsList />;
      break;
    default:
      // return;
      break;
  }
  return (
    <div className="fixed flex items-center py-[50px] top-0 left-0 w-full h-full">
      <span
        className="overlay bg-[#000] bg-opacity-70 absolute top-0 left-0 w-full h-full"
        onClick={() => {
          modalState.setState({
            modalOpen: false,
            modalInfo: null,
          });
        }}
      />
      <div className="container relative !max-w-[650px]">
        <div className="bg-white relative rounded-[10px] overflow-hidden shadow-md">
          <span className="h-[50px] [background:linear-gradient(0deg,#EAB75F_0%,#DD8022_100%)] block w-full" />
          <h2
            className={`px-[15px] border-b-[2px] pb-[15px] text-left text-white text-[22px] mt-[15px] mb-[30px] ${raleway.className}`}
            dangerouslySetInnerHTML={{ __html: modalInfo.title }}
          />

          <div className="modal-content max-h-[calc(100vh-188px)] overflow-y-auto">
            {form && <>{form}</>}
          </div>
        </div>
      </div>
    </div>
  );
}
