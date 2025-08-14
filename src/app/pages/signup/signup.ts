import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  authService = inject(Auth);
  router = inject(Router);

  public errorMessage: string = '';

  public signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    termsAccepted: new FormControl(false, [Validators.requiredTrue])
  });

  public onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.authService.signUp(this.signupForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
        }
      });
  }
}
