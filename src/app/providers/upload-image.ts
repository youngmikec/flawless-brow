import axios, { url } from './config';

const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;


export const UploadImageToServer = async (data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/upload-asset`, data);
};

