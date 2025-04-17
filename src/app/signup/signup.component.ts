import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true, // Marca el componente como standalone
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [FormsModule, IonicModule, CommonModule], // Asegúrate de importar FormsModule aquí
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  address: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router, private firestore: Firestore) {}

  async signup() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('User Credential:', userCredential);
  
      // Guarda la información adicional en Firestore
      const userId = userCredential.user.uid; // Obtén el ID del usuario
      const userData = {
        uid: userId,
        name: this.name,
        address: this.address,
        email: this.email,
      };

      // Usando setDoc para guardar en Firestore
      await setDoc(doc(this.firestore, 'users', userId), userData);
      console.log('Datos del usuario guardados en Firestore:', userData);

      this.router.navigate(['/tabs/inicio']); // Redirige a la pestaña de inicio
    } catch (error) {
      this.errorMessage = 'Error al registrarse: ' + (error as any).message;
      console.error(this.errorMessage);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
