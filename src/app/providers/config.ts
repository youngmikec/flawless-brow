import axios from 'axios';
import { getItem } from '../helpers';

const token = getItem('clientToken');

export const url: any = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const UI_AUTH_KEY: any = process.env.NEXT_PUBLIC_UI_AUTH_KEY;

// Only set headers if token exists
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.head['UiAuth'] = UI_AUTH_KEY;

export default axios;