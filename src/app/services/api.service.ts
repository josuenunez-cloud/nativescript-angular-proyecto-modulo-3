import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApplicationSettings } from '@nativescript/core';

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface ApiResponse {
  success: boolean;
  count?: number;
  data?: ApiProduct[];
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly CONFIG_KEY = 'API_BASE_URL';
  private readonly DEFAULT_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getApiUrl(): string {
    return ApplicationSettings.getString(this.CONFIG_KEY, this.DEFAULT_URL);
  }

  setApiUrl(url: string): void {
    ApplicationSettings.setString(this.CONFIG_KEY, url);
  }

  searchProducts(filters?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Observable<ApiProduct[]> {
    const baseUrl = this.getApiUrl();
    let params = new HttpParams();

    if (filters) {
      if (filters.search) {
        params = params.set('search', filters.search);
      }
      if (filters.category) {
        params = params.set('category', filters.category);
      }
      if (filters.minPrice !== undefined) {
        params = params.set('minPrice', filters.minPrice.toString());
      }
      if (filters.maxPrice !== undefined) {
        params = params.set('maxPrice', filters.maxPrice.toString());
      }
    }

    return this.http.get<ApiResponse>(`${baseUrl}/api/products`, { params }).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        return [];
      }),
      catchError(error => {
        console.error('Error al buscar productos:', error);
        return of([]);
      })
    );
  }

  getProductById(id: number): Observable<ApiProduct | null> {
    const baseUrl = this.getApiUrl();
    
    return this.http.get<ApiResponse>(`${baseUrl}/api/products/${id}`).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data[0] || null;
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al obtener producto:', error);
        return of(null);
      })
    );
  }

  testConnection(): Observable<boolean> {
    const baseUrl = this.getApiUrl();
    
    return this.http.get(`${baseUrl}/`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
