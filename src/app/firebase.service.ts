import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collectionName = 'crud'; // Cambiado a la colección correcta

  constructor(private firestore: Firestore, private auth: Auth) {}

  // Crear un documento
  async createItem(data: any) {
    const colRef = collection(this.firestore, this.collectionName);
    return await addDoc(colRef, data);
  }

  // Leer documentos
  async getItems() {
    const colRef = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Actualizar un documento
  async updateItem(id: string, data: any) {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return await updateDoc(docRef, data);
  }

  // Eliminar un documento
  async deleteItem(id: string) {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return await deleteDoc(docRef);
  }
}
