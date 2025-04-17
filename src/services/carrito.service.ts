import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addProduct(product: Product) {
    const existingProduct = this.cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.cantidad += 1;
    } else {
      this.cart.push({ ...product, cantidad: 1 });
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product: Product) {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index !== -1) {
      if (this.cart[index].cantidad > 1) {
        this.cart[index].cantidad -= 1;
      } else {
        this.cart.splice(index, 1);
      }
      this.cartItemCount.next(this.cartItemCount.value - 1);
    }
  }

  removeProduct(product: Product) {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cartItemCount.next(this.cartItemCount.value - this.cart[index].cantidad);
      this.cart.splice(index, 1);
    }
  }
}
