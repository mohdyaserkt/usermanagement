import axios, { AxiosError, AxiosInstance,  } from 'axios';

const baseURL = import.meta.env.VITE_BASE_URl


export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});


axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

