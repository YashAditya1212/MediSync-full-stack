import axios from "axios";
import { API_BASE_URL } from "@/config/api";

axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add global error interceptors for Next.js instance
const instances = [axios.defaults, axiosAuth.interceptors.response];
// Note: axios.create returns an object where we can add interceptors
[axios, axiosAuth].forEach(instance => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error(`[API Error] ${error.response.status} | ${error.config?.url}`, error.response.data);
      } else {
        console.error(`[API Network Error] ${error.message}`);
      }
      return Promise.reject(error);
    }
  );
});
