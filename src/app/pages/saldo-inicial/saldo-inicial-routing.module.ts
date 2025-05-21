import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitialBalancePage } from './saldo-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: InitialBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaldoInicialPageRoutingModule {}
