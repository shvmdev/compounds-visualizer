import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, FormsModule], // Import necessary modules
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService
      .register({ username: this.username, password: this.password })
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']); // Redirect to login after registration
        },
        (error) => {
          console.error('Registration error:', error);
        }
      );
  }
}
