import Layout from "@/components/partials/Layout";
import globalState from "@/lib/store/globalState";
import "@/styles/globals.css";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    globalState.setState({ ready: true });
  }, []);
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </>
  );
}
