import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTransacaoPage } from './editar-transacao.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTransacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTransacaoPageRoutingModule {}
