import { useEffect } from "react";
import axios from "axios";
export default function Register() {
  const submitHandler = (e) => {
    e.preventDefault();
    const first_name = e.target.first_name.value;
    const middle_name = e.target.middle_name.value;
    const last_name = e.target.last_name.value;
    console.log(first_name, middle_name, last_name);

    try {
      const res = axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", {
        first_name,
        middle_name,
        last_name,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <div className="py-[100px]">
        <div className="container mx-auto">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col gap-[15px]"
          >
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="username" className="">
                First Name:
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="shadow-md border rounded-[15px] w-full min-h-[45px]"
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="middle_name" className="">
                Middle Name:
              </label>
              <input
                type="text"
                name="middle_name"
                id="middle_name"
                className="shadow-md border rounded-[15px] w-full min-h-[45px]"
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label htmlFor="last_name" className="">
                Last Name:
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="shadow-md border rounded-[15px] w-full min-h-[45px]"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-[red] text-white px-[15px] py-[10px] rounded-[10px] min-w-[150px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
