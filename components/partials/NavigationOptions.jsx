import persistentStore from "@/lib/store/persistentStore";
import menuNavOptions from "@/static-data/navOptions";
import Link from "next/link";
import { useRouter } from "next/router";
export default function NavigationOptions() {
  const profile = persistentStore((state) => state.profile);

  const filteredNavOptions = menuNavOptions.filter((item) => {
    return item?.roles.includes(profile?.role);
  });

  const router = useRouter();

  return (
    <div className="container ">
      <div className="my-[20px] border-b-[1px] border-[#ddd] py-[20px]">
        <p className="text-[25px] text-secondary">
          Welcome back{", "}
          <span className="text-primary font-bold">
            {" "}
            {profile?.first_name}.
          </span>
        </p>
      </div>

      <div
        className={`flex gap-[70px] border-b-[1px] pb-[20px] mb-[20px] ${
          profile?.role == 2 ? "pl-[50px]" : "justify-center"
        }`}
      >
        {filteredNavOptions.map((item, index) => (
          <div key={index} className="">
            <Link
              href={item?.link}
              className={`flex text-center hover:opacity-80 flex-col ${
                router.asPath == item?.link ? "!opacity-50" : ""
              }`}
            >
              {item?.icon}
              <p className="mt-[15px] text-primary font-[500]">{item?.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
