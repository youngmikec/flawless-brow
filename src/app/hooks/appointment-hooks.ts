"use client";

import { useState, useEffect } from 'react';
import { Appointment } from '../../interfaces/';
import { ApiResponse, IUseHookResponse } from '../../interfaces';
import { GetAppointments } from '../providers';

export const useAppointment = (initialQuery: string = ''): IUseHookResponse => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<Appointment[] | null>(null);
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const fetchAppointments = async (query: string = '') => {
        setIsLoading(true);
        try {
            const response = await GetAppointments(query);
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