import axios from 'axios';
import { getItem } from '../helpers';

const token = getItem('clientToken');

export const url: any = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Only set headers if token exists
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
axios.defaults.headers.common['Content-Type'] = `application/json`;

export default axios;