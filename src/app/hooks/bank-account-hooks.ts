'use client';

import { useState, useEffect } from 'react';
import { GetBankAccounts } from '../providers/bank-account';
import { BankAccount } from '../../interfaces/bank-account';
import { ApiResponse, IUseHookResponse } from '../../interfaces';



export const useBankAccounts = (initialQuery: string = ''): IUseHookResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<BankAccount[] | null>(null);
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const fetchBankAccounts = async (query: string = '') => {
    setIsLoading(true);
    try {
      const response = await GetBankAccounts(query);
      const responseData = response.data as ApiResponse;
      
      setData(responseData.data || null);
      setMessage(responseData.message || '');
      setSuccess(responseData.success || false);
    } catch (error: any) {
      setData(null);
      setMessage(error.message || 'Failed to fetch bank accounts');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBankAccounts(initialQuery);
  }, [initialQuery]);

  const refetch = async (query: string = initialQuery) => {
    await fetchBankAccounts(query);
  };

  return { isLoading, data, message, success, refetch };
};