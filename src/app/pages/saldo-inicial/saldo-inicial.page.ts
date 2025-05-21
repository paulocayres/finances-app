import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitialBalanceService } from 'src/app/services/initial-balance.service';
import { maskitoNumberOptionsGenerator, maskitoParseNumber } from '@maskito/kit';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-initial-balance',
  templateUrl: './saldo-inicial.page.html',
  styleUrls: ['./saldo-inicial.page.scss'],
  standalone: false
})
export class InitialBalancePage implements OnInit {
  form!: FormGroup;

  currency: MaskitoOptions = maskitoNumberOptionsGenerator({
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    decimalSeparator: ',',
    thousandSeparator: '.',
    min: 0,
    prefix: 'R$ ',
  });
  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(
    private service: InitialBalanceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.service.get().subscribe({
  next: data => console.log('Resposta da API:', data),
  error: err => console.error('Erro na requisição:', err)
});
  this.form = this.fb.group({
    valor: ['', [Validators.required]],
    data: ['', Validators.required],
  });

  const response = await firstValueFrom(this.service.get());

  if (response) {
    this.form.patchValue({
      valor: 'R$ ' + this.formatarParaReais(response.valor),
      //valor: response.valor?.toString() ?? '',
      data: response.data ?? '',
    });
  }
}

  formatarParaReais(valor: number): string {
    if (typeof valor !== 'number' || isNaN(valor)) {
      valor = 0; // fallback seguro
    }

    return valor
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  async salvar() {
    if (this.form.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Informe todos os dados corretamente.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const rawValor = this.form.value.valor;
    const valorNumerico = maskitoParseNumber(rawValor, ',');

    console.log(rawValor, valorNumerico);
    this.service.upsert({
      valor: valorNumerico,
      data: this.form.value.data,
    }).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Saldo salvo com sucesso!',
          duration: 2000,
          color: 'success',
        });
        await toast.present();
        this.navCtrl.navigateRoot('/agenda-mensal'); // ajuste se quiser
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Erro ao salvar. Tente novamente.',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      },
    });
  }
}
