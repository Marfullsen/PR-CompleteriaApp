export interface Product {
    id?: string;  // Se genera automáticamente en Firestore
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  }
  