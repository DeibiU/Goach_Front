import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  clearTokens,
  setTokens,
  setAuthUser,
} from './token-storage';

const API = process.env.NEXT_PUBLIC_API || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
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

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue other requests until refresh finishes
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post(`${API}/auth/refresh-token`, { refreshToken });

        const { token, expiresIn } = res.data;
        setTokens({ accessToken: token, expiresIn });

        // 🔥 Re-fetch user info
        const userRes = await axios.get(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthUser(userRes.data);

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
