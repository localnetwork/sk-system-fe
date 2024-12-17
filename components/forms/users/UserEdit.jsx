import BaseApi from "@/lib/api/_base.api";
import modalState from "@/lib/store/modalState";
import { Raleway, Inter } from "next/font/google";
import Calendar from "@/components/icons/Calendar";
import "flatpickr/dist/themes/material_green.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Flatpickr = dynamic(() => import("react-flatpickr"), { ssr: false });

const raleway = Raleway({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserEdit() {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    birthday: "",
    gender: "",
    purok: "",
  });
  const modalInfo = modalState((state) => state.modalInfo);
  const { data, error, isLoading, mutate } = BaseApi.swr(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/${modalInfo?.item?.id}`,
    fetcher
  );
  const {
    data: purokData,
    error: purokError,
    isLoading: purokLoading,
    mutate: purokMutate,
  } = BaseApi.swr(`${process.env.NEXT_PUBLIC_API_URL}/api/purok`, fetcher);
  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
    mutate: usersMutate,
  } = BaseApi.swr(modalInfo?.endpoint, fetcher);

  useEffect(() => {
    if (data) {
      setFormData({
        email: data.email || "",
        last_name: data.last_name || "",
        first_name: data.first_name || "",
        middle_name: data.middle_name || "",
        birthday: data.birthday ? formatDate(new Date(data.birthday)) : "",
        gender: data.gender || "",
        purok: data.purok || "",
      });
    }
  }, [data]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const response = await BaseApi.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${modalInfo?.item?.id}`,
        formData
      );
      console.log("response", response);
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${modalInfo?.item?.id}`
      );
      usersMutate(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
      modalState.setState({ modalInfo: null });
      toast.success("User updated successfully");
    } catch (error) {
      console.log("error", error);
      toast.error(error?.data?.message);
      setErrors(error?.data?.errors);
    }
  };

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

  const { minDate, maxDate } = calculateDateRange();

  return (
    <div>
      <form
        id="user-edit"
        className="p-[20px] flex flex-col gap-[30px]"
        onSubmit={handleSubmit}
      >
        <div className="groups">
          <h2
            className={`text-[#6D2E1A] mb-[20px] text-left text-[22px] font-[500] ${inter.className}`}
          >
            ACCOUNT DATA OR INFORMATION
          </h2>
          <div className="form-item flex gap-[10px] flex-col">
            <label
              htmlFor="email"
              className={` text-[#A2441B] text-[22px] ${inter.className}`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="min-h-[45px] w-full outline-none border shadow-[0px_0px_10px_0px_#00000080] py-[5px] px-[10px] rounded-[10px]"
            />
          </div>
        </div>
        <div className="groups">
          <h2
            className={`text-[#6D2E1A] mb-[20px] text-left text-[22px] font-[500] ${inter.className}`}
          >
            PERSONAL DATA OR INFORMATION
          </h2>
          <div className="form-item flex gap-[10px] flex-col">
            <label
              htmlFor="fullname"
              className={` text-[#A2441B] text-[22px] ${inter.className}`}
            >
              Fullname
            </label>
            <div className="grid gap-[15px] grid-cols-4">
              <div className="col-span-2">
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="min-h-[45px] w-full outline-none border shadow-[0px_0px_10px_0px_#00000080] py-[5px] px-[10px] rounded-[10px]"
                />
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="min-h-[45px] w-full outline-none border shadow-[0px_0px_10px_0px_#00000080] py-[5px] px-[10px] rounded-[10px]"
                />
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                  className="min-h-[45px] w-full outline-none border shadow-[0px_0px_10px_0px_#00000080] py-[5px] px-[10px] rounded-[10px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-[15px] grid-cols-3">
          <div className="form-item col-span-1">
            <label
              htmlFor="birthday"
              className={` text-[#A2441B] text-[22px] ${inter.className}`}
            >
              Date of Birth:
            </label>
            <div className="relative w-full">
              <Flatpickr
                value={formData.birthday}
                id="birthday"
                name="birthday"
                placeholder="Date of Birth"
                onChange={(selectedDates) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    birthday: formatDate(selectedDates[0]),
                  }))
                }
                options={{
                  minDate,
                  maxDate,
                  dateFormat: "Y-m-d",
                }}
                className="form-control shadow-sm px-[5px] bg-[#D9D9D9] rounded-[5px] min-h-[40px] w-full pr-10"
              />
              <div
                onClick={(e) => {
                  const input = e.currentTarget.previousSibling;
                  input._flatpickr.open(); // Open Flatpickr on icon click
                }}
                className="absolute right-3 opacity-50 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <Calendar />
              </div>
            </div>
          </div>
          <div className="form-item flex flex-col col-span-1">
            <label
              htmlFor="gender"
              className={` text-[#A2441B] text-[22px] ${inter.className}`}
            >
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="min-h-[45px] w-full outline-none border shadow-[0px_0px_10px_0px_#00000080] py-[5px] px-[10px] rounded-[10px]"
            >
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          {console.log("purokData", purokData)}
          <div className="form-item flex flex-col col-span-1">
            <label
              htmlFor="purok"
              className={` text-[#A2441B] text-[22px] ${inter.className}`}
            >
              Purok:
            </label>
            <select
              id="purok"
              name="purok"
              value={formData.purok}
              onChange={handleChange}
              className="min-h-[45px] w-full outline-none border shadow-[0px_0px_10px_0px_#00000080] py-[5px] px-[10px] rounded-[10px]"
            >
              {purokData?.data?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-[15px] mt-[30px] justify-end">
          <button
            type="submit"
            className="bg-[linear-gradient(180deg,#F1D396_0%,#DD8022_100%)] px-[30px] py-[15px] rounded-[10px] text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
