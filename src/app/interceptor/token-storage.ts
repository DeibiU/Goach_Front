import storage from './storage';

const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRY_KEY = 'access_token_expiry';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth_user';

export const setTokens = async ({
  accessToken,
  expiresIn,
  refreshToken,
}: {
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
}) => {
  const expiry = Date.now() + expiresIn * 1000;
  await storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  await storage.setItem(EXPIRY_KEY, expiry.toString());
  if (refreshToken) await storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = async (): Promise<string | null> => {
  const token = await storage.getItem(ACCESS_TOKEN_KEY);
  const expiry = await storage.getItem(EXPIRY_KEY);

  if (!token || !expiry) return null;
  if (Date.now() > parseInt(expiry, 10)) {
    await clearTokens();
    return null;
  }
  return token;
};

export const getRefreshToken = async (): Promise<string | null> =>
  storage.getItem(REFRESH_TOKEN_KEY);

export const setAuthUser = async (user: any) => storage.setItem(USER_KEY, JSON.stringify(user));

export const getAuthUser = async () => {
  const user = await storage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearTokens = async () => {
  await storage.removeItem(ACCESS_TOKEN_KEY);
  await storage.removeItem(REFRESH_TOKEN_KEY);
  await storage.removeItem(EXPIRY_KEY);
  await storage.removeItem(USER_KEY);
};
