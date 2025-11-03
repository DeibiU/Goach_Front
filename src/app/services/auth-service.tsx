import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { setTokens, clearTokens, getAccessToken } from '../interceptor/token-storage';
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
    if (getAccessToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  const signUp = async (body: UserSpec): Promise<User> => {
    const { data } = await api.post<User>('/auth/signup', body);
    return data;
  };

  const logIn = async (body: AuthBody): Promise<LoginResponse> => {
    clearTokens();
    const { data } = await api.post<LoginResponse>('/auth/login', body);
    setTokens({ accessToken: data.token, expiresIn: data.expiresIn });
    setIsAuthenticated(true);

    if (data.authUser) {
      setUser(data.authUser);
    } else {
      const user = await api.get<User>('/users/me');
      setUser(user.data);
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
