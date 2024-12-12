import { create } from "zustand"; // Importing create function from Zustand

// Using the create function to create a Zustand store
export default create((set) => ({
  modalOpen: false,
  modalInfo: null,
  setModalInfo: (info) => set({ modalInfo: info }),
  setClearModal: () => set({ modalInfo: "", modalOpen: false }),
}));
