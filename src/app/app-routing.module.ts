/*import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authCanActivateGuard } from './guards/auth-can-activate.guard';
import { authCanActivateChildGuard } from './guards/auth-can-activate-child.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authCanActivateGuard],
    canActivateChild: [authCanActivateChildGuard],
    children: [
      { path: '', redirectTo: 'agenda-mensal', pathMatch: 'full' },
      { path: 'agenda-mensal', loadChildren: () => import('./pages/agenda-mensal/agenda-mensal.module').then(m => m.AgendaMensalPageModule) },
      { path: 'relatorio', loadChildren: () => import('./pages/relatorio/relatorio.module').then(m => m.RelatorioPageModule) },
      { path: 'editar-transacao', loadChildren: () => import('./pages/editar-transacao/editar-transacao.module').then(m => m.EditarTransacaoPageModule) },
      { path: 'editar-transacao/:id', loadChildren: () => import('./pages/editar-transacao/editar-transacao.module').then(m => m.EditarTransacaoPageModule) },
      { path: 'nova-transacao', loadChildren: () => import('./pages/nova-transacao/nova-transacao.module').then(m => m.NovaTransacaoPageModule) },
      { path: 'saldo-inicial', loadChildren: () => import('./pages/saldo-inicial/saldo-inicial.module').then(m => m.SaldoInicialPageModule) },
      { path: 'conta-investimento', loadChildren: () => import('./pages/conta-investimento/conta-investimento.module').then(m => m.ContaInvestimentoPageModule) }
    ]
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) 
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}*/

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authCanActivateGuard } from './guards/auth-can-activate.guard';
import { authCanActivateChildGuard } from './guards/auth-can-activate-child.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    canActivate: [authCanActivateGuard],
    canActivateChild: [authCanActivateChildGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'nova-transacao',
    canActivate: [authCanActivateGuard],
    canActivateChild: [authCanActivateChildGuard],
    loadChildren: () => import('./pages/nova-transacao/nova-transacao.module').then(m => m.NovaTransacaoPageModule)
  },
  {
    path: 'editar-transacao',
    canActivate: [authCanActivateGuard],
    canActivateChild: [authCanActivateChildGuard],
    loadChildren: () => import('./pages/editar-transacao/editar-transacao.module').then(m => m.EditarTransacaoPageModule)
  },
  {
    path: 'editar-transacao/:id',
    canActivate: [authCanActivateGuard],
    canActivateChild: [authCanActivateChildGuard],
    loadChildren: () => import('./pages/editar-transacao/editar-transacao.module').then(m => m.EditarTransacaoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
