import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Favorite {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  addedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly FAVORITES_KEY = 'USER_FAVORITES';
  private favoritesSubject = new BehaviorSubject<Favorite[]>([]);
  public favorites$: Observable<Favorite[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const favoritesJson = ApplicationSettings.getString(this.FAVORITES_KEY, '[]');
    try {
      const favorites = JSON.parse(favoritesJson);
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      this.favoritesSubject.next([]);
    }
  }

  private saveFavorites(favorites: Favorite[]): void {
    try {
      const favoritesJson = JSON.stringify(favorites);
      ApplicationSettings.setString(this.FAVORITES_KEY, favoritesJson);
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  }

  getFavorites(): Favorite[] {
    return this.favoritesSubject.getValue();
  }

  addFavorite(product: any): void {
    const favorites = this.getFavorites();
    
    if (favorites.some(f => f.id === product.id)) {
      console.log('El producto ya está en favoritos');
      return;
    }

    const newFavorite: Favorite = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      addedAt: new Date().toISOString()
    };

    favorites.push(newFavorite);
    this.saveFavorites(favorites);
  }

  removeFavorite(productId: number): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(f => f.id !== productId);
    this.saveFavorites(filtered);
  }

  isFavorite(productId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(f => f.id === productId);
  }

  toggleFavorite(product: any): boolean {
    if (this.isFavorite(product.id)) {
      this.removeFavorite(product.id);
      return false;
    } else {
      this.addFavorite(product);
      return true;
    }
  }

  clearFavorites(): void {
    this.saveFavorites([]);
  }
}
