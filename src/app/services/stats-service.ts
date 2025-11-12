import { api } from '../interceptor/api';

export interface Stats {
  id: string;
  calories: number;
  actualRpe: number;
  actualRir: number;
  actualPrm: number;
  completedAt: string;
  workout: { id: string };
  createdAt: string;
  updatedAt: string;
}

export interface StatsWithMax {
  stats: Stats;
  max_weight: number | null;
  routine_id: string;
  session_id: string;
}

export const useStats = () => {
  const getAllStats = async (): Promise<Stats[]> => {
    const { data } = await api.get('/stats');
    return data;
  };

  const getStatsByWorkout = async (workoutId: string): Promise<Stats[]> => {
    const { data } = await api.get(`/stats/filterByWorkout/${workoutId}`);
    return data;
  };

  const getStatsWithMax = async (sessionId: string): Promise<StatsWithMax> => {
    const { data } = await api.get(`/stats/by-session/${sessionId}/with-max`);
    return data;
  };

  return { getAllStats, getStatsByWorkout, getStatsWithMax };
};
