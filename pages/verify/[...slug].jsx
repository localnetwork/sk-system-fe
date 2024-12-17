import BaseApi from "@/lib/api/_base.api";
import nookies from "nookies";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IconSetBlue from "@/components/icons/IconSetBlue";
import Unauthorized from "@/components/icons/Unauthorized";
import Invalid from "@/components/icons/Invalid";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const { slug } = router.query;

  useEffect(() => {
    const cookies = nookies.get();
    const token = cookies[process.env.NEXT_PUBLIC_TOKEN];
    setToken(token);

    if (!token && slug) {
      const fetchData = async () => {
        try {
          const res = await BaseApi.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/token/${slug}`
          );
          if (res.data?.status === "pending") {
            BaseApi.put(`${process.env.NEXT_PUBLIC_API_URL}/api/token/${slug}`);
          }

          setData(res.data);
          setStatus(200);
        } catch (error) {
          setStatus(error.status);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [slug]);
  if (loading) {
    return <div>Loading...</div>;
  }

  let headline;
  let message;
  let icon;

  switch (status) {
    case 200:
      headline = "Account verified successfully.";
      message = "Your account has been verified and pending approval.";
      icon = <IconSetBlue />;
      break;
    case 404:
      headline = "Link is invalid.";
      message = "";
      icon = <Invalid />;
      break;
    case 422:
      headline = "Your account is already verified.";
      message = "";
      icon = <IconSetBlue />;
      break;
    default:
      headline = "You are not authorized to access this page.";
      message = "";
  }
  return (
    <div
      className={`${
        !token ? "min-h-screen" : ""
      } flex items-center justify-center container text-center py-[50px]`}
    >
      {token ? (
        <div className="flex justify-center gap-[30px] flex-col items-center">
          {/* <IconSetBlue /> */}
          <Unauthorized />
          <h1 className="text-[35px] text-[#227FDD] font-bold">
            Access denied. Please logout to continue.
          </h1>
          <div className="mt-[15px]">
            <Link
              className="shadow-[0px_4px_4px_0px_#00000040] text-white hover:bg-[#227FDD] bg-[#3FADF2] rounded-[10px] px-[30px] py-[15px] text-[20px] font-bold"
              href="/"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-[30px] flex-col items-center">
          {icon && <div>{icon}</div>}
          {headline && (
            <h1 className="text-[35px] text-[#227FDD] font-bold">{headline}</h1>
          )}
          {message && <p className="text-[#3FADF2] text-[20px]">{message}</p>}
          <div className="mt-[15px]">
            <Link
              className="shadow-[0px_4px_4px_0px_#00000040] text-white hover:bg-[#227FDD] bg-[#3FADF2] rounded-[10px] px-[30px] py-[15px] text-[20px] font-bold"
              href="/"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
