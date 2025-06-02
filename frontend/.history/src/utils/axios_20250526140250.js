

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


// utils/createAxiosInstance.js
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export const createAxiosInstance = () => {
  const token = getCookie("token"); // 👈 directly read from cookie

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
