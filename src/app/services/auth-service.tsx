import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { setTokens, clearTokens, getAccessToken } from '../interceptor/token-storage';
import { LoginResponse, User, AuthBody } from '../interfaces/types';

interface AuthContextType {
  logIn: (body: AuthBody) => Promise<LoginResponse>;
  signUp: (body: User) => Promise<User>;
  logOut: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (getAccessToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  const signUp = async (body: User): Promise<User> => {
    const { data } = await api.post<User>('/auth/signup', body);
    return data;
  };

  const logIn = async (body: AuthBody): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', body);
    setTokens({ accessToken: data.token, expiresIn: data.expiresIn });
    setIsAuthenticated(true);

    if(data.authUser) {
      setUser(data.authUser);
    } else {
      const user = await api.get<User>("/users/me");
      setUser(user.data);
    }

    return data;
  };

  const logOut = () => {
    clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ logIn, signUp, logOut, isAuthenticated, user }}>
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
