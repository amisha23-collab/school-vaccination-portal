import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/req'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Signup method
  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      catchError(this.handleError)
    );
  }

  // Login method
  login(user: any): Observable<any> {
    const authHeader = btoa(`${user.username}:${user.password}`);
    localStorage.setItem('auth', authHeader); // Save Basic Auth to localStorage
    localStorage.setItem('username', user.username);
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
