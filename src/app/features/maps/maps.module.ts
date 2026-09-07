import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    MapsRoutingModule
  ],
  declarations: [MapsComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MapsModule {}
