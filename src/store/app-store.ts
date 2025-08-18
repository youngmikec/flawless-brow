import { create } from 'zustand';

interface AppStore {
  isLoading: boolean;
  showSideBar: boolean;
  showLogoutModal: boolean;
  showAppModal: boolean;
  showDeleteModal: boolean;
  toggleSidebar: () => void;
  toggleLogoutModal: (isOpen?: boolean) => void;
  toggleAppModal: (isOpen?: boolean) => void;
  toggleDeleteModal: (isOpen?: boolean) => void;
  setShowSideBar: (isOpen: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  showSideBar: false,
  showAppModal: false,
  showLogoutModal: false,
  showDeleteModal: false,
  toggleSidebar: () => set((state) => ({ showSideBar: !state.showSideBar })),
  toggleAppModal: (isOpen) => set((state) => ({ showAppModal: (isOpen !== undefined) ? isOpen : !state.showAppModal })),
  toggleDeleteModal: (isOpen) => set((state) => ({ showDeleteModal: (isOpen !== undefined) ? isOpen : !state.showDeleteModal })),
  toggleLogoutModal: (isOpen) => set((state) => ({ showLogoutModal: (isOpen !== undefined) ? isOpen : !state.showLogoutModal })),
  setShowSideBar: (isOpen) => set({ showSideBar: isOpen})
}));
