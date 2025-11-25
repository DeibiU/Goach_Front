import React, { createContext, useContext, ReactNode, FC } from 'react';
import { api } from '../interceptor/api';
import { WorkoutSession, User, Routine, Gym } from '../interfaces/types';

interface WorkoutSessionContextType {
  getAll: () => Promise<Array<WorkoutSession>>;
  getByTrainee: (email: string) => Promise<Array<WorkoutSession>>;
  getByDateRange: (start: string, end: string) => Promise<Array<WorkoutSession>>;
  createSession: (body: WorkoutSession) => Promise<any>;
  deleteSession: (id: string) => Promise<any>;
}

interface ProviderProps {
  children: ReactNode;
}

const WorkoutSessionContext = createContext<WorkoutSessionContextType | null>(null);

export const WorkoutSessionProvider: FC<ProviderProps> = ({ children }) => {

  const getAll = async (): Promise<Array<WorkoutSession>> => {
    const { data } = await api.get('/workout');
    return data;
  };

  const getByTrainee = async (email: string): Promise<Array<WorkoutSession>> => {
    const { data } = await api.get(`/workout/by-trainee/${email}`);
    return data;
  };

  const getByDateRange = async (start: string, end: string): Promise<Array<WorkoutSession>> => {
    const { data } = await api.get(`/workout/by-date`, {
      params: { start, end }
    });
    return data;
  };

  const createSession = async (body: WorkoutSession): Promise<any> => {
    console.log(body.finishedAt)
    const { data } = await api.post('/workout', body);
    return data;
  };

  const deleteSession = async (id: string): Promise<any> => {
    const { data } = await api.delete(`/workout/${id}`);
    return data;
  };

  return (
    <WorkoutSessionContext.Provider
      value={{ getAll, getByTrainee, getByDateRange, createSession, deleteSession }}
    >
      {children}
    </WorkoutSessionContext.Provider>
  );
};

export const useWorkoutSession = (): WorkoutSessionContextType => {
  const context = useContext(WorkoutSessionContext);
  if (!context) {
    throw new Error('useWorkoutSession must be used inside WorkoutSessionProvider');
  }
  return context;
};
