import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaTransacaoPage } from './nova-transacao.page';

const routes: Routes = [
  {
    path: '',
    component: NovaTransacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaTransacaoPageRoutingModule {}
