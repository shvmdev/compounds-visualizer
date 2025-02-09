import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Import AuthGuard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'compounds',
    loadComponent: () =>
      import('./compounds/compounds.component').then(
        (m) => m.CompoundsComponent
      ),
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: 'compound/:name/:id',
    loadComponent: () =>
      import('./compound-details/compound-details.component').then(
        (m) => m.CompoundDetailsComponent
      ),
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
