import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from '../product.model';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./crud.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class EditProductComponent {
  @Input() product!: Product; // Recibe el producto a editar

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  saveChanges() {
    this.modalCtrl.dismiss(this.product, 'save');
  }
}
