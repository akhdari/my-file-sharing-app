import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:5222/api/Auth';

  // Sign up a new user and store token if response is valid
signUp(data: any) {
  return this.httpClient.post(`${this.baseUrl}/register`, data).pipe(
    tap((response: any) => {
      console.log('✅ Signup response:', response);
      if (response && typeof response === 'object' && 'token' in response) {
        localStorage.setItem('authUser', JSON.stringify(response));
      } else {
        console.warn('❌ Unexpected signup response:', response);
      }
    })
  );
}

  // Log in and store token if response is valid
  logIn(data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data).pipe(
      tap((response: any) => {
        try {
          if (response && typeof response === 'object' && 'token' in response) {
            localStorage.setItem('authUser', JSON.stringify(response));
          } else {
            console.warn('Unexpected login response:', response);
          }
        } catch (e) {
          console.error('Error storing login response:', e);
        }
      })
    );
  }

  // Remove stored user info
  signOut() {
    localStorage.removeItem('authUser');
  }

  // Check if a user is logged in
  isloggedIn(): boolean {
    return localStorage.getItem('authUser') !== null;
  }

  // Get user info safely from localStorage
getUser(): any {
  try {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Corrupted authUser data:', e);
    localStorage.removeItem('authUser');
    return null;
  }
}

}
