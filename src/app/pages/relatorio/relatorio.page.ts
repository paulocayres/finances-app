import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service.service';
import { ReportService } from 'src/app/services/report.service';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

interface Resumo {
  receitas: number;
  despesas: number;
  saldoFinal: number;
  contaInvestimento: number;
}

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
  standalone: false
})
export class RelatorioPage implements OnInit {

  filtroForm!: FormGroup;
  below = LegendPosition.Below

  evolucao: any[] = [];
  lineChartData: any[] = [];
  resumo: Resumo | null = null;
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  ownerId: string = '';

  meses = [
    { valor: 1, nome: 'Janeiro' },
    { valor: 2, nome: 'Fevereiro' },
    { valor: 3, nome: 'Março' },
    { valor: 4, nome: 'Abril' },
    { valor: 5, nome: 'Maio' },
    { valor: 6, nome: 'Junho' },
    { valor: 7, nome: 'Julho' },
    { valor: 8, nome: 'Agosto' },
    { valor: 9, nome: 'Setembro' },
    { valor: 10, nome: 'Outubro' },
    { valor: 11, nome: 'Novembro' },
    { valor: 12, nome: 'Dezembro' }
  ];

  anos = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private relatorioService: ReportService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.filtroForm = this.fb.group({
      mesInicial: [null, Validators.required],
      anoInicial: [null, Validators.required],
      mesFinal: [null, Validators.required],
      anoFinal: [null, Validators.required]
    });
  }

  async gerarRelatorio() {
    if (this.filtroForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos de data.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    const { mesInicial, anoInicial, mesFinal, anoFinal } = this.filtroForm.value;

    try {
      const dataInicial = new Date(anoInicial, mesInicial - 1, 1);
      const dataFinal = new Date(anoFinal, mesFinal, 0);

      const dataInicialFormatada = dataInicial.toISOString().split('T')[0];
      const dataFinalFormatada = dataFinal.toISOString().split('T')[0];

      this.relatorioService.getResumo(dataInicialFormatada, dataFinalFormatada)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.evolucao = res.evolucao;
            this.resumo = res.resumo;
            console.log('Resposta API:', res);
            this.prepararDadosGrafico();
          },
          error: async () => {
            const toast = await this.toastCtrl.create({
              message: 'Erro ao gerar relatório.',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
          }
        });

    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Erro ao processar datas.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  prepararDadosGrafico() {
    const despesas = {
      name: 'Despesas',
      series: this.evolucao.map(e => ({
        name: e.mesAno,
        value: e.despesas
      }))
    };

    const receitas = {
      name: 'Receitas',
      series: this.evolucao.map(e => ({
        name: e.mesAno,
        value: e.receitas
      }))
    };

    const saldo = {
      name: 'Saldo',
      series: this.evolucao.map(e => ({
        name: e.mesAno,
        value: e.saldo
      }))
    };

    this.lineChartData = [receitas, despesas, saldo];
  }
}
