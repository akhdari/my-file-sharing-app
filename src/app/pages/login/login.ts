import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  authService = inject(Auth);
  router = inject(Router);

  public errorMessage: string = '';

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.logIn(this.loginForm.value).subscribe({
      next: (data: any) => {
        if (this.authService.isloggedIn()) {
          this.router.navigate(['/upload']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Invalid email or password.';
      }
    });
  }
}
