
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export const createAxiosInstance = () => {
 

  const instance = axios.create({
    // baseURL: "http://localhost:8000/api/v1",
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",

    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
     const token = getCookie("token"); // 👈 directly read from cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};
