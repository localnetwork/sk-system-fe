import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="py-[100px]">
      <div className="container mx-auto">
        <form action="#" className="flex flex-col gap-[15px]">
          <div className="flex gap-[5px]">
            <label htmlFor="username" className="tesgt asdasasd">
              Username:
            </label>
            <input type="text" className="shadow-md border" />
          </div>
          <div className="flex gap-[5px]">
            <label htmlFor="username">Password:</label>
            <input type="text" className="shadow-md border" />
          </div>
          <div>
            <button
              type="submit"
              className="bg-[red] text-white px-[15px] py-[10px] rounded-[10px] min-w-[150px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
