import { BankAccount } from "./bank-account";
import { User } from "./user";
import { IService, IAddOnService } from "./product-service";

export enum AppointStatusEnum {
    PENDING = 1,
    PARTLY_PAID = 2,
    PAID = 3,
    COMPLETED = 4
}

export interface Appointment {
    _id: string;
    id: string;
    productService: IService;
    appointmentDay: Date | string;
    appointmentTime: string;
    addOnServices: IAddOnService[];
    customer: User;
    amountPaid: number;
    balance: number;
    paymentAccount: BankAccount;
    currencySymbol: string;
    proofOfPaymentImage: string;
    status?: AppointStatusEnum;
    statusDesc?: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}