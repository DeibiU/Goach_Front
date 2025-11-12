import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { Routine, Set } from '../interfaces/types';

interface SetContextType {
  getAllSetsInRoutine: (id: string | any) => Promise<any>;
  addSet: ( id: string , body: Set) => Promise<Set>;
  updateSet: (routineId : string, setId: string, body: Routine) => Promise<any>;
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

  const addSet = async ( id: string, body: Set ): Promise<Set> => {
    const { data } = await api.post(`/sets/${id}`, body);

    return data;
  };

  const updateSet = async (routineId: string, setId:string, body: Routine): Promise<any> => {
    const { data } = await api.put(`/sets/${setId}/routine/${routineId}`, body);

    return data;
  };

  return (
    <SetContext.Provider value={{ getAllSetsInRoutine, addSet, updateSet }}>
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
