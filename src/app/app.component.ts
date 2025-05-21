import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InitialBalanceService } from './services/initial-balance.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private service: InitialBalanceService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      const response = await firstValueFrom(this.service.get());

      if (!response || response.saldo === null) {
        this.navCtrl.navigateRoot('/saldo-inicial');
      }
    } catch (error) {
      console.error('Erro ao buscar saldo inicial:', error);
      this.navCtrl.navigateRoot('/saldo-inicial');
    }
  }
}
