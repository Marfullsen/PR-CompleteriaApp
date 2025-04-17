// tabs.routes.ts
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth.guard'; // Asegúrate de importar el guardia

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard], // Aplica el guardia aquí
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('../inicio/inicio.page').then((m) => m.InicioPage),
      },
      {
        path: 'nosotros',
        loadComponent: () =>
          import('../nosotros/nosotros.page').then((m) => m.NosotrosPage),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../perfil/perfil.page').then((m) => m.PerfilPage),
      },
      {
        path: 'mas',
        loadComponent: () =>
          import('../mas/mas.page').then((m) => m.MasPage),
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('../carrito/carrito.page').then((m) => m.CarritoPage),
      },
      {
        path: '',
        redirectTo: 'inicio', // Redirigir a la pestaña de inicio
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  },
];
