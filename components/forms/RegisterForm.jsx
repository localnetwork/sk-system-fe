import BaseApi from "@/lib/api/_base.api";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const APIDOMAIN = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";
import "flatpickr/dist/themes/material_green.css";
const Flatpickr = dynamic(() => import("react-flatpickr"), { ssr: false });
import errorsService from "@/lib/helpers/errorsFormHandler";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import persistentStore from "@/lib/store/persistentStore";
import AUTHAPI from "@/lib/api/auth/request";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import Logo from "../icons/Logo";
import Calendar from "../icons/Calendar";
import RefreshSecondary from "../icons/RefreshSecondary";
export default function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [birthday, setBirthday] = useState(null);
  const [purok, setPurok] = useState([]);
  const calculateDateRange = () => {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 30,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - 16,
      today.getMonth(),
      today.getDate()
    );
    return { minDate, maxDate };
  };

  // Submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Extract form values
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries()); // Converts FormData to an object
    const { email, password } = values;

    const data = { ...values };

    try {
      // Clear toast
      toast.dismiss();

      setErrors([]);
      const response = await BaseApi.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        data
      );

      router.push("/dashboard");
      persistentStore.setState({ profile: response.data?.data });

      toast.success("Registration successful");

      setCookie({}, TOKEN, response.data.token, {
        path: "/",
      });
    } catch (error) {
      console.error("Error:", error);
      setErrors(error?.data?.errors || []);
      toast.error(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { minDate, maxDate } = calculateDateRange();

  const CustomInput = ({ value, defaultValue, inputRef, ...props }) => (
    <input {...props} defaultValue={defaultValue} ref={inputRef} />
  );

  const fetchPurok = async () => {
    try {
      const res = await BaseApi.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/purok`
      );
      setPurok(res.data?.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPurok();
  }, []);
  return (
    <div className="min-h-screen py-[50px] bg-[linear-gradient(180deg,#2163AC_0%,#227FDD_14.9%,#95DDFB_35.9%,#F1D496_61.4%,#DD8022_100%)] flex items-center justify-center flex-col relative">
      {/* <span className="h-[50%] absolute bg-[#FFE4C8] w-full top-0" />
      <span className="h-[50%] absolute bg-[#FF9000] w-full bottom-0" /> */}
      <div className="max-w-[700px] mx-auto mb-[50px]">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="relative py-[50px] px-[30px] rounded-[10px] bg-white shadow-[1px_10px_10px_1px_rgba(0,0,0,0.25)] w-full max-w-[700px] mx-auto">
        <h1 className="text-center text-[#2163accc] mb-10 text-[30px] font-bold">
          REGISTRATION FORM
        </h1>
        <Link className="absolute right-[15px] top-[100px]" href="/">
          <RefreshSecondary />
        </Link>
        <form
          className="flex gap-y-6 flex-wrap mx-[-5px]"
          id="register-form"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="flex mx-[-5px] w-full flex-col gap-y-6">
            <div className="flex w-full px-[5px] flex-col gap-[5px]">
              {/* <label htmlFor="email" className="font-bold">
                Email:
              </label> */}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="form-control max-w-[325px] shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full"
              />
              {errorsService.findError(errors, "email") && (
                <p className="mt-2 text-red-500 text-xs">
                  {errorsService.findError(errors, "email").email}
                </p>
              )}
            </div>
            <div className="flex max-w-[50%] w-full px-[5px] flex-col gap-[5px]">
              {/* <label htmlFor="password" className="font-bold">
                Password:
              </label> */}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="form-control max-w-[267px] shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full"
              />
              {errorsService.findError(errors, "password") && (
                <p className="mt-2 text-red-500 text-xs">
                  {errorsService.findError(errors, "password").password}
                </p>
              )}
            </div>
            <div className="flex max-w-[50%] w-full px-[5px] flex-col gap-[5px]">
              {/* <label htmlFor="confirm_password" className="font-bold">
                Re-enter Password:
              </label> */}
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Re-enter Password"
                className="form-control max-w-[267px] shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full"
              />
              {errorsService.findError(errors, "confirm_password") && (
                <p className="mt-2 text-red-500 text-xs">
                  {
                    errorsService.findError(errors, "confirm_password")
                      .confirm_password
                  }
                </p>
              )}
            </div>
          </div>

          <div className="flex mx-[-5px]  flex-wrap w-full">
            <div className="px-[5px] w-full">
              <div className="w-full border-t-[1px] border-[#ccc] block h-[1px] mb-6" />
            </div>
            <div className="flex max-w-[33.33%] w-full px-[5px] flex-col gap-[5px]  ">
              {/* <label htmlFor="first_name" className="font-bold">
                First Name:
              </label> */}
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                className="form-control shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full"
              />
              {errorsService.findError(errors, "first_name") && (
                <p className="mt-2 text-red-500 text-xs">
                  {errorsService.findError(errors, "first_name").first_name}
                </p>
              )}
            </div>
            <div className="flex max-w-[33.33%] w-full px-[5px] flex-col gap-[5px]">
              {/* <label htmlFor="middle_name" className="font-bold">
                Middle Name:
              </label> */}
              <input
                type="text"
                name="middle_name"
                id="middle_name"
                placeholder="Middle Name"
                className="form-control shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full"
              />
              {errorsService.findError(errors, "middle_name") && (
                <p className="mt-2 text-red-500 text-xs">
                  {errorsService.findError(errors, "middle_name").middle_name}
                </p>
              )}
            </div>
            <div className="flex max-w-[33.33%] w-full px-[5px] flex-col gap-[5px]">
              {/* <label htmlFor="last_name" className="font-bold">
                Last Name:
              </label> */}
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                className="form-control shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full"
              />
              {errorsService.findError(errors, "last_name") && (
                <p className="mt-2 text-red-500 text-xs">
                  {errorsService.findError(errors, "last_name").last_name}
                </p>
              )}
            </div>
          </div>
          <div className="flex mx-[-5px] gap-y-6 w-full">
            <div className="flex grow w-full min-w-[40%] px-[5px] flex-col gap-[5px]">
              {/* <label htmlFor="birthday" className="font-bold">
              Birthday:
            </label> */}
              <div className="relative w-full">
                <Flatpickr
                  value={birthday}
                  id="birthday"
                  name="birthday"
                  placeholder="Date of Birth"
                  onChange={(selectedDates) => setBirthday(selectedDates[0])}
                  options={{
                    minDate,
                    maxDate,
                    dateFormat: "Y-m-d",
                  }}
                  className="form-control shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full pr-10"
                />
                <div
                  className="absolute right-3 opacity-50 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={(e) => {
                    const input = e.currentTarget.previousSibling;
                    input._flatpickr.open(); // Open Flatpickr on icon click
                  }}
                >
                  <Calendar />
                  {/* Replace this with your custom Calendar component */}
                </div>
              </div>
              {errorsService.findError(errors, "birthday") && (
                <p className="mt-2 text-red-500 text-xs">
                  {errorsService.findError(errors, "birthday").birthday}
                </p>
              )}
            </div>
            <div className="flex grow w-full px-[5px] flex-col gap-[5px]">
              {/* <label htmlFor="gender" className="font-bold">
              Female:
            </label> */}

              <select
                id="gender"
                name="gender"
                className="form-control shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full"
              >
                <option selected="selected" value="" disabled>
                  Gender
                </option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
              {errorsService.findError(errors, "gender") && (
                <p className="mt-2 text-red-500 text-xs">
                  {errorsService.findError(errors, "gender").gender}
                </p>
              )}
            </div>

            <div className="flex grow w-full px-[5px] flex-col gap-[5px]">
              {/* <label htmlFor="gender" className="font-bold">
              Purok:
            </label> */}

              <select
                id="purok"
                name="purok"
                className="form-control shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full"
              >
                <option selected="selected" value="" disabled>
                  Purok
                </option>
                {purok?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errorsService.findError(errors, "purok") && (
                <p className="mt-2 text-red-500 text-xs">
                  {errorsService.findError(errors, "purok").purok}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-center mb-6 border" />
            <div className="flex w-full justify-center">
              <button
                type="submit"
                className={`bg-gradient1 shadow-[0_4px_6px_rgba(0,0,0,0.35)] inline-flex justify-center gap-[15px] font-bold text-white px-[5px] py-[15px] rounded-[50px] min-w-[250px] ${
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
                Register
              </button>
            </div>
          </div>
        </form>

        {/* <div>
          <Link href="/">{`Already have an account? Login`}</Link>
        </div> */}
      </div>
    </div>
  );
}
