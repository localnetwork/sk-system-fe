import BaseApi from "@/lib/api/_base.api";
import Image from "next/image";
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function RewardCompleted({ item, notifMutate }) {
  const add_info = JSON.parse(item?.additional_info);

  const { body } = item;

  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/profile`,
    fetcher
  );
  const handleClick = async () => {
    try {
      const res = await BaseApi.put(
        process.env.NEXT_PUBLIC_API_URL + `/api/notifications/${item.id}/read`,
        {
          id: item.id,
        }
      );
      notifMutate(process.env.NEXT_PUBLIC_API_URL + "/api/notifications");
      mutate(process.env.NEXT_PUBLIC_API_URL + "/api/profile");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      className={`relative flex text-[11px] gap-[15px] items-center ${
        item?.has_read != 1 ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      onClick={() => {
        if (item?.has_read != 1) {
          handleClick();
        }
      }}
    >
      {item?.has_read != 1 && (
        <span className="w-[10px] h-[10px] absolute top-0 right-0 bg-[linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD)] rounded-full" />
      )}
      <div className="min-w-[50px] relative max-w-[50px] p-[5px] overflow-hidden rounded-[10px] bg-[#03C400]">
        <span className="bg-[#000] opacity-30 absolute top-0 left-0 w-full h-full" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 absolute z-[10] opacity-90 top-[15px] left-[15px] text-[#03C400]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + add_info?.reward?.image}
          className="w-[40px] h-[40px] object-cover rounded-[5px]"
          width={50}
          height={50}
          alt="Hello World"
        />
      </div>
      <div className="flex items-center gap-[5px]">
        <div>
          <h2 className="font-bold underline">{add_info?.reward?.name}</h2>
          <div
            className="max-w-[calc(100%-50px] w-full"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </div>
    </div>
  );
}
