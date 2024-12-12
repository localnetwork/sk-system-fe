import { Raleway } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const raleway = Raleway({
  weight: ["400", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
import persistentStore from "@/lib/store/persistentStore";
import Header from "./Header";
import NavigationOptions from "./NavigationOptions";
import { parseCookies, destroyCookie } from "nookies";
import Modal from "../popups/Modal";
import modalState from "@/lib/store/modalState";
export default function ({ children }) {
  const profile = persistentStore((state) => state.profile);
  const cookies = parseCookies();

  // const { modalOpen, modalInfo } = modalState((state) => ({
  //   modalOpen: state.modalOpen,
  //   modalInfo: state.modalInfo,
  // }));

  const modalOpen = modalState((state) => state.modalOpen);

  const token = cookies?.[process.env.NEXT_PUBLIC_TOKEN];

  // console.log("token", token);

  // if (!token && profile) {
  //   persistentStore.setState({ profile: null });
  // }

  return (
    <>
      <div className={`branding-${profile?.role}`}>
        {profile && (
          <>
            <Header />
            <NavigationOptions />
          </>
        )}
        <main id="main-content" className={`mb-[15px] ${raleway.className}`}>
          {children}
        </main>
      </div>
      {modalOpen && <Modal />}
    </>
  );
}
