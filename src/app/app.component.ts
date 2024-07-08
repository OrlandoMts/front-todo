import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { initFlowbite } from 'flowbite';
import { authConfig } from './auth.config';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'ftodo';

	constructor(private oauthService: OAuthService) {
		this.configureWithNewConfigApi();
	}

	ngOnInit(): void {
		initFlowbite();
	}

	private configureWithNewConfigApi() {
		this.oauthService.configure(authConfig);
		this.oauthService.loadDiscoveryDocumentAndTryLogin();
	}
}
