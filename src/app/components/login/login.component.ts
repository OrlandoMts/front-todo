import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '@src/app/services';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [RouterLink, ReactiveFormsModule, JsonPipe],
	templateUrl: './login.component.html',
	styles: ``,
})
export class LoginComponent implements OnInit {
	private _desRef = inject(DestroyRef);
	private router = inject(Router);
	private _fb = inject(FormBuilder);
	private _oauthSrv = inject(OAuthService);
	private _authSrv = inject(AuthService);
	private _onDestroy$ = new Subject<void>();
	public frmData: FormGroup = this._fb.group({
		username: ['', [Validators.required]],
		password: ['', [Validators.required]],
	});

	ngOnInit(): void {
		this._desRef.onDestroy(() => {
			if (!this._onDestroy$.closed) {
				this._onDestroy$.next();
				this._onDestroy$.complete();
			}
		});
	}

	loginCommon() {
		this._authSrv
			.login(this.frmData.value)
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(res => {
				if (res.ok || res?.data?.access_token) {
					this.router.navigate(['/profile']);
				} else {
					this.router.navigate(['/login']);
				}
			});
	}

	loginGoogle() {
		this._oauthSrv.initLoginFlow();
	}
}
