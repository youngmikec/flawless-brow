"use client";

import { useState, useEffect } from 'react';
import { ISchedule } from '../../interfaces/';
import { ApiResponse, IUseHookResponse } from '../../interfaces';
import { GetSchedules, GetPublicSchedules } from '../providers';

export const useSchedules = (initialQuery: string = ''): IUseHookResponse => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ISchedule[] | null>(null);
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const fetchSchedules = async (query: string = '', isPublic: boolean = false) => {
        setIsLoading(true);
        try {
            const response = await (isPublic ? GetPublicSchedules(query) : GetSchedules(query));

            const responseData = response.data as ApiResponse;
            setData(responseData.data || null);
            setMessage(responseData.message || '');
            setSuccess(responseData.success || false);
        } catch (error) {
            setMessage('An error occurred while fetching schedules');
            setSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSchedules(initialQuery);
    }, [initialQuery]);

    const refetch = async (query: string = initialQuery) => {
        await fetchSchedules(query);
    };

    return { isLoading, data, message, success, refetch };
}