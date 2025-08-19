import { create } from 'zustand';

interface AppStore {
  isLoading: boolean;
  showScheduleModal: boolean;
  toggleScheduleModal: (isOpen?: boolean) => void;

}

export const useScheduleStore = create<AppStore>((set) => ({
  isLoading: false,
  showScheduleModal: false,
  toggleScheduleModal: (isOpen) => set((state) => ({ showScheduleModal: (isOpen !== undefined) ? isOpen : !state.showScheduleModal })),
}));
