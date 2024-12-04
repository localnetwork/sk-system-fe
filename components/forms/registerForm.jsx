import BaseApi from "@/lib/api/_base.api";
import { useEffect } from "react";

export default function RegisterForm() {
  const sampleGet = async () => {
    try {
      const res = await BaseApi.get("https://api.sampleapis.com/beers/ale");

      console.log("res", res);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
  };

  useEffect(() => {
    sampleGet();
  }, []);
  return (
    <div className="min-h-screen py-[50px] flex items-center justify-center flex-col relative">
      <span className="h-[50%] absolute bg-[#FFE4C8] w-full top-0" />
      <span className="h-[50%] absolute bg-[#FF9000] w-full bottom-0" />
      <div className="relative py-[50px] px-[30px] rounded-[10px] bg-white shadow-sm border border-[#e9e9e9] w-full max-w-[700px] mx-auto">
        <h1 className="text-[#0B0B0B] mb-[15px] text-[30px] font-bold">
          Register
        </h1>
        <form
          action="#"
          className="flex gap-y-4 flex-wrap mx-[-15px]"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="flex max-w-[50%] w-full px-[15px] flex-col gap-[5px]">
            <label htmlFor="first_name" className="font-bold">
              First Name:
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] min-h-[40px] w-full border border-[#e9e9e9]"
            />
          </div>
          <div className="flex max-w-[50%] w-full px-[15px] flex-col gap-[5px]">
            <label htmlFor="middle_name" className="font-bold">
              Middle Name:
            </label>
            <input
              type="text"
              name="middle_name"
              id="middle_name"
              className="shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] min-h-[40px] w-full border border-[#e9e9e9]"
            />
          </div>
          <div className="flex max-w-[50%] w-full px-[15px] flex-col gap-[5px]">
            <label htmlFor="last_name" className="font-bold">
              Last Name:
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] min-h-[40px] w-full border border-[#e9e9e9]"
            />
          </div>
          <div className="flex max-w-[50%] w-full px-[15px] flex-col gap-[5px]">
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] min-h-[40px] w-full border border-[#e9e9e9]"
            />
          </div>
          <div className="flex max-w-[50%] w-full px-[15px] flex-col gap-[5px]">
            <label htmlFor="birthday" className="font-bold">
              Birthday:
            </label>
            <input
              type="date"
              name="birthday"
              id="birthday"
              className="shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] min-h-[40px] w-full border border-[#e9e9e9]"
            />
          </div>
          <div className="flex max-w-[50%] w-full px-[15px] flex-col gap-[5px]">
            <label htmlFor="gender" className="font-bold">
              Female:
            </label>

            <select
              id="gender"
              name="gender"
              className="shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] min-h-[40px] w-full border border-[#e9e9e9]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="flex max-w-[50%] w-full px-[15px] flex-col gap-[5px]">
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] min-h-[40px] w-full border border-[#e9e9e9]"
            />
          </div>
          <div className="flex max-w-[50%] w-full px-[15px] flex-col gap-[5px]">
            <label htmlFor="confirm_password" className="font-bold">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              className="shadow-sm px-[15px] bg-[#F1F4F8] rounded-[5px] min-h-[40px] w-full border border-[#e9e9e9]"
            />
          </div>
          <div className="flex w-full justify-center mt-[50px]">
            <button
              type="submit"
              className="bg-[#ff9000] font-bold shadow-sm text-white px-[15px] py-[15px] rounded-[50px] min-w-[250px]"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
