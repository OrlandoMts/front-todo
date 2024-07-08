import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withViewTransitions } from '@angular/router';
import { AppRoutes } from './app.routes';

import {
	GoogleLoginProvider,
	SocialAuthServiceConfig,
	SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { environment } from '@src/env/environment';
import { OAuthModule } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			AppRoutes,
			withViewTransitions({
				skipInitialTransition: false,
			}),
		),
		importProvidersFrom(
			BrowserModule,
			HttpClientModule,
			SocialLoginModule,
			OAuthModule.forRoot(),
		),
		// provideHttpClient(withInterceptors([AuthInterceptor])),
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				lang: 'en',
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(environment.id_client_g, {
							oneTapEnabled: false, // <===== default is true
						}),
					},
				],
				onError: err => {
					console.error(err);
				},
			} as SocialAuthServiceConfig,
		},
	],
};
