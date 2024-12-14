import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import persistentStore from "@/lib/store/persistentStore";
export default function Home() {
  const profile = persistentStore((state) => state.profile);
  return <>{!profile && <LoginForm />}</>;
}
