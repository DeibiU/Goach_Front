import React from 'react';
import { AuthProvider } from './auth-service';
import { UserProvider } from './user-service';
import { RoutineProvider } from './routine-service';
import { GymProvider } from './gym-service';
import { ExerciseProvider } from './exercise-service';

interface Props {
  children: React.ReactNode;
}

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <RoutineProvider>
      <GymProvider>
        <ExerciseProvider>
          <AuthProvider>
            <UserProvider>{children}</UserProvider>
          </AuthProvider>
        </ExerciseProvider>
      </GymProvider>
    </RoutineProvider>
  );
};

export default AppProviders;
