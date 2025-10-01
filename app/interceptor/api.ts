import axios from 'axios';

import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './token-storage';

const API = process.env.NEXT_PUBLIC_API || 'http://localhost:3000';

export const api = axios.create({
	baseURL: API,
	headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use(config => {
	const token = getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});


api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			const refreshToken = getRefreshToken();

			if (refreshToken) {
				try {
					const { data } = await axios.post(`${API}/refresh-token`, {
						token: refreshToken,
					});

					setTokens({ access: data.accessToken, refresh: data.refreshToken });

					originalRequest._retry = true;
					originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

					return api(originalRequest);
				} catch (err) {
					clearTokens();
				}
			}
		}
		return Promise.reject(error);
	},
);
