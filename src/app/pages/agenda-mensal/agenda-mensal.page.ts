import { Component, OnInit } from '@angular/core';
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
  resumo = {
    saldoInicial: 0,
    saldoFinal: 0,
    receitas: 0,
    despesas: 0
  };

  constructor(
    private relatorioService: ReportService,
    private modalController: ModalController,
    private service: TransactionService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.carregarTransacoes();
  }

async carregarTransacoes() {
  const data = new Date(this.dataSelecionada);
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  try {
    const obs$ = await this.relatorioService.getAnaliticoMensal(ano, mes);

    obs$.subscribe({
      next: (response: any) => {
        this.transacoes = response.transacoes || [];

        if (this.transacoes.length === 0) {
          this.exibirToast('Nenhuma transação cadastrada neste mês.', 'warning');
        }

        let receitas = 0;
        let despesas = 0;

        this.transacoes.forEach(t => {
          const valor = Number(t.valor);
          if (t.tipo === 'crédito') {
            receitas += valor;
          } else {
            despesas += valor;
          }
        });

        this.resumo = {
          saldoInicial: response.saldoInicial || 0,
          saldoFinal: response.saldoFinal || 0,
          receitas,
          despesas
        };
      },
      error: () => {
        this.exibirToast('Erro ao carregar transações.', 'danger');
      }
    });
  } catch (err) {
    this.exibirToast('Erro ao preparar carregamento de transações.', 'danger');
    console.error('Erro no getAnaliticoMensal:', err);
  }
}


  async editarTransacao(transacao: any) {
    if (transacao.recorrencia !== 'única') {
      this.exibirToast('Apenas transações únicas podem ser editadas.', 'warning');
      return;
    }

    const modal = await this.modalController.create({
      component: EditarTransacaoPage,
      componentProps: { transacao }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.service.atualizar(data._id, data).subscribe({
        next: () => {
          this.exibirToast('Transação atualizada com sucesso.');
          this.carregarTransacoes();
        },
        error: () => {
          this.exibirToast('Erro ao atualizar transação.', 'danger');
        }
      });
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
          handler: () => {
            this.excluirTransacao(transacao._id);
            this.carregarTransacoes();
          }
        }
      ]
    });

    await alert.present();
  }

  excluirTransacao(id: string) {
    this.service.delete(id).subscribe({
      next: () => {
        this.transacoes = this.transacoes.filter(t => t._id !== id);
        this.carregarTransacoes();
        this.exibirToast('Transação excluída com sucesso.');
      },
      error: () => {
        this.exibirToast('Erro ao excluir transação.', 'danger');
      }
    });
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

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      this.service.create(data).subscribe({
        next: () => {
          this.exibirToast('Transação adicionada com sucesso.');
          this.carregarTransacoes();
        },
        error: () => {
          this.exibirToast('Erro ao adicionar transação.', 'danger');
        }
      });
    }
  }

  async exibirToast(mensagem: string, cor: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom',
      color: cor
    });

    await toast.present();
  }
}
