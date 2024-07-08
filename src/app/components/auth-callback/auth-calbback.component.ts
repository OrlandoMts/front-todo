// src/app/auth-callback/auth-callback.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@src/app/services';

@Component({
	selector: 'app-auth-callback',
	standalone: true,
	imports: [CommonModule],
	template: '<p>Loading...</p>',
})
export class AuthCallbackComponent implements OnInit {
	private _authSrv = inject(AuthService);

	ngOnInit() {
		this._authSrv.handleAuthCallback();
	}
}
