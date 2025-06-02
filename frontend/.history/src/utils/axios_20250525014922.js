

import axios from "axios";

export const createAxiosInstance = (token) => {
  const instance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};
