import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, IonicModule, CommonModule],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private adminUID: string = 'sYGrjwrwGtNlgkjCEgyphqXWhmi1';
  private userChecked: boolean = false;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.userChecked = true;
      if (user) {
        const userUID = user.uid;
        console.log('Usuario ya logueado con UID:', userUID);
        // Redirige según el UID
        if (userUID === this.adminUID) {
          this.router.navigate(['/crud']);
        } else {
          this.router.navigate(['/tabs/inicio']);
        }
      }
    });
  }

  async login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('User Credential:', userCredential);

      if (userCredential.user) {
        const userUID = userCredential.user.uid;
        console.log('UID del usuario:', userUID); // Verifica que el UID es correcto

        // Redirige según el UID
        if (userUID === this.adminUID) {
          this.router.navigate(['/crud']);
        } else {
          this.router.navigate(['/tabs/inicio']);
        }
      }
    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión: ' + (error as any).message;
      console.error(this.errorMessage);
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}