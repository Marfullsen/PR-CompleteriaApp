import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged(user => {
        if (!user) {
          this.router.navigate(['/login']); // Redirige si no hay usuario autenticado
          observer.next(false); // Bloquea el acceso
        } else {
          observer.next(true); // Permite el acceso si está autenticado
        }
        observer.complete();
      });
    }).pipe(take(1));
  }
}