import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);
  authService = inject(AuthService);

  get isLoginPage(): boolean {
    return this.router.url === '/login'; // Hide header on login page
  }

  get isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
}
