import { create } from "zustand";
export default create(() => ({
  showLazy: false,
  formSuccessInfo: false,
  submitLoading: false,
  uploading: false,
  captcha: {},
  ready: false,
  sessionExpired: false,
}));
