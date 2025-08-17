import { create } from 'zustand';

interface AppStore {
  isLoading: boolean;
  showSideBar: boolean;
  showLogoutModal: boolean;
  showAppModal: boolean;
  toggleSidebar: () => void;
  toggleLogoutModal: (isOpen?: boolean) => void;
  toggleAppModal: (isOpen?: boolean) => void;
  setShowSideBar: (isOpen: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  showSideBar: false,
  showAppModal: false,
  showLogoutModal: false,
  toggleSidebar: () => set((state) => ({ showSideBar: !state.showSideBar })),
  toggleAppModal: (isOpen) => set((state) => ({ showAppModal: (isOpen !== undefined) ? isOpen : !state.showAppModal })),
  toggleLogoutModal: (isOpen) => set((state) => ({ showLogoutModal: (isOpen !== undefined) ? isOpen : !state.showLogoutModal })),
  setShowSideBar: (isOpen) => set({ showSideBar: isOpen})
}));
