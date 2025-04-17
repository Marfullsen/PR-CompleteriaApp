import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importa la guardia de autenticación

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes),
  },
  {
    path: 'crud',
    loadComponent: () => import('./crud/crud.component').then(m => m.CrudComponent),
    canActivate: [AuthGuard], // Protege esta ruta con el AuthGuard
  },
];