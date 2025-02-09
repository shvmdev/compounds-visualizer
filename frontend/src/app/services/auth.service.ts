import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth'; // Replace with your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  // Register a new user
  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login an existing user
  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // Logout the user and remove the token from localStorage
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Check if the user is authenticated based on the token
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token); // Decode the token
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
      if (decoded.exp > currentTime) {
        return true; // Token is valid
      } else {
        this.logout(); // Token expired, logout user
        return false;
      }
    }
    return false; // No token present
  }

  // Get the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get authorization headers with token for authenticated requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  // Get decoded user details from the JWT token (if needed)
  getUserDetails(): any {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token); // Decode the token
      return decoded; // Return decoded user data
    }
    return null;
  }

  // Set token after successful login
  setToken(token: string): void {
    localStorage.setItem('token', token); // Store the token in localStorage
  }

  // Check if the token exists
  tokenExists(): boolean {
    return !!this.getToken();
  }
}
