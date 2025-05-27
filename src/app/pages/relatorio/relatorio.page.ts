import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service.service';
import { ReportService } from 'src/app/services/report.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
//import { RelatorioService } from '../services/relatorio.service';


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
  standalone: false
})
export class RelatorioPage implements OnInit {

  filtroForm!: FormGroup;
  startDate!: string;
  endDate!: string;

  evolucao: any[] = [];
  lineChartData: any[] = [];
  resumo: any = {};
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,  // você precisa importar ScaleType
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  ownerId: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private relatorioService: ReportService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.filtroForm = this.fb.group({
      dataInicial: ['', Validators.required],
      dataFinal: ['', Validators.required]
    });


  }

  async gerarRelatorio() {
    if (this.filtroForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha as datas corretamente.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    const { dataInicial, dataFinal } = this.filtroForm.value;

    this.relatorioService.getResumo(dataInicial, dataFinal)
      .subscribe({
        next: (res) => {
          this.evolucao = res.evolucao;  // Array de objetos com mes/ano e valores
          this.resumo = res.resumo;      // Objeto com despesas, receitas, saldo final, saldo investimento
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

    this.lineChartData = [despesas, receitas, saldo];
  }

}


