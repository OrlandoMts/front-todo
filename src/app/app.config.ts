import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withViewTransitions } from '@angular/router';
import { AppRoutes } from './app.routes';

import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      AppRoutes,
      withViewTransitions({
        skipInitialTransition: false,
      }),
    ),
    importProvidersFrom(BrowserModule, HttpClientModule),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
