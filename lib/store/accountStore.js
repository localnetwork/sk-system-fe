import { create } from "zustand";
import { devtools } from "zustand/middleware";
let storeHandler = (set, get) => ({
  account: {},
  submissionLoading: false,
  infoError: "",
  informationForm: {},
});

storeHandler = devtools(storeHandler);
const store = create(storeHandler);

export default store;
