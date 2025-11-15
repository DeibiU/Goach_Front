import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { Exercise, Routine, User, UserSpec } from '../interfaces/types';

interface RoutineContextType {
  getRoutine: (id: string | any) => Promise<Routine>;
  getAllRoutines: (id: string | any) => Promise<Array<Routine>>;
  createRoutine: (body: Routine) => Promise<Routine>;
  updateRoutine: (id: string, body: Routine) => Promise<any>;
  deleteRoutine: (id: string | undefined) => Promise<any>;
}

interface RoutineProviderProps {
  children: ReactNode;
}

const RoutineContext = createContext<RoutineContextType | null>(null);

export const RoutineProvider: FC<RoutineProviderProps> = ({ children }) => {
  const getRoutine = async (id: string | any): Promise<Routine> => {
    const { data } = await api.get(`/routine/${id}`);

    return data;
  };

  const getAllRoutines = async (id: string | any): Promise<Array<Routine>> => {
    const { data } = await api.get<Array<Routine>>(`/routine/filterByUser/${id}`);

    if (data.length == 0) {
      return [];
    }

    return data;
  };

  const createRoutine = async (body: Routine): Promise<Routine> => {
    const { data } = await api.post('/routine', body);

    return data;
  };

  const updateRoutine = async (id: string, body: Routine): Promise<any> => {
    const { data } = await api.put(`/routine/${id}`, body);

    return data;
  };

  const deleteRoutine = async (id: string | undefined): Promise<any> => {
    const { data } = await api.delete(`/routine/${id}`);

    return data;
  };

  return (
    <RoutineContext.Provider
      value={{ getRoutine, getAllRoutines, createRoutine, updateRoutine, deleteRoutine }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutine = (): RoutineContextType => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutine must be used within an RoutineProvider');
  }
  return context;
};
