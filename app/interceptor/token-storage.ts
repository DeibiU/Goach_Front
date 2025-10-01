const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export const setTokens = (tokens: { access: string; refresh?: string }) => {
	localStorage.setItem(ACCESS_KEY, tokens.access);
	if (tokens.refresh) {
		localStorage.setItem(REFRESH_KEY, tokens.refresh);
	}
};

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const clearTokens = () => {
	localStorage.removeItem(ACCESS_KEY);
	localStorage.removeItem(REFRESH_KEY);
};
