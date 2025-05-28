import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioPageRoutingModule } from './relatorio-routing.module';

import { RelatorioPage } from './relatorio.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppHeaderModule } from 'src/app/components/app-header/app-header.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RelatorioPageRoutingModule,
    ReactiveFormsModule, NgxChartsModule, FormsModule,
    AppHeaderModule
  ],
  declarations: [RelatorioPage]
})
export class RelatorioPageModule { }
