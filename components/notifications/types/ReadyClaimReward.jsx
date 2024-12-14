import BaseApi from "@/lib/api/_base.api";
import Image from "next/image";
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ReadyClaimReward({ item, notifMutate }) {
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
      <div className="min-w-[50px] max-w-[50px] p-[5px] rounded-[10px] bg-[linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD),_linear-gradient(0deg,_#227FDD,_#227FDD)]">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + add_info?.reward?.image}
          className="w-[40px] h-[40px] object-cover rounded-[5px]"
          width={50}
          height={50}
          alt="Hello WOrld"
        />
      </div>
      <div
        className="max-w-[calc(100%-50px] w-full"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}
