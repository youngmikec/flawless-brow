// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import Joi, { boolean } from 'joi';

export interface IBankAccount extends Document {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    bankCountry: string;
    currency: string;
    sortCode: string;
    iban: string;
    isActive: boolean;
    user: any; // Reference to the User model
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

export const ValidateCreateBankAccount = Joi.object({
    accountName: Joi.string().required(),
    accountNumber: Joi.string().required(),
    bankName: Joi.string().required(),
    branch: Joi.string().required(),
    bankCountry: Joi.string().required(),
    sortCode: Joi.string().required(),
    iban: Joi.string().required(),
    currency: Joi.string().required(),
    user: Joi.string().required(), // Assuming user is a string ID
    createdBy: Joi.string().optional(),
});

export const ValidateUpdateBankAccount = Joi.object({
    accountName: Joi.string().optional(),
    accountNumber: Joi.string().optional(),
    bankName: Joi.string().optional(),
    branch: Joi.string().optional(),
    sortCode: Joi.string().optional(),
    iban: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    bankCountry: Joi.string().optional(),
    currency: Joi.string().optional(),
    updatedBy: Joi.string().optional(),
});

const BankAccountSchema = new Schema<IBankAccount>({
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    bankName: { type: String, required: true },
    branch: { type: String, required: true },
    bankCountry: { type: String, required: true },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), select: true },
    updatedAt: { type: Date, default: Date.now(), select: true },
    sortCode: { type: String, select: true },
    iban: { type: String, select: true },
    isActive: { type: Boolean, default: false, select: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }

});

BankAccountSchema.set("collection", "bank_accounts");

export default mongoose.models.BankAccount || mongoose.model<IBankAccount>('BankAccount', BankAccountSchema);
