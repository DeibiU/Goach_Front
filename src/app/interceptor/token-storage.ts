const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRY_KEY = 'access_token_expiry';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth_user';

export const setTokens = ({
  accessToken,
  expiresIn,
  refreshToken,
}: {
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
}) => {
  const expiry = Date.now() + expiresIn * 1000;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(EXPIRY_KEY, expiry.toString());
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = (): string | null => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!token || !expiry) return null;
  if (Date.now() > parseInt(expiry, 10)) {
    clearTokens();
    return null;
  }
  return token;
};

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const setAuthUser = (user: any) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

export const getAuthUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
  localStorage.removeItem(USER_KEY);
};