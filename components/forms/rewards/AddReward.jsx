import Calendar from "@/components/icons/Calendar";
import BaseApi from "@/lib/api/_base.api";
import errorsService from "@/lib/helpers/errorsFormHandler";
import { useState } from "react";
import { toast } from "react-toastify";
import "flatpickr/dist/themes/material_green.css";
import modalState from "@/lib/store/modalState";
import { useSWRConfig } from "swr";
import Image from "next/image";

export default function AddReward() {
  // Hooks must always be at the top level
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(null); // Track the selected start date
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { mutate } = useSWRConfig();

  // Fetch modal state here to avoid dynamic usage later
  const modalInfo = modalState((state) => state.modalInfo) || {};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e?.target?.name?.value || "");
    formData.append("image", e?.target?.image?.files[0] || "");

    setIsLoading(true);
    try {
      toast.dismiss();
      setErrors([]);
      const res = await BaseApi.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rewards`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rewards?s=${
          modalInfo.searchTerm || ""
        }`
      );
      toast.success(res?.data?.message);
      e.target.reset();
      setImagePreview(null);
      setSelectedImage(null);
      modalState.setState({ modalOpen: false, modalInfo: null });
    } catch (error) {
      const errorMessages = error?.data?.errors?.map(
        (err) => Object.values(err)[0]
      );
      setErrors(error?.data?.errors);

      const ErrorList = () => (
        <ul className="list-disc pl-[20px]">
          {errorMessages?.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      );

      toast.error(<ErrorList />);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-[30px] pb-[30px] max-w-[620px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
        <div className="form-item flex items-center gap-x-3">
          <label htmlFor="name" className="uppercase font-bold text-secondary">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`bg-white border rounded-[5px] w-full px-[10px] py-[5px] ${
              errorsService.findError(errors, "name") ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="form-item w-full flex items-center gap-3">
          <label htmlFor="image" className="uppercase font-bold text-secondary">
            Image
          </label>
          <div className="relative w-full">
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleImageUpload}
              className="absolute z-[100] top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className={`border h-[40px] rounded-[5px] flex justify-center items-center bg-white ${
                errorsService.findError(errors, "image") ? "border-red-500" : ""
              }`}
            >
              <span className="flex gap-[15px] text-[#878787]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload Image
              </span>
            </div>
            {imagePreview && (
              <div className="absolute top-0 left-0 w-full h-full z-[100]">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                  width={100}
                  height={100}
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                    document.getElementById("image").value = "";
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-[30px] flex justify-end">
          <button
            type="submit"
            className="px-[10px] py-[5px] rounded-[5px] bg-secondary text-white"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
