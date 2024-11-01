import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponent } from './shared.component';
import { RouterModule } from '@angular/router';
import { EventModule } from '../event/event.component.module';
import { HomeModule } from '../home/home.component.module';
import { MessagesModule } from '../messages/messages.component.module';
import { MoneyModule } from '../money/money.component.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [SharedComponent],
  exports: [SharedComponent],

  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HomeModule,
    EventModule,
    MessagesModule,
    MoneyModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTooltipModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class SharedModule { }