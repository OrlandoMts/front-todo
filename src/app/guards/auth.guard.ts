import { inject } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '@services/index';

export const authGuard: CanActivateFn = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	route: ActivatedRouteSnapshot,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	state: RouterStateSnapshot,
) => {
	const authSrv = inject(AuthService);
	const router = inject(Router);

	if (authSrv.isAuthenticated()) {
		return true;
	} else {
		router.navigate(['/login']);
		return false;
	}
};
