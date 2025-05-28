import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'saldo-inicial',
        loadChildren: () => import('../saldo-inicial/saldo-inicial.module').then(m => m.SaldoInicialPageModule)
      },
      {
        path: 'conta-investimento',
        loadChildren: () => import('../conta-investimento/conta-investimento.module').then(m => m.ContaInvestimentoPageModule)
      },
      {
        path: 'agenda-mensal',
        loadChildren: () => import('../agenda-mensal/agenda-mensal.module').then(m => m.AgendaMensalPageModule)
      },
      {
        path: 'relatorio',
        loadChildren: () => import('../relatorio/relatorio.module').then(m => m.RelatorioPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/agenda-mensal',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
