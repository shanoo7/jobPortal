
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


// In your frontend axios configuration
export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // This is critical
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  // Add request interceptor to ensure token is sent
  instance.interceptors.request.use(config => {
    console.log('Sending request with cookies:', document.cookie);
    return config;
  });

  return instance;
};
