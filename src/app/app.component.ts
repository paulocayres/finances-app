import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service.service';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {

  authResolved = false; // controla exibição do conteúdo principal

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {

    if (Capacitor.isNativePlatform()) {
      await StatusBar.setOverlaysWebView({ overlay: false }); // Impede que a WebView invada a status bar
      await StatusBar.setStyle({ style: Style.Dark });         // Altere para Style.Light se for fundo escuro
      await StatusBar.setBackgroundColor({ color: '#ffffff' }); // Opcional: define a cor da status bar
    }

    // Aguarda o primeiro estado de autenticação
    await this.authService.authState$
      .pipe(filter(u => u !== undefined), take(1))
      .toPromise();

    this.authResolved = true;

    const isLogged = await this.authService.isLoggedIn();
    if (!isLogged) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/agenda', { replaceUrl: true });
    }
  }
}
