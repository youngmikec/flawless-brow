"use client";

import { useState, useEffect } from 'react';
import { ApiResponse, IService, IUseHookResponse } from '../../interfaces';
import { GetProductServices } from '../providers';

export const useProductService = (initialQuery: string = ''): IUseHookResponse => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<IService[] | null>(null);
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const fetchAppointments = async (query: string = '') => {
        setIsLoading(true);
        try {
            const response = await GetProductServices(query);
            const responseData = response.data as ApiResponse;
            setData(responseData.data || null);
            setMessage(responseData.message || '');
            setSuccess(responseData.success || false);
        } catch (error) {
            setMessage('An error occurred while fetching product services');
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments(initialQuery);
    }, [initialQuery]);

    const refetch = async (query: string = initialQuery) => {
        await fetchAppointments(query);
    };

    return { isLoading, data, message, success, refetch };
}