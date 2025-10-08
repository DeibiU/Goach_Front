import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { setTokens, clearTokens, getAccessToken } from '../interceptor/token-storage';
import { LoginResponse, User, AuthBody } from '../interfaces/types';

interface AuthContextType {
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

  const updateUser = async (body: User): Promise<User> => {
    const { data } = await api.put<User>('/user', body);
        
    if(data.user) {
      setUser(data.user);
    } else {
      const user = await api.get<User>("/users/me");
      setUser(user.data);
    }

    return data;
  };

  const logIn = async (body: AuthBody): Promise<LoginResponse> => {
    clearTokens();
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
    console.log(user);
    setUser(null);
    setIsAuthenticated(false);
    console.log(user);
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
