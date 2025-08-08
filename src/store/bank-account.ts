import { create } from 'zustand';
import { BankAccount } from '../interfaces/bank-account';

interface BankAccountStore {
    isLoading: boolean;
    bankAccounts: BankAccount[];
    setBankAccounts: (accounts: BankAccount[]) => void;
}

const useBankAccountStore = create<BankAccountStore>((set) => ({
    bankAccounts: [],
    isLoading: false,
    setBankAccounts: (accounts: BankAccount[]) => set({ bankAccounts: accounts})
}));

// Should get full IntelliSense
const count = useBankAccountStore.getState();

export const useBankAccount = () => {
    const { bankAccounts, isLoading, setBankAccounts } = useBankAccountStore();
    return { bankAccounts, isLoading, setBankAccounts };
};