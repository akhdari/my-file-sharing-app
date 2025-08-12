import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Admin } from './pages/admin/admin';
import { authGuard } from './auth/auth-guard';
import { UploadsComponent } from './upload/upload.component';
import { SharedFilesComponent } from './shared-files/shared-files';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Signup },
  { path: 'admin', component: Admin, canActivate: [authGuard] },
  { path: 'upload', component: UploadsComponent, canActivate: [authGuard] },
  { path: 'view', component: SharedFilesComponent }

];
