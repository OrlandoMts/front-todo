import { Routes } from '@angular/router';
import {
  LoginComponent,
  ProfileComponent,
  SignupComponent,
} from '@components/index';
import { authGuard } from './guards/auth.guard';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
