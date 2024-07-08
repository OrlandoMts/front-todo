import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withViewTransitions } from '@angular/router';
import { AppRoutes } from './app.routes';

import { OAuthModule } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			AppRoutes,
			withViewTransitions({
				skipInitialTransition: false,
			}),
		),
		importProvidersFrom(BrowserModule, HttpClientModule, OAuthModule.forRoot()),
		// provideHttpClient(withInterceptors([AuthInterceptor])),
	],
};
