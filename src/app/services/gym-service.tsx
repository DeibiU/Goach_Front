import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { api } from '../interceptor/api';
import { GURelation, Gym } from '../interfaces/types';

interface GymContextType {
  createGym: (body: Gym) => Gym | any;
  updateGym: (body: Gym, id: string) => Gym | any;
  getGymById: (id: string) => Gym | any;
  getAllGyms: () => Array<Gym> | any;
  getAllGymsByOwner: (ownerId: string) => Array<Gym> | any;

  getAllTrainersByGym: (gymId: string) => Array<GURelation> | any;
  getTrainerByGym: (gymId: string, trainerId: string) => GURelation | any;
  createTrainerRelation: (gymId: string, body: string) => GURelation | any;
  updateTrainerRelation: (gymId: string, trainerId:string, body: string) => GURelation | any;
  deleteTrainerRelation:(gymId: string, trainerId: string) => any;

  getAllTraineesByGym: (gymId: string) => Array<GURelation> | any;
  getTraineeByGym: (gymId: string, trainerId: string) => GURelation | any;
  createTraineeRelation: (gymId: string, body: string) => GURelation | any;
  updateTraineeRelation: (gymId: string, traineeId:string, body: string) => GURelation | any;
  deleteTraineeRelation:(gymId: string, traineeId: string) => any;
}

interface GymProviderProps {
  children: ReactNode;
}

const GymContext = createContext<GymContextType | null>(null);

export const GymProvider: FC<GymProviderProps> = ({ children }) => {
  const [gym, setGym] = useState<Gym | null>(null);

  const updateGym = async (body: Gym, id: string): Promise<Gym> => {
    const { data } = await api.put<Gym>(`/gym/${id}`, body);

    if (data) {
      setGym(data);
    }
    return data;
  };

  const createGym = async (body: Gym): Promise<Gym> => {
    const { data } = await api.post<Gym>(`/gym`, body);
    return data;
  };

  const getAllGyms = async (): Promise<Array<Gym>> => {
      const { data } = await api.get<Array<Gym>>(`/gym`);
      return data;
    };

    const getAllGymsByOwner = async (ownerId: string): Promise<Array<Gym>> => {
      const { data } = await api.get<Array<Gym>>(`/gym/${ownerId}`);
      return data;
    };

  const getGymById = async (id: string): Promise<Gym> => {
      const { data } = await api.get<Gym>(`/gym/${id}`);
  
      if (data) {
        setGym(data);
      }
      return data;
    };


    //Gym↔Trainer

    const getAllTrainersByGym = async (gymId: string): Promise<Array<GURelation>> => {
      const { data } = await api.get<Array<GURelation>>(`/api/gyms/${gymId}/trainers`);
      return data;
    }

    const getTrainerByGym = async (gymId: string, trainerId: string): Promise<GURelation> => {
      const { data } = await api.get<GURelation>(`/api/gyms/${gymId}/trainers/${trainerId}`);
      return data;
    }

    const createTrainerRelation = async (gymId: string, body: string): Promise<GURelation> => {
      const { data } = await api.post<GURelation>(`/api/gyms/${gymId}/trainers/`, body);
      return data;
    }

    const updateTrainerRelation = async (gymId: string, trainerId: string, body: string): Promise<GURelation> => {
      const { data } = await api.put<GURelation>(`/api/gyms/${gymId}/trainers/${trainerId}`, body);
      return data;
    }

    const deleteTrainerRelation = async (gymId: string, trainerId: string): Promise<GURelation> => {
      const { data } = await api.delete<GURelation>(`/api/gyms/${gymId}/trainers/${trainerId}`);
      return data;
    }

    //Gym↔Trainee

    const getAllTraineesByGym = async (gymId: string): Promise<Array<GURelation>> => {
      const { data } = await api.get<Array<GURelation>>(`/api/gyms/${gymId}/trainees`);
      return data;
    }

    const getTraineeByGym = async (gymId: string, traineeId: string): Promise<GURelation> => {
      const { data } = await api.get<GURelation>(`/api/gyms/${gymId}/trainees/${traineeId}`);
      return data;
    }

    const createTraineeRelation = async (gymId: string, body: string): Promise<GURelation> => {
      const { data } = await api.post<GURelation>(`/api/gyms/${gymId}/trainees/`, body);
      return data;
    }

    const updateTraineeRelation = async (gymId: string, traineeId: string, body: string): Promise<GURelation> => {
      const { data } = await api.put<GURelation>(`/api/gyms/${gymId}/trainees/${traineeId}`, body);
      return data;
    }

    const deleteTraineeRelation = async (gymId: string, traineeId: string): Promise<GURelation> => {
      const { data } = await api.delete<GURelation>(`/api/gyms/${gymId}/trainees/${traineeId}`);
      return data;
    }

  return <GymContext.Provider value={{ createGym, updateGym, getAllGyms, getAllGymsByOwner, getGymById, getAllTrainersByGym, getTrainerByGym, createTrainerRelation, updateTrainerRelation, deleteTrainerRelation, getAllTraineesByGym, getTraineeByGym, createTraineeRelation, updateTraineeRelation, deleteTraineeRelation }}>{children}</GymContext.Provider>;
};

export const useGym = (): GymContextType => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within an GymProvider');
  }
  return context;
};
