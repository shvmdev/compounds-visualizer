import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth'; // Replace with your backend URL
  private token: string | null = null;

  tokenChecked = signal(false); // ✅ Reactive signal for token status
  userName = signal<string | null>(null); // ✅ Signal to store logged-in user name
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // ✅ Observable for auth status

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initializeAuth(); // ✅ Initialize authentication check on app startup
  }

  // ✅ Register a new user
  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // ✅ Login user and store token
  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => this.setToken(response.token)) // ✅ Store token centrally
    );
  }

  // ✅ Logout user and remove token
  logout(): void {
    console.log('🚪 Logging out user...');
    localStorage.removeItem('token');
    this.token = null;
    this.userName.set(null); // ✅ Clear stored username
    this.isAuthenticatedSubject.next(false);
    this.tokenChecked.set(true);

    this.snackBar.open('✅ Logged out successfully!', 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar', // Add custom styling if needed
    });

    // ✅ Ensure UI updates before redirecting
    setTimeout(() => {
      if (this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    }, 2000);
  }

  // ✅ Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // ✅ Perform an initial authentication check
  private initializeAuth(): void {
    console.log('🔍 Checking authentication status...');
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp > currentTime) {
          this.token = storedToken;
          this.tokenChecked.set(true); // ✅ Ensure UI updates
          this.isAuthenticatedSubject.next(true);
          this.userName.set(decoded.username || null); // ✅ Store user name in signal
          console.log(`✅ Token is valid. Logged in as: ${decoded.name}`);

          if (this.router.url === '/login') {
            this.router.navigate(['/compounds']);
          }
          return;
        }
      } catch (error) {
        console.error('❌ Invalid token:', error);
      }
    }

    console.log('❌ No valid token found, logging out...');
    this.tokenChecked.set(true); // ✅ Ensure UI updates even if not authenticated
    this.isAuthenticatedSubject.next(false);
    this.userName.set(null); // ✅ Clear username
    this.handleUnauthorizedAccess();
  }

  // ✅ Store token, decode username, and redirect
  setToken(token: string, redirectTo: string = '/compounds'): void {
    localStorage.setItem('token', token);
    this.token = token;
    this.tokenChecked.set(true);
    this.isAuthenticatedSubject.next(true);
    this.decodeUserInfo(token); // ✅ Decode and store username
    this.router.navigate([redirectTo]); // ✅ Automatically redirect after login
  }

  // ✅ Decode username from JWT and store in signal
  private decodeUserInfo(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      this.userName.set(decoded.username || null);
    } catch (error) {
      console.error('❌ Error decoding token:', error);
      this.userName.set(null);
    }
  }

  // ✅ Get the stored JWT token
  getToken(): string | null {
    return this.token;
  }

  // ✅ Get authorization headers for API requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  // ✅ Get the currently logged-in user's details
  getUserDetails(): any {
    return this.userName() ? { name: this.userName() } : null;
  }

  // ✅ Check if a token exists in storage
  tokenExists(): boolean {
    return !!this.getToken();
  }

  private handleUnauthorizedAccess(): void {
    const publicRoutes = ['/', '/login', '/register']; // Define public routes
    console.log(this.router.url);
    const isPublicRoute = publicRoutes.includes(this.router.url);

    if (!isPublicRoute) {
      console.log('🚫 Unauthorized access detected. Redirecting to login...');
      this.logout();
    }
  }
}
