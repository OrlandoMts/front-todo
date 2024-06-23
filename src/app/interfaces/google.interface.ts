import { Role } from './auth.interface';

export interface UserGoogleItf {
	provider: string;
	email: string;
	username: string;
	role: Role;
}

export interface PayloadGoogleItf {
	user: UserGoogleItf;
	accessToken: string;
}
