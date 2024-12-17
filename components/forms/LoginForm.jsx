import BaseApi from "@/lib/api/_base.api";
import { useEffect, useState } from "react";
import persistentStore from "@/lib/store/persistentStore";
import AUTHAPI from "@/lib/api/auth/request";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import errorsService from "@/lib/helpers/errorsFormHandler";
import Link from "next/link";
import LogoGroup18 from "../icons/LogoGroup18";
export default function LoginForm() {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      toast.dismiss();
      setIsLoading(true);
      const res = await BaseApi.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/login",
        {
          email,
          password,
        }
      );

      await AUTHAPI.login({
        email: email,
        password: password,
      });
      router.push("/dashboard");
      toast.success("Login successful");
      setIsLoading(false);
      persistentStore.setState({ profile: res.data?.data });
    } catch (error) {
      console.log("Error", error);
      setErrors(error?.data?.errors);
      setIsLoading(false);
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="min-h-screen py-[100px] flex items-center justify-center flex-col relative">
      {/* <span className="h-[50%] absolute bg-[#FFE4C8] w-full top-0" />
      <span className="h-[50%] absolute bg-[#FF9000] w-full bottom-0" /> */}

      <div className="max-w-[700px] mx-auto mb-[50px]">
        <LogoGroup18 />
      </div>
      <div className="relative p-[30px] rounded-[10px] bg-white border shadow-[1px_0px_11px_3px_#a3a3a3] w-full max-w-[300px] mx-auto">
        <form
          action="#"
          className="flex flex-col gap-[25px]"
          id="login-form"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`${
                errorsService.findError(errors, "email")
                  ? "border border-red-500"
                  : ""
              } form-control shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] line-clamp-1 min-h-[40px] w-full border border-[#e9e9e9]`}
            />

            {errorsService.findError(errors, "email") && (
              <p className="mt-2 text-red-500 text-xs">
                {errorsService.findError(errors, "email").email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[5px]">
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`${
                errorsService.findError(errors, "password")
                  ? "border border-red-500"
                  : ""
              } form-control shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] line-clamp-1 min-h-[40px] w-full border border-[#e9e9e9]`}
            />

            {errorsService.findError(errors, "password") && (
              <p className="mt-2 text-red-500 text-xs">
                {errorsService.findError(errors, "password").password}
              </p>
            )}
          </div>
          <div className="flex justify-center mt-[10px]">
            <button
              type="submit"
              className={`bg-gradient2 shadow-[0_4px_6px_rgba(0,0,0,0.35)] inline-flex justify-center gap-[15px] font-bold text-white px-[15px] py-[15px] rounded-[50px] min-w-[100px] ${
                isLoading ? "opacity-80 pointer-events-none" : ""
              } `}
            >
              {isLoading && (
                <svg
                  className="animate-spin mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-50"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#bb6c06"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-80"
                    fill="#bb6c06"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Login
            </button>
          </div>
        </form>

        <div className="mt-[15px] text-center font-bold">
          <Link
            href="#"
            onClick={() => {
              alert("Work in progress");
            }}
          >
            Forgot Password?{" "}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(180deg,_#97c7f7_0%,_#227fdd_100%)]">
              Click Here
            </span>
          </Link>
        </div>

        <div className="flex justify-center border-t-[1px] mt-[20px] pt-[20px]">
          <Link
            href="/register"
            className="bg-gradient1 shadow-[0_4px_6px_rgba(0,0,0,0.35)] inline-flex justify-center gap-[15px] font-bold text-white px-[5px] py-[15px] rounded-[50px] min-w-[110px]"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
