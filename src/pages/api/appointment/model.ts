// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import Joi from 'joi';
import { IUser } from '../users/model';
import { IProductService } from '../product-services/model';
import { IBankAccount } from '../bank-accounts/model';

export interface IAddOnService {
    title: string;
    description?: string;
}

export enum AppointStatusEnum {
    PENDING = 1,
    PARTLY_PAID = 2,
    PAID = 3,
    COMPLETED = 4
}

export interface IAppointment extends Document {
    productService: IProductService;
    appointmentDay: Date | string;
    appointmentTime: string;
    addOnServices: IAddOnService[];
    customer: IUser;
    amountPaid: number;
    balance: number;
    paymentAccount: IBankAccount;
    currencySymbol: string;
    proofOfPaymentImage: string;
    status?: AppointStatusEnum;
    statusDesc?: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

export const ValidateCreateAppointment = Joi.object({
    productService: Joi.string().required(),
    customer: Joi.string().required(),
    amountPaid: Joi.number().required(),
    appointmentDay: Joi.string().required(),
    appointmentTime: Joi.string().required(),
    currencySymbol: Joi.string().required(),
    proofOfPaymentImage: Joi.string().uri().required(),
    status: Joi.string().valid(AppointStatusEnum).optional(),
    addOnServices: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional()
        })
    ).optional(),
    createdBy: Joi.string().optional()
});

export const ValidateUpdateAppointment = Joi.object({
    productService: Joi.string().optional(),
    customer: Joi.string().optional(),
    amountPaid: Joi.number().optional(),
    appointmentDay: Joi.string().optional(),
    appointmentTime: Joi.string().optional(),
    currencySymbol: Joi.string().optional(),
    proofOfPaymentImage: Joi.string().uri().optional(),
    status: Joi.string().valid(AppointStatusEnum).optional(),
    addOnServices: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional()
        })
    ).optional(),
    updatedBy: Joi.string().optional()
});

const AppointmentSchema = new Schema<IAppointment>({
    paymentAccount: { type: Schema.Types.ObjectId, ref: 'BankAccount', select: true},
    amountPaid: { type: Number, default: 0, required: true, select: true },
    balance: { type: Number, select: true },
    currencySymbol: { type: String, required: true },
    proofOfPaymentImage: { type: String, required: true },
    addOnServices: [{
        title: { type: String, required: true },
        description: { type: String, default: '' }
    }],
    appointmentDay: { type: Date, default: Date.now(), select: true },
    appointmentTime: { type: String, default: '', select: true },
    status: { type: Number, default: AppointStatusEnum.PENDING, select: true },
    statusDesc: { type: String, default: "Pending", select: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    productService: { type: Schema.Types.ObjectId, ref: 'ProductService' },
    createdAt: { type: Date, default: Date.now(), select: true },
    updatedAt: { type: Date, default: Date.now(), select: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }

});

AppointmentSchema.set("collection", "appointments");

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
