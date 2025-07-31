import { create } from 'zustand';

interface BankAccount {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    bankCountry: string;
    currency: string;
    user: any; // Reference to the User model
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

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