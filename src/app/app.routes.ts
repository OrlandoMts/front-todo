import { Routes } from '@angular/router';
import { ProfileComponent } from '@components/index';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';

export const AppRoutes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'login',
		loadComponent: () =>
			import('./components/login/login.component').then(c => c.LoginComponent),
	},
	{
		path: 'auth-callback',
		loadComponent: () =>
			import('./components/auth-callback/auth-calbback.component').then(
				c => c.AuthCallbackComponent,
			),
	},
	{
		path: 'signup',
		loadComponent: () =>
			import('./components/signup/signup.component').then(
				c => c.SignupComponent,
			),
	},
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'profile',
				component: ProfileComponent,
				canActivate: [authGuard],
			},
		],
	},
	{ path: '**', redirectTo: 'login' },
	{ path: '', redirectTo: '', pathMatch: 'full' },
];
