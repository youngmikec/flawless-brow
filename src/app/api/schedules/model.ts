// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import Joi from 'joi';

export interface ScheduleService extends Document {
    scheduleDate: string;
    startTime: string;
    endTime: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

export const ValidateCreateSchedule = Joi.object({
    scheduleDate: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    createdBy: Joi.string().optional()
});

export const ValidateUpdateSchedule = Joi.object({
    scheduleDate: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    updatedBy: Joi.string().optional()
});

const ScheduleSchema = new Schema<ScheduleService>({
    scheduleDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), select: true },
    updatedAt: { type: Date, default: Date.now(), select: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }

});

ScheduleSchema.set("collection", "schedules");

export default mongoose.models.Schedule || mongoose.model<ScheduleService>('Schedule', ScheduleSchema);
