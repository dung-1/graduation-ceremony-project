import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { PhoneRingComponent } from './phone-ring/phone-ring.component';

@NgModule({
  declarations: [HomeComponent, PhoneRingComponent],
  exports: [HomeComponent],

  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [{ provide: 'DISABLE_SSR', useValue: true }],

  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class HomeModule { }