import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule], // Import necessary modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }
    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token); // Store token in localStorage
          this.router.navigate(['/compounds']); // Redirect to home page
        },
        (error) => {
          this.errorMessage = 'Invalid username or password';
        }
      );
  }
}
