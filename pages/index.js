import Image from "next/image";
import { Inter } from "next/font/google";
import LoginForm from "@/components/forms/loginForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <LoginForm />;
}
