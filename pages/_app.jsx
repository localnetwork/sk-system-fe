import Layout from "@/components/partials/Layout";
import AUTHAPI from "@/lib/api/auth/request";
import globalState from "@/lib/store/globalState";
import "@/styles/globals.css";
import { useEffect, useRef } from "react";
import persistentStore from "@/lib/store/persistentStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deserialize, auth as hasToken } from "@/lib/services/globalService";
import accountStore from "@/lib/store/accountStore";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const refetchEvents = useRef(null);

  useEffect(() => {
    globalState.setState({ ready: true });
  }, []);

  const profile = persistentStore((state) => state.profile);
  const ready = globalState((state) => state.ready);

  const {
    data: auth,
    isValidating: authenticating,
    mutate: refetchAuth,
  } = AUTHAPI.getProfileSwr("", {
    render: profile || (hasToken && !profile),
    onSuccess: (res) => {
      const profile = res.data?.data;
      persistentStore.setState({ profile });
    },
    onError: (err) => {
      if (err?.status === 401) {
        AUTHAPI.logout().then(() => {
          console.log("router.asPath", router.asPath);
          if (
            router.asPath.includes("/") ||
            router.asPath.includes("register")
          ) {
            return;
          } else {
            router.replace("/");
          }
        });
        // globalState.setState({ sessionExpired: true });
      }
    },
  });
  const account = auth ? deserialize(auth) : {};
  accountStore.setState({ refetchAuth, account });

  return (
    <>
      <Layout>
        <Component {...pageProps} refetchEvents={refetchEvents} />
      </Layout>
      <ToastContainer />
    </>
  );
}
