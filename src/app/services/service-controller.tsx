import React from 'react';
import { AuthProvider } from './auth-service';
import { UserProvider } from './user-service';
import { RoutineProvider } from './routine-service';

interface Props {
  children: React.ReactNode;
}

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <RoutineProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </RoutineProvider>
  );
};

export default AppProviders;
