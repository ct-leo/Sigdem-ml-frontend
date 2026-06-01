import axios from "axios";

import { setupAuthInterceptor } from "./auth.interceptor";
import { setupRefreshInterceptor } from "./refresh.interceptor";

export const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://sigdem-ml-backend.onrender.com/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

setupAuthInterceptor(apiClient);
setupRefreshInterceptor(apiClient);

export default apiClient;