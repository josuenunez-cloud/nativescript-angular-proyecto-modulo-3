import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllReadNowItems, selectReadNowItemsCount } from '../../store/selectors/read-now.selectors';
import { removeReadNowItem, clearReadNowItems, ReadNowItem } from '../../store/actions/read-now.actions';
import { UserSettingsService } from '../../services/user-settings.service';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readNowItems$: Observable<ReadNowItem[]>;
  readNowCount$: Observable<number>;
  
  username: string = '';

  constructor(
    private store: Store,
    private userSettingsService: UserSettingsService
  ) {
    this.readNowItems$ = this.store.select(selectAllReadNowItems);
    this.readNowCount$ = this.store.select(selectReadNowItemsCount);
  }

  ngOnInit(): void {
    this.userSettingsService.username$.subscribe(
      (name) => {
        this.username = name;
      }
    );
  }

  onRemoveItem(item: ReadNowItem): void {
    this.store.dispatch(removeReadNowItem({ itemId: item.id }));
    
    new Toasty({
      text: `❌ "${item.name}" removido de Leer Ahora`
    }).show();
  }

  onClearAll(): void {
    this.store.dispatch(clearReadNowItems());
    
    new Toasty({
      text: ' Todos los items de Leer Ahora han sido eliminados'
    }).show();
  }
}
