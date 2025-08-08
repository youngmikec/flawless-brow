import { User } from "./user";

export interface BankAccount {
    _id: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    bankCountry: string;
    currency: string;
    user: User; // Reference to the User model
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: User;
    updatedBy?: User;
}