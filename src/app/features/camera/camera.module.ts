import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    CameraRoutingModule
  ],
  declarations: [CameraComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CameraModule {}
