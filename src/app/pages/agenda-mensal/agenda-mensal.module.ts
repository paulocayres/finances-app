import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaMensalPageRoutingModule } from './agenda-mensal-routing.module';

import { AgendaMensalPage } from './agenda-mensal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaMensalPageRoutingModule
  ],
  declarations: [AgendaMensalPage]
})
export class AgendaMensalPageModule {}
