import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(private router: Router) { }

  // Protect child routes
  canActivateChild(): boolean {
    const isLoggedIn = !!localStorage.getItem('user_dtl'); // Example: Check for authentication token
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
    return true; // Allow navigation if authenticated
  }

  // Prevent logged-in users from accessing the login page
  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('user_dtl');
    if (isLoggedIn) {
      this.router.navigate(['/home']); // Redirect to home if authenticated
      return false;
    }
    return true; // Allow access if not authenticated
  }

}
