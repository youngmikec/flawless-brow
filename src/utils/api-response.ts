import { NextResponse } from 'next/server';

export const response = (status: number = 200, message: string, data?: any) => {
    return NextResponse.json({
        status,
        message,
        data: data || null,
        success: (status >= 200 && status < 300) ? true : false
    }, { status });
}

export const SuccessResponse = (
    data: any, 
    message: string = 'Request was successful'
) => {
    return response(200, message, data);
};

export const FailureResponse = (
    status: number = 400, 
    error: string = 'An error occurred'
) => {
    return response(status, error, null);
};