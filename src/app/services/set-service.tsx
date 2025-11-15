import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { Routine, Set, SetExercise } from '../interfaces/types';

interface SetContextType {
  getAllSetsInRoutine: (id: string | any) => Promise<any>;
  getSetById: (id: string | any) => Promise<any>;
  addSet: (id: string | any, body: Set) => Promise<Set>;
  updateSet: (routineId: string | any, body: Set) => Promise<any>;
  deleteSet: (routineId: string | any, setId: string | any) => Promise<any>;
  addSetExercise: (setId: string | any, body: SetExercise) => Promise<SetExercise>;
  updateSetExercise: (setId: string | any, setExerciseId: string | any, body: SetExercise) =>Promise<SetExercise>;
  deleteSetExercise: (setId: string | any, setExerciseId: string | any) => Promise<any>
}

interface SetProviderProps {
  children: ReactNode;
}

const SetContext = createContext<SetContextType | null>(null);

export const SetProvider: FC<SetProviderProps> = ({ children }) => {
  const getAllSetsInRoutine = async (id: string | any): Promise<any> => {
    const { data } = await api.get(`/sets/filterByRoutine/${id}`);
    return data;
  };

  const getSetById = async (id: string | any): Promise<any> =>{
        const { data } = await api.get(`/sets/${id}`);
    return data;
  }

  const addSet = async (id: string, body: Set): Promise<Set> => {
    const { data } = await api.post(`/sets/${id}`, body);

    return data;
  };

  const updateSet = async (routineId: string, body: Set): Promise<any> => {
    const { data } = await api.put(`/sets/${body.id}/routine/${routineId}`, body);

    return data;
  };

  const deleteSet = async (routineId: string | any, setId: string | any): Promise<any> => {
    const { data } = await api.delete(`/sets/${setId}/routine/${routineId}`);

    return data;
  };

  const addSetExercise = async (setId: string | any, body: SetExercise): Promise<SetExercise> => {
    const { data } = await api.post(`/set/${setId}/exercises`, body);

    return data;
  };

  const updateSetExercise = async (setId: string | any, setExerciseId: string | any,  body: SetExercise): Promise<SetExercise> => {
    const { data } = await api.put(`/set/${setId}/exercises/${setExerciseId}`, body);

    return data;
  };

  const deleteSetExercise = async (setId: string | any, setExerciseId: string | any): Promise<any> => {
    const { data } = await api.delete(`/set/${setId}/exercises/${setExerciseId}`);

    return data;
  };
  return (
    <SetContext.Provider
      value={{ getAllSetsInRoutine, getSetById, addSet, updateSet, deleteSet, addSetExercise, updateSetExercise, deleteSetExercise }}
    >
      {children}
    </SetContext.Provider>
  );
};

export const useSet = (): SetContextType => {
  const context = useContext(SetContext);
  if (!context) {
    throw new Error('useSet must be used within an SetProvider');
  }
  return context;
};
