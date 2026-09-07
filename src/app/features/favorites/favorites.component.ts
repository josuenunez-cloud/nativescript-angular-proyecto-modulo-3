import { Component, OnInit } from '@angular/core';
import { FavoritesService, Favorite } from '../../services/favorites.service';
import { RouterExtensions } from '@nativescript/angular';
import { Store } from '@ngrx/store';
import { addReadNowItem, ReadNowItem } from '../../store/actions/read-now.actions';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private routerExtensions: RouterExtensions,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    
    this.favoritesService.favorites$.subscribe(
      (favs) => {
        this.favorites = favs;
      }
    );
  }

  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  onItemTap(favorite: Favorite): void {
    this.routerExtensions.navigate(['/products/detail', favorite.id], {
      transition: {
        name: 'slide'
      }
    });
  }

  onReadNow(favorite: Favorite): void {
    const readNowItem: ReadNowItem = {
      id: favorite.id,
      name: favorite.name,
      description: favorite.description,
      price: favorite.price,
      category: favorite.category,
      readAt: new Date().toISOString()
    };

    this.store.dispatch(addReadNowItem({ item: readNowItem }));

    new Toasty({
      text: `📖 "${favorite.name}" agregado a Leer Ahora`
    }).show();
  }

  onRemoveFavorite(favorite: Favorite): void {
    this.favoritesService.removeFavorite(favorite.id);
    
    new Toasty({
      text: `❌ "${favorite.name}" removido de favoritos`
    }).show();
  }

  onClearAll(): void {
    if (this.favorites.length === 0) {
      new Toasty({
        text: 'No hay favoritos para limpiar'
      }).show();
      return;
    }

    this.favoritesService.clearFavorites();
    
    new Toasty({
      text: 'Todos los favoritos han sido eliminados'
    }).show();
  }
}
