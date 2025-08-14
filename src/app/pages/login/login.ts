import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../auth/auth';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  authService = inject(Auth);
  router = inject(Router);
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      this.authService.logIn(this.loginForm.value).subscribe((data: any) => {
        if (this.authService.isloggedIn()) {
          this.router.navigate(['/upload']);
        }
        console.log(data);
      });
    }

  }

}
