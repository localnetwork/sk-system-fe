import persistentStore from "@/lib/store/persistentStore";

export default function StatusBar() {
  const profile = persistentStore((state) => state.profile);

  const isPendingApproval = profile?.status === 0;
  const isNotVerified = profile?.verified === 0;

  return (
    <div className="absolute bottom-[-35px] left-0 w-full">
      {isPendingApproval && isNotVerified && (
        <div className="bg-red-800 text-white text-center py-[5px]">
          Your account is pending approval and not verified
        </div>
      )}

      {isPendingApproval && !isNotVerified && (
        <div className="bg-red-800 text-white text-center py-[5px]">
          Your account is pending approval
        </div>
      )}

      {isNotVerified && !isPendingApproval && (
        <div className="bg-red-800 text-white text-center py-[5px]">
          Your account is not verified
        </div>
      )}
    </div>
  );
}
