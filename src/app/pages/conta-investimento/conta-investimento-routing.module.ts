import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContaInvestimentoPage } from './conta-investimento.page';

const routes: Routes = [
  {
    path: '',
    component: ContaInvestimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContaInvestimentoPageRoutingModule {}
