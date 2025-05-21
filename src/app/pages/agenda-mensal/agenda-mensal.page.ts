import { Component, OnInit } from '@angular/core';
//import { RelatorioService } from 'src/app/services/relatorio.service';
import { ReportService } from 'src/app/services/report.service';
import { EditarTransacaoPage } from '../editar-transacao/editar-transacao.page';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import { NovaTransacaoPage } from '../nova-transacao/nova-transacao.page';


@Component({
  selector: 'app-agenda-mensal',
  templateUrl: './agenda-mensal.page.html',
  styleUrls: ['./agenda-mensal.page.scss'],
  standalone: false
})
export class AgendaMensalPage implements OnInit {

  dataSelecionada: string = new Date().toISOString();
  transacoes: any[] = [];
  resumo: {
    saldoInicial: number;
    saldoFinal: number;
    receitas: number;
    despesas: number;
  } = {
      saldoInicial: 0,
      saldoFinal: 0,
      receitas: 0,
      despesas: 0
    };


  constructor(private relatorioService: ReportService,
    private modalController: ModalController,
    private service: TransactionService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {


  }

  ngOnInit() {
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    const data = new Date(this.dataSelecionada);
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    this.relatorioService.getAnaliticoMensal(ano, mes).subscribe(response => {
      this.transacoes = response.transacoes || [];

      let receitas = 0;
      let despesas = 0;

      this.transacoes.forEach(t => {
        if (t.tipo === 'crédito') {
          receitas += t.valor;
        } else {
          despesas += t.valor;
        }
      });

      this.resumo = {
        saldoInicial: response.saldoInicial || 0,
        saldoFinal: response.saldoFinal || 0,
        receitas,
        despesas
      };
    });
  }

  async editarTransacao(transacao: any) {
    if (transacao.recorrencia !== 'única') {
      alert('Apenas transações únicas podem ser editadas.');
      return;
    }

    const modal = await this.modalController.create({
      component: EditarTransacaoPage,
      componentProps: { transacao }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      // Atualize sua lista ou envie para API
      await this.service.atualizar(data._id, data);
      this.atualizarTransacoes(); // exemplo
    }
  }

  async confirmarExclusao(transacao: any) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir transação',
      message: 'Tem certeza que deseja excluir esta transação?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => this.excluirTransacao(transacao._id)
        }
      ]
    });

    await alert.present();
  }

  async excluirTransacao(id: string) {
    console.log(id);
    try {
      await this.service.delete(id);
      this.transacoes = this.transacoes.filter(t => t._id !== id);

      const toast = await this.toastCtrl.create({
        message: 'Transação excluída com sucesso.',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Erro ao excluir transação.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }


  async adicionarTransacao() {
  const modal = await this.modalController.create({
    component: NovaTransacaoPage,
    componentProps: {
      transacao: {
        descricao: '',
        valor: 0,
        data: new Date().toISOString().substring(0, 10),
        tipo: 'débito',
        recorrencia: 'única',
        numeroParcelas: null
      }
    }
  });

  modal.present();

  const { data } = await modal.onDidDismiss();

  if (data) {
    try {
      console.log('data: ', data)
      await this.service.create(data);
      
      this.exibirToast('Transação adicionada com sucesso.');
      this.carregarTransacoes(); // recarrega a agenda
    } catch (error) {
      this.exibirToast('Erro ao adicionar transação.');
    }
  }
}

async exibirToast(mensagem: string) {
  const toast = await this.toastCtrl.create({
    message: mensagem,
    duration: 3000,
    position: 'bottom',
    color: 'success' // ou 'danger' se for para erro
  });

  await toast.present();
}

  atualizarTransacoes() {
    this.carregarTransacoes();
  }
}

