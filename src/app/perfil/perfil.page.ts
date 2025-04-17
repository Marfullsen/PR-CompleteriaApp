import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { addIcons } from 'ionicons';
import { storefrontOutline, happyOutline, cartOutline, fastFoodOutline, menuOutline } from 'ionicons/icons';
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // Importa Firestore
import { Auth, signOut } from '@angular/fire/auth'; // Importa Auth
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]  // Asegúrate de incluir FormsModule aquí
})
export class PerfilPage implements OnInit {
  profileImage: string | ArrayBuffer | null = null;
  puntosAcumulados: number = 0;
  nombreUsuario: string = '';
  correoElectronico: string = '';
  direccion: string = ''; // Nueva propiedad para la dirección
  userId: string = ''; // ID del usuario autenticado

  constructor(private firestore: Firestore, private auth: Auth, private router: Router) { // Inyecta Firestore y Auth
    addIcons({ storefrontOutline, cartOutline, happyOutline, menuOutline, fastFoodOutline });
  }

  ngOnInit() {
    this.cargarDatosUsuario();
    this.cargarDatosDesdeFirestore(); // Carga los datos del usuario desde Firestore
  }

  cargarDatosUsuario() {
    const user = this.auth.currentUser; // Obtén el usuario autenticado
    if (user) {
      this.userId = user.uid; // Asigna el ID del usuario
      this.cargarPuntos(); // Carga los puntos desde Firestore
    } else {
      console.log('No hay usuario autenticado.');
    }
  }

  async cargarPuntos() {
    try {
      if (this.userId) {
        // Obtén el documento del usuario en Firestore
        const userDoc = await getDoc(doc(this.firestore, 'users', this.userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Si el documento del usuario contiene los puntos, actualízalos
          this.puntosAcumulados = userData?.['points'] || 0;
        } else {
          console.log('No se encontró el documento del usuario.');
          this.puntosAcumulados = 0;  // Si no hay documento, asigna 0 puntos
        }
      }
    } catch (error) {
      console.error('Error al cargar los puntos:', error);
      this.puntosAcumulados = 0;  // En caso de error, asigna 0 puntos
    }
  }

  async cargarDatosDesdeFirestore() {
    try {
      // Asegúrate de que userId tenga el ID del usuario autenticado
      const userDoc = await getDoc(doc(this.firestore, 'users', this.userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Datos del usuario:', userData); // Agrega un log para ver los datos

        // Verifica si userData tiene las propiedades esperadas
        this.nombreUsuario = userData?.['name'] || 'Nombre no disponible';
        this.correoElectronico = userData?.['email'] || 'Correo no disponible';
        this.direccion = userData?.['address'] || 'Dirección no disponible';
      } else {
        console.log('No se encontró el documento del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }
  async logout() {
      try {
        await signOut(this.auth);
        this.router.navigate(['/login']); // Redirige al login
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
}
