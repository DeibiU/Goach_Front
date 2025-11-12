import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { Exercise } from '../interfaces/types';

interface ExerciseContextType {
  getAllExercises: () => Promise<Array<Exercise>>;
  getExerciseName: (name: string) => Promise<Exercise>;
  createExercise: (body: Exercise) => Promise<any>;
  updateExercise: (id: string, body: Exercise ) => Promise<any>
  deleteExercise: (id: string) => Promise<any>
}

interface ExerciseProviderProps {
  children: ReactNode;
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider: FC<ExerciseProviderProps> = ({ children }) => {
  const getAllExercises = async (): Promise<Array<Exercise>> => {
    const { data } = await api.get<Array<Exercise>>('/exercise');
    return data;
  };

  const getExerciseName = async (name: string): Promise<Exercise> => {
    const { data } = await api.get<Exercise>(`/exercise/filterByName/${name}`);
    return data;
  };

  const createExercise = async (body: Exercise): Promise<any> => {
    const { data } = await api.post("/exercise", body);
    
    return data;
  };

  const updateExercise = async (id: string, body: Exercise): Promise<any> => {
    const { data } = await api.put(`/exercise/${id}`, body);

    return data;
  };

  const deleteExercise = async (id: string): Promise<any> => {
    const {data} = await api.delete(`/exercise/${id}`);

    return data;
  }

  return (
    <ExerciseContext.Provider value={{ getAllExercises, getExerciseName, createExercise, updateExercise, deleteExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercise = (): ExerciseContextType => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercise must be used within an ExerciseProvider');
  }
  return context;
};
