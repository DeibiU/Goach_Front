// auth-service.tsx
import React, { createContext, useContext, ReactNode, FC, useEffect, useState } from 'react';
import { api } from '../interceptor/api';
import { setTokens, clearTokens, getAccessToken } from '../interceptor/token-storage';

interface AuthBody {
	email: string;
	password: string;
}

interface AuthContextType {
	logIn: (body: AuthBody) => Promise<any>;
	signUp: (body: AuthBody) => Promise<any>;
	logOut: () => void;
	isAuthenticated: boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		if (getAccessToken()) {
			setIsAuthenticated(true);
		}
	}, []);

	const signUp = async (body: AuthBody) => {
		const { data } = await api.post('/sign-up', body);
		return data;
	};

	const logIn = async (body: AuthBody) => {
		const { data } = await api.post('/sign-in', body);
		setTokens({ access: data.accessToken, refresh: data.refreshToken });
		setIsAuthenticated(true);
		return data;
	};

	const logOut = () => {
		clearTokens();
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ logIn, signUp, logOut, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
