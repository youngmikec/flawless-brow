import axios, { url } from './config';

const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;

export const GetProductServices = async (query: string = '') => {
  const url: string = `${BASE_URL}/api/product-services/${query}`;
  return await axios.get(url);
}

export const GetPublicProductServices = async (query: string = '') => {
  const url: string = `${BASE_URL}/api/product-services/public${query}`;
  return await axios.get(url);
}

export const CreateProductService = async (data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/product-services`, data);
};

export const UpdateProductService = async (id: string, data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/api/product-services/${id}`, data);
};

export const DeleteProductService = async (id: string = '') => {
  return axios.delete(`${BASE_URL}/api/product-services/${id}`);
};