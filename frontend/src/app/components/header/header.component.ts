import { Component, computed, input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  // ✅ Compute the formatted username (Reactive)
  formattedUserName = computed(() => {
    const name = this.authService.userName();
    return name ? `Welcome, ${name}` : null;
  });
}
