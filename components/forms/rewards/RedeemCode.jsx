import BaseApi from "@/lib/api/_base.api";
import errorsService from "@/lib/helpers/errorsFormHandler";
import persistentStore from "@/lib/store/persistentStore";

import { useState } from "react";
import { toast } from "react-toastify";
import { Raleway } from "next/font/google";
const raleway = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function RedeemCode() {
  const profile = persistentStore((state) => state.profile);
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries()); // Converts FormData to an object
    setLoading(true);

    try {
      toast.dismiss();
      const res = await BaseApi.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/code/redeem",
        {
          ...values,
        }
      );

      e?.target?.reset();
      toast.success(res?.data?.message);
      setErrors([]);
      setLoading(false);
    } catch (error) {
      setErrors(error?.data?.errors);
      toast.error(error?.data?.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={`${raleway.className}`}>
      <form id="redeem-code" onSubmit={handleSubmit}>
        <div className="form-item">
          <label
            htmlFor="code"
            className="text-[20px] mb-[10px] block text-white"
          >
            Enter your code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="ex: JW071796"
            className={`w-full p-2 rounded-md text-[#333] ${
              errorsService.findError(errors, "code")
                ? "border border-red-500"
                : ""
            }`}
          />
          {errorsService.findError(errors, "code") && (
            <p className="mt-2 text-[#a3d1ff] text-xs">
              {errorsService.findError(errors, "code").code}
            </p>
          )}
        </div>
        <div
          className={`form-action mt-[30px] flex justify-end ${
            isLoading ? "opacity-50 pointer-events-none cursor-disabled" : ""
          }`}
        >
          <button
            type="submit"
            className="bg-[#2991E7] shadow-[0px_4px_4px_0px_#00000040] uppercase px-[15px] py-[10px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
