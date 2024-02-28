import { createContext } from 'react';

export type User = {
	id: string;
	email: string;
	name: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	twoFactorEnabled: boolean;
} | {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
	twoFactorSecret: string;
	account: null;
};

const AuthContext = createContext<User | undefined>(undefined);
export default AuthContext;
