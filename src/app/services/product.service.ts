import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop Dell XPS',
      description: 'Laptop de alto rendimiento con procesador Intel i7',
      price: 1299.99,
      category: 'Electrónica'
    },
    {
      id: 2,
      name: 'iPhone 14 Pro',
      description: 'Smartphone Apple con cámara de 48MP',
      price: 999.99,
      category: 'Móviles'
    },
    {
      id: 3,
      name: 'Samsung Galaxy Tab',
      description: 'Tablet Android con pantalla AMOLED',
      price: 649.99,
      category: 'Tablets'
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5',
      description: 'Audífonos con cancelación de ruido',
      price: 399.99,
      category: 'Audio'
    },
    {
      id: 5,
      name: 'MacBook Pro M2',
      description: 'Laptop profesional con chip Apple M2',
      price: 1999.99,
      category: 'Electrónica'
    }
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }
}
