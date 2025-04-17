import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CarritoService, Product } from '../../services/carrito.service';
import { CrudService } from '../crud.service'; // Asegúrate de que el servicio CRUD esté importado correctamente
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1, // Mostrar 1 slide a la vez
    autoplay: true, // Hacer que las imágenes se cambien automáticamente
  };

  products: Product[] = [];

  constructor(private cartService: CarritoService, private crudService: CrudService) {}

  ngOnInit() {
    this.loadProductsFromFirebase(); // Cargar productos desde Firebase
  }

  // Cargar productos desde Firestore
  async loadProductsFromFirebase() {
    try {
      const productsFromFirebase = await this.crudService.getItems(); // Obtiene productos desde Firestore
      this.products = productsFromFirebase.map(item => ({
        id: item.id, // Convertir id a número
        nombre: (item as any).name || '', // Asegúrate de que el nombre de los campos sea correcto
        descripcion: (item as any).description || '', 
        precio: (item as any).price || 0,
        imageUrl: (item as any).imageUrl || '',
        cantidad: 0,
      }));
    } catch (error) {
      console.error('Error al cargar productos desde Firebase:', error);
    }
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
}
