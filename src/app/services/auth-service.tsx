import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import {
  setTokens,
  clearTokens,
  getAccessToken,
  setAuthUser,
  getAuthUser,
  getRefreshToken,
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
  userRole: string;
  updateUserInContext: (user: User) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>('');

useEffect(() => {
  const initializeAuth = async () => {
    const token = await getAccessToken(); // 🚀 Await here!

    if (token) {
      try {
        const storedUser = await getAuthUser(); // 🚀 Also await
        if (storedUser) {
          setUser(storedUser);
          setUserRole(storedUser.role);
          setIsAuthenticated(true);
          return;
        }

        const { data } = await api.get<User>('/users/me');
        setUser(data);
        setUserRole(data.role);
        await setAuthUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error restoring user, trying refresh...');
      }
    }

    const refreshToken = await getRefreshToken(); 
    if (refreshToken) {
      try {
        const res = await api.post<LoginResponse>('/auth/refresh-token', { refreshToken });
        const { token: newToken, expiresIn, authUser } = res.data;

        await setTokens({
          accessToken: newToken,
          refreshToken,
          expiresIn,
        });

        if (authUser) {
          setUser(authUser);
          setUserRole(authUser.role);
          await setAuthUser(authUser);
        } else {
          const { data } = await api.get<User>('/users/me');
          setUser(data);
          setUserRole(data.role);
          await setAuthUser(data);
        }

        setIsAuthenticated(true);
        return;
      } catch (err: any) {
        console.error('Token refresh failed:', err);
        clearTokens();
        setIsAuthenticated(false);
        return;
      }
    }

    clearTokens();
    setUser(null);
    setUserRole('');
    setIsAuthenticated(false);
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
      setUserRole(data.authUser.role);
      setAuthUser(data.authUser);
    } else {
      const userData = await api.get<User>('/users/me');
      setUser(userData.data);
      setUserRole(userData.data.role);
      setAuthUser(userData.data);
    }

    return data;
  };

  const logOut = () => {
    clearTokens();
    setUser(null);
    setUserRole('');
    setIsAuthenticated(false);
  };

  const sendEmail = async (body: UserSpec): Promise<String> => {
    const { data } = await api.put<String>('/auth/emailCode', body);
    return data;
  };

  const changePassword = async (body: UserSpec): Promise<User | any> => {
    const { data } = await api.put('/auth/passwordChange', body);
    return data;
  };

  const updateUserInContext = (updatedUser: User) => {
    setUser(updatedUser);
    setAuthUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        signUp,
        logOut,
        isAuthenticated,
        user,
        userRole,
        updateUserInContext,
        sendEmail,
        changePassword,
      }}
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
