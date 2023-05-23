import { create } from 'zustand';

interface SelectTokenInModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSelectTokenInModal = create<SelectTokenInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSelectTokenInModal;
