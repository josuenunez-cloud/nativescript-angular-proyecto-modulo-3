import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptHttpClientModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { StoreModule } from '@ngrx/store';
import { readNowReducer } from './store/reducers/read-now.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ readNow: readNowReducer })
  ],
  declarations: [
    AppComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
