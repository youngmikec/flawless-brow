import axios, { url } from './config';

const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;

export const GetAppointments = async (query: string = '') => {
  const url: string = `${BASE_URL}/api/appointment/${query}`;
  return await axios.get(url);
}

export const CreateAppointment = async (data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/appointment`, data);
};

export const UpdateAppointment = async (id: string, data: {[key: string]: any}) => {
  return axios.put(`${BASE_URL}/api/appointment/${id}`, data);
};

export const DeleteAppointment = async (id: string = '') => {
  return axios.delete(`${BASE_URL}/api/appointment/${id}`);
};
