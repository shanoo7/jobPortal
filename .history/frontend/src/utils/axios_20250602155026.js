
// import axios from "axios";

import axios from "axios";

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// export const createAxiosInstance = () => {
 
// console.log(import.meta.env);

//   const instance = axios.create({
//     // baseURL: "http://localhost:8000/api/v1",
//     baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",

//     withCredentials: true,
//   });
//   console.log("ENV:", import.meta.env);
// console.log("API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

//   instance.interceptors.request.use((config) => {
//      const token = getCookie("token"); // 👈 directly read from cookie
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

//   return instance;
// };


export const createAxiosInstance = () => {
  // Always use this pattern for Vite env variables
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        // Handle token expiration
        console.error("Authentication error");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
