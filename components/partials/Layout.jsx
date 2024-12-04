import { Poppins } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins({
  weight: ["400", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
export default function ({ children }) {
  return (
    <>
      <main id="main-content" className={`${poppins.className}`}>
        {children}
      </main>
    </>
  );
}
