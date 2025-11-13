import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import {
  setTokens,
  clearTokens,
  getAccessToken,
  setAuthUser,
  getAuthUser,
} from '../interceptor/token-storage';
import { LoginResponse, User, AuthBody, UserSpec } from '../interfaces/types';

interface AuthContextType {
  logIn: (body: AuthBody) => Promise<LoginResponse>;
  signUp: (body: UserSpec) => Promise<User>;
  logOut: () => void;
  changePassword: (body: UserSpec) => Promise<User | any>;
  sendEmail: (body: UserSpec) => Promise<String>;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();

      if (token) {
        try {
          const storedUser = getAuthUser();
          if (storedUser) {
            setUser(storedUser);
            setIsAuthenticated(true);
            return;
          }

          // Otherwise, fetch user info again
          const { data } = await api.get<User>('/users/me');
          setUser(data);
          setAuthUser(data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error restoring user, trying refresh...');
        }
      }

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const res = await api.post<LoginResponse>('/auth/refresh-token', { refreshToken });
          const { token: newToken, expiresIn, authUser } = res.data;

          setTokens({
            accessToken: newToken,
            refreshToken,
            expiresIn,
          });

          if (authUser) {
            setUser(authUser);
            setAuthUser(authUser);
          } else {
            const { data } = await api.get<User>('/users/me');
            setUser(data);
            setAuthUser(data);
          }

          setIsAuthenticated(true);
        } catch (err) {
          console.error('Token refresh failed:', err);
          clearTokens();
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        clearTokens();
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    initializeAuth();
  }, []);

  const signUp = async (body: UserSpec): Promise<User> => {
    const { data } = await api.post<User>('/auth/signup', body);
    return data;
  };

  const logIn = async (body: AuthBody): Promise<LoginResponse> => {
    clearTokens();
    const { data } = await api.post<LoginResponse>('/auth/login', body);
    setTokens({
      accessToken: data.token,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
    });
    setIsAuthenticated(true);

    if (data.authUser) {
      setUser(data.authUser);
      setAuthUser(data.authUser);
    } else {
      const user = await api.get<User>('/users/me');
      setUser(user.data);
      setAuthUser(user.data);
    }

    return data;
  };

  const logOut = () => {
    clearTokens();
    console.log(user);
    setUser(null);
    setIsAuthenticated(false);
    console.log(user);
  };

  const sendEmail = async (body: UserSpec): Promise<String> => {
    const { data } = await api.put<String>('/auth/emailCode', body);
    return data;
  };

  const changePassword = async (body: UserSpec): Promise<User | any> => {
    const { data } = await api.put('/auth/passwordChange', body);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ logIn, signUp, logOut, isAuthenticated, user, sendEmail, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
