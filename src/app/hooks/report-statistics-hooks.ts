"use client";

import { useState, useEffect } from 'react';
import { Appointment } from '../../interfaces/';
import { ApiResponse, IUseHookResponse } from '../../interfaces';
import { GetReportStatistics } from '../providers';

export const useReportStatistics = (initialQuery: string = ''): IUseHookResponse => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<Appointment[] | null>(null);
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const fetchReportStatistics = async (query: string = '') => {
        setIsLoading(true);
        try {
            const response = await GetReportStatistics(query);
            const responseData = response.data as ApiResponse;
            setData(responseData.data || null);
            setMessage(responseData.message || '');
            setSuccess(responseData.success || false);
        } catch (error) {
            setMessage('An error occurred while fetching reports');
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchReportStatistics(initialQuery);
    }, [initialQuery]);

    const refetch = async (query: string = initialQuery) => {
        await fetchReportStatistics(query);
    };

    return { isLoading, data, message, success, refetch };
}