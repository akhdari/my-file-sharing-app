import { Component, inject } from '@angular/core';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  authService = inject(Auth);
  router = inject(Router);

  constructor() {
    if (!this.authService.isloggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  public logout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

}
