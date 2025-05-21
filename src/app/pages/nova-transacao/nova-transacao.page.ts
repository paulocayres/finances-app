

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { maskitoNumberOptionsGenerator, maskitoParseNumber } from '@maskito/kit';
import { MaskitoElementPredicate } from '@maskito/core';


@Component({
  selector: 'app-nova-transacao',
  templateUrl: './nova-transacao.page.html',
  styleUrls: ['./nova-transacao.page.scss'],
  standalone: false
})
export class NovaTransacaoPage implements OnInit {
  form!: FormGroup;

  currency = maskitoNumberOptionsGenerator({
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    decimalSeparator: ',',
    thousandSeparator: '.',
    prefix: 'R$',
    min: 0,
  });

  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      descricao: ['', Validators.required],
      valor: ['R$ 0,00', Validators.required],
      data: ['', Validators.required],
      tipo: ['débito', Validators.required],
      recorrencia: ['única', Validators.required],
      numeroParcelas: [null]
    });

    this.form.get('recorrencia')?.valueChanges.subscribe((value) => {
      if (value === 'parcelada') {
        this.form.get('numeroParcelas')?.setValidators([Validators.required, Validators.min(2)]);
      } else {
        this.form.get('numeroParcelas')?.clearValidators();
        this.form.get('numeroParcelas')?.setValue(null);
      }
      this.form.get('numeroParcelas')?.updateValueAndValidity();
    });
  }

  async salvar() {
    if (this.form.invalid) return;

    const valorStr = this.form.get('valor')?.value;
    const valorParsed = maskitoParseNumber(valorStr, ',');
    
    const transacao = {
      ...this.form.value,
      valor: valorParsed
    };
    console.log(transacao);
    await this.modalCtrl.dismiss(transacao);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
