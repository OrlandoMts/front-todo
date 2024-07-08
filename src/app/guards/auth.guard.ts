import { inject } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

import { AuthService } from '../services';

export const authGuard: CanActivateFn = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	route: ActivatedRouteSnapshot,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	state: RouterStateSnapshot,
) => {
	const oauthSrv = inject(OAuthService);
	const authSrv = inject(AuthService);
	const router = inject(Router);

	if (oauthSrv.hasValidIdToken() || authSrv.isAuthenticated()) {
		return true;
	} else {
		router.navigate(['/login']);
		return false;
	}
};
