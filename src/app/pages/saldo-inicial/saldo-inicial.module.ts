import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SaldoInicialPageRoutingModule } from './saldo-inicial-routing.module';

import { InitialBalancePage } from './saldo-inicial.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// IMPORTAÇÕES DO NGX-MASK
import { MaskitoOptions} from '@maskito/core';
import { MaskitoDirective } from '@maskito/angular';
import { AppHeaderModule } from 'src/app/components/app-header/app-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaldoInicialPageRoutingModule,
    MaskitoDirective,
    ReactiveFormsModule,
    AppHeaderModule
    // IMPORTAÇÃO NECESSÁRIA
  ],
  declarations: [InitialBalancePage]
})
export class SaldoInicialPageModule { }
