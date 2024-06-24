import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthItf, ResponseHttpItf } from '@src/app/interfaces';
import { AuthService } from '@src/app/services';
import { passwordValidator } from '@src/app/validators';
import { Subject, catchError, of, takeUntil } from 'rxjs';

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink],
	templateUrl: './signup.component.html',
	styles: ``,
})
export class SignupComponent implements OnInit {
	private _desRef = inject(DestroyRef);
	private router = inject(Router);
	private _fb = inject(FormBuilder);
	private authSrv = inject(AuthService);
	private _onDestroy$ = new Subject<void>();
	public frmData: FormGroup = this._fb.group({
		username: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, passwordValidator()]],
	});

	ngOnInit(): void {
		this._desRef.onDestroy(() => {
			if (!this._onDestroy$.closed) {
				this._onDestroy$.next();
				this._onDestroy$.complete();
			}
		});
	}

	signup(): void {
		this.authSrv
			.signup(this.frmData.value)
			.pipe(
				takeUntil(this._onDestroy$),
				catchError((error: HttpErrorResponse) => {
					if (error.status === 400) {
						console.log('Usuario y/o correo no disponible');
					} else {
						console.log('Algo salio mal, contacta al administrador');
					}
					return of(error);
				}),
			)
			.subscribe((res: ResponseHttpItf<AuthItf> | HttpErrorResponse) => {
				if (
					(res as ResponseHttpItf<AuthItf>)?.data?._id &&
					(res as ResponseHttpItf<AuthItf>)?.data?._id?.length > 0
				) {
					this.router.navigate(['/login']);
				}
			});
	}
}
