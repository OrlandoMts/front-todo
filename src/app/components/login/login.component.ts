import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@src/app/services';
import { Subject, takeUntil } from 'rxjs';

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
	private authSrv = inject(AuthService);
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

	login(): void {
		this.authSrv
			.login(this.frmData.value)
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(() => {
				this.router.navigate(['/profile']);
			});
	}
}
