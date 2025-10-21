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
  id?: string;
  name?: string;
  password?: string;
  email: string;
  role: string;
  isOwner?: boolean;
  createdAt?: string;
  active?: boolean;
  height?: string;
  weight?: string;
  updatedAt?: string;
}

export interface Gym {
  id?: string;
  name?: string;
  ownerId?: string;
}

export interface LinkInfo {
  id?: string;
  name?: string;
}

export interface UserSpec {
  name: string;
  password: string;
  email: string;
  role: string;
  active?: boolean;
  height: string | '';
  weight: string | '';
}

export enum Unit {
  m = 'METRIC',
  i = 'IMPERIAL',
}

export interface Authority {
  authority: string;
}

export enum RoleType {
  admin = 'ADMIN',
  trainee = 'TRAINEE',
  trainer = 'TRAINER',
}
