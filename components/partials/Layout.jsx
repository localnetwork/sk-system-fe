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
export default function ({ children }) {
  const profile = persistentStore((state) => state.profile);

  return (
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
  );
}
