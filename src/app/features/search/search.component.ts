import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { ApiService, ApiProduct } from '../../services/api.service';
import { FavoritesService } from '../../services/favorites.service';
import { RouterExtensions } from '@nativescript/angular';
import { ObservableArray } from '@nativescript/core';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: ObservableArray<ApiProduct>;
  searchQuery: string = '';
  isRefreshing: boolean = false;
  isSearching: boolean = false;

  constructor(
    private productService: ProductService,
    private apiService: ApiService,
    private favoritesService: FavoritesService,
    private routerExtensions: RouterExtensions
  ) {
    this.products = new ObservableArray<ApiProduct>([]);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.searchProducts().subscribe(
      (apiProducts) => {
        this.products.splice(0, this.products.length);
        this.products.push(...apiProducts);
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        new Toasty({
          text: 'No se pudo conectar al API',
          duration: 'short'
        }).show();
      }
    );
  }

  onSearch(): void {
    if (this.isSearching) return;
    
    this.isSearching = true;
    
    const filters = {
      search: this.searchQuery.trim() || undefined
    };

    this.apiService.searchProducts(filters).subscribe(
      (apiProducts) => {
        this.products.splice(0, this.products.length);
        this.products.push(...apiProducts);
        
        this.isSearching = false;
        
        new Toasty({
          text: `V ${apiProducts.length} resultados encontrados`,
          duration: 'short'
        }).show();
      },
      (error) => {
        console.error('Error en búsqueda:', error);
        this.isSearching = false;
        
        new Toasty({
          text: 'Error al buscar productos',
          duration: 'short'
        }).show();
      }
    );
  }

  onClearSearch(): void {
    this.searchQuery = '';
    this.loadProducts();
  }

  onPullToRefresh(args: any): void {
    const listView = args.object;
    this.isRefreshing = true;
    
    this.apiService.searchProducts().subscribe(
      (apiProducts) => {
        this.products.splice(0, this.products.length);
        this.products.push(...apiProducts);
        
        this.isRefreshing = false;
        listView.notifyPullToRefreshFinished();
        
        new Toasty({
          text: 'Lista actualizada',
          duration: 'short'
        }).show();
      },
      (error) => {
        console.error('Error al refrescar:', error);
        this.isRefreshing = false;
        listView.notifyPullToRefreshFinished();
      }
    );
  }

  onItemTap(args: any): void {
    const tappedProduct = this.products.getItem(args.index);
    this.routerExtensions.navigate(['/products/detail', tappedProduct.id], {
      transition: {
        name: 'slide'
      }
    });
  }

  onToggleFavorite(product: ApiProduct): void {
    const isFavorite = this.favoritesService.toggleFavorite(product);
    
    new Toasty({
      text: isFavorite ? 'Agregado a favoritos' : 'Removido de favoritos',
      duration: 'short'
    }).show();
  }

  isFavorite(productId: number): boolean {
    return this.favoritesService.isFavorite(productId);
  }
}
