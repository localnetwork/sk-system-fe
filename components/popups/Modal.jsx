import modalState from "@/lib/store/modalState";
import Confirmation from "./types/Confirmation";
import Listing from "./types/Listing";
import Message from "./types/Message";
import RedeemForm from "./types/RedeemForm";
import RewardForm from "./types/RewardForm";
import RewardClaim from "../forms/rewards/RewardClaim";
import Edit from "./types/Edit";
import DeleteConfirm from "./types/DeleteConfirm";
export default function Modal() {
  const modalInfo = modalState((state) => state.modalInfo);

  return (
    <>
      {modalInfo?.type === "confirmation" && <Confirmation />}
      {modalInfo?.type === "listing" && <Listing />}
      {modalInfo?.type === "message" && <Message />}
      {modalInfo?.type === "redeem-code-form" && <RedeemForm />}
      {modalInfo?.type === "reward-form" && <RewardForm />}
      {modalInfo?.type === "reward-claim" && <RewardClaim />}
      {modalInfo?.type === "edit-info" && <Edit />}
      {modalInfo?.type === "delete-confirm" && <DeleteConfirm />}
    </>
  );
}
