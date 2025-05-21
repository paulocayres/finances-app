import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditarTransacaoPageRoutingModule } from './editar-transacao-routing.module';

import { EditarTransacaoPage } from './editar-transacao.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTransacaoPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective
  ],
  declarations: [EditarTransacaoPage],
})
export class EditarTransacaoPageModule {}
