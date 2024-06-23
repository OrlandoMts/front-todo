export enum Role {
	User = 'user',
	Admin = 'admin',
}

export interface AuthItf {
	_id: string;
	email: string;
	username: string;
	password: string;
	role: Role;
	status: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface LoginItf {
	username: string;
	password: string;
}

export interface SignupItf extends Required<LoginItf> {
	email: string;
}
