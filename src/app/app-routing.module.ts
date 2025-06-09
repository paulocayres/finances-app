import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authCanActivateGuard } from './guards/auth-can-activate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    canActivate: [authCanActivateGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'nova-transacao',
    canActivate: [authCanActivateGuard],
    loadChildren: () => import('./pages/nova-transacao/nova-transacao.module').then(m => m.NovaTransacaoPageModule)
  },
  {
    path: 'editar-transacao',
    canActivate: [authCanActivateGuard],
    loadChildren: () => import('./pages/editar-transacao/editar-transacao.module').then(m => m.EditarTransacaoPageModule)
  },
  {
    path: 'editar-transacao/:id',
    canActivate: [authCanActivateGuard],
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
