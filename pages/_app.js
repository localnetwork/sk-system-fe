import Layout from "@/components/partials/Layout";
import "@/styles/globals.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </>
  );
}
