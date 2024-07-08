// src/app/auth.config.ts
import { environment } from '@src/env/environment';
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
	issuer: 'https://accounts.google.com',
	redirectUri: window.location.origin + '/auth-callback',
	clientId: environment.id_client_g,
	scope: 'openid profile email',
	strictDiscoveryDocumentValidation: false,
	showDebugInformation: true,
};
