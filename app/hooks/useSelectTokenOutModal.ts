import { create } from 'zustand';

interface SelectTokenOutModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSelectTokenOutModal = create<SelectTokenOutModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSelectTokenOutModal;
