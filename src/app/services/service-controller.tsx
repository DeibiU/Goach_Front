import React from 'react';
import { AuthProvider } from './auth-service';
import { GymProvider } from './gym-service';
import { RoutineProvider } from './routine-service';
import { SetProvider } from './set-service';
import { UserProvider } from './user-service';

interface Props {
  children: React.ReactNode;
}

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <SetProvider>
      <RoutineProvider>
        <GymProvider>
          <AuthProvider>
            <UserProvider>{children}</UserProvider>
          </AuthProvider>
        </GymProvider>
      </RoutineProvider>
    </SetProvider>
  );
};

export default AppProviders;
