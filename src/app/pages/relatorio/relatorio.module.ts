import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioPageRoutingModule } from './relatorio-routing.module';

import { RelatorioPage } from './relatorio.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RelatorioPageRoutingModule,
ReactiveFormsModule, NgxChartsModule, FormsModule
  ],
  declarations: [RelatorioPage]
})
export class RelatorioPageModule {}
