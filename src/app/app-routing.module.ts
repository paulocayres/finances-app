import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditarTransacaoPage } from './pages/editar-transacao/editar-transacao.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'agenda-mensal',
    pathMatch: 'full'
  },
  {
    path: 'saldo-inicial',
    loadChildren: () => import('./pages/saldo-inicial/saldo-inicial.module').then(m => m.SaldoInicialPageModule)
  },
  {
    path: 'agenda-mensal',
    loadChildren: () => import('./pages/agenda-mensal/agenda-mensal.module').then(m => m.AgendaMensalPageModule)
  },
  {
    path: 'relatorio',
    loadChildren: () => import('./pages/relatorio/relatorio.module').then(m => m.RelatorioPageModule)
  },
  {
    path: 'editar-transacao',
    loadChildren: () => import('./pages/editar-transacao/editar-transacao.module').then(m => m.EditarTransacaoPageModule)
  },
{
  path: 'editar-transacao/:id',
  loadChildren: () => import('./pages/editar-transacao/editar-transacao.module').then(m => m.EditarTransacaoPageModule)
},
  {
    path: 'nova-transacao',
    loadChildren: () => import('./pages/nova-transacao/nova-transacao.module').then( m => m.NovaTransacaoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
