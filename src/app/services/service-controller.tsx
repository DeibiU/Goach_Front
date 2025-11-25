import React from 'react';
import { AuthProvider } from './auth-service';
import { GymProvider } from './gym-service';
import { ExerciseProvider } from './exercise-service';
import { RoutineProvider } from './routine-service';
import { SetProvider } from './set-service';
import { UserProvider } from './user-service';
import { WorkoutSessionProvider } from './session-service';
import { StatsProvider } from './stats-service';

interface Props {
  children: React.ReactNode;
}

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <SetProvider>
      <RoutineProvider>
        <GymProvider>
          <ExerciseProvider>
            <WorkoutSessionProvider>
              <StatsProvider>
                <AuthProvider>
                  <UserProvider>{children}</UserProvider>
                </AuthProvider>
              </StatsProvider>
            </WorkoutSessionProvider>
          </ExerciseProvider>
        </GymProvider>
      </RoutineProvider>
    </SetProvider>
  );
};

export default AppProviders;
