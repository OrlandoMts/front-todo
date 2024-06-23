import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/services';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [],
	templateUrl: './profile.component.html',
	styles: ``,
})
export class ProfileComponent {
	constructor(
		private authService: AuthService,
		private router: Router,
	) {}

	logout(): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
