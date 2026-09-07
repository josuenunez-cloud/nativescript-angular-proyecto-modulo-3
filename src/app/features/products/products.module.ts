import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MinLengthValidatorDirective } from '../../directives/min-length-validator.directive';
import { EmailValidatorDirective } from '../../directives/email-validator.directive';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    MinLengthValidatorDirective,
    EmailValidatorDirective
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductsModule {}
