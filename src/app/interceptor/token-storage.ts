import { LoginResponse } from "../interfaces/types";

const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRY_KEY = 'acces_token_expiry';

export const setTokens = ({ accessToken, expiresIn }: { accessToken: string; expiresIn: number }) => {
	const expiry = Date.now()+expiresIn*1000;
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	localStorage.setItem(EXPIRY_KEY, expiry.toString());
};

export function getAccessToken(): string | null {
	const token = localStorage.getItem(ACCESS_TOKEN_KEY);
	const expiry = localStorage.getItem(EXPIRY_KEY);

	if (!token || !expiry) return null;

	if(Date.now() > parseInt(expiry, 10)){
		clearTokens();
		return null;
	}

	return token;
}

export const clearTokens = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(EXPIRY_KEY);
};
