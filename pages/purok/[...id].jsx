import BaseApi from "@/lib/api/_base.api";
import errorsService from "@/lib/helpers/errorsFormHandler";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    male_population: "",
    female_population: "",
  });

  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    error,
    isLoading: isFetchLoading,
    mutate,
  } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/purok/${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        male_population: data.male_population || "",
        female_population: data.female_population || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    toast.dismiss();
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await BaseApi.put(
        process.env.NEXT_PUBLIC_API_URL + `/api/purok/${id}`,
        formData
      );
      console.log("response", response);
      setIsLoading(false);
      mutate(process.env.NEXT_PUBLIC_API_URL + `/api/purok/${id}`);
      router.push(`/population?purok=${id}`);
      toast.success("Purok updated successfully.");
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.data?.message || "Failed to update purok.");
      setErrors(error?.data?.errors);
    }
  };

  return (
    <div className="container">
      {error?.status === 404 ? (
        <div>
          <h1>404 - Not Found</h1>
          <p>The page you are looking for is not found.</p>
        </div>
      ) : (
        <div className="bg-[linear-gradient(180deg,_#FEF1D6_0%,_#DD8022_74.47%)] shadow-[1px_0px_11px_3px_#a3a3a3] rounded-[10px] mt-[50px] p-[50px] max-w-[620px]">
          <h1 className="mb-[20px] text-[25px] mt-[-20px] text-secondary font-bold">
            Update Purok
          </h1>
          <form
            id="add-event"
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-3"
          >
            <div className="form-item flex items-center gap-x-3">
              <label
                htmlFor="name"
                className="uppercase font-bold text-secondary"
              >
                Title
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`bg-white rounded-[5px] w-full px-[10px] py-[5px] ${
                  errorsService.findError(errors, "name")
                    ? "border border-red-500"
                    : ""
                }`}
              />
            </div>
            <div className="form-item flex gap-3">
              <label
                htmlFor="male_population"
                className="uppercase font-bold text-secondary"
              >
                Male Population
              </label>
              <div className="grow">
                <input
                  type="number"
                  name="male_population"
                  id="male_population"
                  value={formData.male_population}
                  onChange={handleChange}
                  min={1}
                  className={`bg-white rounded-[5px] w-full px-[10px] py-[5px] ${
                    errorsService.findError(errors, "male_population")
                      ? "border border-red-500"
                      : ""
                  }`}
                />

                {errorsService.findError(errors, "male_population")
                  ?.male_population && (
                  <div className="text-white text-[12px]">
                    {
                      errorsService.findError(errors, "male_population")
                        ?.male_population
                    }
                  </div>
                )}
              </div>
            </div>
            <div className="form-item flex gap-3">
              <label
                htmlFor="female_population"
                className="uppercase font-bold text-secondary"
              >
                Female Population
              </label>
              <div className="grow">
                <input
                  type="number"
                  name="female_population"
                  id="female_population"
                  value={formData.female_population}
                  min={1}
                  onChange={handleChange}
                  className={`bg-white rounded-[5px] w-full px-[10px] py-[5px] ${
                    errorsService.findError(errors, "female_population")
                      ? "border border-red-500"
                      : ""
                  }`}
                />

                {errorsService.findError(errors, "female_population")
                  ?.female_population && (
                  <div className="text-white text-[12px]">
                    {
                      errorsService.findError(errors, "female_population")
                        ?.female_population
                    }
                  </div>
                )}
              </div>
            </div>
            <div
              className={`mt-[30px] select-none flex justify-end ${
                isLoading ? "pointer-events-none cursor-disabled" : ""
              }`}
            >
              <button
                type="submit"
                className="text-[#6D2D1A] px-[10px] py-[5px] rounded-[5px] bg-[linear-gradient(180deg,_#F1D396_0%,_#FFFFFF_100%)]"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
