import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@src/app/services';
import { passwordValidator } from '@src/app/validators';
import { Subject, takeUntil } from 'rxjs';

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
			.pipe(takeUntil(this._onDestroy$))
			.subscribe(() => {
				this.router.navigate(['/login']);
			});
	}
}
