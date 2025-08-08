
export interface IAddOnService {
    _id: string;
    id: string;
    title: string;
    description?: string;
}

export interface IService {
    _id: string;
    id: string;
    title: string;
    description: string;
    price: string;
    duration: string;
    currencySymbol: string;
    serviceImage: string;
    isFree: boolean;
    addOnServices: IAddOnService[];
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}