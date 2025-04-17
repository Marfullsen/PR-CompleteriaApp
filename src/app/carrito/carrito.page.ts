import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CarritoService, Product } from '../../services/carrito.service';
import { addIcons } from 'ionicons';
import { addCircle, closeCircle, removeCircle } from 'ionicons/icons';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CarritoPage implements OnInit {
  carrito: Product[] = [];
  total = 0;
  puntosAcumulados = 0;  // Nueva propiedad para acumular puntos

  constructor(
    private cartService: CarritoService,
    private firestore: Firestore,
    private auth: Auth
  ) {
    addIcons({ removeCircle, addCircle, closeCircle });
  }

  ngOnInit() {
    this.carrito = this.cartService.getCart();
    this.calculateTotal();
  }

  decreaseProduct(product: Product) {
    if (product.cantidad > 1) {
      this.cartService.decreaseProduct(product);
      this.calculateTotal();
    }
  }

  increaseProduct(product: Product) {
    this.cartService.addProduct(product);
    this.calculateTotal();
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  }

  async acumularPuntos() {
    const user = this.auth.currentUser;
    if (!user) {
      console.error("Usuario no autenticado");
      return;
    }

    const userRef = doc(this.firestore, `users/${user.uid}`);

    try {
      const userSnap = await getDoc(userRef);

      let puntosActuales = 0;

      if (userSnap.exists()) {
        puntosActuales = userSnap.data()['points'];
      } else {
        // Si no existe el usuario, se crea con 0 puntos iniciales
        await setDoc(userRef, { points: 0 });
      }

      const nuevosPuntos = this.total * 0.10;
      const puntosTotales = puntosActuales + nuevosPuntos;

      await updateDoc(userRef, { points: puntosTotales });

      console.log(`Puntos actualizados: ${puntosTotales}`);
    } catch (error) {
      console.error("Error al actualizar puntos:", error);
    }
  }

  async finalizarCompra() {
    await this.acumularPuntos();
    console.log("Compra finalizada");
  }
}
