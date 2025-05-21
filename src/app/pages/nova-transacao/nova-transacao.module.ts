import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaTransacaoPageRoutingModule } from './nova-transacao-routing.module';

import { NovaTransacaoPage } from './nova-transacao.page';
import { MaskitoDirective } from '@maskito/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaTransacaoPageRoutingModule,
    ReactiveFormsModule,
    MaskitoDirective
  ],
  declarations: [NovaTransacaoPage]
})
export class NovaTransacaoPageModule { }
