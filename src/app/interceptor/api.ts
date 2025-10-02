import axios from 'axios';
import { getAccessToken, clearTokens } from './token-storage';

const API = process.env.NEXT_PUBLIC_API || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json'},
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearTokens();

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
