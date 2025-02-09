import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule], // Import necessary modules
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  onRegister() {
    if (!this.username.trim() || !this.password.trim()) {
      this.showSnackbar('Username and password are required', 'error');
      return;
    }

    this.authService
      .register({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          if (response) {
            // ✅ Checking if response exists
            this.showSnackbar(
              '✅Registration successful! Redirecting to login...',
              'success'
            );
            setTimeout(() => this.router.navigate(['/login']), 2000);
          }
        },
        error: (error) => {
          console.error('❌ Registration error:', error);

          // ✅ Ensure 400 is handled correctly
          if (error.status === 400) {
            this.showSnackbar(
              error.error?.error ||
                'User already exists! Please use a different username.',
              'error'
            );
          } else {
            this.showSnackbar(
              '❌ Registration failed. Please try again.',
              'error'
            );
          }
        },
      });
  }

  private showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}
