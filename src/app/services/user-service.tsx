import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { User, UserSpec } from '../interfaces/types';

interface UserContextType {
  changePassword: (id: string, body: User) => Promise<User>;
  sendEmail: (body: UserSpec) => Promise<String>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const changePassword = async (id: string | undefined, body: User): Promise<User> => {
    const { data } = await api.post<User>(`/users/password/${id}`, body);
    return data;
  };

  const sendEmail = async (body: UserSpec): Promise<String> => {
    const { data } = await api.post<String>('/users/email', body);
    return data;
  };

  return (
    <UserContext.Provider value={{ changePassword, sendEmail }}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }
  return context;
};
