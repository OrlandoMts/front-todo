import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@src/app/services';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styles: ``,
})
export class SignupComponent {
  username!: string;
  email!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  signup(): void {
    this.authService
      .signup(this.username, this.email, this.password)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
