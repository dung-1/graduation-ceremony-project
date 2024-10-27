import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SharedComponent } from './shared.component';
import { EventComponent } from '../event/event.component';
import { MessagesComponent } from '../messages/messages.component';
import { MoneyComponent } from '../money/money.component';


const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'event',
        component: EventComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'money',
        component: MoneyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
