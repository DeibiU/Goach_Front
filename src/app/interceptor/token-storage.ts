import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRY_KEY = 'access_token_expiry';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Determina si el entorno actual es web o nativo.
 */
const isWeb = Platform.OS === 'web';

/**
 * Setea tokens de autenticación y su expiración.
 */
export const setTokens = async ({
  accessToken,
  expiresIn,
}: {
  accessToken: string;
  expiresIn: number;
}) => {
  const expiry = Date.now() + expiresIn * 1000;

  if (isWeb) {
    // Web: usa localStorage
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(EXPIRY_KEY, expiry.toString());
  } else {
    // Nativo: usa AsyncStorage
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(EXPIRY_KEY, expiry.toString());
  }
};

/**
 * Obtiene el access token si existe y no ha expirado.
 */
export const getAccessToken = async (): Promise<string | null> => {
  let token: string | null = null;
  let expiry: string | null = null;

  if (isWeb) {
    token = localStorage.getItem(ACCESS_TOKEN_KEY);
    expiry = localStorage.getItem(EXPIRY_KEY);
  } else {
    token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    expiry = await AsyncStorage.getItem(EXPIRY_KEY);
  }

  if (!token || !expiry) return null;

  if (Date.now() > parseInt(expiry, 10)) {
    await clearTokens();
    return null;
  }

  return token;
};

/**
 * Obtiene el refresh token.
 */
export const getRefreshToken = async (): Promise<string | null> => {
  return isWeb
    ? localStorage.getItem(REFRESH_TOKEN_KEY)
    : await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Limpia todos los tokens.
 */
export const clearTokens = async () => {
  if (isWeb) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  } else {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, EXPIRY_KEY]);
  }
};
