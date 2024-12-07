import { parseCookies } from "nookies";
import AUTHAPI from "./auth/request";
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || "";
export default function setup(axios) {
  axios.interceptors.request.use((config) => {
    const cookies = parseCookies();
    config.headers["Authorization"] = `Bearer ` + cookies?.[TOKEN];
    config.headers["Strict-Transport-Security"] = "max-age=31536000";
    return config;
  });
  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      // const { data, status, statusText } = error.response;
      // Error callback here
      // global popup notification
      // console.log("Errr", error);
      if (error?.response?.status === 401) {
        console.log("401 error");
        AUTHAPI.logout();
      }
      return Promise.reject(error.response);
    }
  );
}
