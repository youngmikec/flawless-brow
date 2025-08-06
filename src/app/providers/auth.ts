import axios, { url } from './config';

export const BASE_URL: any = process.env.NEXT_PUBLIC_BASE_URL;


export const SignUpService = async (data: any) => {
  const url: string = `${BASE_URL}/auth/signup`;
  return await axios.post(url, data);
}

export const LoginService = async (data: any) => {
  const payload = { ...data };
  return axios.post(`${url}/api/auth`, payload);
}

export const EmailVerificationService = async (data: any) => {
  const url: string = `${BASE_URL}/auth/email/verify`;
  return await axios.post(url, data);
}

export const ServerHealthService = async () => {
  const url: string = `${BASE_URL}/welcome`;
  return await axios.get(url);
}

export const GoogleAuthService = async () => {
  const url: string = `${BASE_URL}/auth/google`;
  return await axios.get(url);
}

export const VerifyForgotPasswordCodeService = async (data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/auth/resetCode/verify`, data);
};

export const ForgotPasswordService = async (data: {[key: string]: any}) => {
  return axios.post(`${BASE_URL}/auth/forgotPassword`, data);
};

export const SendForgotPasswordCodeService = async (email: string = '') => {
  return axios.get(`${BASE_URL}/auth/resetCode/${email}`);
};