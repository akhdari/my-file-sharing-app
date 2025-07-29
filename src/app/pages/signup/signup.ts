import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  authService = inject(Auth);
  router = inject(Router);
  public signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    termsAccepted: new FormControl(false, [Validators.requiredTrue]) // ✅ added
  });


  public onSubmit() {
    console.log('Form submitted');
    console.log(this.signupForm.valid);
    console.log(this.signupForm.errors);
    console.log(this.signupForm.value);
    console.log(this.signupForm.get('email')?.errors);
    console.log(this.signupForm.get('termsAccepted')?.value);


    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      console.log('Form is valid');
      this.authService.signUp(this.signupForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['/login']);
          },
          error: (err) => console.log(err)
        });
    }
  }

}
