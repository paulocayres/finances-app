import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { maskitoNumberOptionsGenerator, maskitoParseNumber } from '@maskito/kit';
import { MaskitoElementPredicate } from '@maskito/core';

@Component({
  selector: 'app-editar-transacao',
  templateUrl: './editar-transacao.page.html',
  styleUrls: ['./editar-transacao.page.scss'],
  standalone: false
})
export class EditarTransacaoPage implements OnInit {

  form!: FormGroup;
  transacao: any;
  tipo!: string;

  // Configuração da máscara para o input de valor
  currency = maskitoNumberOptionsGenerator({
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    decimalSeparator: ',',
    thousandSeparator: '.',
    min: 0,
    prefix: 'R$',
  });

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    // Recebe a transação da tela anterior
    this.transacao = this.navParams.get('transacao');

    // ...inicializa o form




    if (!this.transacao || this.transacao.recorrencia !== 'única') {
      this.modalCtrl.dismiss();
      return;
    }
    //const valorInicial = this.transacao.valor.toFixed(2).replace('.', ','); // "1234,56"
    // Inicializa o formulário com o valor numérico original
    this.form = this.fb.group({
      descricao: [this.transacao.descricao, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      data: [this.transacao.data, Validators.required],
      tipo: [this.transacao.tipo, Validators.required],
    });

    // this.form.patchValue({
    //   valor: this.preFormatarValor(this.transacao.valor)
    // });


    this.form.get('tipo')?.valueChanges.subscribe(valor => {
      this.tipo = valor;
    });

    this.tipo = this.form.get('tipo')?.value;

    // Forçar evento de input para o Maskito aplicar máscara no valor inicial
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('ion-input[formControlName="valor"] input');
      if (input) input.dispatchEvent(new Event('input', { bubbles: true }));
    }, 50);
  }

  // preFormatarValor(valor: number): string {
  //   if (typeof valor !== 'number' || isNaN(valor)) valor = 0;
  //   return valor
  //     .toFixed(2)             // 1234.56 -> "1234.56"
  //     .replace('.', ',')       // "1234.56" -> "1234,56"
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // "1234,56" -> "1.234,56"
  // }

  // Mantém a variável tipo atualizada caso necessário em template
  // ngDoCheck() {
  //   if (this.form) {
  //     this.tipo = this.form.get('tipo')?.value;
  //   }
  // }

  async salvar() {
    if (this.form.invalid) return;

    // Converte o valor formatado pelo usuário para número
    const valorParseado = maskitoParseNumber(this.form.get('valor')?.value, ',');

    const dadosAtualizados = {
      ...this.transacao,
      ...this.form.value,
      valor: valorParseado
    };

    console.log('Transação atualizada:', dadosAtualizados);

    await this.modalCtrl.dismiss(dadosAtualizados);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
