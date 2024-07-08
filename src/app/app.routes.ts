import { Routes } from '@angular/router';
import {
	LoginComponent,
	ProfileComponent,
	SignupComponent,
} from '@components/index';
import { AuthCallbackComponent } from './components/auth-callback/auth-calbback.component';
import { authGuard } from './guards/auth.guard';

export const AppRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'auth-callback', component: AuthCallbackComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
	{ path: '**', redirectTo: 'login' },
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
];
