import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrudService } from '../crud.service';
import { Product } from '../product.model';
import { EditProductComponent } from './edit-product.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, signOut } from '@angular/fire/auth'; // Importar Firebase Auth
import { Router } from '@angular/router'; // Para redirigir al login

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CrudComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', price: 0, description: '', imageUrl: '' };
  modalCtrl: ModalController; // Cambia el tipo a ModalController

  constructor(private crudService: CrudService, private auth: Auth, private router: Router, modalCtrl: ModalController) {
    this.modalCtrl = modalCtrl; // Asigna la instancia inyectada
  }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.products = (await this.crudService.getItems()).map(item => ({
        id: item.id,
        name: (item as Product).name || '',
        price: (item as Product).price || 0,
        description: (item as Product).description || '',
        imageUrl: (item as Product).imageUrl || ''
      }));
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  async addProduct() {
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      alert('Por favor, ingresa un nombre y un precio válido.');
      return;
    }
    try {
      await this.crudService.createItem(this.newProduct);
      this.newProduct = { name: '', price: 0, description: '', imageUrl: '' };
      this.loadProducts();
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }

  async deleteProduct(productId?: string) {
    if (!productId) return;
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await this.crudService.deleteItem(productId);
        this.loadProducts();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  }

  // 📌 Abrir modal de edición
  async openEditModal(product: Product) {
    const modal = await this.modalCtrl.create({
      component: EditProductComponent,
      componentProps: { product: { ...product } } // Clona el objeto para evitar cambios directos
    });

    await modal.present();

    // Obtener datos actualizados cuando el modal se cierra
    const { data, role } = await modal.onWillDismiss();
    if (role === 'save' && data) {
      this.updateProduct(data);
    }
  }

  // 📌 Actualizar producto en la base de datos
  async updateProduct(updatedProduct: Product) {
    try {
      if (updatedProduct.id) {
        await this.crudService.updateItem(updatedProduct.id, updatedProduct);
      } else {
        console.error('Error: Product ID is undefined.');
      }
      this.loadProducts(); // Recarga la lista
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
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
