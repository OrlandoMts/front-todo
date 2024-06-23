import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '@src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api_url: string = environment.api_url + '/auth';
  private accessToken = new BehaviorSubject<string | null>(null);
  private refreshToken = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const savedAccessToken = localStorage.getItem('access_token');
    const savedRefreshToken = localStorage.getItem('refresh_token');
    if (savedAccessToken) {
      this.accessToken.next(savedAccessToken);
    }
    if (savedRefreshToken) {
      this.refreshToken.next(savedRefreshToken);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.api_url}/login`, { username, password }).pipe(
      tap((response: any) => {
        console.log(response);
        this.accessToken.next(response.access_token);
        this.refreshToken.next(response.refresh_token);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }),
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.api_url}/signup`, {
      username,
      email,
      password,
    });
  }

  logout(): void {
    this.accessToken.next(null);
    this.refreshToken.next(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return this.accessToken.value;
  }

  getRefreshToken(): string | null {
    return this.refreshToken.value;
  }

  refreshAccessToken(): Observable<any> {
    const refresh_token = this.getRefreshToken();
    return this.http.post(`${this.api_url}/refresh`, { refresh_token }).pipe(
      tap((response: any) => {
        this.accessToken.next(response.access_token);
        localStorage.setItem('access_token', response.access_token);
      }),
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
