// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import Joi from 'joi';

export interface IAddOnService {
    title: string;
    description?: string;
}

export interface IProductService extends Document {
    title: string;
    description: string;
    price: string;
    duration: string;
    currencySymbol: string;
    serviceImage: string;
    addOnServices: IAddOnService[];
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

export const ValidateCreateProductService = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    duration: Joi.string().required(),
    currencySymbol: Joi.string().required(),
    serviceImage: Joi.string().uri().optional(),
    addOnServices: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional()
        })
    ).optional(),
    createdBy: Joi.string().optional()
});

export const ValidateUpdateProductService = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    duration: Joi.string().required(),
    currencySymbol: Joi.string().required(),
    serviceImage: Joi.string().uri().optional(),
    addOnServices: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional()
        })
    ).optional(),
    updatedBy: Joi.string().optional()
});

const ProductServiceSchema = new Schema<IProductService>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    currencySymbol: { type: String, required: true },
    serviceImage: { type: String, required: true },
    addOnServices: [{
        title: { type: String, required: true },
        description: { type: String, default: '' }
    }],
    createdAt: { type: Date, default: Date.now(), select: true },
    updatedAt: { type: Date, default: Date.now(), select: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }

});

ProductServiceSchema.set("collection", "product_services");

export default mongoose.models.ProductService || mongoose.model<IProductService>('ProductService', ProductServiceSchema);
