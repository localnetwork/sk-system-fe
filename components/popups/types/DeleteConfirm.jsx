import GenerateCodeConfirmation from "@/components/forms/events/GenerateCodeConfirmation";
import JoinEvent from "@/components/forms/events/JoinEvent";
import UserDelete from "@/components/forms/users/UserDelete";
import modalState from "@/lib/store/modalState";
import persistentStore from "@/lib/store/persistentStore";

import { Raleway } from "next/font/google";
const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function DeleteConfirm() {
  const modalInfo = modalState((state) => state.modalInfo);
  const profile = persistentStore((state) => state.profile);
  let form;

  // return <div>Hello World</div>;

  switch (modalInfo.id) {
    case "delete-user":
      form = <UserDelete />;
      break;
    default:
      break;
    // return;
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
          className={`py-[10px] bg-white rounded-[10px] max-h-[calc(100vh-100px)] overflow-y-auto `}
        >
          <div className="text-red-500 flex justify-center text-[30px] text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[50px] h-[50px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h2
            className={`px-[15px] text-center text-black text-[15px] mt-[15px] mb-[30px] ${raleway.className}`}
            dangerouslySetInnerHTML={{ __html: modalInfo.title }}
          />

          <div className="modal-content">{form && <>{form}</>}</div>
        </div>
      </div>
    </div>
  );
}
