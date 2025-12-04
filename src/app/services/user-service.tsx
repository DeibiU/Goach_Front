import React, { createContext, FC, ReactNode, useContext, useRef, useState } from 'react';
import Constants from 'expo-constants';

import { api } from '../interceptor/api';
import { LinkRequest, TTRelation, User, UserSpec } from '../interfaces/types';
import { isWeb } from '../utils/platform-flags';

interface UserContextType {
  updateUser: (body: UserSpec, id: string) => User | any;
  getUserById: (id: string) => User | any;
  getUserByName: (name: string) => User | any;

  getAllUsersByTrainer: (trainerId: string) => User[] | any;
  updateTTRelation: (body: TTRelation, trainerId: string, traineeId: string) => User | any;
  createTTRelation: (body: TTRelation, trainerId: string, traineeId: string) => User | any;
  deleteTTRelation: (trainerId: string, traineeId: string) => any;

  getAllTrainersByTrainee: (traineeId: string) => Promise<TTRelation>;

  sendLinkRequest: (senderId: string, receiverEmail: UserSpec) => Promise<any>;
  respondLinkRequest: (accept: boolean, trainerId: string, body: TTRelation) => Promise<any>;
  connectSocket: (userId: string) => void;
  incomingRequest?: LinkRequest | null;
  linkData?: TTRelation | null;
  lastMessage?: any;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [incomingRequest, setIncomingRequest] = useState<LinkRequest | null>(null);
  const [linkData, setLinkData] = useState<TTRelation | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);

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

  const getAllUsersByTrainer = async (trainerId: string): Promise<TTRelation[]> => {
    const { data } = await api.get<TTRelation[]>(`/trainers/${trainerId}/trainees`);
    return data;
  };

  const createTTRelation = async (
    body: Omit<TTRelation, 'trainee'>, // si quieres asegurar el tipo
    trainerId: string,
    traineeId: string,
  ): Promise<TTRelation> => {
    const payload = {
      ...body,
      trainee: { id: traineeId },
    };

    const { data } = await api.post<TTRelation>(`/users/${trainerId}/trainees`, payload);

    return data;
  };

  const updateTTRelation = async (
    body: TTRelation,
    trainerId: string,
    traineeId: string,
  ): Promise<TTRelation> => {
    const { data } = await api.put<TTRelation>(
      `/trainers/${trainerId}/trainees/${traineeId}`,
      body,
    );
    return data;
  };

  const deleteTTRelation = async (trainerId: string, traineeId: string): Promise<User> => {
    const { data } = await api.delete<any>(`/trainers/${trainerId}/trainees/${traineeId}`);
    return data;
  };

  const getAllTrainersByTrainee = async (traineeId: string): Promise<TTRelation> => {
    const { data } = await api.get<TTRelation>(`/trainers/0000000/trainees/${traineeId}`);
    return data;
  };

  const sendLinkRequest = async (trainerId: string, body: UserSpec): Promise<any> => {
    const { data } = await api.post(`/trainers/${trainerId}/trainees/linkRequest`, body);
    return data;
  };

  const respondLinkRequest = async (
    accept: boolean,
    trainerId: string,
    body: TTRelation,
  ): Promise<any> => {
    if (accept) {
      const { data } = await api.post<TTRelation>(`/trainers/${trainerId}/trainees`, body);
      return data;
    }

    const { data } = await api.post(
      `/trainers/${trainerId}/trainees/rejectLinkRequest/${body.trainee?.id}`,
    );

    return data;
  };

  const connectSocket = (userId: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return;

    let wsUrl = '';

    if (isWeb) {
      wsUrl = `ws://localhost:8080/ws/link?userId=${userId}`;
    } else {
      wsUrl = `ws://192.168.150.1:8080/ws/link?userId=${userId}`;
    }

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log('[WS] Connected:', userId);
    ws.onclose = () => console.log('[WS] Disconnected');
    ws.onerror = (err) => console.error('[WS] Error:', err);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('[WS] Incoming:', message);

      switch (message.type) {
        case 'link_request':
          setIncomingRequest(message.data);
          break;
        case 'link_accepted':
          setLinkData(message.data);
          break;
        case 'link_rejected':
          setIncomingRequest(null);
          alert('Your link request was rejected ❌');
          break;
        default:
          console.log('Unknown message:', message);
      }
    };

    socketRef.current = ws;
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
        respondLinkRequest,
        sendLinkRequest,
        connectSocket,
        incomingRequest,
        linkData,
        lastMessage,
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
