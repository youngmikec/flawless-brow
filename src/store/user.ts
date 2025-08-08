import { create } from 'zustand';
import { User } from '../interfaces';

interface UserStore {
    isLoading: boolean;
    loggedInUser: User | null
    setLoggedInUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    isLoading: false,
    loggedInUser: null,
    setLoggedInUser: (user: User) => set({ loggedInUser: user})
}));

// Should get full IntelliSense
const count = useUserStore.getState();

export const useUser = () => {
    return useUserStore();
};