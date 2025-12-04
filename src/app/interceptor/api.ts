import axios from 'axios';
import { Platform } from 'react-native';

import {
  getAccessToken,
  getRefreshToken,
  clearTokens,
  setTokens,
  setAuthUser,
} from './token-storage';

const LOCAL_IP = '192.168.150.1';
const PORT = 8080;

export const API = Platform.select({
  web: `http://localhost:${PORT}`,
  default: `http://${LOCAL_IP}:${PORT}`,
});

export const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post(`${API}/auth/refresh-token`, { refreshToken });

        const { token, expiresIn } = res.data;
        await setTokens({ accessToken: token, expiresIn });

        const userRes = await axios.get(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await setAuthUser(userRes.data);

        isRefreshing = false;
        onRefreshed(token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        clearTokens();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
