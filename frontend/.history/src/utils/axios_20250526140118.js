

// import axios from "axios";

// export const createAxiosInstance = (token) => {
//   const instance = axios.create({
//     baseURL: "http://localhost:8000/api/v1",
//     withCredentials: true,
//   });

//   instance.interceptors.request.use((config) => {
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

//   return instance;
// };


// utils/axios.js
import axios from "axios";

const createAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

createAxiosInstance.interceptors.request.use((config) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default createAxiosInstance;
