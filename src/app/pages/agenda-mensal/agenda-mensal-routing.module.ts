import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaMensalPage } from './agenda-mensal.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaMensalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaMensalPageRoutingModule {}
