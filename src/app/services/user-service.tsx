import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { api } from '../interceptor/api';
import { TTRelation, User, UserSpec } from '../interfaces/types';

interface UserContextType {
  updateUser: (body: UserSpec, id: string) => User | any;
  getUserById: (id: string) => User | any;
  getUserByName: (name: string) => User | any;

  getAllUsersByTrainer: (trainerId: string) => Array<User> | any;
  createTTRelation: (body: TTRelation, trainerId: string) => User | any;
  updateTTRelation: (body: TTRelation, trainerId: string, traineeId: string) => User | any;
  deleteTTRelation: (trainerId: string, traineeId: string) => any;

  getAllTrainersByTrainee: (trainerId: string, traineeId: string) => Array<User> | any;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = async (body: UserSpec, id: string): Promise<UserSpec> => {
    const { data } = await api.put<UserSpec>(`/users/${id}`, body);
    return data;
  };

  const getUserById = async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);

    if (data) {
      setUser(data);
    }
    return data;
  };

  const getUserByName = async (name: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${name}`);

    if (data) {
      setUser(data);
    }
    return data;
  };

  //As a trainer

  const getAllUsersByTrainer = async (trainerId: string): Promise<Array<TTRelation>> => {
    const { data } = await api.get<Array<TTRelation>>(`/trainers/${trainerId}/trainees`);
    return data;
  };

  const createTTRelation = async (body: TTRelation, trainerId: string): Promise<TTRelation | any> => {
    const { data } = await api.post<TTRelation>(`/trainers/${trainerId}/trainees/`, body);
    return data;
  };

  const updateTTRelation = async (
    body: TTRelation,
    trainerId: string,
    traineeId: string,
  ): Promise<TTRelation> => {
    const { data } = await api.put<TTRelation>(`/users/${trainerId}/trainees/${traineeId}`, body);
    return data;
  };

  const deleteTTRelation = async (trainerId: string, traineeId: string): Promise<any> => {
    const { data } = await api.delete<any>(`/users/${trainerId}/trainees/${traineeId}`);
    return data;
  };

  const getAllTrainersByTrainee = async (trainerId: string, traineeId: string): Promise<any> => {
    const { data } = await api.get<User>(`/users/${trainerId}/trainees/by-trainee/${traineeId}`);
    return data;
  };

  return (
    <UserContext.Provider
      value={{
        getUserById,
        getUserByName,
        updateUser,
        getAllUsersByTrainer,
        createTTRelation,
        updateTTRelation,
        deleteTTRelation,
        getAllTrainersByTrainee,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }
  return context;
};
