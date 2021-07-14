import axios, { AxiosInstance } from 'axios';

function getAxiosInstance(baseURL: string, postfix?: string): AxiosInstance {
  const instance = axios.create({
    baseURL: postfix ? `${baseURL}/${postfix}` : baseURL,
  });

  instance.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
      },
    };
  });

  return instance;
}

export const baseAxios = getAxiosInstance(
  process.env.BASE_API_URL || 'http://localhost:3000',
  'api'
);
export const bankApiAxios = getAxiosInstance(
  process.env.BANK_API_URL || 'http://localhost:4000'
);
