import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.showSnackbar('Username and password are required', 'error');
      return;
    }

    this.authService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          this.showSnackbar('✅ Login successful! Redirecting...', 'success');
          setTimeout(() => this.authService.setToken(response.token), 2000); // ✅ Delay redirection
        },
        error: (err) => {
          this.showSnackbar(
            err.error?.message || '❌ Login failed. Please try again.',
            'error'
          );
        },
      });
  }

  // ✅ Utility function for showing Snackbar
  private showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}
