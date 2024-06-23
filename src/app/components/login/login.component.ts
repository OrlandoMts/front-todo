import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@src/app/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }
}
