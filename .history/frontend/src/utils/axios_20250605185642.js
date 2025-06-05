
// import axios from "axios";

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// export const createAxiosInstance = () => {
 
// // console.log(import.meta.env);

//   const instance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
    

//     withCredentials: true,
//   });
//   console.log("ENV:", import.meta.env);
// console.log("API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

//   instance.interceptors.request.use((config) => {
//      const token = getCookie("token"); 
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

//   return instance;
// };

import axios from "axios";

// export const createAxiosInstance = () => {
//   const instance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     withCredentials: true, // ✅ Critical for sending cookies (especially to Render)
//   });

//   return instance;
// };


export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  // Add response interceptor to handle errors globally
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        console.error('Authentication error:', error);
        // You might want to dispatch a logout action here
      }
      return Promise.reject(error);
    }
  );

  return instance;
};