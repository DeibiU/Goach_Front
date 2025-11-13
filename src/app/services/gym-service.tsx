import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { api } from '../interceptor/api';
import { GTRelation, GURelation, Gym } from '../interfaces/types';

interface GymContextType {
  createGym: (body: Gym) => Gym | any;
  updateGym: (body: Gym, id: string | undefined) => Gym | any;
  getGymById: (id: string) => Gym | any;
  getAllGyms: () => Array<Gym> | any;
  getAllGymsByOwner: (ownerId: string) => Array<Gym> | any;

  getAllTrainersByGym: (gymId: string | undefined) => Array<GTRelation> | any;
  getTrainerByGym: (gymId: string, trainerId: string) => GTRelation | any;
  createTrainerRelation: (gymId: string | undefined, body: GTRelation) => GTRelation | any;
  updateTrainerRelation: (gymId: string, trainerId: string, body: GTRelation) => GTRelation | any;
  deleteTrainerRelation: (gymId: string, trainerId: string) => any;

  getAllTraineesByGym: (gymId: string | undefined) => Array<GURelation> | any;
  getTraineeByGym: (gymId: string, trainerId: string) => GURelation | any;
  createTraineeRelation: (gymId: string | undefined, body: GURelation) => GURelation | any;
  updateTraineeRelation: (gymId: string, traineeId: string, body: GURelation) => GURelation | any;
  deleteTraineeRelation: (gymId: string, traineeId: string) => any;
}

interface GymProviderProps {
  children: ReactNode;
}

const GymContext = createContext<GymContextType | null>(null);

export const GymProvider: FC<GymProviderProps> = ({ children }) => {
  const [gym, setGym] = useState<Gym | null>(null);

  const updateGym = async (body: Gym, id: string | undefined): Promise<Gym> => {
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

  const getAllTrainersByGym = async (gymId: string | undefined): Promise<Array<GTRelation>> => {
    const { data } = await api.get<Array<GTRelation>>(`/gyms/${gymId}/trainers`);
    return data;
  };

  const getTrainerByGym = async (gymId: string, trainerId: string): Promise<GTRelation> => {
    const { data } = await api.get<GTRelation>(`/gyms/${gymId}/trainers/${trainerId}`);
    return data;
  };

  const createTrainerRelation = async (
    gymId: string | undefined,
    body: GTRelation,
  ): Promise<GTRelation> => {
    const { data } = await api.post<GTRelation>(`/gyms/${gymId}/trainers`, body);
    return data;
  };

  const updateTrainerRelation = async (
    gymId: string,
    trainerId: string,
    body: GTRelation,
  ): Promise<GTRelation> => {
    const { data } = await api.put<GTRelation>(`/gyms/${gymId}/trainers/${trainerId}`, body);
    return data;
  };

  const deleteTrainerRelation = async (gymId: string, trainerId: string): Promise<any> => {
    const { data } = await api.delete<GTRelation>(`/gyms/${gymId}/trainers/${trainerId}`);
    return data;
  };

  //Gym↔Trainee

  const getAllTraineesByGym = async (gymId: string | undefined): Promise<Array<GURelation>> => {
    const { data } = await api.get<Array<GURelation>>(`/gyms/${gymId}/trainees`);
    return data;
  };

  const getTraineeByGym = async (gymId: string, traineeId: string): Promise<GURelation> => {
    const { data } = await api.get<GURelation>(`/gyms/${gymId}/trainees/${traineeId}`);
    return data;
  };

  const createTraineeRelation = async (
    gymId: string | undefined,
    body: GURelation,
  ): Promise<GURelation> => {
    const { data } = await api.post<GURelation>(`/gyms/${gymId}/trainees`, body);
    return data;
  };

  const updateTraineeRelation = async (
    gymId: string,
    traineeId: string,
    body: GURelation,
  ): Promise<GURelation> => {
    const { data } = await api.put<GURelation>(`/gyms/${gymId}/trainees/${traineeId}`, body);
    return data;
  };

  const deleteTraineeRelation = async (gymId: string, traineeId: string): Promise<any> => {
    const { data } = await api.delete<GURelation>(`/gyms/${gymId}/trainees/${traineeId}`);
    return data;
  };

  return (
    <GymContext.Provider
      value={{
        createGym,
        updateGym,
        getAllGyms,
        getAllGymsByOwner,
        getGymById,
        getAllTrainersByGym,
        getTrainerByGym,
        createTrainerRelation,
        updateTrainerRelation,
        deleteTrainerRelation,
        getAllTraineesByGym,
        getTraineeByGym,
        createTraineeRelation,
        updateTraineeRelation,
        deleteTraineeRelation,
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = (): GymContextType => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within an GymProvider');
  }
  return context;
};
