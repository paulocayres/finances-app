import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SaldoInicialPageRoutingModule } from './saldo-inicial-routing.module';

import { InitialBalancePage } from './saldo-inicial.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// IMPORTAÇÕES DO NGX-MASK
import { MaskitoOptions} from '@maskito/core';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaldoInicialPageRoutingModule,
    MaskitoDirective,
    ReactiveFormsModule
    // IMPORTAÇÃO NECESSÁRIA
  ],
  declarations: [InitialBalancePage]
})
export class SaldoInicialPageModule { }
