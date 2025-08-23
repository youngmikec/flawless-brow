import axios, { url } from './config';

const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;

export const GetSchedules = async (query: string = '') => {
  const url: string = `${BASE_URL}/api/schedules/${query}`;
  return await axios.get(url);
}

export const GetPublicSchedules = async (query: string = '') => {
  const url: string = `${BASE_URL}/api/schedules/public${query}`;
  return await axios.get(url);
}

export const CreateSchedule = async (data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/schedules`, data);
};

export const UpdateSchedule = async (id: string, data: {[key: string]: any}) => {
  return axios.put(`${BASE_URL}/api/schedules/${id}`, data);
};

export const DeleteSchedule = async (id: string = '') => {
  return axios.delete(`${BASE_URL}/api/schedules/${id}`);
};
