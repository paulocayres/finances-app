import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InitialBalanceService } from './services/initial-balance.service';
import { firstValueFrom } from 'rxjs';
import { contaInvestimentoService } from './services/conta-investimento.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private saldoService: InitialBalanceService,
    private investimentoService: contaInvestimentoService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      console.log('Iniciando busca de saldo...');
      const saldo = await firstValueFrom(this.saldoService.get()).catch(() => null);
      console.log('Saldo obtido:', saldo);

      const investimento = await firstValueFrom(this.investimentoService.get()).catch(() => null);
      console.log('Investimento obtido:', investimento);

      if (saldo === null) {
        console.log('Chamando upsert para saldo...');
        const data = {
          valor: 0,
          data: new Date('2025-01-01').toISOString() // Garante formato ISO válido
        };

        this.saldoService.upsert(data).subscribe({
          next: response => console.log('Upsert realizado com sucesso:', response),
          error: err => console.error('Erro ao chamar upsert:', err)
        });

      }

      if (investimento === null) {
        console.log('Chamando upsert para investimento...');
        const data = {
          valor: 0,
          data: new Date('2025-01-01').toISOString() // Garante formato ISO válido
        };

        this.investimentoService.upsert(data).subscribe({
          next: response => console.log('Upsert realizado com sucesso:', response),
          error: err => console.error('Erro ao chamar upsert:', err)
        });

      }

    } catch (error) {
      console.error('Erro inesperado:', error);
      this.navCtrl.navigateRoot('/tabs/saldo-inicial');
    }
  }
}
