import React, { createContext, useContext, ReactNode, FC } from 'react';

import { api } from '../interceptor/api';
import { Stats } from '../interfaces/types';

interface StatsContextType {
  getAllStats: () => Promise<Stats[]>;
  getStatsByWorkout: (sessionId: string) => Promise<Stats[]>;
  getStatsByUser: (userId: string | undefined) => Promise<Stats[]>;
  getStatsByRoutineAndCompletedAt: (routineName: string, completedAt: string) => Promise<Stats[]>;
  createStats: (body: Stats) => Promise<any>;
  updateStats: (id: string, body: Stats) => Promise<any>;
  deleteStats: (id: string) => Promise<any>;
}

interface StatsProviderProps {
  children: ReactNode;
}

const StatsContext = createContext<StatsContextType | null>(null);

export const StatsProvider: FC<StatsProviderProps> = ({ children }) => {
  const getAllStats = async (): Promise<Stats[]> => {
    const { data } = await api.get<Stats[]>('/stats');
    return data;
  };

  const getStatsByWorkout = async (sessionId: string): Promise<Stats[]> => {
    const { data } = await api.get<Stats[]>(`/stats/by-workout/${sessionId}`);
    return data;
  };

  const getStatsByUser = async (userId: string | undefined): Promise<Stats[]> => {
    const { data } = await api.get<Stats[]>(`/stats/user/${userId}`);
    return data;
  };

  const getStatsByRoutineAndCompletedAt = async (
    routineName: string,
    completedAt: string,
  ): Promise<Stats[]> => {
    const { data } = await api.get<Stats[]>(`/stats/filter`, {
      params: { routineName, completedAt },
    });
    return data;
  };

  const createStats = async (body: Stats): Promise<any> => {
    const { data } = await api.post(`/stats`, body);
    return data;
  };

  const updateStats = async (id: string, body: Stats): Promise<any> => {
    const { data } = await api.put(`/stats/${id}`, body);
    return data;
  };

  const deleteStats = async (id: string): Promise<any> => {
    const { data } = await api.delete(`/stats/${id}`);
    return data;
  };

  return (
    <StatsContext.Provider
      value={{
        getAllStats,
        getStatsByWorkout,
        getStatsByUser,
        getStatsByRoutineAndCompletedAt,
        createStats,
        updateStats,
        deleteStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = (): StatsContextType => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

export { Stats };
