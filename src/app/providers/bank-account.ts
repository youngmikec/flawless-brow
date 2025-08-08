import axios, { url } from './config';

const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;

export const GetBankAccounts = async (query: string = '') => {
  const url: string = `${BASE_URL}/api/bank-accounts/${query}`;
  return await axios.get(url);
}

export const CreateBankAccount = async (data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/bank-accounts`, data);
};

export const UpdateBankAccount = async (id: string, data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/bank-accounts/${id}`, data);
};

export const DeleteBankAccount = async (id: string = '') => {
  return axios.delete(`${BASE_URL}/api/bank-accounts/${id}`);
};
