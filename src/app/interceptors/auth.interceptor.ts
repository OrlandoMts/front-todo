import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
	string | null
>(null);

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthService);
	const accessToken = authService.getAccessToken();

	let authReq = req;

	if (accessToken) {
		authReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	return next(authReq).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401 && !authReq.url.includes('/auth/refresh')) {
				if (!isRefreshing) {
					isRefreshing = true;
					refreshTokenSubject.next(null);

					return authService.refreshAccessToken().pipe(
						switchMap((response: any) => {
							isRefreshing = false;
							refreshTokenSubject.next(response.access_token);
							authService.setAccessToken(response.access_token);

							return next(
								req.clone({
									setHeaders: {
										Authorization: `Bearer ${response.access_token}`,
									},
								}),
							);
						}),
						catchError(err => {
							isRefreshing = false;
							authService.logout();
							return throwError(() => new Error(err));
						}),
					);
				} else {
					return refreshTokenSubject.pipe(
						switchMap(token => {
							return next(
								req.clone({
									setHeaders: {
										Authorization: `Bearer ${token}`,
									},
								}),
							);
						}),
					);
				}
			}

			return throwError(() => new Error(error.message));
		}),
		finalize(() => {
			isRefreshing = false;
		}),
	);
};
