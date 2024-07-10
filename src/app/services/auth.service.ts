import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

import {
	AccessTokenItf,
	AuthItf,
	LoginItf,
	ResponseHttpItf,
	SignupItf,
} from '@interfaces/index';
import { environment } from '@src/env/environment';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private api_url: string = environment.api_url + '/auth';
	private accessToken = new BehaviorSubject<string | null>(null);

	constructor(
		private http: HttpClient,
		private router: Router,
		private oauthService: OAuthService,
	) {}

	public initLoginFlow(): void {
		this.oauthService.initLoginFlow();
	}

	getAccessToken(): string | null {
		return this.accessToken.value;
	}

	refreshAccessToken(): Observable<ResponseHttpItf<AccessTokenItf>> {
		const token = this.getAccessToken();
		return this.http
			.post<
				ResponseHttpItf<AccessTokenItf>
			>(`${this.api_url}/refresh`, { refresh_token: token })
			.pipe(
				tap(response => {
					const { data } = response;
					this.accessToken.next(data?.access_token);
					localStorage.setItem('access_token', data?.access_token);
				}),
				catchError(err => of(err)),
			);
	}

	setAccessToken(accessToken: string): void {
		this.accessToken.next(accessToken);
		localStorage.setItem('access_token', accessToken);
	}

	isAuthenticated(): boolean {
		return !!this.getAccessToken();
	}

	public handleAuthCallback(): void {
		this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
			if (this.oauthService.hasValidIdToken()) {
				this.exchangeTokenWithBackend().subscribe(
					res => {
						localStorage.setItem('access_token', res?.data?.access_token);
						this.router.navigate(['/profile']);
					},
					err => {
						console.error('Error during login', err);
						this.router.navigate(['/login']);
					},
				);
			} else {
				this.router.navigate(['/login']);
			}
		});
	}

	private exchangeTokenWithBackend(): Observable<
		ResponseHttpItf<AccessTokenItf>
	> {
		const idToken = this.oauthService.getIdToken();
		return this.http.post<ResponseHttpItf<AccessTokenItf>>(
			`${this.api_url}/google`,
			{ idToken },
		);
	}

	signup(data: SignupItf): Observable<ResponseHttpItf<AuthItf>> {
		return this.http.post<ResponseHttpItf<AuthItf>>(
			`${this.api_url}/signup`,
			data,
		);
	}

	login(data: LoginItf): Observable<ResponseHttpItf<AccessTokenItf>> {
		return this.http
			.post<ResponseHttpItf<AccessTokenItf>>(`${this.api_url}/login`, data)
			.pipe(
				tap(response => {
					const { data } = response;
					this.accessToken.next(data?.access_token);
					localStorage.setItem('access_token', data?.access_token);
				}),
			);
	}

	logout(): void {
		this.accessToken.next(null);
		this.oauthService.logOut();
		localStorage.removeItem('access_token');
		this.router.navigate(['/login']);
	}
}
