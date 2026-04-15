import axios from "axios";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      config.headers.atoken = adminToken;
    }
    const doctorToken = localStorage.getItem("doctorToken");
    if (doctorToken) {
      config.headers.dtoken = doctorToken;
    }
    return config;
  },
  (error) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      console.error(`[API Error] ${response.status} | ${response.config.url}`, response.data);
    } else {
      console.error(`[API Network Error] ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
