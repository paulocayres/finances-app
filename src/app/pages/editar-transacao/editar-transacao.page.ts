/*import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { TransacoesService } from 'src/app/services/transacoes.service';
import { TransactionService } from 'src/app/services/transaction.service';




@Component({
  selector: 'app-editar-transacao',
  templateUrl: './editar-transacao.page.html',
  styleUrls: ['./editar-transacao.page.scss'],
  standalone: false
})
export class EditarTransacaoPage {
  @Input() transacao: any;

  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private transacoesService: TransactionService
  ) {
    this.form = this.fb.group({
      descricao: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      data: ['', Validators.required],
      tipo: ['', Validators.required],
      recorrencia: ['única', Validators.required]
    });
  }

  ngOnInit() {
    if (this.transacao) {
      this.form.patchValue({
        descricao: this.transacao.descricao,
        valor: this.transacao.valor,
        data: this.transacao.data,
        tipo: this.transacao.tipo,
        recorrencia: this.transacao.recorrencia
      });
    }
  }

  async salvar() {
    if (this.form.invalid) return;

    const dadosAtualizados = this.form.value;

    await this.transacoesService.update(this.transacao._id, dadosAtualizados);
    this.modalController.dismiss({ atualizado: true });
  }

  cancelar() {
    this.modalController.dismiss({ atualizado: false });
  }
}
*/

/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-editar-transacao',
  templateUrl: './editar-transacao.page.html',
  styleUrls: ['./editar-transacao.page.scss'],
  standalone: false
})
export class EditarTransacaoPage implements OnInit {
  form!: FormGroup;
  transacaoId!: string;
  transacao: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transacoesService: TransactionService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/agenda-mensal']);
      return;
    }

    this.transacaoId = id;
    this.carregarTransacao();
  }

  async carregarTransacao() {
    try {
      this.transacao = await this.transacoesService.buscarPorId(this.transacaoId);

      if (this.transacao.recorrencia !== 'única') {
        const alert = await this.alertCtrl.create({
          header: 'Não permitido',
          message: 'Apenas transações únicas podem ser editadas.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/agenda-mensal']);
        return;
      }

      this.form = this.fb.group({
        descricao: [this.transacao.descricao, Validators.required],
        valor: [this.transacao.valor, [Validators.required, Validators.min(0.01)]],
        data: [this.transacao.data, Validators.required],
        tipo: [this.transacao.tipo, Validators.required],
      });

    } catch (error) {
      console.error('Erro ao carregar transação', error);
    }
  }

  async salvar() {
    if (this.form.invalid) return;

    const dadosAtualizados = this.form.value;

    try {
      await this.transacoesService.update(this.transacaoId, dadosAtualizados);

      const toast = await this.toastCtrl.create({
        message: 'Transação atualizada com sucesso!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/agenda-mensal']);
    } catch (error) {
      console.error('Erro ao salvar', error);
    }
  }
}*/

/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-editar-transacao',
  templateUrl: './editar-transacao.page.html',
  styleUrls: ['./editar-transacao.page.scss'],
  standalone: false
})
export class EditarTransacaoPage implements OnInit {
  form!: FormGroup;
  transacaoId!: string;
  transacao: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private transacoesService: TransactionService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID da transação recebido:', id);

    if (!id) {
      this.router.navigate(['/agenda-mensal']);
      return;
    }

    this.transacaoId = id;
    this.carregarTransacao();
  }

  async carregarTransacao() {
    try {
      this.transacao = await this.transacoesService.buscarPorId(this.transacaoId);
      console.log(this.transacao);

      if (this.transacao.recorrencia !== 'única') {
        const alert = await this.alertCtrl.create({
          header: 'Não permitido',
          message: 'Apenas transações únicas podem ser editadas.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/agenda-mensal']);
        return;
      }

      this.form = this.fb.group({
        descricao: [this.transacao.descricao, Validators.required],
        valor: [this.transacao.valor, [Validators.required, Validators.min(0.01)]],
        data: [this.transacao.data, Validators.required],
        tipo: [this.transacao.tipo, Validators.required],
      });

    } catch (error) {
      console.error('Erro ao carregar transação', error);
    }
  }

  async salvar() {
    if (this.form.invalid) return;

    const dadosAtualizados = this.form.value;

    try {
      await this.transacoesService.atualizar(this.transacaoId, dadosAtualizados);

      const toast = await this.toastCtrl.create({
        message: 'Transação atualizada com sucesso!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/agenda-mensal']);
    } catch (error) {
      console.error('Erro ao salvar', error);
    }
  }
}*/

import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {maskitoNumberOptionsGenerator, maskitoParseNumber} from '@maskito/kit';
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
  valor: string = '';

  
currency = maskitoNumberOptionsGenerator({
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    decimalSeparator: ',',
    thousandSeparator: '.',
    min: 0,
    prefix: 'R$',
});

/*currency = maskitoNumberOptionsGenerator({
    decimalSeparator: ',',
    thousandSeparator: '.',
    maximumFractionDigits: 2,
});*/

readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {  }

  ngOnInit() {
    this.transacao = this.navParams.get('transacao');

    if (!this.transacao || this.transacao.recorrencia !== 'única') {
      this.modalCtrl.dismiss();
      return;
    }
    this.valor = 'R$ ' + this.formatarParaReais(this.transacao.valor);


    this.form = this.fb.group({
      descricao: [this.transacao.descricao, Validators.required],
      valor: [this.valor, [Validators.required, Validators.min(0.01)]],
      data: [this.transacao.data, Validators.required],
      tipo: [this.transacao.tipo, Validators.required],
    });
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
    if (this.form.invalid) return;
 const valorMascara = this.form.get('valor')?.value || 'R$ 0,00';
  const valorParsed = maskitoParseNumber(valorMascara, ',');
  
  const dadosAtualizados = {
    ...this.transacao,
    ...this.form.value,
    valor: valorParsed
  };

  console.log('transacao.valor (parseado):', valorParsed);
  console.log('dados atualizados:', dadosAtualizados);

  await this.modalCtrl.dismiss(dadosAtualizados);
  }

  

  cancelar() {
    this.modalCtrl.dismiss();
  }
}


