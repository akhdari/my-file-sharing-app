import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Admin } from './pages/admin/admin';
import { authGuard } from './auth/auth-guard';
import { UploadComponent } from './upload/upload.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Signup },
  { path: 'admin', component: Admin, canActivate: [authGuard] },
    { path: 'upload', component: UploadComponent, canActivate: [authGuard] },


];
//
//C:\Users\admin\my-file-sharing-app\src\app\app.routes.ts
