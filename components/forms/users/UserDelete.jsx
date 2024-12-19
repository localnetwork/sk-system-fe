import BaseApi from "@/lib/api/_base.api";
import modalState from "@/lib/store/modalState";
import { toast } from "react-toastify";
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function UserDelete() {
  const modalInfo = modalState((state) => state.modalInfo);

  console.log("modalInfo", modalInfo);
  const { data, error, isLoading, mutate } = BaseApi.swr(
    modalInfo?.mutateUrl,
    fetcher
  );
  console.log("modalInfo?.mutateUrl", modalInfo?.mutateUrl);
  const handleDelete = async () => {
    toast.dismiss();
    try {
      const res = await BaseApi.delete(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/users/${modalInfo?.item?.id}/delete`
      );

      toast.success(res?.data?.message || "User deleted successfully.");
      mutate(modalInfo?.mutateUrl);
      modalState.setState({
        modalOpen: false,
        modalInfo: null,
      });
    } catch (error) {
      console.log("error", error);
      toast.error(error?.data?.message || "Error deleting the user.");
      modalState.setState({
        modalOpen: false,
        modalInfo: null,
      });
      mutate(modalInfo?.mutateUrl);
    }
  };
  return (
    <div className="flex flex-col gap-[5px] text-white">
      <button
        onClick={() => {
          handleDelete();
        }}
        className="bg-[#03C400B0] py-[12px] uppercase"
      >
        Yes
      </button>
      <button
        className="bg-red-500 py-[12px] uppercase"
        onClick={() => {
          modalState.setState({
            modalOpen: false,
            modalInfo: null,
          });
        }}
      >
        No
      </button>
    </div>
  );
}
