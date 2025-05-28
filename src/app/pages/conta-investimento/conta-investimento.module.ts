import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ContaInvestimentoPageRoutingModule } from './conta-investimento-routing.module';

import { ContaInvestimentoPage } from './conta-investimento.page';
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
    ContaInvestimentoPageRoutingModule,
    MaskitoDirective,
    ReactiveFormsModule,
    AppHeaderModule
    // IMPORTAÇÃO NECESSÁRIA
  ],
  declarations: [ContaInvestimentoPage]
})
export class ContaInvestimentoPageModule { }
