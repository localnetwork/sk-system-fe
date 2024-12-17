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
import dynamic from "next/dynamic";
import globalState from "@/lib/store/globalState";
const NextTopLoader = dynamic(() =>
  import("nextjs-toploader").then((module) => module.default)
);
export default function Layout({ children }) {
  const profile = persistentStore((state) => state.profile);
  const cookies = parseCookies();
  const showLazy = globalState((state) => state.showLazy);

  // const { modalOpen, modalInfo } = modalState((state) => ({
  //   modalOpen: state.modalOpen,
  //   modalInfo: state.modalInfo,
  // }));

  const modalOpen = modalState((state) => state.modalOpen);

  const token = cookies?.[process.env.NEXT_PUBLIC_TOKEN];

  if (!token && profile) {
    persistentStore.setState({ profile: null });
  }

  let loaderColor = "#3FADF2";

  if (profile?.role === 1) {
    loaderColor = "#a2441b";
  }

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
      <NextTopLoader
        color={loaderColor}
        initialPosition={0.08}
        crawlSpeed={100}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={100}
        shadow={`0 0 10px #a2441b,0 0 5px ${loaderColor}`}
        template='<div class="bar bg-primary" role="bar" style="z-index: 9999;"><div class="peg"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      {modalOpen && <Modal />}
    </>
  );
}
