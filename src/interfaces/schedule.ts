export interface ISchedule {
    _id?: string;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
