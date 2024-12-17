import RegisterForm from "@/components/forms/RegisterForm";
import persistentStore from "@/lib/store/persistentStore";
import { useRouter } from "next/router";
export default function Register() {
  const profile = persistentStore((state) => state.profile);
  const router = useRouter();

  if (!profile) {
    return <RegisterForm />;
  } else {
    router.push("/");
    return null;
  }
}
