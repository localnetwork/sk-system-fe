import Calendar from "@/components/icons/Calendar";
import BaseApi from "@/lib/api/_base.api";
import errorsService from "@/lib/helpers/errorsFormHandler";
import { useState } from "react";
import { toast } from "react-toastify";
import "flatpickr/dist/themes/material_green.css";
import dynamic from "next/dynamic";
import Image from "next/image";
const Flatpickr = dynamic(() => import("react-flatpickr"), { ssr: false });

export default function EventsAdminCreate() {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formattedErrors, setFormattedErrors] = useState([]);
  const [startDate, setStartDate] = useState(null); // To track the selected start date
  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image
  const [imagePreview, setImagePreview] = useState(null); // To store the preview URL

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate if the uploaded file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }

      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData(e.target); // FormData automatically includes all inputs, including files
    const formData = new FormData();

    formData.append("name", e?.target?.name?.value || "");
    formData.append("event_location", e?.target?.event_location?.value || "");
    formData.append(
      "event_start_datetime",
      e?.target?.event_start_datetime?.value || ""
    );
    formData.append(
      "event_end_datetime",
      e?.target?.event_end_datetime?.value || ""
    );
    formData.append(
      "allocated_stamps",
      e?.target?.allocated_stamps?.value || ""
    );
    formData.append("image", e?.target?.image?.files[0] || "");

    // if (!selectedImage) {
    //   toast.error("Please upload an image.");
    //   return;
    // }

    setIsLoading(true);

    try {
      toast.dismiss(); // Clear any existing toasts
      setErrors([]);

      const res = await BaseApi.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Event created successfully!");
      e?.target?.reset(); // Reset the form after successful submission
      setStartDate(null); // Clear startDate
      setImagePreview(null);
      setSelectedImage(null);

      // Explicitly reset Flatpickr values
      document.getElementById("event_start_datetime")._flatpickr.clear();
      document.getElementById("event_end_datetime")._flatpickr.clear();
    } catch (error) {
      setErrors(error?.data?.errors);

      const errorMessages = error?.data?.errors?.map(
        (error) => Object.values(error)[0]
      );

      const Err = () => (
        <ul className="list-disc gap-y-3 pl-[20px]">
          {errorMessages?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );

      toast.error(<Err />);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[linear-gradient(180deg,_#FEF1D6_0%,_#DD8022_74.47%)] shadow-[1px_0px_11px_3px_#a3a3a3] rounded-[10px] mt-[50px] p-[50px] max-w-[620px]">
      <h1 className="mb-[20px] text-[25px] mt-[-20px] text-secondary font-bold">
        Add event
      </h1>
      <form
        id="add-event"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col gap-y-3"
      >
        <div className="form-item flex items-center gap-x-3">
          <label htmlFor="name" className="uppercase font-bold text-secondary">
            Title
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`bg-white rounded-[5px] w-full px-[10px] py-[5px] ${
              errorsService.findError(errors, "name")
                ? "border border-red-500"
                : ""
            }`}
          />
        </div>
        <div className="form-item flex items-center gap-x-3">
          <label
            htmlFor="event_location"
            className="uppercase font-bold text-secondary"
          >
            Location
          </label>
          <input
            type="text"
            name="event_location"
            id="event_location"
            className={`bg-white rounded-[5px] w-full px-[10px] py-[5px] ${
              errorsService.findError(errors, "event_location")
                ? "border border-red-500"
                : ""
            }`}
          />
        </div>

        <div className="form-item relative flex items-center gap-x-3 w-full">
          <label
            htmlFor="event_start_datetime"
            className="uppercase whitespace-nowrap font-bold text-secondary"
          >
            Start Date/TIme
          </label>
          <Flatpickr
            id="event_start_datetime"
            name="event_start_datetime"
            placeholder="Start Date/Time"
            options={{
              minDate: "today", // Set minimum date to today
              enableTime: true, // Enable time picker
              time_24hr: false, // Use 24-hour time format
              dateFormat: "Y-m-d H:i", // Include time in the format
              onChange: (selectedDates) => {
                // Update startDate state when a date is selected
                setStartDate(selectedDates[0]);
              },
            }}
            className={`bg-white rounded-[5px] w-full px-[10px] py-[5px] ${
              errorsService.findError(errors, "event_start_datetime")
                ? "border border-red-500"
                : ""
            }`}
          />

          <div
            className="absolute right-3 opacity-50 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={(e) => {
              const input = e.currentTarget.previousSibling;
              input._flatpickr.open(); // Open Flatpickr on icon click
            }}
          >
            <Calendar />
          </div>
        </div>
        <div className="form-item relative flex items-center gap-x-3 w-full">
          <label
            htmlFor="event_end_datetime"
            className="uppercase whitespace-nowrap font-bold text-secondary"
          >
            End Date/TIme
          </label>
          <Flatpickr
            id="event_end_datetime"
            name="event_end_datetime"
            placeholder="End Date/Time"
            options={{
              minDate: startDate
                ? new Date(startDate.getTime() + 60 * 60 * 1000)
                : "today", // Ensure end date/time is greater than start date/time
              enableTime: true, // Enable time picker
              time_24hr: false, // Use 24-hour time format
              dateFormat: "Y-m-d H:i", // Include time in the format
            }}
            className={`bg-white rounded-[5px] w-full px-[10px] py-[5px] ${
              errorsService.findError(errors, "event_end_datetime")
                ? "border border-red-500"
                : ""
            }`}
          />
          <div
            className="absolute right-3 opacity-50 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={(e) => {
              const input = e.currentTarget.previousSibling;
              input._flatpickr.open(); // Open Flatpickr on icon click
            }}
          >
            <Calendar />
          </div>
        </div>

        <div className="flex items-center gap-3 ">
          <div className="form-item flex items-center gap-x-3">
            <label
              htmlFor="allocated_stamps"
              className="uppercase font-bold text-secondary"
            >
              Stamps
            </label>
            <div className="flex items-center bg-white rounded-[5px] px-[10px] py-[5px] border border-gray-300">
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById("allocated_stamps");
                  const currentValue = parseInt(input.value) || 1; // Default to 1 if value is invalid
                  input.value = Math.max(currentValue - 1, 1); // Minimum value of 1
                }}
                className="text-secondary font-bold px-[10px] py-[5px] border-r border-gray-300"
              >
                -
              </button>
              <input
                type="number"
                name="allocated_stamps"
                id="allocated_stamps"
                className="bg-white w-[60px] text-center focus:outline-none"
                defaultValue={1}
                min={1}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById("allocated_stamps");
                  const currentValue = parseInt(input.value) || 1; // Default to 1 if value is invalid
                  input.value = currentValue + 1;
                }}
                className="text-secondary font-bold px-[10px] py-[5px] border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="form-item w-full flex flex-col gap-3 relative">
            {/* <label
              htmlFor="image"
              className="uppercase font-bold text-secondary"
            >
              Image
            </label> */}
            <div
              className={`${
                errorsService.findError(errors, "image")
                  ? "border border-red-500"
                  : ""
              } h-[40px] cursor-pointer bg-white gap-[5px] text-[#9e9e9e] flex justify-center items-center rounded-[5px] w-full px-[10px] py-[5px] min-h-[20px] relative`}
            >
              <input
                type="file"
                accept="image/*"
                className="absolute cursor-pointer z-[100] top-0 left-0 w-full h-full opacity-0"
                name="image"
                id="image"
                onChange={handleImageUpload}
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
              </span>
              Upload Image
            </div>
            {imagePreview && (
              <div className="absolute z-[1000] top-0 left-0 w-full h-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full  top-0 left-0 z-[100] object-cover rounded-md bg-black"
                  width={100}
                  height={100}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    setSelectedImage(null);
                    setImagePreview(null);
                    const input = document.getElementById("image");
                    input.value = ""; // Clear the input value
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-[30px] select-none flex justify-end">
          <button
            type="submit"
            className="text-[#6D2D1A] px-[10px] py-[5px] rounded-[5px] bg-[linear-gradient(180deg,_#F1D396_0%,_#FFFFFF_100%)]"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
