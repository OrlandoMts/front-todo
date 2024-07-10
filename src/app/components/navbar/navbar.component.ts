import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@src/app/services';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './navbar.component.html',
	styles: ``,
})
export class NavbarComponent {
	private authService = inject(AuthService);
	private router = inject(Router);

	logout(): void {
		this.authService.logout();
		this.router.navigate(['/']);
	}
}
