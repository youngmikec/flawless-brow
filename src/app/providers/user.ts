import axios, { url } from './config';

const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;

export const GetUsers = async (query: string = '') => {
  const url: string = `${BASE_URL}/api/users/${query}`;
  return await axios.get(url);
}

export const CreateUser = async (data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/users`, data);
};

export const UpdateUser = async (id: string, data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/users/${id}`, data);
};

export const DeleteUser = async (id: string = '') => {
  return axios.delete(`${BASE_URL}/api/users/${id}`);
};
