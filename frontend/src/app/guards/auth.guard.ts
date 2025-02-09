import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.snackBar.open('✅ Authentication successful!', 'Close', {
        duration: 3000, // 3 seconds
        panelClass: ['success-snackbar'], // Custom styling
      });
      //   this.router.navigate(['/compounds']);
      return true;
    } else {
      console.log('false', false);
      this.snackBar.open('❌ Not authenticated. Please log in.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
