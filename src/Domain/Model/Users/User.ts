export interface User {
	_id?: string;
	email: string;
	username: string;
	role?: UserRole;
	lastLogin?: string;
	newsletter?: boolean;
}

export type UserRole = 'admin' | 'Dba' | 'User' | null;
