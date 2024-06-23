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

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private api_url: string = environment.api_url + '/auth';
	private accessToken = new BehaviorSubject<string | null>(null);

	constructor(
		private http: HttpClient,
		private router: Router,
	) {
		const savedAccessToken = localStorage.getItem('access_token');
		if (savedAccessToken) {
			this.accessToken.next(savedAccessToken);
		}
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
				catchError(err => of(err)),
			);
	}

	signup(data: SignupItf): Observable<ResponseHttpItf<AuthItf>> {
		return this.http
			.post<ResponseHttpItf<AuthItf>>(`${this.api_url}/signup`, data)
			.pipe(catchError(err => of(err)));
	}

	logout(): void {
		this.accessToken.next(null);
		localStorage.removeItem('access_token');
		this.router.navigate(['/login']);
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
}
