"use client";

import { useState, useEffect } from 'react';
import { BankAccount } from '../../interfaces/bank-account';
import { ApiResponse, IUseHookResponse } from '../../interfaces';
import { GetUsers } from '../providers';

export const useUser = (initialQuery: string = ''): IUseHookResponse => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<BankAccount[] | null>(null);
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const fetchUsers = async (query: string = '') => {
        setIsLoading(true);
        try {
            const response = await GetUsers(query);
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
        fetchUsers(initialQuery);
    }, [initialQuery]);

    const refetch = async (query: string = initialQuery) => {
        await fetchUsers(query);
    };

    return { isLoading, data, message, success, refetch };
}