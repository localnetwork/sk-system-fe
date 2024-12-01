import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <form action="#">
        <div>
          <label htmlFor="username" className="tesgt">
            Username:
          </label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
