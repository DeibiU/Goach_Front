export interface AuthBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
  authUser: User;
}

export type RefreshTokenResponse = LoginResponse;

export interface Response<T> {
  data: T;
}

export interface FeedBackMessage {
  message: string;
}

export enum FeedbackStatus {
  success = 'SUCCES',
  error = 'ERROR',
  default = '',
}

export interface User {
  id: string;
  name?: string;
  password?: string;
  email: string;
  role: string;
  isOwner?: boolean;
  createdAt?: string;
  active?: boolean;
  updatedAt?: string;
}

export interface UserSpec {
  name: string;
  password: string;
  email: string;
  role?: string;
  active?: boolean;
  privateCode?: string;
}

export interface Authority {
  authority: string;
}

export enum RoleType {
  admin = 'ADMIN',
  trainee = 'TRAINEE',
  trainer = 'TRAINER',
}

export interface Routine {
  id: string;
  trainer: User;
  name: string;
  description: string;
  level: string;
  category: string;
  totalTime: string;
  totalRpe: number;
  totalRIR: number;
  totalPRM: number;
  created_at: Date;
  updated_at: Date;
}

export interface Set {
  id: string;
  routie: Routine;
  setNumber: number;
  workTime: string;
  restTime: string;
  targetRPE: number;
  targetRIR: number;
  targetPRM: number;
  setExercises: SetExercise[];
}

export interface Exercise {
  id: string;
  nam: string;
  muscle_group: string;
  description: string;
}

export interface SetExercise {
  id: string;
  set: Set;
  exercise: Exercise[];
  orderIndex: number;
  duration: string;
  maxReps: number;
  minReps: number;
  maxWeight: number;
  minWeight: number;
  targetRPE: number;
  targetRIR: number;
  targetPRM: number;
}
