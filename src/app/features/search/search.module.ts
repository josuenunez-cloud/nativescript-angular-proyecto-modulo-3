import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { MinLengthValidatorDirective } from '../../directives/min-length-validator.directive';
import { EmailValidatorDirective } from '../../directives/email-validator.directive';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    SearchRoutingModule
  ],
  declarations: [
    SearchComponent,
    MinLengthValidatorDirective,
    EmailValidatorDirective
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule {}
