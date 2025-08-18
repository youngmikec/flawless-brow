import axios, { url } from './config';

const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;

export const GetReportStatistics = async (query: string = '') => {
  const url: string = `${BASE_URL}/api/reports/${query}`;
  return await axios.get(url);
}